

## Installation

**Win:** `C:\Program Files (x86)\Common Files\Adobe\CEP\extensions`  
**Mac:** `/Library/Application Support/Adobe/CEP/extensions`

or

**Win:** `C:\<username>\AppData\Roaming\Adobe\CEP\extensions`  
**Mac:** `~/Library/Application Support/Adobe/CEP/extensions`

*you may have to create folder if it doesn't already exist*

#### 2. Set PlayerDebugMode to 1

**Win:** `regedit > HKEY_CURRENT_USER/Software/Adobe/CSXS.7`,  
then add a new entry PlayerDebugMode of type "string" with the value of "1".

**Mac:** In the terminal, type: `defaults write com.adobe.CSXS.7 PlayerDebugMode 1`  
(The plist is also located at /Users/USERNAME/Library/Preferences/com.adobe.CSXS.7.plist)

**May require restart or log-out/in**
 
