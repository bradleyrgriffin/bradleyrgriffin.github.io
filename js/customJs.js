
"use strict";

/*
This JS creates and utilizes a genetic algorithm centered around the Knapsack problem.
*/

//Global Constraints
//========================
//Adjust these below Constants to alter the code. I will probably turn these into selection boxes later on.
//=========================
var MAX_NUM_GENERATIONS = 10000;
var MAX_NUM_POPULATION_MEMBERS = 30;

var MUTATE_PERCENTAGE = .69; //Better off to leave this as is, changing it even a small amount drastically affects the algorithm
var MIN = 2;
var MAX = 10;
var KNAPSACK_SIZE = (MIN * MIN * MIN) * MAX_NUM_POPULATION_MEMBERS; //Volume in the Knapsack, To keep everything within normal realms, keep this at a minimum, 3 times the size of MAX
var minRot = 1;
var maxRot = 4;


//Global Vars
var numGenerations;
var numPopMembers;
var TotalClicks = 0;

//Clicked after page has loaded and another run of the script happens. Will update constants to new values if needed.
function changeValues(){
      MAX_NUM_POPULATION_MEMBERS = $('#popSize').find(":selected").val();
      MUTATE_PERCENTAGE = $('#mutatePercentage').find(":selected").val();
      KNAPSACK_SIZE = (MIN * MIN * MIN) * MAX_NUM_POPULATION_MEMBERS
      main();
}


function main(){
      numGenerations = 0;
      numPopMembers = 0;
      TotalClicks = 0;

      var initPop = createInitialPopulation();
      var chartArray = [];
      chartArray.push(['Generation', 'Fitness']);

      var nextGenPop = [];

      //Stores the CSV data
      var csvForExcel = "";

      //More Efficient than individual pushing
      var appendAllAtOnce = "";


      for (var g = 0; g < MAX_NUM_GENERATIONS; g++){
            var sortedPop = [];
            var knapsackFilled = KNAPSACK_SIZE;
            var numInSack = 0;

            if(g == 0){
                  sortedPop = sortPop(initPop);
                  nextGenPop = [];
                  nextGenPop = nextGen(sortedPop);
            }else{
                  sortedPop = sortPop(nextGenPop);
                  nextGenPop = [];
                  nextGenPop = nextGen(sortedPop);
            }

            //For calculating Data for both the screen and CSV
            var bdyText = "";
            var sumGenFitness = 0;
            var sumtotVol = 0;
            var numCubes = 0;
            var numPyramids = 0;
            for (var j = 0; j < nextGenPop.length; j++){
                  sumGenFitness += nextGenPop[j].fitnessScore;
                  sumtotVol += nextGenPop[j].volume;

                  if (nextGenPop[j].type == "Cube"){
                        numCubes += 1;
                  }else if(nextGenPop[j].type == "Pyramid"){
                        numPyramids +=1;
                  }
            }

            for (var z = 0; z < nextGenPop.length; z++){
                  if((nextGenPop[z].volume + nextGenPop[z].wastedSpace) < knapsackFilled){
                        knapsackFilled = knapsackFilled - (nextGenPop[z].volume + nextGenPop[z].wastedSpace);
                        numInSack++;
                  }
            }

            bdyText += "<div>" +
                        "<h4><b>Generation: " + g + "</b></h4>"+
                        "<ul><li>Fitness Score of Generation: " + sumGenFitness +
                        "</li><li>Total Volume of Generation: " + sumtotVol +
                        "</li><li>Cubes in Generation: " + numCubes +
                        "</li><li>Pyramids in Generation: " + numPyramids +
                        "</li><li>Objects in Knapsack: " + numInSack +
                        "</li><li>Volume left in Knapsack: " + knapsackFilled +
                        "</li></ul></div>";

            csvForExcel += g + "," + sumGenFitness + "," + sumtotVol + "," + numCubes + "," + numPyramids + "," + numInSack + "," + knapsackFilled + "<br>";
            chartArray.push([('\'' + g + '\''),sumGenFitness]);
            bdyText += "</ul>";

            appendAllAtOnce += bdyText;
            TotalClicks += 1;
            if (numInSack == MAX_NUM_POPULATION_MEMBERS){
                  break;
            }

      }
      //Appends Total Number of Generations
      $("#num-clicks").html('<h4>Total Number of Generations: <b><u>' + TotalClicks + '</u></b><h4>');

      //Appends ordered list of data
      $("#content-body").html('<div id="' + getRandomInt(1000, 10000) + '">' + appendAllAtOnce + '</div>');
      //$("#content-body").append('<div id="csv-' + getRandomInt(1000, 10000) + '">' + csvForExcel + '</div>'); //Would append the CSV at the end of the page

      //Turns HTML newline into Excel recognizable newline.

      csvForExcel = replaceAll(csvForExcel, "<br>", "\n");
      csvForExcel = "Generation" + "," + "Generation Fitness Level" + "," + "Generation Total Volume" + "," + "Number of Cubes" + "," + "Number of Pyramids" + "," + "Number of Shapes in Knapsack" + "," + "Volume Wasted in Knapsack" + "\n" + csvForExcel;
      //Turns to CSV download.
      toExcel(csvForExcel);

      drawMyChart(chartArray);

}

