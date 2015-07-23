var app = angular.module('app', []);

app.controller('MainCtrl', function ($scope) {
    $scope.sentence = "angular";


    $scope.ssn = '123456789';

    $scope.submit = function () {
      console.log($scope.ssn);
    };
});

app.directive('ssnFormatter', function () {


    return {

        restrict: 'A',
        require: 'ngModel',
        scope: true,
        link: function (scope, element, attrs, ngModel) {



            //format text going to user (model to view)
            ngModel.$formatters.push(function (value) {

                console.log('ssn formatter : ', value);
                if(!value) return;

                var last4 = '';

                if(value) {
                    var len = value.length;
                    last4 = value.substring(len - 4, len);
                }

                scope.origValue = value;

                return   '***-**-' + last4;

            });


            //format text going to model (view to model)
            ngModel.$parsers.push(function (value) {

                console.log('ssn parsers : ', value);

                return value;
            });


        }

    };
});


app.filter('ssn', function () {
    return function (value) {

        if(!value) return '';
        var tokens = [value.areaCode, value.prefix, value.lineNumber];
        console.log(' phone filter : ', value);
        return tokens.length > 0 ? tokens.join('-') : '';
    };
});
