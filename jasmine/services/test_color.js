describe('ColorService', function() {
    var ColorService, originalRandom = Math.random,

        mockRandom = function() {
            return 4;           // chosen by a fair dice roll
        };                      // guaranteed to be random

    beforeEach(module('bennedetto', function() {
        Math.random = mockRandom;
    }));

    beforeEach(inject(function(_ColorService_) {
        ColorService = _ColorService_;
    }));

    afterEach(function() {
        Math.random = originalRandom;
    });

    describe('mockRandom', function() {
        it('should return 4', function() {
            expect(Math.random()).toBe(4);
        });
    });

    it('should return a shade of green for a positive amount', function() {
        var actual = ColorService.getColorForAmount('12'),
            expected = 'rgb(0,304,0)';
        expect(actual).toBe(expected);
    });

    it('should return a shade of red for a negative amount', function() {
        var actual = ColorService.getColorForAmount('-12'),
            expected = 'rgb(304,0,0)';
        expect(actual).toBe(expected);
    });

});
