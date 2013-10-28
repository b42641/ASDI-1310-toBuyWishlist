// David Peterson
// ASDI 1311
// ASDI Project

$(document).ready(function() {

$('#mainPage').on('pageinit', function(){

});	


// addItem		
$('#addItem').on('pageinit', function(){
	//adding so key must be null	
	$("#submit").on('click', storeData);
});
    
    
// ListItems		
$('#listItems').on('pageinit', function(){

	for(var i=0, len=localStorage.length; i<len; i++){
		var key = localStorage.key(i);
		var value = localStorage.getItem(key);
	
		var obj = JSON.parse(value);
		$('#recentItemHeader').after('<li> Item: '+(obj.itemName[1])+ ' - ' + (obj.description[1])+ ' - Order by: '+ (obj.desireDate[1]) + '</li>');
	}
	
});
    
  
function storeData(){
    //if no key then new item needing key
/*    if(!key){
        var id          = Math.floor(Math.random()*100000001);
    }else{
        //set id to the existing key
        id = key;
    } */
    
    //Gather all form field values and store in object
    //Object properties are going to contain an array with form label and input values

    var id          = Math.floor(Math.random()*100000001);
    
    var itemData        = {};
        itemData.itemName       = ["Item Name", $('#itemName').val()];
        itemData.mediaType      = ["Department", $('#department').val()];
        itemData.description    = ["Description", $('#description').val()];
        itemData.desireDate     = ["DesiredDate", $('#desireDate').val()];
        itemData.priority       = ["Search Tags", $('#searchTags').val()];

    //Save Data into local storage: use stringify to convert our object to a string
    localStorage.setItem(id, JSON.stringify(itemData));
    alert("Item Saved!");
}



// end of (document).ready
});