function drawMyChart(chartdata){
      google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart(data) {
        var data = google.visualization.arrayToDataTable(chartdata);
        var options = {
          title: 'Algorithm Performance',
          curveType: 'function',
          backgroundColor: '#f2f2f2'
        };

        var chart = new google.visualization.LineChart(document.getElementById('chart'));

        chart.draw(data, options);
      }

}


function nextGen(initPop){

            var nextGenPopBeforeMutate = createChildren(sortPop(initPop));
            //var nextGenPopAfterMutate = nextGenPopBeforeMutate;
            var nextGenPopAfterMutate = mutatePopulation(nextGenPopBeforeMutate);
      return sortPop(nextGenPopAfterMutate);
}


function mutatePopulation(nextGenPopBeforeMutate){
      //var randomNumberOfPopulationMembersToTryToMutate = getRandomInt(0, MAX_NUM_POPULATION_MEMBERS);
      for (var i = 0; i < nextGenPopBeforeMutate.length; i++){
            if (getRandomArbitrary(0, 1) < MUTATE_PERCENTAGE){
                  switch (getRandomInt(0, 4)){
                        case 0:
                              nextGenPopBeforeMutate[i].length = getRandomInt(MIN, MAX);
                              break;
                        case 1:
                              nextGenPopBeforeMutate[i].width = getRandomInt(MIN, MAX);
                              break;
                        case 2:
                              nextGenPopBeforeMutate[i].height = getRandomInt(MIN, MAX);
                              break;
                        case 3:
                              if (getRandomInt(0, 2) >= 1){
                                    nextGenPopBeforeMutate[i].type = "Cube";
                              }else{
                                    nextGenPopBeforeMutate[i].type = "Pyramid";
                              }
                              break;
                        case 4:
                              nextGenPopBeforeMutate[i].rotation =  getRandomInt(minRot, maxRot);

                  };
                  if(nextGenPopBeforeMutate[i].type == "Cube"){
                        nextGenPopBeforeMutate[i].volume = (nextGenPopBeforeMutate[i].length * nextGenPopBeforeMutate[i].width * nextGenPopBeforeMutate[i].height);
                  }else{
                        nextGenPopBeforeMutate[i].volume = Math.floor((nextGenPopBeforeMutate[i].length * nextGenPopBeforeMutate[i].width * nextGenPopBeforeMutate[i].height)/3)
                  }


            }
      }
      return nextGenPopBeforeMutate;
}

function chooseRandomParent(){


	var workingVal;			// Get a working stack variable.

	// Get a random integer no larger than POPULATION times the max bias.

	workingVal = getRandomInt(0, 32767) % (MAX_NUM_POPULATION_MEMBERS * 15);

	if (workingVal < (MAX_NUM_POPULATION_MEMBERS * 8))			// First quarter
		return Math.floor((workingVal % (MAX_NUM_POPULATION_MEMBERS / 4)));
	else if (workingVal < (MAX_NUM_POPULATION_MEMBERS * 12))		// Second quarter
		return Math.floor((workingVal % (MAX_NUM_POPULATION_MEMBERS / 4)) + (MAX_NUM_POPULATION_MEMBERS / 4));
	else if (workingVal < (MAX_NUM_POPULATION_MEMBERS * 14))		// Third quarter
		return Math.floor((workingVal % (MAX_NUM_POPULATION_MEMBERS / 4)) + ((MAX_NUM_POPULATION_MEMBERS / 4) * 2));
	else							// Last quarter
		return Math.floor((workingVal % (MAX_NUM_POPULATION_MEMBERS / 4)) + ((MAX_NUM_POPULATION_MEMBERS / 4) * 3));


}

function createChildren(initPop){

      var children = [];

      for (var i = 0; i < (initPop.length/2); i++){
            var p1 = chooseRandomParent();
            var p2 = chooseRandomParent();
            while(p1 == p2){ p2 = chooseRandomParent(); } //Ensures two different parents.

            var firstChild = {width: initPop[p1].width,
                              height: initPop[p2].height,
                              length: initPop[p1].length,
                              type: initPop[p2].type,
                              rotation: initPop[p1].rotation
                              }

            var secondChild = {width: initPop[p2].width,
                              height: initPop[p1].height,
                              length: initPop[p2].length,
                              type: initPop[p1].type,
                              rotation: initPop[p2].rotation
                              }

            switch(firstChild.type){
                  case "Cube":
                        firstChild.volume = (firstChild.width * firstChild.height * firstChild.length);
                        break;
                  case "Pyramid":
                        firstChild.volume = Math.floor((firstChild.width * firstChild.height * firstChild.length)/3);
                        break;
            }

            switch(secondChild.type){
                  case "Cube":
                        secondChild.volume = (secondChild.width * secondChild.height * secondChild.length);
                        break;
                  case "Pyramid":
                        secondChild.volume = Math.floor((secondChild.width * secondChild.height * secondChild.length)/3);
                        break;
            }

            children.push(rotationalDifference(firstChild));
            children.push(rotationalDifference(secondChild));
      }


      return children;
}


