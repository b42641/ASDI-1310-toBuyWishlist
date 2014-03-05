// David Peterson
// ASDI 1311
// ASDI Project

// VARIABLES

	var dataid = new Array();
	var datarev = new Array();
	var dataitemname = new Array();
	var datadepartment = new Array();
	var datadesiredate = new Array();
	var datadescription = new Array();
	var datasearchtags = new Array();
	
	var docCount = 0;

	var currentKey = '';
	var currentCount = '2';
	var maxCount = '';
	var myData = {};
	var docCount = 0;
	var addError = 0;
	

	
	
// MAIN PAGE
$(document).on('pageinit', '#mainPage', function(){
	//CouchDB Code

	getData();

	
});

// LIST ITEMS
$(document).on('pageinit', '#listItems', function(){
	//CouchDB Code
	var myData = {};
	$.couch.db("tobuywishlist").view("app/completetobuywishlist" , {
		success: function(data) {
		
		//MAKE THIS INTO A FUNCTION THAT GETS CALLED EACH TIME
			$.each(data.rows, function(index, items) {
		 		$('#recentItemHeader').append('<li>Item Name: '+ items.value.itemname + '</li>');
			 	$('#recentItemHeader').append('<li>Department: '+ items.value.department +  '</li>');
			 	$('#recentItemHeader').append('<li>Desire Date: '+ items.value.desiredate +  '</li>');
				$('#recentItemHeader').append('<li>Description: '+ items.value.description +  '</li>');
		  		$('#recentItemHeader').append('<li>SearchTag: '+ items.value.searchtags +  '</li>');
		  		$('#recentItemHeader').append('<li> -end of item- </li>');			  
			});
		},
		error: function(data) {
			console.log('error: ' + data);
		}
	});
	
});





// EDIT ITEMS		
$(document).on('pageinit', '#editItems', function(){
	getData();
    // NEXT BUTTON CLICKED
	$('#nextButton').click(function(){
		maxCount = docCount;
		currentCount++;
		if (currentCount > maxCount){currentCount=0
			};
		displayEditData();
	});

    // PREVIOUS BUTTON CLICKED	
	$('#prevButton').click(function(){
		maxCount = docCount;	
		currentCount--;
		if (currentCount < 0){currentCount=maxCount};
		displayEditData();
	});
	    
	// EDIT BUTTON CLICKED  
	$('#editItemButton').click(function() {
		maxCount = docCount;
		displayEditData();
	});

    // DISPLAY ITEM TO THE PAGE
    function displayEditData(){
    	$('#editItemName').val(dataitemname[currentCount]);
    	$('#editDepartment').val(datadepartment[currentCount]);
   		$('#editDescription').val(datadescription[currentCount]);
    	$('#editDesireDate').val(datadesiredate[currentCount]);
    	$('#editTag').val(datasearchtags[currentCount]);
    	//$('#editItems').listview('refresh');
    };
    
    // UPDATE THE ITEM WITH THE NEW INFORMATION 
    $('#updateButton').click(function(){
        //Gather all form field values and store in object
        //Object properties are going to contain an array with form label and input values
    	var updateDoc = {
			_id: dataid[currentCount],
			_rev: datarev[currentCount],
        	itemname: $('#editItemName').val(),
			department: $('#editDepartment').val(),
			description: $('#editDescription').val(),
			desiredate: $('#editDesireDate').val(),
			searchtags: $('#editTag').val()
        }
	
		$.couch.db('tobuywishlist').saveDoc(updateDoc, {
			success: function() {alert('Data has been updated.')},
			error: function() {
				alert('Data has not been updated.')
			}
		});

    }); 
    
    //DELETE THE ITEM
    $('#deleteButton').click(function(){
        //Gather all form field values and store in object
        //Object properties are going to contain an array with form label and input values
		var doc = {
			_id: dataid[currentCount],
			_rev: datarev[currentCount]
		};
		console.log(doc);
		$.couch.db("tobuywishlist").removeDoc(doc, {
			success: function(data) {
				alert('Item successfully deleted.');
			},
			error: function(data) {
				alert('Item NOT deleted.');
			}
			
		});

		getData();
  		$('#nextButton').click();    
    });
});







  
// ADD ITEM PAGE
$(document).on('pageinit', '#addItem', function(){

		//adding so key must be null	
		$("#submit").on('click', addData);
		if(!addError) {$('#reset').click(); };
		getData();
});


function addData(){

	addError=0;    
    //Gather all form field values and store in object
    //Object properties are going to contain an array with form label and input values
	var addDoc = {

//		_id: dataid[currentCount],
//		_rev: datarev[currentCount],
        itemname: $('#itemName').val(),
        department: $('#department').val(),
        description: $('#description').val(),
        desiredate: $('#desireDate').val(),
        searchtags: $('#tag').val()
	};
	
	$.couch.db('tobuywishlist').saveDoc(addDoc, {
		success: function() {alert('Data has been added.')},
		error: function() {
			alert('Data has not been added.')
			addError=1
		}
	});
}
 




function getData(){
	// SET COUNT
	currentCount = 0
	$.couch.db("tobuywishlist").info( {
		success: function(data) {
			// DOCUMENTS BEGIN A 0 AND IT COUNTS APPS AS DOCUMENT SO NEED TO SUBTRACT 2
			docCount = data.doc_count-2;
		},
		error: function(data) {
			console.log('error: ' + data);

		}
	});

	// FILL INDEXES WITH DATA
	$.couch.db("tobuywishlist").view("app/completetobuywishlist" , {
		success: function(data) {
			i=-1;
			$.each(data.rows, function(index, items) {
				i = i+1;
			 		dataid[i] = items.value.id;
			 		datarev[i] = items.value.rev;
			 		dataitemname[i] = items.value.itemname;
			 		datadepartment[i] = items.value.department;
			 		datadesiredate[i] = items.value.desiredate;
			 		datadescription[i] = items.value.description;
			  		datasearchtags[i] = items.value.searchtags;
			  		
			});
		},
		error: function(data) {
			console.log('error: ' + data);
		}
	});	
}



  



