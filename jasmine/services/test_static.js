describe('StaticService', function() {
    var StaticService;

    beforeEach(module('bennedetto', function($provide) {
        $provide.constant('APP_SETTINGS', {
            staticUrl: '/fake/static/path/'
        });
    }));

    beforeEach(inject(function(_StaticService_) {
        StaticService = _StaticService_;
    }));

    it('should return full path with template name', function() {
        var actual = StaticService.partial('my_template.html'),
            expected = '/fake/static/path/app/partials/my_template.html';
        expect(actual).toBe(expected);
    });

});
