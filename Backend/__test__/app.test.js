const app = require('../app.js');

describe('Palindrom', ()=>{
    /*it('Should retrieve a sentence', ()=>{
        expect(app.length).toBeGreaterThan(0);
    });
    it('Should have a length of 11 lettres', () =>{
        expect(app.length).toEqual(11);
    })*/

    it('Should be a palindrom', () => {
        expect(app.isPalindrom('kayak')).toEqual(true);
    });

    it('Should NOT be a palindrom', () => {
        expect(app.isPalindrom('azerty')).toEqual(true);
    });
})