describe('ResourceFactory', function() {
    var ResourceFactory, lastInvoked;

    beforeEach(module('bennedetto', function($provide) {
        $provide.constant('APP_SETTINGS', {
            apiUrl: '/mock/api/path/'
        });
        $provide.service('$resource', function() {
            return function(path) {
                lastInvoked = path;
            };
        });
    }));

    beforeEach(inject(function(_ResourceFactory_) {
        ResourceFactory = _ResourceFactory_;
    }));

    afterEach(function() {
        lastInvoked = undefined;
    });

    it('should return the expected path for a new resource', function() {
        ResourceFactory.buildResource('beers');
        var actual = lastInvoked,
            expected = '/mock/api/path/beers/:id';
        expect(actual).toBe(expected);
    });

});
