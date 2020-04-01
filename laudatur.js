window.onload = function(){

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



	setInterval(function() {



	}, 1000)

}


