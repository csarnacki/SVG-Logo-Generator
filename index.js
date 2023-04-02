const inquirer = require('inquirer');
const fs = require('fs');
const {Circle, Square, Triangle} = require("./lib/shape");

class Svg{
    constructor(){
        this.textElement = ''
        this.shapeElement = ''
    }
    render(){
        return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="300" height="200">${this.shapeElement}${this.textElement}</svg>`
    }
    setTextElement(text,color){
        this.textElement = `<text x="150" y="125" font-size="60" text-anchor="middle" fill="${color}">${text}</text>`
    }
    setShapeElement(shape){
        this.shapeElement = shape.render()
    }
}

const questions = [ 
    {
        type: 'list',
        name: 'shape',
        message: 'Please choose a shape',
        choices: ['circle', 'square', 'triangle'],
    },
    {
        type: 'input',
        name: 'text',
        message: 'What letters would you like? (Choose no more than 3 maximum)',
    },
    {
        type: 'input',
        name: 'textColor',
        message: 'What color would you like the text to be?',
    },
    {
        type: 'input',
        name: 'shapeColor',
        message: 'What color would you like the shape to be?',
    },
];

const writeToFile = data => {
    fs.writeFile('./lib/logo.svg', data.toString(), err => {
        if (err) {
         console.log(err);
        }
         console.log('Logo created!');
    });
}

async function init() {
	let svgString = "";
	let svg_file = "logo.svg";

    // Prompt the user for answers
    const answers = await inquirer.prompt(questions);

    let text = ''
	//user font color
	textColor = answers["textColor"];
	//user shape color
	shapeColor = answers['shapeColor'];
	//user shape type
    let shape;
	shape = answers["shape"];
	
	//user shape
	if (shape === "Square" || shape === "square") {
		shape = new Square();
	}
	else if (shape === "Circle" || shape === "circle") {
		shape = new Circle();
	}
	else if (shape === "Triangle" || shape === "triangle") {
		shape = new Triangle();
	}

	shape.setColor(shapeColor);

	// Create a new Svg instance and add the shape and text elements to it
	var svg = new Svg();
	svg.setTextElement(text, textColor);
	svg.setShapeElement(shape);
	svgString = svg.render();
	
	writeToFile(svg_file, svgString); 
}
init()