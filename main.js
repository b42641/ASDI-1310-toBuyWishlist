// David Peterson
// ASDI 1310
// ASDI Project


$('#mainPage').on('pageinit', function(){
	//code needed for home page goes here
	alert("here");
});	


// addItem		
$('#addItem').on('pageinit', function(){
	
	//any other code needed for addItem page goes here
	
});

*/
    
    
    
    
    function storeData(key){
        //if no key then new item needing key
        if(!key){
            var id          = Math.floor(Math.random()*100000001);
        }else{
            //set id to the existing key
            id = key;
        }
        //Gather all form field values and store in object
        //Object properties are going to contain an array with form label and input values
        getChkItems();
        var item        = {};
            item.itemName       = ["Item Name", eLement('itemName').value];
            item.mediaType      = ["Department", eLement('department').value];
            item.description    = ["Description", eLement('description').value];
            item.desireDate     = ["DesiredDate", eLement('desireDate').value];
            item.priority       = ["Search Tags", eLement('searchTags').value];

        //Save Data into local storage: use stringify to convert our object to a string
        localStorage.setItem(id, JSON.stringify(item));
        alert("Item Saved!");
    }