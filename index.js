const inquirer = require('inquirer');
const fs = require('fs');

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
    fs.writeFile('./lib/logo.svg', data, err => {
        if (err) {
         console.log(err);
        }
         console.log('Logo created!');
    });
}

const init = () => {
    return inquirer.prompt(questions)
    .then(logoData => {
        return logoData;
    })
}

init()
.then(logoPage => {
    return writeToFile(logoPage);
})
.then(fileResponse => {
    console.log(fileResponse.message);
})
.catch(err => {
    console.log(err);
})