<<<<<<< HEAD

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onContactsSuccess: function(contacts) {
    	$("#debug").html("Found: " + contacts.length);
    	$("#deviceContacts").empty();
    	var items = [];
    	for (var i = 0; i < contacts.length; i++) {
    		console.log("displayName = '" + contacts[i].displayName + "'");
    		console.log("name.formatted = '" + contacts[i].name.formatted + "'");
    		if (contacts[i].name.formatted) {
    			items.push("<li>" + contacts[i].name.formatted + "</li>");
    		}
    	}
    	$("#deviceContacts").append(items);
    	$("#deviceContacts").listview("refresh");	
	},
	onContactsError: function() {
	   $("#debug").html("error...");
	},
	serializeObject: function() {
=======
$.fn.serializeObject = function() {
>>>>>>> 990d91255227238016150666c4606221902d663b
        var o = {};
        var a = this.serializeArray();
        $.each(a, function() {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
<<<<<<< HEAD
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        //app.receivedEvent('deviceready');
    	
    	console.log("StatusBar: " + StatusBar.isVisible);
    	StatusBar.hide();
    	console.log("StatusBar: " + StatusBar.isVisible);
    	
    	//Register an event listener on the submit action
        $('#reg').submit(function(event) {
            event.preventDefault();

            var memberData = $(this).serializeObject();

            //registerMember(memberData);
            console.log("memberData = '" + memberData + "'");
            console.log("#reg = '" + $(this) + "'");
        });
        
    	$.getJSON("http://10.127.91.38:8080/ETAPP-REST-1/contacts/", function(data) {
    	//$.getJSON("http://10.127.91.38:8080/ETAPP-REST-1/contacts/550803562d0eaa6bea7c31d8", function(data) {
    	    $("#e_contacts_list").empty();
    	    var items = [];
    	    $.each(data, function(key, val) {
    	    //$.each([data], function(key, val) {
    	       //console.log("item: " + key + " " + val.firstName);
    	       items.push("<li><a href='#"+ key + "'>" + val.firstName +" " + val.lastName + "</a></li>");
    	    });
    	    $("#e_contacts_list").append(items);
    	    $("#e_contacts_list").listview("refresh");
    	});
    	//http://10.127.91.38:8080/ETAPP-REST-1/contacts/
    	//http://localhost:8080/mobile-rest/rest/members
    	//http://mobile-html5.rhcloud.com/rest/members
    	//http://192.168.1.156:8080/mobile-rest/rest/members
    	
    	$("#btnDeviceContacts").on("click", function(e) {
    		  console.log("button clicked, going to fetch local contacts");
    		  $("#debug").html("finding...");
    		  var options      = new ContactFindOptions();
    		  options.multiple = true;
    		  var fields       = ["displayName", "name"];
    		  navigator.contacts.find(fields, app.onContactsSuccess, app.onContactsError, options);
    	});
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
    /*
    Attempts to register a new member using a JAX-RS POST.  The callbacks
    the refresh the member table, or process JAX-RS response codes to update
    the validation errors.
     */
    registerMember: function(memberData) {
        //clear existing  msgs
=======
    };
    
var app = {
		
	/*******************************************************************
	 * 
	 * Application Constructor
	 * 
	 *******************************************************************/
    initialize: function() {
        this.bindEvents();
    },
    
    /*******************************************************************
     * 
     * Bind Event Listeners
     * 
     * Bind any events that are required on startup. Common events are:
     * 'load', 'deviceready', 'offline', and 'online'.
     * 
     *******************************************************************/
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
	
	/*******************************************************************
	 * 
	 * deviceready Event Handler
	 * 
	 *******************************************************************/
    onDeviceReady: function() {
    	
    	// Hide Status bar on hardware devices
    	StatusBar.hide();
    	
    	// List object used across contacts list & details pages 
    	var listObject = {
    		id				: null,
    	    firstName		: null,
    	    lastName		: null,
    	    city			: null,
    	    state			: null,
    	    email			: null,
    	    contactPhone	: null
    	}
		
    	// Load contact details from listObject data
    	$(document).on('pagebeforeshow', '#contact_details_page', function(){       
    		console.log("Just hit the contact_details_page");
    	    
    		var page = $("#contact_details_page");
    		page.find('img').attr('src', 'img/mugshots/' + listObject.id + '.jpg');
    		page.find( "span[name='firstName']" ).html(listObject.firstName);
    		page.find( "span[name='lastName']" ).html(listObject.lastName);
    		page.find( "span[name='city']" ).html(listObject.city);
    		page.find( "span[name='state']" ).html(listObject.state);
    		page.find( "span[name='email']" ).html(listObject.email);
    		page.find( "span[name='contactPhone']" ).html(listObject.contactPhone);
    		
    	});
    	
    	// Load Contacts Listview
    	// Load listObject from Listview-->Hidden Form
    	// When a contact list item is clicked on, load contact details page
    	$(document).on('pagebeforeshow', '#enterprise_contacts_list_page', function(){
    		
    		console.log("entering #enterprise_contacts_list_page");
    		
    		app.getContacts();
    		
    	    $('#enterprise_contacts_listview li a').each(function(){
    	        var elementID = $(this).attr('id');      
    	        var hForm = $("#" +elementID + "HiddenForm");
    	        
    	        $(document).on('click', '#'+elementID, function(event){  
    	            if(event.handled !== true) // This will prevent event triggering more then once
    	            {
    	                listObject.itemID = elementID;
    	                
    	                listObject.id = hForm.find( "input[name='id']" ).val();
    	                listObject.firstName = hForm.find( "input[name='firstName']" ).val();
    	                listObject.lastName = hForm.find( "input[name='lastName']" ).val();
    	                listObject.city = hForm.find( "input[name='city']" ).val(); 
    	                listObject.state = hForm.find( "input[name='state']" ).val(); 
    	                listObject.email = hForm.find( "input[name='email']" ).val();
    	                listObject.contactPhone = hForm.find( "input[name='contactPhone']" ).val(); 
    	                
    	                $.mobile.changePage( "#contact_details_page", { transition: "slide"} );
    	                event.handled = true;
    	            }              
    	        });
    	    });
    	    
    	}); 
    	
    	
    	//Register an event listener on the postForm submit action
        $('#postForm').submit(function(event) {
        	event.preventDefault();

            var contactForm = $(this).serializeObject();
            //console.log("contactForm = '" + contactForm + "'");
             
        	app.postContact(contactForm);
        });
        
        // Preload all contacts so they're immediately available when
        // the user navigates to the contacts list view page
        app.getContacts();
    },
    
    
    /*******************************************************************
     * 
     * Get Enterprise Contacts
     * 
     * Calls GET operation to collect all contacts from REST backend
     * and loads them into a listview.
     * 
     *******************************************************************/
    getContacts: function() {
    	
    	// Get ENTERPRISE Contacts
    	$.getJSON("http://10.126.87.99:8080/ETAPP-REST-1/contacts", function(contacts) {
    	    $("#enterprise_contacts_listview").empty();
    	    var items = [];
    	    var contactItem = "";
    	    var contactImage = "";
    	    var contactForm = null;
    	    
    	    $.each(contacts, function(index, contact) {
    	       //console.log("item: " + index + " " + contact.firstName + " city: " + contact.city);
    	       
    	    	// Hidden Contact Form
    	       contactForm = '<form id="' + contact.id + 'HiddenForm" data-ajax="false">';
    	       $.each(contact, function(field, value) {
    	    	   contactForm += '<input type="hidden" name="' + field + '" value="' + value + '"/>';
    	    	   //console.log("field = '" + field + "' value = '" + value + "'");
    	       });
    	       contactForm += '</form>';
    	       
    	       // Contact Image
    	       contactImage = '<img id="mugshot" src="img/mugshots/' + contact.id + '.jpg" alt="CSS"/>';
    	   
    	       // Contact List Item: link, image, name & hidden form
    	       contactItem = '<li>';
    	       contactItem += '<a href="#" id="' + contact.id + '">';
    	       contactItem += contactImage + contact.firstName + '<br/>' + contact.lastName + contactForm;
    	       contactItem += '</a>';
    	       contactItem += '</li>'; 
    	       items.push(contactItem);
    	    
    	       //console.log("contactItem = '" + contactItem + "'"); 
    	    
    	    });
    	    items.push('<li data-role="list-divider">List Divider</li>');
    	    $("#enterprise_contacts_listview").append(items);
    	    $("#enterprise_contacts_listview").listview("refresh");
    	});
    },
    
    /*******************************************************************
     * 
     * Calls POST operation to add new contact to REST backend.
     * The callbacks refresh the contact listview, or process JAX-RS
     * response codes to update the validation errors.
     * 
     *******************************************************************/
    postContact: function(contactForm) {
        
    	//clear existing  msgs
>>>>>>> 990d91255227238016150666c4606221902d663b
        $('span.invalid').remove();
        $('span.success').remove();

        // Display the loader widget
<<<<<<< HEAD
        //$.mobile.loading("show");

        $.ajax({
            url: 'http://10.127.91.38:8080/ETAPP-REST-1/contacts',
            contentType: "application/json",
            dataType: "json",
            type: "POST",
            data: JSON.stringify(memberData),
            success: function(data) {
                console.log("Member registered");

                //clear input fields
                $('#reg')[0].reset();

                //mark success on the registration form
                $('#formMsgs').append($('<span class="success">Member Registered</span>'));

                updateMemberTable();
=======
        $.mobile.loading("show");

        // Convert Form Data to JSON object
        var contactData = JSON.stringify(contactForm);
    	
        $.ajax({
            url: 'http://10.126.87.99:8080/ETAPP-REST-1/contacts',
            contentType: 'application/json',
            dataType: 'text',
            type: 'post',
            async: 'true',
            data:  contactData,
            
            success: function(data) {
                console.log("Contact Added");

                //clear input fields
                $('#postForm')[0].reset();
 
                //mark success on the registration form
                $('#formMsgs').append($('<span class="success">Contact Added</span>'));

                app.getContacts();
                $.mobile.changePage( "#enterprise_contacts_list_page", { transition: "slide"} );
>>>>>>> 990d91255227238016150666c4606221902d663b
            },
            error: function(error) {
                if ((error.status == 409) || (error.status == 400)) {
                    //console.log("Validation error registering user!");

                    var errorMsg = $.parseJSON(error.responseText);

                    $.each(errorMsg, function(index, val) {
                        $('<span class="invalid">' + val + '</span>').insertAfter($('#' + index));
                    });
                } else {
<<<<<<< HEAD
                    //console.log("error - unknown server issue");
                    $('#formMsgs').append($('<span class="invalid">Unknown server error</span>'));
=======
                    //console.log("error: " + error.responseText + " - unknown server issue");
                    console.log("error: " + error.status + " - unknown server issue");
                    
                    $('#formMsgs').append($('<span class="invalid">'+ error.responseText + '</span>'));
>>>>>>> 990d91255227238016150666c4606221902d663b
                }
            },
            complete: function() {
                // Hide the loader widget
                $.mobile.loading("hide");
            }
<<<<<<< HEAD
=======
            
>>>>>>> 990d91255227238016150666c4606221902d663b
        });
    }
};

<<<<<<< HEAD
app.initialize();
=======
/*******************************************************************
 * 
 * BOOTSTRAP
 * 
 *******************************************************************/
//app.initialize();
>>>>>>> 990d91255227238016150666c4606221902d663b
