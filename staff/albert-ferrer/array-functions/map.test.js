describe('map', function(){
    it('descripción de que funciona', function(){
        var numbers = [2,4,6];
        var multiply2 = function(n) {return n * 2;}
        var result = map(numbers,multiply2); // [4,8,12];
        expect(result.length).toBe(3);
    });
    it('descripción de que funciona 2', function(){
        var numbers = [2,4,6];
        var multiply2 = function(n) {return n * 2;}
        var result = map(numbers,multiply2); // [4,8,12];
        expect(JSON.stringify(result)).toBe(JSON.stringify([4,8,12]));
    });

    it('peta pq no tenemos array', function(){
        var numbers;
        var multiply2 = function(n) {return n * 2;}
        expect(function(){map(numbers,multiply2)}).toThrow(TypeError, 'undefined is not an array');
    });

    it('peta por no tener la expressión', function(){
        numbers = [2,4,6];
        expect(function(){map(numbers)}).toThrow(TypeError, 'undefined is not a function');
    });
    
});