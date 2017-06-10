(function () {
    'use strict';
    angular.module('youtubeApp', [])
        .directive('angularOdometer', function () {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {

                    //Creates new instance of odometer for the element
                    new Odometer({
                        el: element[0],
                        value: scope[attrs.odometer],
                        theme: 'plaza'
                    });

                    //Watch for changes and update the element value (causing odometer to redraw)
                    scope.$watch(attrs.odometer, function (val) {
                        element.text(val);
                    });

                }
            };
        })
        .controller('mainController', ['$scope', '$http', function ($scope, $http) {
            $scope.click = false;
            $scope.click = function () {
                if ($scope.active === true) {
                    if (!$scope.searchInput)
                        $scope.active = false;
                    else
                        $scope.getChannelData();
                } else
                    $scope.active = true;
            };
            $scope.isActive = function () {
                return $scope.active;
            };
            $scope.getChannelData = function () {
                var channelName = "Google";
                if ($scope.searchInput)
                    channelName = $scope.searchInput;
                $scope.channelData = [];
                $http.get('https://www.googleapis.com/youtube/v3/channels?part=statistics&forUsername=' + channelName + '&' + 'key=AIzaSyAIVNJgCCNwbdoafl7gpQPp4hhfAdeZPPw')
                    .then(function (response) {
                        $scope.channelData = response;
                        $scope.value = response.data.items[0].statistics.subscriberCount;

                    }, function (error) {
                        console.log(error, 'cant get data.');
                    });
            };
        }]);
})();
//https://www.googleapis.com/youtube/v3/channels?part=statistics&forUsername=google&key=AIzaSyAIVNJgCCNwbdoafl7gpQPp4hhfAdeZPPw
