var app = angular.module('app', []);

app.controller('MainCtrl', function ($scope) {
    $scope.sentence = "angular";


    $scope.phoneNumberObj = {
        areaCode: '123',
        prefix: '456',
        lineNumber: '1111'
    }

    $scope.submit = function () {
      console.log($scope.phoneNumberObj);
    };
});


app.directive('eachCharSpacer', function () {


    return {

        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {

            //format text going to user (model to view)
            ngModel.$formatters.push(function (value) {

                console.log('each char spacer   : ', value);

                return value && value.split('').join(' ');
            });

            //format text from the user (view to model)
            ngModel.$parsers.push(function (value) {


                return value && value.replace(/\s/g, '');
            });
        }

    };
});

app.directive('upperCaser', function () {

    return {

        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {

            //format text going to user (model to view)
            ngModel.$formatters.push(function (value) {

                console.log('upper caser : ', value);

                return value && value.toUpperCase();
            });

            //format text from the user (view to model)
            ngModel.$parsers.push(function (value) {


                return value && value.toLowerCase();
            });
        }

    };
});

app.directive('vowelRemover', function () {


    return {

        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {

            //format text going to user (model to view)
            ngModel.$formatters.push(function (value) {

                console.log('vowel remover : ');

                return value && value.replace(/[aeiouAEIOU]/g, '');
            });


        }

    };
});

app.directive('phoneFormatter', function () {


    return {

        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {

            //format text going to user (model to view)
            ngModel.$formatters.push(function (value) {

                console.log('phone formatter : ', value);
                return [value.areaCode, value.prefix, value.lineNumber].join('-');
            });


            //format text going to model (view to model)
            ngModel.$parsers.push(function (value) {

                var phTokens = value.split('-');
                console.log('phone parsers : ', value);
                return {
                    areaCode: phTokens[0],
                    prefix: phTokens[1],
                    lineNumber: phTokens[2]
                };
                //return [value.areaCode , value.prefix, value.lineNumber].join('-');
            });


        }

    };
});


app.filter('phone', function () {
    return function (value) {

        if(!value) return '';
        var tokens = [value.areaCode, value.prefix, value.lineNumber];
        console.log(' phone filter : ', value);
        return tokens.length > 0 ? tokens.join('-') : '';
    };
});


app.directive('phoneAlphaValidator', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            ngModel.$validators.phoneAlphaValidator = function (value) {

                var finalVal = value.areaCode + value.prefix + value.lineNumber;
                var finalFlag  = !/\D/.test(finalVal)
                console.log(' phoneAlphaValidator : ', finalVal, 'valid? ',  finalFlag);

                return finalFlag;
            }
        }
    }
});