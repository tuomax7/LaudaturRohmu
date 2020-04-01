var basket;
const B_SIZE = 50;
const HALF_B_SIZE = B_SIZE / 2;

function setup(){
	createCanvas(400, 600);

	basket = createVector(width / 2, height - B_SIZE);

}

function draw(){

	background(51);

	handleBasket();
}


function handleBasket(){
	basket.x = constrain(mouseX, 0, width);

	stroke(255);
	strokeWeight(3);
	noFill();

	beginShape();
	vertex(basket.x - HALF_B_SIZE, basket.y - HALF_B_SIZE);
	vertex(basket.x - HALF_B_SIZE, basket.y + HALF_B_SIZE);
	vertex(basket.x + HALF_B_SIZE, basket.y + HALF_B_SIZE);
	vertex(basket.x + HALF_B_SIZE, basket.y - HALF_B_SIZE);
	endShape();

}