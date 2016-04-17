(function() {
    'use strict';

    function ProfileController($scope, $controller, UserResourceFactory, user) {
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

        self.newPasswordForm = function() {
            self.passwordChange = {};
            self.valid = false;
            self.error = '';
        };

        self.newPasswordForm();

        self.changePasswordClick = function() {
            self.user.changePassword({
                old: self.passwordChange.old,
                new1: self.passwordChange.new1,
                new2: self.passwordChange.new2
            }).success(function() {
                self.newPasswordForm();
                self.success = 'Password updated';
            }).error(function(data) {
                self.error = data;
            });
        };

        $scope.$watch(function() {
            return angular.toJson([self.passwordChange.new1, self.passwordChange.new2]);
        }, _.debounce(function() {

            $scope.$apply(function() {
                self.valid = false;

                if (!self.passwordChange.new1 || !self.passwordChange.new2) {
                    self.error = '';
                    return;
                }

                if (self.passwordChange.new1 !== self.passwordChange.new2) {
                    self.error = 'Passwords do not match.';
                    return;
                }

                self.error = '';
                self.valid = true;
                return;

            });

        }, 500));

	angular.extend(self, $controller('FamilyController', {$scope: self}));
    }

    angular
        .module('bennedetto')
        .controller('ProfileController', ['$scope', '$controller', 'UserResourceFactory', 'user', ProfileController]);
}());
