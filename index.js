const inquirer = require('inquirer');
const fs = require('fs');

inquirer 
    .prompt([
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
])