const inquirer = require('inquirer');
const fs = require('fs');
const {Circle, Square, Triangle} = require('./lib/shape.js');

class Svg{
    constructor(){
        this.textElement = ''
        this.shapeElement = ''
    }
    render(){
        return `<svg xmlns='http://www.w3.org/2000/svg' width='300px' height='200px'>${this.shapeElement}${this.textElement}</svg>`
    }
    setTextElement(text, textColor){
        this.textElement = `<text x='50%' y='50%' font-size='100px' text-anchor='middle' fill='${textColor}'/>${text}`
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
	let svgString = '';

    const answers = await inquirer.prompt(questions);

    let text = answers['text'];

    let textColor = answers['textColor'];

    let shapeColor = answers['shapeColor'];

	let shape = answers['shape'];
	
	if (shape === 'square') {
		shape = new Square();
	}
	else if (shape === 'circle') {
		shape = new Circle();
	}
	else if (shape === 'triangle') {
		shape = new Triangle();
	}

	shape.setColor(shapeColor);

	let svg = new Svg();
	svg.setTextElement(text, textColor);
	svg.setShapeElement(shape);
	svgString = svg.render();
	
	writeToFile(svgString, svg);
}
init()