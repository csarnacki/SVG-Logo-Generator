const {Circle, Square, Triangle} = require('./shape');

describe('Circle', () => {
    test('Circle is created', () => {
        const shape = new Circle();
        let color = 'red';
        shape.setColor(color);
        expect(shape.render()).toEqual(`<circle cx='50%' cy='50%' r='100' height='100%' width='100%' fill='${color}'\xa0/>`);
    });
});

describe('Square', () => {
    test('Square is created', () => {
        const shape = new Square();
        let color = 'green';
        shape.setColor(color);
        expect(shape.render()).toEqual(`<rect x='50' height='200' width='200' fill='${color}'\xa0/>`);
    });
});

describe('Triangle', () => {
    test('Triangle is created', () => {
        const shape = new Triangle();
        let color = 'blue';
        shape.setColor(color);
        expect(shape.render()).toEqual(`<polygon height='100%' width='100%' points='0,200 300,200 150,0' fill='${color}'\xa0/>`);
    });
});