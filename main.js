// David Peterson
// ASDI 1311
// ASDI Project

$(document).ready(function() {

/*
//FROM VIDEO
$(document).on('pageinit', '#home', function(){
	//CouchDB Code
	$.couch.db("tobuywishlist").?????view(??????
});
*/

var currentKey = '';
var currentCount = '2';
var maxCount = '';
$('#mainPage').on('pageinit', function(){

});	


// ADD ITEMS		
$('#addItem').on('pageinit', function(){
		//adding so key must be null	
		$("#submit").on('click', storeData);
});
    
    
// LIST ITEMS		
$('#listItems').on('pageinit', function(){

	for(var i=0, len=localStorage.length; i<len; i++){
		var key = localStorage.key(i);
		var value = localStorage.getItem(key);
	
		var obj = JSON.parse(value);
		$('#recentItemHeader').after('<li><a href="#editItems" id=key class="testClick"> Item: '+(obj.itemName[1])+ ' - ' + (obj.description[1])+ ' - Order by: '+ (obj.desireDate[1]) +  '</li>');
	}
	
});

// LIST ITEMS IN VARIOUS FORMATS
$('#assignmentPage').on('pageinit', function(){
	var jsonData = '';
    // JSON FILE READ AND CONSOLE LOG
    $('#jsonButton').click(function(){
        $.ajax({
            url         : "_view/completetobuywishlist",
            type        : "GET",
            dataType    : "json",
            success     : function(data, status) {
				var serializedItem = JSON.stringify(data);
                //console.log('serialized item: ' + serializedItem);

			 	$.each(data.rows, function(index, items) {
			 		$('#jsonHeader').append('<li>Item: '+ items.value.itemname +  '</li>');
			 		$('#jsonHeader').append('<li>Department: '+ items.value.department +  '</li>');
			 		$('#jsonHeader').append('<li>Desire Date: '+ items.value.desiredate +  '</li>');
			 		$('#jsonHeader').append('<li>Description: '+ items.value.description +  '</li>');
			  		$('#jsonHeader').append('<li>SearchTag: '+ items.value.searchtags +  '</li>');
			  	});

            },
            error       : function(error, parseerror){
                console.log(error,parseerror);
            }   
        });    


	});

/*    
    // XML FILE READ AND CONSOLE LOG
     $('#xmlButton').click(function(){
        //alert('xml clicked');
    	var xmlData = '';

        $.ajax({
        	url         :"xhr/data.xml",
			type        : "GET",
			dataType    : "xml",
			success     :  function (data, status) {
            	console.log(data, status);
            	xmlData = data;
				var items = $(xmlData);
				items.find("item").each(function(){
				var item = $(this);
				
				$('#xmlHeader').append('<li>Item Name: '+ item.find("itemName").text() +  '</li>');
				$('#xmlHeader').append('<li>Department: '+ item.find("department").text() +  '</li>');
				$('#xmlHeader').append('<li>Desire Date: '+ item.find("desireDate").text() +  '</li>');
				$('#xmlHeader').append('<li>Description: '+ item.find("description").text() +  '</li>');
				$('#xmlHeader').append('<li>Search Tags: '+ item.find("searchTags").text() +  '</li>');			
			    });
			
			},
        	error       : function (data, status) {
            	console.log(data, status);
			}
    


		});  
   
    });
        
*/


                
});
          
        


    

    
    
    
/*	for(var i=0, len=localStorage.length; i<len; i++){
		var key = localStorage.key(i);
		var value = localStorage.getItem(key);
	
		var obj = JSON.parse(value);
		$('#recentItemHeader').after('<li><a href="#editItems" id=key class="testClick"> Item: '+(obj.itemName[1])+ ' - ' + (obj.description[1])+ ' - Order by: '+ (obj.desireDate[1]) +  '</li>');
	}
*/	




// EDIT ITEMS		
$('#editItems').on('pageinit', function(){

    // NEXT BUTTON CLICKED
	$('#nextButton').click(function(){
		maxCount = localStorage.length;
		currentCount++;
		if (currentCount > maxCount){currentCount=1
			};
		displayEditData();
	});

    // PREVIOUS BUTTON CLICKED	
	$('#prevButton').click(function(){
		maxCount = localStorage.length;	
		currentCount--;
		if (currentCount < 1){currentCount=localStorage.length};
		displayEditData();
	});
	    
	// EDIT BUTTON CLICKED  
	$('#editItemButton').click(function() {
		maxCount = localStorage.length;
		displayEditData();
	});

    // DISPLAY ITEM TO THE PAGE
    function displayEditData(){
     	//for(var i=0, len=localStorage.length; i<len; i++){
    		console.log('current count:' + currentCount + 'current key:' + currentKey);
    		currentKey = localStorage.key(currentCount-1);
    		
    		var value = localStorage.getItem(currentKey);
    		var obj = JSON.parse(value);
    		
    		$('#editItemName').val(obj.itemName[1]);
    		$('#editDepartment').val(obj.department[1]);
    		$('#editDescription').val(obj.description[1]);
    		$('#editDesireDate').val(obj.desireDate[1]);
    		$('priority').val(obj.priority[1]);
    }
    
    // UPDATE THE ITEM WITH THE NEW INFORMATION 
    $('#updateButton').click(function(){
        //Gather all form field values and store in object
        //Object properties are going to contain an array with form label and input values
    
        var id          = currentKey;
        
        var itemData        = {};
            itemData.itemName       = ["Item Name", $('#editItemName').val()];
            itemData.department     = ["Department", $('#editDepartment').val()];
            itemData.description    = ["Description", $('#editDescription').val()];
            itemData.desireDate     = ["DesiredDate", $('#editDesireDate').val()];
            itemData.priority       = ["Search Tags", $('#editSearchTags').val()];
    	alert(itemData.department);
        //Save Data into local storage: use stringify to convert our object to a string
        localStorage.setItem(id, JSON.stringify(itemData));
        alert("Item Updated!");
    }); 
    
    //DELETE THE ITEM
    $('#deleteButton').click(function(){
        //Gather all form field values and store in object
        //Object properties are going to contain an array with form label and input values
    
        var id          = currentKey;
        var ask = confirm("Are you sure you want to delete " + editItemName);
        if(ask){
    		localStorage.removeItem(currentKey);
    		$('#nextButton').click();
    	}else{
    		alert("Item was not deleted.")
        }
    
    });
});
  
// STORE DATA IN LOCAL STORAGE  
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
        itemData.department      = ["Department", $('#department').val()];
        itemData.description    = ["Description", $('#description').val()];
        itemData.desireDate     = ["DesiredDate", $('#desireDate').val()];
        itemData.priority       = ["Search Tags", $('#searchTags').val()];

    //Save Data into local storage: use stringify to convert our object to a string
    localStorage.setItem(id, JSON.stringify(itemData));
    alert("Item Saved!");
}



// end of (document).ready
});
