window.onload = function(){

	var rateOfGrades = 2500; //one every rateOfGrades milliseconds
	var speedOfGrades = 5;

	document.body.style.backgroundColor = "gray";

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
	var gradeNames = ["I-", "I", "I+", "A", "B", "C", "M", "E", "L"];
	var gradeColors = ["black", "maroon", "purple", "pink", "green", "yellow", "white", "red", "blue"];

	setInterval(function() {
		var grade = document.createElement("h1");

		var defineGrade = Math.floor(Math.random() * 8);
		grade.innerText = gradeNames[defineGrade];
		grade.style.color = gradeColors[defineGrade];
		grade.style.fontSize = "50px";
		grade.style.position = "absolute";
		grade.style.left = Math.floor(Math.random() * window.innerWidth) + "px";
		grade.style.top = "0px";

		grades.push(grade);
		document.body.appendChild(grade);

	}, rateOfGrades);

	setInterval(function(){
		for(var i = 0; i<grades.length; i++){
			if(grades[i].offsetTop > window.innerHeight) document.body.removeChild(grades[i]);
			grades[i].style.top = (grades[i].offsetTop + speedOfGrades) + "px";
		}

	}, 100);

}


