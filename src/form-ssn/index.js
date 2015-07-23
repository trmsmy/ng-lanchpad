var app = angular.module('app', []);

app.controller('MainCtrl', function ($scope) {
    $scope.sentence = "angular";


    $scope.ssn = '123456789';

    $scope.submit = function () {
      console.log($scope.ssn);
    };
});

app.directive('ssnInputText', function () {


    return {

        restrict: 'E',
        require: 'ngModel',
        scope: true,
        template: '<input name="ssn" ssn-formatter type="text" ng-model="masked"/>',

        link: function (scope, element, attrs, ngModel) {

            function getMasked(value) {

                var last4 = '';

                if(value) {
                    var len = value.length;
                    last4 = value.substring(len - 4, len);
                }
                return '*****' + last4;
            }

            //format text going to user (model to view)
            ngModel.$formatters.push(function (value) {

                console.log('ssn formatter : ', value);
                if(!value) return;

                return  {
                    masked : getMasked(value),
                    original: value
                }

            });

            ngModel.$render = function() {
                console.log('render called ');
                scope.masked = ngModel.$viewValue.masked;
                scope.original  = ngModel.$viewValue.original;
            };

            scope.$watch('masked', function() {
                console.log('watch called');
                ngModel.$setViewValue({ masked: scope.masked, original: scope.original });
            });

           /* element.find('input').on('change', function() {

            });
            */
            //format text going to model (view to model)
            ngModel.$parsers.push(function (viewValue) {


                /*if(viewValue.masked && viewValue.original) {
                    if(getMasked(viewValue.original) != viewValue.masked) {
                        scope.masked = '';
                        scope.original = '';
                    }
                } else {
                    scope.original = viewValue.masked;
                }
                */
                console.log('ssn parsers : ', viewValue);
                var masked = String(scope.masked);
                var newval = masked.replace(/[^0-9]+/g, '');

                scope.original = newval;
                scope.masked = getMasked(newval);
                console.log('ssn parsers : ', viewValue);

                return newval;
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
