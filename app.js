
// moment time function
function timeDate(){
    setInterval(function(){
        const now = moment().format("DD-MM-YYYY HH:MM");
        $('#currentDay').text(now)
    }, 1000);
    
}

// function to create the rows
function createTimeRow(hour){
        
    //variable to create a new div
    const newRow = $("<div>");

    // variable to check what time it is

    const presentTime = Number(moment().format("H"));


    // variable to create a class to change colours
    const isPresent = hour === presentTime;
    const isPast = hour < presentTime;
    const isFuture = hour > presentTime;
   
   // variable for row 
    let rowClass = 'row hour'
//if statments to create class to add to variable rowClass
    if(isPast){
        rowClass = rowClass + ' past';
    }if(isPresent){
        rowClass = rowClass + ' present';
    }if(isFuture){
        rowClass = rowClass + ' future';
    }
//add rowClass to new row with set attribute function
    newRow.attr('class', rowClass);

    const timeColumn = $("<div>");// creates column for time
    timeColumn.attr('class', 'time-column col-2 hour'); // sets classes for time column
    timeColumn.text(hour + ":00") // displays text to time column
    
    const textAreaColumn = $("<div>"); // creates div for text area
    textAreaColumn.attr('class', 'text-area-coulmn col-8 textarea  '); // applies attributes to textAreaColumn
    const textarea = $("<textarea>"); //creates textarea tag
    textAreaColumn.append(textarea); //appends textarea tag to text area column div

    const existingtext = localStorage.getItem(hour); //gets text using the hour as a key from local storage
    textarea.val(existingtext); // displays previous text

    const buttonColumn = $("<div>"); // creates button column div
    buttonColumn.attr("button-column col-2 btn save-btn"); // sets attribute classes to button column
    const saveButton = $('<button>'); // creates button tag to button column tag
    saveButton.attr("class", "btn save-btn ") // sets class attributes to saveButton tag
    saveButton.text('Save'); //adds text 'save' to button 

    buttonColumn.append(saveButton); // appends saveButton tag to buttonColumn div

    newRow.append(timeColumn, textAreaColumn, buttonColumn); // apends time, text area, and button column

    return newRow; // returns new row
    
}



//function that creates the rows with a for loop using hour
$(function(){
    
    timeDate();
    //variable to target container
    const timeRowContainer = $(".container");
    //for loop create 9 to 5 hours
    for (let hour = 9; hour < 18; hour++) {
    // variable to create time rows   
        const timeRow = createTimeRow(hour);
        // appends timerow to timeRowContainer
        timeRowContainer.append(timeRow);
        
    }
    
    
});

// event listener and function to save text to local storage using hour as the key
$(document).on('click', '.save-btn', function(event){
    

    // Targets event when button is clicked
    const buttonClicked = $(event.target);
    // variables to traverse the Dom to to get the text area and time
    const textarea = buttonClicked.parent().prev().children();
    const timeColumn = buttonClicked.parent().prev().prev();
    const time = timeColumn.text()
    
    // slice is used to remove the last 3 characters for the use of key
    const hour = time.slice(0, -3);
    
    // grabs the text from the text area
    const textAreaInput = textarea.val();
    // stores the text area using the key 'hour' and the textAreaInput 'value
    localStorage.setItem(hour, textAreaInput);
})




