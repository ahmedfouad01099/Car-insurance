// Variables 

const form = document.getElementById('request-quote');
const html = new HTMLUI();







//Even listeners
eventListeners();

function eventListeners(){
    document.addEventListener('DOMContentLoaded', function() {
        // create the <option> for the years
        
        html.displayYears();
    })
    
    // when the form is submitted
    form.addEventListener('submit', function(e){
        e.preventDefault();

        // Read the values from the buttons
        const make = document.getElementById('make').value; 
        const year = document.getElementById('year').value;

        //Read the radio button
        const level = document.querySelector('input[name=\'level\']:checked').value;

        //check that all the fields have something
        if (make === '' || year === '' || level === '') {
            html.displayError('All the filed doesn\'t full');
        }else {
            // Clear the previous qoutes
            const prevResult = document.querySelector('#result div');
            if(prevResult != null){
                prevResult.remove();
            }

            // make the quotation 
            // if all inputs in the form filled then we create insurance object
            const insurance = new Insurance(make, year, level);
            const price = insurance.calculateQutation(insurance);
        
            //print the result in HTMLUI
            html.showResults(price, year, make, level);
        }

        

    })
}



// Objects functions

// Every thing related with qutation and calculations is insurance
function Insurance(make, year, level) {
    this.make = make;
    this.year = year;
    this.level = level; 
}
// calculate the price for the current quotation
Insurance.prototype.calculateQutation = function(insurance){
    let price;
    const base = 2000;
    
    //get the make
    const make = insurance.make;
    /*
        1 = American 1.15
        2 = Asian 1.05
        3 = European 1.35
    */
   switch(make) {
       case '1' :
           price = base * 1.15;
           break;  
        case '2' :
           price = base * 1.05;
           break;
        case '3' :
           price = base * 1.15;
           break;              
   }

   // Get the year
    const year = insurance.year;

   // Get the years difference 

   const difference = this.getYearDiference(year); 

   // Each year the cost of the insurance is going to be 3% cheaper
   price = price - ((difference * 3) * price) / 100;

   // Check the level of protection
   const level = insurance.level;

   price = this.calculateLevel(price, level);

   return price;
}  
Insurance.prototype.getYearDiference = function(year) {
    return new Date().getFullYear() - year;
}

// Add the value based on the level of protection
Insurance.prototype.calculateLevel = function(price, level){
    /*
        Basic insurance is going to increse the value by 30%
        Complete insurance is going to increse the value by 50%
     */
    if(level === 'basic'){
        price = price * 1.30;
    } else {
        price = price * 1.50;
    }
return price;
}

// Every thing related with HTML
function HTMLUI() {}

// Displays the leatest 20 years in the select

HTMLUI.prototype.displayYears = function() {
    // max & min years
    const max = new Date().getFullYear(),
          min = max - 20;

          //Generate the list with the latest 20 years
        const selectYear = document.getElementById('year');
        
        // Print the values
        for(let i = max; i > min; i--){
            let option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            selectYear.appendChild(option);
        }

}
HTMLUI.prototype.displayError = function(message) {
    // craete a div 
    const div = document.createElement('div');
    div.classList = 'error';
    div.innerHTML = `
        <p>${message}</p>
    `;

    form.insertBefore(div, document.querySelector('.form-group'));

    //remove the error message
    setTimeout(function(){
        div.style.display = 'none';
    }, 2000)
}
// Print the result into HTML
HTMLUI.prototype.showResults = function(price, year, make, level){

    // create a div to append price to it

    const div = document.createElement('div');

    div.innerHTML = `
        <p class='total'>Price: $${price} </p>
        <p class='total'>Make: ${make} </p>
        <p class='total'>year: ${year} </p>
        <p class='total'>Level: ${level} </p>
    
    `
     const spinner = document.querySelector('#loading img');
     spinner.style.display = 'block';

     setTimeout(function(){
         spinner.style.display = 'none';
        result.appendChild(div);

     },3000)
    const result = document.getElementById('result');

} 







