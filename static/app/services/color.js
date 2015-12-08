(function() {
    'use strict';

    function getRandomValue() {
        var max = 150, min = 100;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function getGreenColor() {
        return 'rgb(0,{},0)'.format(getRandomValue());
    }

    function getRedColor() {
        return 'rgb({},0,0)'.format(getRandomValue());
    }

    function getColorForAmount(amt) {
        if (Number(amt) > 0) {
            return getGreenColor();
        } else {
            return getRedColor();
        }
    }

    function ColorService() {
        return {
            getColorForAmount: getColorForAmount
        };
    }

    angular
        .module('bennedetto')
        .service('ColorService', [ColorService]);
}());