//Sorts the objects within the list-array
function sortPop(initPop){
      var sortedPop = [];

      var popWithFitness = fitnessfunction(initPop);



      for (var i = 0; i < popWithFitness.length; i++){
            for (var k = 0; k < popWithFitness.length; k++){
                  if(popWithFitness[i].fitnessScore < popWithFitness[k].fitnessScore){
                        var transferObject = popWithFitness[i];
                        popWithFitness[i] = popWithFitness[k];
                        popWithFitness[k] = transferObject;
                  }
            }
      }
      return initPop;

}

function fitnessfunction(a){
      var fitnessScoreNoMore = 0;
      for (var i = 0; i < a.length; i++){
            //fitnessScoreNoMore = (((a[i].volume/KNAPSACK_SIZE)* 100) * rotationalDifference(a[i].rotation)); // (a[i].volume - KNAPSACK_SIZE);
            //fitnessScoreNoMore = (((((a[i].volume*rotationalDifference(a[i].rotation))))/KNAPSACK_SIZE) * 100);
            //a[i].fitnessScore = ((fitnessScoreNoMore > 0) ? fitnessScoreNoMore : fitnessScoreNoMore * -1); //Highest Percentage is the best.
            a[i].fitnessScore = (a[i].volume/KNAPSACK_SIZE) + a[i].wastedSpace;

      }

      return a;
}

function rotationalDifference(rotationObj){
      var retVal = 1;
      var wastedSpace = 0;
      switch (retVal){
            case 1:
                  retVal = .5;
                  break;

            case 2:
                  retVal = 2;
                  break;

            case 3:
                  retVal = 1;
                  break;

            case 4:
                  retVal = 100;
                  break;
      }

      wastedSpace = rotationObj.volume * retVal;
      rotationObj.wastedSpace = wastedSpace;
      return rotationObj;
}

//Creates and returns a random population
function createInitialPopulation(){
      var initPop = [];
      while (numPopMembers < MAX_NUM_POPULATION_MEMBERS){
            initPop.push(rotationalDifference(createNewPopulationMember(initPop)));
            numPopMembers++;
      }

      return initPop;
}

//Creates and returns a unique new member object for the population
function createNewPopulationMember(curPopulation){

      var isUnique = true;

      switch(getRandomInt(0,1)){
            case 0:
                  var newMember = { width: getRandomInt(MIN,MAX),
                                    height: getRandomInt(MIN, MAX),
                                    length: getRandomInt(MIN, MAX),
                                    type: "Cube",
                                    isChosen: false,
                                    rotation: getRandomInt(minRot, maxRot)}
                        newMember.volume = (newMember.width * newMember.height * newMember.length);
                  break;
            case 1:
                  var newMember = { width: getRandomInt(MIN,MAX),
                                    height: getRandomInt(MIN, MAX),
                                    length: getRandomInt(MIN, MAX),
                                    type: "Pyramid",
                                    isChosen: false,
                                    rotation: getRandomInt(minRot, maxRot)}
                              newMember.volume = Math.floor((newMember.length * newMember.width * newMember.height)/3);
                  break;

            if (curPopulation.length > 0){
                  for(var i = 0; i < curPopulation.length; i++){
                        if (curPopulation[i].width == newMember.width && curPopulation[i].height == newMember.height && curPopulation[i].length == newMember.length && newMember.type == curPopulation[i].type){
                              isUnique = false;
                        }
                  }
            }else{
                  return newMember;
            }
      }



      if (isUnique == false){
            return createNewPopulationMember();
      }else{
            return newMember;
      }


}





//===================================================================
//Utility functions
/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Quicker to implement
function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}
//Creates a Download link at the top of the HTML page that downloads a CSV file. Can auto-open in excel.
function toExcel(data){
      var CSV = data;

      window.URL = window.webkitURL || window.URL;

      var contentType = 'text/csv';

      var csvFile = new Blob([CSV], {type: contentType});

      var a = document.createElement('a');
      a.download = 'my.csv';
      a.href = window.URL.createObjectURL(csvFile);
      a.textContent = 'Download CSV Generation Information';

      a.dataset.downloadurl = [contentType, a.download, a.href].join(':');

      $("#download-link").html(document.body.appendChild(a));
}
//===================================================================
