// David Peterson
// ASDI 1310
// ASDI Project

$(document).ready(function() {

$('#mainPage').on('pageinit', function(){
	//code needed for home page goes here
	console.log("here in mainPage");
});	


// addItem		
$('#addItem').on('pageinit', function(){
		console.log("here in addItem");
	//any other code needed for addItem page goes here
	
	var submit = $("#submit");
	submit.on('click', storeData);

	
});
    
    function storeData(key){
    	console.log("here in storeData");
        //if no key then new item needing key
        if(!key){
        	console.log("This");
            var id          = Math.floor(Math.random()*100000001);
        }else{
            //set id to the existing key
            id = key;
            console.log("That");
        }
        
        //Gather all form field values and store in object
        //Object properties are going to contain an array with form label and input values
     	alert("here in 2 storeData");      
        var itemData        = {};
            item.itemName       = ["Item Name", $('#itemName').value];
            item.mediaType      = ["Department", $('#department').value];
            item.description    = ["Description", $('#description').value];
            item.desireDate     = ["DesiredDate", $('#desireDate').value];
            item.priority       = ["Search Tags", $('#searchTags').value];
			alert(itemData);
        //Save Data into local storage: use stringify to convert our object to a string
        localStorage.setItem(id, JSON.stringify(itemData));
        alert("Item Saved!");
	}

});