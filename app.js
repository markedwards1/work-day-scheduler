
// when i visit this page

// see time and date in header
function timeDate(){
    setInterval(function(){
        const now = moment().format("YYYY-MM-DD HH:MM:ss");
        $('#currentDay').text(now)
    }, 1000);
    
}

function createTimeRow(hour){
    
    
    
    
    //  <div class="row">
    // <!-- time column -->
    // <div class="time-column col-2">9:00</div>
    // <!-- textarea column -->
    // <div class="text-area-column col-8"><textarea name="" id="" cols="30" rows="4"></textarea></div>
    // <!-- save button column -->
    // <div class="button-column col-2"><button class="btn btn-save"></button>save</div>
    // </div> 
    
    const newRow = $("<div>");

    // check what time it is

    const presentTime = Number(moment().format("H"));


    // if time block is in the future -- give it a future class
    const isPresent = hour === presentTime;
    const isPast = hour < presentTime;
    const isFuture = hour > presentTime;
    // if time block is in the past -- give it a past class
    // if time block is in the present -- give it a present class
    


    let rowClass = 'row'

    if(isPast){
        rowClass = rowClass + ' past';
    }if(isPresent){
        rowClass = rowClass + ' present';
    }if(isFuture){
        rowClass = rowClass + ' future';
    }

    newRow.attr('class', rowClass);

    const timeColumn = $("<div>");
    timeColumn.attr('class', 'time-column col-2');
    timeColumn.text(hour + ":00")
    
    const textAreaColumn = $("<div>");
    textAreaColumn.attr('class', 'text-area-coulmn col-8');
    const textarea = $("<textarea>");
    textAreaColumn.append(textarea);

    const existingtext = localStorage.getItem(hour);
    textarea.val(existingtext);

    const buttonColumn = $("<div>");
    buttonColumn.attr("button-column col-2");
    const saveButton = $('<button>');
    saveButton.attr("class", "btn saveBtn save-btn")
    saveButton.text('Save');

    buttonColumn.append(saveButton);

    newRow.append(timeColumn, textAreaColumn, buttonColumn);

    return newRow;
    
}




$(function(){
    
    timeDate();
    
    const timeRowContainer = $(".container");
    // i should see 9am to 5pm timeblock
    // time block with existing details from local storage
    for (let hour = 9; hour < 18; hour++) {
        
        const timeRow = createTimeRow(hour);
        timeRowContainer.append(timeRow);
        
    }
    
    
});


$(document).on('click', '.save-btn', function(event){
    

    // when users clicks on save button on a timeblock
    const buttonClicked = $(event.target);

    const textarea = buttonClicked.parent().prev().children();
    const timeColumn = buttonClicked.parent().prev().prev();
    
    const time = timeColumn.text()
    console.log(time);

    const hour = time.slice(0, -3);

    console.log(hour);
    console.log(textarea);
    
    // grab user imput

    const textAreaInput = textarea.val();

    console.log(textAreaInput);
    
    // save to local storage
    // key should be hour


    localStorage.setItem(hour, textAreaInput);
})




