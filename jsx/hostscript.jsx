/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, Folder*/
var doc;
 

 function newDocFromMergedLayers( docName ) {  
    var desc = new ActionDescriptor();  
        var ref = new ActionReference();  
        ref.putEnumerated( charIDToTypeID('Dcmn'), charIDToTypeID('Ordn'), charIDToTypeID('Frst') );  
    desc.putReference( charIDToTypeID('null'), ref );  
    desc.putString( charIDToTypeID('Nm  '), docName );  
    desc.putBoolean( charIDToTypeID('Mrgd'), true );  
    executeAction( charIDToTypeID('Dplc'), desc, DialogModes.NO );  
};
function SavePNG(saveFile){
	
    var pngOpts = new ExportOptionsSaveForWeb; 
    pngOpts.format = SaveDocumentType.PNG
    pngOpts.PNG8 = false; 
    pngOpts.transparency = true; 
    pngOpts.interlaced = false; 
    pngOpts.quality = 100;
    activeDocument.exportDocument(new File(doc.path+"/"+saveFile),ExportType.SAVEFORWEB,pngOpts); 
  
    alert("Sprite made!");

}
 
function inArray(target, array)
{
  for(var i = 0; i < array.length; i++) 
  {
    if(array[i] === target)
    {
      return true;
    }
  }

  return false; 
}
function getInfo(){
	 return(app.activeDocument.activeLayer.bounds);

}
function makeSpriteSheet(direction,ignoreRaw){ 

	doc=app.activeDocument;
	var comps = doc.layerComps;

	 
 	  
	//only start if the file actually has layer comps
	if(comps.length<1){
		alert("Uh oh! This file has no layer comps!")
	}
	else{

		//needed for copy paste
		var startRulerUnits = app.preferences.rulerUnits;
		app.preferences.rulerUnits = Units.PIXELS; // tell ps to work with pixels
		app.preferences.rulerUnits = startRulerUnits;
		//selectArea(20,10,50,50);

		//pick up the comps and label them
		var comps = doc.layerComps;

		//get the original history level
		var savedState = app.activeDocument.activeHistoryState;

		//label the sprite, take off the extension, add with and height 
		var spriteName = doc.name.split(".")[0]+"_spritesheet_"+doc.width.value+"x"+doc.height.value;


		//make a spritesheet
		 
		var bigSprite = app.documents.add(doc.width, doc.height, 72,spriteName, NewDocumentMode.RGB,DocumentFill.TRANSPARENT);
		

		var tempFiles = [];
		for(var i=0;i<comps.length ;i++){
			app.activeDocument = doc;
			comps[i].apply(); 
		 
			 newDocFromMergedLayers( "temp");  
			var mergedBounds = app.activeDocument.activeLayer.bounds;  
			app.activeDocument.trim( TrimType.TRANSPARENT);  
		
			app.activeDocument.selection.selectAll();
			app.activeDocument.selection.copy();
			app.activeDocument = bigSprite;
			app.activeDocument.paste();

			//offset the yValue of the item by its location in the comp array
			
			//change based off direction
			if(direction=="ud"){

				mergedBounds[1]+=doc.height.value*i;
				app.activeDocument.guides.add(Direction.HORIZONTAL, doc.height.value*i);  

			}else{
				mergedBounds[0]+=doc.width.value*i;
				app.activeDocument.guides.add(Direction.VERTICAL, doc.width.value*i);  
			}


			//fix the offset from pasting
			var pasteXY = {x:app.activeDocument.activeLayer.bounds[0].value,y :app.activeDocument.activeLayer.bounds[1].value};
			app.activeDocument.activeLayer.translate(-pasteXY.x,-pasteXY.y);
			
			//assign original(calculated) values
			app.activeDocument.activeLayer.translate(mergedBounds[0],mergedBounds[1]);

			//close the temp document created
			app.documents[app.documents.length-1].close(SaveOptions.DONOTSAVECHANGES);

			//add a guide for cleanliness
			//merge layers down as you're adding them
			if(i>0){
				app.activeDocument.activeLayer.merge();
			}


			 
		}
		if(direction=="ud"){
			app.activeDocument.guides.add(Direction.HORIZONTAL, doc.height.value*comps.length);  
			app.activeDocument.resizeCanvas(doc.width, doc.height*comps.length,AnchorPosition.TOPLEFT);

		}else{
			app.activeDocument.guides.add(Direction.VERTICAL, doc.width.value*comps.length);  
			app.activeDocument.resizeCanvas(doc.width*comps.length, doc.height,AnchorPosition.TOPLEFT);
		}


		app.activeDocument.activeLayer.name=comps.length+" frames spritesheet";


		
		 

		SavePNG(spriteName+".png");


	}
}
