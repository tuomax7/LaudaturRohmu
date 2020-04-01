window.onload = function(){

	var rateOfGrades = 750; //one every rateOfGrades milliseconds
	var speedOfGrades = 5;
	var score = 0;

	document.body.style.backgroundColor = "#e0f4fe";

	var cap = document.getElementById("cap");

  	cap.style.position = 'absolute';
  	cap.style.zIndex = 1000;

  	document.body.append(cap);

 	 moveAt(event.pageX, event.pageY);

  	function moveAt(pageX, pageY) {
  		cap.style.left = pageX - cap.offsetWidth / 2 + 'px';
  			
    }

  	function onMouseMove(event) {
    	moveAt(event.pageX, event.pageY);
  	}


  	document.addEventListener('mousemove', onMouseMove);


	cap.ondragstart = function() {
  		return false;
	};

	var grades = [];
	var gradeNames = ["I=", "I-", "I", "I+", "A", "B", "C", "M", "E", "L"];
	var gradeColors = ["orange", "black", "maroon", "purple", "pink", "green", "yellow", "white", "red", "blue"];
	var gradeCounts = [0, 0, 0, 0, 0, 0];

	setInterval(function() {
		var grade = document.createElement("h1");

		var defineGrade = Math.floor(Math.random() * 10);
		grade.innerText = gradeNames[defineGrade];
		//grade.style.color = gradeColors[defineGrade];
		grade.style.color = "black";
		grade.style.fontSize = "75px";
		grade.style.position = "absolute";
		grade.style.left = Math.floor(Math.random() * window.innerWidth) + "px";
		grade.style.top = "-150px";

		grades.push(grade);
		document.body.appendChild(grade);

	}, rateOfGrades);

	setInterval(function(){
		for(var i = 0; i<grades.length; i++){
			if(grades[i].offsetTop > window.innerHeight){
				document.body.removeChild(grades[i]);
				grades.splice(i, 1);
				continue;
			}


			if(Math.abs(grades[i].offsetTop-cap.offsetTop) <= 50 && Math.abs(grades[i].offsetLeft - (cap.offsetLeft+90)) < 80){
				document.body.removeChild(grades[i]);
				var toBeAdded = 0;
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
			grades[i].style.top = (grades[i].offsetTop + speedOfGrades) + "px";

			document.getElementById("score").innerText = "Kompensaatiopisteet: " + score;

			var gradeLine = "";
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
	}, 75);


}


