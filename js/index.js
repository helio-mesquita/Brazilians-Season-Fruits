
const FRUITS = accessFruits().sort((a, b) => (a.name > b.name) ? 1 : -1); //acess the fruits array and sort by alphabetic order

//verify what option is checked an shows the corresponding menu, hidden others
function verifSelection () { 
    var byDate = document.getElementById("byDate");
    var byMonth = document.getElementById("byMonth");
    var byPeriod = document.getElementById("byPeriod");
    var outFruits = document.getElementById("outFruits");
    if(rdDate.checked){
        byDate.className = "show";
        byMonth.className = "noDisplay";
        byPeriod.className = "noDisplay";
        outFruits.className = "noDisplay"
    }
    if(rdMonth.checked){
        byDate.className = "noDisplay";
        byMonth.className = "show";
        byPeriod.className = "noDisplay";
        outFruits.className = "noDisplay"
    }
    if(rdPeriod.checked){
        byDate.className = "noDisplay";
        byMonth.className = "noDisplay";
        byPeriod.className = "show";
        outFruits.className = "noDisplay"
    }
}

//declare the check options and add a event listening on change
var rdDate = document.getElementById("rdDate");
rdDate.addEventListener("change", verifSelection);

var rdMonth = document.getElementById("rdMonth");
rdMonth.addEventListener("change", verifSelection);

var rdPeriod = document.getElementById("rdPeriod");
rdPeriod.addEventListener("change", verifSelection);

//show the fruits list based on the date
function showByDate() {
    var date = inDate.value; //gets the value from date input
    var dateSplit = date.split("-"); //separe day, month and year in an array
    var month = Number(dateSplit[1]) - 1; //select the month and decrease 1 to fit in the base 0 month index
    var fruitSelection = []; // create an array to add fruits corresponding to the month

    //create a repetition lace to verify if each fruit in the const is corresponding to month of the date 
    //create a second lace to compare month selected and the months of the fruit
    for(var i = 0; i < FRUITS.length; i++){
        for(var j = 0; j < FRUITS[i].months.length; j++){
            if(FRUITS[i].months[j] == month){
                fruitSelection.push(FRUITS[i]); //add the corresponding fruits to the new array and break the second lace
                break;
            }
        }
    }
    createFruta(fruitSelection) //calls the function to print the selected fruits in the document
}

var inDate = document.getElementById("inDate")
inDate.addEventListener("change", showByDate);


function showByMonth() {
    var month = inMonth.value; //select the month value
    var fruitSelection = []; //create a new array

    //if the value of the month is "null", do nothing
    if (month == "null"){
        return;
    }
    //create a repetition lace to verify if each fruit in the const is corresponding to month value 
    //create a second lace to compare month selected and the months of the fruit
    for(var i = 0; i < FRUITS.length; i++){
        for(var j = 0; j < FRUITS[i].months.length; j++){
            if(FRUITS[i].months[j] == month){
                fruitSelection.push(FRUITS[i]); //add the corresponding fruits to the new array and break the second lace
                break;
            }
        }
    }
    createFruta(fruitSelection) //calls the function to print the selected fruits in the document       
}

var inMonth = document.getElementById("inMonth");
inMonth.addEventListener("change", showByMonth);

function showByPeriod() {
    var initialMonth = inInitialMonth.value; //get the initial month value of the period
    var finalMonth = inFinalMonth.value; // get the final month value of the period
    var fruitSelection = []; //create a new array

    //if the value of one of the both is "null", do nothin
    if (initialMonth == "null" || finalMonth == "null"){
        return;
    }
    
    //create a repetition lace to verify if each fruit in the const is corresponding to month value 
    //create a second lace to compare months period selected and the months of the fruit
    //add a exception case if the initial month is greater than final month;
    if (initialMonth > finalMonth){ 
        for(var i = 0; i < FRUITS.length; i++){
            for(var j = 0; j < FRUITS[i].months.length; j++){
                if((FRUITS[i].months[j] >= initialMonth && FRUITS[i].months[j] <= 11) || (FRUITS[i].months[j] >= 0 && FRUITS[i].months[j] <= finalMonth )){ //the months period initialize in a year and finishs in the next
                    fruitSelection.push(FRUITS[i]); //add the corresponding fruits to the new array and break the second lace
                    break; 
                }
            }
        }    
    //for cases where the initial month is lower than final month
    } else { 
        for(var i = 0; i < FRUITS.length; i++){
            for(var j = 0; j < FRUITS[i].months.length; j++){
                if(FRUITS[i].months[j] >= initialMonth && FRUITS[i].months[j] <= finalMonth ){
                    fruitSelection.push(FRUITS[i]); //add the corresponding fruits to the new array and break the second lace
                    break;
                }
            }
        }

    }
    createFruta(fruitSelection) //calls the function to print the selected fruits in the document
}

var inInitialMonth = document.getElementById("inInitialMonth");
inInitialMonth.addEventListener("change", showByPeriod)

var inFinalMonth = document.getElementById("inFinalMonth")
inFinalMonth.addEventListener("change", showByPeriod)

function createFruta(fruitsArray) {
    // select and remove old figures in the figure div to clean
    var outFruits = document.getElementById("outFruits");
    var oldFigures = outFruits.getElementsByTagName("figure");
    var oldFiguresLenght = oldFigures.length
    for (var i = oldFiguresLenght - 1; i >= 0; i--){
        outFruits.removeChild(oldFigures[i])
    }
    outFruits.className = "show"; //shows the fruits div
    
    //create a lace for the selected fruits array
    //create the figures with image and caption from the fruits array and append them to the corresponding div
    for (var i = 0; i < fruitsArray.length; i++){
        var figure = document.createElement("figure");
        figure.className = "figure";
        var img = document.createElement("img");
        img.className = "figure-img img-fluid rounded fruitImg";
        img.alt = fruitsArray[i].name;
        img.src = "img/" + fruitsArray[i].name + ".jpg";
        var caption = document.createElement("figcaption");
        caption.className = "figure-caption";
        caption.textContent = fruitsArray[i].caption;
        figure.className = "fruitFigure textCenter"
        figure.appendChild(img);
        figure.appendChild(caption);
        outFruits.appendChild(figure);
    }   
}
