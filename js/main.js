

function getContactRow(contact) {
   var status = "<td><div class='status " + contact.status + "'></div></td>";
   var name = "<td class='no_border_left'><span class='name white_text'>" + contact.name + "</span></td>";
   var contactCol = "<td class='details_short_cell border_left'><span class='details_short' contact_id='" + contact.id + "'>" + contact.email + "</span></td>";
   return status + name + contactCol;
  
}
 
function createTable(contacts) {
    if(contacts !== null && contacts.length > 0) {
        self.contactsTable = document.getElementById('contacts_table');
        contacts.forEach((contact, index) => {
            var row = self.contactsTable.insertRow(index);
            if(index % 2 == 0) { // <IE8 
                row.classList.add("even");
            }

            row.classList.add("contact_row");
            row.setAttribute('id', contact.id);
            row.innerHTML= getContactRow(contact);
            row.addEventListener('click', function (event) {
                removeFocus();
                focusContact(row, contact);
                self.selectedRow = row;
                self.selectedContact = contact;
            });
        });
    } else {
        //no contacts
    }

}

// handle resize event to place absolute positioned details
function resizeDetails() {
  var self = this;
  if(self.selectedRow && self.selectedContact) {
    focusContact(self.selectedRow, self.selectedContact);
  }
}

function focusContact(row, contact) {
    var rowPosition = row.getBoundingClientRect();

    // Get last cell in row
    var detailsColPosition = row.lastChild.getBoundingClientRect();
    var details = document.getElementById('details');
    row.classList.add('selected');
    details.style.top = rowPosition.top;
    details.style.left = detailsColPosition.left+4; 
    details.style.display = 'block';

    document.getElementById('focused_status').className = "status " + contact.status;
    document.getElementById('focused_email').innerHTML = contact.email;
    document.getElementById('focused_email').href = contact.email;

    document.getElementById('focused_name').innerHTML = contact.name;
    document.getElementById('focused_phone').innerHTML = contact.phone;
    document.getElementById('focused_street').innerHTML = contact.address.street;
    var address = [contact.address.city,contact.address.state,contact.address.zip];
    document.getElementById('focused_address').innerHTML = address.join(' ');
}

function removeFocus() {
    var self = this;
    if(self.selectedRow) {
        self.selectedRow.classList.remove('selected');
    }
}

window.onload = function() {
   var self = this;
   self.contacts = fetchContacts();
   self.contacts.sort((a, b) => {
        if(a.name < b.name) { return -1; }
        if(a.name > b.name) { return 1; }
        return 0;
    });

    // Set up dropdown listener
    self.mDropDown = document.getElementById('drop_down');
    self.mDropDown.addEventListener('change', function() {
        var contactEmailPhoneCols = document.getElementsByClassName('details_short');
        for (var i = 0; i < contactEmailPhoneCols.length; i++) {
            var contactId = contactEmailPhoneCols[i].getAttribute('contact_id');
            var newValue = "";
    
            // find contact by contact id and change current value.
            var curContact = self.contacts.find(contact => contact.id == contactId);
            newValue = this.value == "phone" ? curContact.phone.split('.').join('-') : curContact.email;
            contactEmailPhoneCols[i].innerHTML = newValue;
        }
    }, false);

    //Create Table
    createTable(self.contacts);

    // Set up resize handler
    window.addEventListener("resize", resizeDetails);

    // Handle outside click
    window.addEventListener('click', function (event) { 
        if(event.target.id == 'body') {
            document.getElementById('details').style.display = 'none';
            removeFocus();
        }
    });
}


function fetchContacts() {
    var contacts =  [ 
            {   
                "id" : 1,
                "name" : "Jacques",
                "status": "away",
                "phone": "555.555.5551",
                "email": "jacques@mailinator.com",
                "address": {
                    "city": "Culver City",
                    "state": "CA",
                    "street": "6512 E 8th",
                    "zip": "90234"
                }
            },
            {
                "id": 2,
                "name" : "Patrick",
                "status": "away",
                "phone": "555.555.5552",
                "email": "patrick@mailinator.com",
                "address": {
                    "city": "Culver City",
                    "state": "CA",
                    "street": "6513 E 8th",
                    "zip": "90234"
                }
            },
            {
                "id": 3,
                "name" : "Tim",
                "status": "away_more",
                "phone": "555.555.5553",
                "email": "tim@mailinator.com",
                "address": {
                    "city": "Culver City",
                    "state": "CA",
                    "street": "6514 E 8th",
                    "zip": "90234"
                }
            },
            {
                "id": 4,
                "name" : "Taka",
                "status": "offline",
                "phone": "555.555.5554",
                "email": "taka@mailinator.com",
                "address": {
                    "city": "Culver City",
                    "state": "CA",
                    "street": "6515 E 8th",
                    "zip": "90234"
                }
            },
            {
                "id": 5,
                "name" : "Danny",
                "status": "online",
                "phone": "555.555.5555",
                "email": "danny@mailinator.com",
                "address": {
                    "city": "Culver City",
                    "state": "CA",
                    "street": "6516 E 8th",
                    "zip": "90234"
                }
            },
            {
                "id": 6,
                "name" : "Scott",
                "status": "online",
                "phone": "555.555.5556",
                "email": "scott@mailinator.com",
                "address": {
                    "city": "Culver City",
                    "state": "CA",
                    "street": "6517 E 8th",
                    "zip": "90234"
                }
            },
            {
                "id": 7,
                "name" : "Rich",
                "status": "away",
                "phone": "555.555.5557",
                "email": "rich@mailinator.com",
                "address": {
                    "city": "Culver City",
                    "state": "CA",
                    "street": "6518 E 8th",
                    "zip": "90234"
                }
            },
            {
                "id": 8,
                "name" : "Christian",
                "status": "offline",
                "phone": "555.555.5558",
                "email": "christian@mailinator.com",
                "address": {
                    "city": "Culver City",
                    "state": "CA",
                    "street": "6519 E 8th",
                    "zip": "90234"
                }
            }
        ];
    return contacts; 
}

