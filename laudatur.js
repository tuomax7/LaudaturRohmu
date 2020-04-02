
window.onload = function(){

	//DECLARING VARIABLES AND SETTING UP THE ENVIRONMENT

	var rateOfGrades = 400; //one spawned grade every rateOfGrades milliseconds
	var score = 0; // aka 'kompensaatiopisteet'
	var end = false; //to check whether the player has already lost
	var pFail = 0.8; //probability of spawned grade being some kind of improbatur 0<=pFail<=1

	document.body.style.backgroundColor = "#e0f4fe";

	var cap = document.getElementById("cap");


	//MANAGING THE CAP MOVEMENT WITH MOUSE

  	function moveAt(pageX, pageY) {

  		//moving the cap happens through updating cap.style.left with every new movement
  		cap.style.left = pageX - cap.offsetWidth / 2 + 'px';
  			
    }

  	function onMouseMove(event) {
    	moveAt(event.pageX, event.pageY);
  	}

  	document.addEventListener('mousemove', onMouseMove);

  	//Disables image dragging feature embedded in browser
	cap.ondragstart = function() {
  		return false;
	};
	



	//SPAWNING NEW RANDOMISED GRADES

	var grades = [];
	var gradeNames = ["I=", "I-", "I", "I+", "A", "B", "C", "M", "E", "L"];
	var gradeCounts = [0, 0, 0, 0, 0, 0];

	setInterval(function() {

		//If game has not ended, keep spawning grades
		if(!end){

			var grade = document.createElement("h1");
			var defineGrade; //the id of the grade, integer that belongs to [0, 9]

			if(Math.random() < pFail){

				//Spawns a kind of improbatur
				defineGrade = Math.floor(Math.random() * 3);

			}else{

				//Spawns other kind of grade than improbatur
				defineGrade = Math.floor(Math.random() * 6)+4;
			}


			grade.innerText = gradeNames[defineGrade];

			//Determining a random spawn x-coordinate
			grade.style.left = Math.floor(Math.random() * window.innerWidth) + "px";


			grades.push(grade);
			document.body.appendChild(grade);
		}

	}, rateOfGrades);



	//UPDATING GRADE LOCATIONS(AS THEY FALL) AND CHECKING IF THE GAME HAS BEEN LOST

	setInterval(function(){

		//If score reaches a negative value and the end message has not been yet displayed, the player loses since they cannot graduate (sad)
		if(score < 0 && !end){
			window.alert("Et valmistu, lataa sivu uudestaan jos haluat tuottaa meille massia uusimalla kokeesi. t:YTL");
			end = true;
		}

		if(!end){

			//Loops through every spawned grade
			for(var i = 0; i<grades.length; i++){

				//If the grade has fallen below the screen, it will be terminated
				if(grades[i].offsetTop > window.innerHeight){

					document.body.removeChild(grades[i]);
					grades.splice(i, 1);
					continue;
				}


				//If the grade is close enough to the cap, it will be collected
				if(Math.abs(grades[i].offsetTop-cap.offsetTop) <= 50 && Math.abs(grades[i].offsetLeft - (cap.offsetLeft+90)) < 80){
					
					document.body.removeChild(grades[i]);

					var toBeAdded = 0; //Addition of points caused by the collection

					//Checking the corresponding point addition of the grade
					switch(grades[i].innerText){

						case "L":
							toBeAdded = 7;
							gradeCounts[0]++;
							break;

						case "E":
							toBeAdded = 6;
							gradeCounts[1]++;
							break;

						case "M":
							toBeAdded = 5;
							gradeCounts[2]++;
							break;

						case "C":
							toBeAdded = 4;
							gradeCounts[3]++;
							break;

						case "B":
							toBeAdded = 3;
							gradeCounts[4]++;
							break;

						case "A":
							toBeAdded = 2;
							gradeCounts[5]++;
							break;

						case "I+":
							toBeAdded = -12;
							break;

						case "I":
							toBeAdded = -14;
							break;

						case "I-":
							toBeAdded = -16;
							break;

						case "I=":
							toBeAdded = -18;
							break;
					}

					score += toBeAdded;
					grades.splice(i, 1);
					continue;
					
				}
				//Grade advances towards the bottom
				grades[i].style.top = (grades[i].offsetTop + 5) + "px";


				document.getElementById("score").innerText = "Kompensaatiopisteet: " + score;


				//gradeLine contains info on collected grades
				var gradeLine = "";

				//Updates the gradeLine constantly to include just collected grades
				for(var k = 0; k < gradeCounts.length; k++){

					if(gradeCounts[k] > 0){
						gradeLine += gradeCounts[k];

						switch(k){
							case 0:
								gradeLine += "L ";
								break;

							case 1:
								gradeLine += "E ";
								break;

							case 2:
								gradeLine += "M ";
								break;

							case 3:
								gradeLine += "C ";
								break;

							case 4:
								gradeLine += "B ";
								break;

							case 5:
								gradeLine += "A ";
								break;
							
						}
					}
				}

				document.getElementById("rivi").innerText = "Todistuksesi: " + gradeLine;

			}

		}

	}, 45);


}



