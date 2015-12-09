(function() {
    'use strict';

    function ProfileController(UserResourceFactory, user) {
        var self = this,

            updateUser = function() {
                UserResourceFactory.buildUserProfile().then(function(d) {
                    self.user = d.data;
                });
            };

        self.user = user;

        self.verify = function() {
            self.user.sendVerificationEmail().then(function() {
                updateUser();
                self.emailSent = true;
            });
        };
    }

    angular
        .module('bennedetto')
        .controller('ProfileController', ['UserResourceFactory', 'user', ProfileController]);
}());
