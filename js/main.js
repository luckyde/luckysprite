/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, window, location, CSInterface, SystemPath, themeManager*/
direction='ud';

(function () {
    'use strict';

    var csInterface = new CSInterface();
    
    
    function init() {
                
        themeManager.init();
                
        $("#btn_test").click(function () {
        	//ignoreLayers
        	var ignoreRaw ="";
         	 
        		
        	

        	var functionCall = "makeSpriteSheet('"+direction+"','"+ignoreRaw+"');"
        
			csInterface.evalScript(functionCall);
        });
         $("#checkV").click(function (e) {
         	direction='ud';
         	 
         });
         $("#checkH").click(function (e) {
         	direction='lr';
         
         	 
         });
       
         $("#getInfo").click(function () {
		  csInterface.evalScript('getInfo()', function(result) {
		
		var props =  result.match(/\d+/g);
		  	infoBox.innerHTML="left: "+props[0]+"px;"+"\n"+"top: " +props[1]+"px;"+"\n"+"width: " +props[2]+"px;"+"\n"+"height: " +props[3]+"px;";
		  });
		 });

         
    }
        
    init();

}());
    
