/**
 * Created by ramast1 on 7/28/2015.
 */


var inputText = function ($compile) {
    var directive = {};

    directive.restrict = 'E';
    /* restrict this directive to elements */
    directive.replace = true;
   /* directive.scope = {
        name: "@name",
        label: "@label",
        id: "@id",
        placeholder: "@placeholder",
        type: "@type",
        value: "=ngModel"
    };*/

    /**
     * <div class="group">
     <input type="text" name="first_name" id="input_first_name" ng-model="data.first_name"  required>
     <span class="highlight"></span>
     <span class="bar"></span>
     <label>Name</label>
     </div>
     * @type {string}
     */

    directive.template = function ($elem, $attrs) {

        console.log('template ---- ', $attrs);

        return ['<div class="group">  ',
            '<input type="text" isempty="{{empty}}"  /> ',
            '<span class="highlight"></span>',
            '<span class="bar"></span>',
            '<label>'+$attrs['label']+'</label> ',
            '</div>'].join('');
    }

    /*    directive.link =  function(scope, iElement, iAttrs) {

     console.log('iAttrs ///// ' , iAttrs)

     scope.empty = (scope.value?'false':'true');

     scope.$watch('value', function(newval){
     scope.empty = (newval?'false':'true');
     });
     };*/

    directive.compile = function ($element, $attrs, transclude) {

        console.log($attrs);
        var input = $element.find('input');

        console.log(input);

        var keys = Object.keys($attrs.$attr);
        console.log(keys);
        angular.forEach(keys, function (key) {
            var _name = $attrs.$attr[key] || key,
                val = $attrs[key] || true;
            console.log('adding removing. ..... ', _name, val);

            input.attr(_name, val);
            $element.removeAttr(_name);

        });

        return function link($scope, iElement, iAttrs) {

            console.log('iAttrs ///// ', iAttrs)

            $scope.empty = ($scope.value ? 'false' : 'true');

            $scope.$watch('value', function (newval) {
                $scope.empty = (newval ? 'false' : 'true');
            });
        }

    };


    return directive;

}

angular.module('app').directive('onelineInput', inputText);

/*angular.module('app').directive('phoneFormatter', function () {
    return {

        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {


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
});*/

/*
 http://demo.vishalon.net/getset.htm
 */
angular.module('app').directive('phoneInput', function($filter, $browser) {
    return {
        require: 'ngModel',
        link: function($scope, $element, $attrs, ngModelCtrl) {
            var listener = function() {
                var value = $element.val().replace(/[^0-9]/g, '');
                $element.val($filter('tel')(value, false));
            };

            //format text going to user (model to view)
            ngModelCtrl.$formatters.push(function (value) {

                console.log('phone formatter : ', value);
                if(!value) return;

                var ph10digits = [value.areaCode, value.prefix, value.lineNumber].join('')

                return $filter('tel')(ph10digits, false);
            });

            // This runs when we update the text field
            ngModelCtrl.$parsers.push(function(viewValue) {

                var ph10digits = viewValue.replace(/[^0-9]/g, '').slice(0, 10);

                if(!ph10digits || (ph10digits && ph10digits.length<10)) {
                    return '';
                }
                console.log("IT PASSED 10DIGIT MARK >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>" , ph10digits);
                var areacode = ph10digits.substring(0, 3),
                    prefix = ph10digits.substring(3, 6),
                    linenumber = ph10digits.substring(6, ph10digits.length);

                console.log("this is parser of ph input" , areacode, prefix, linenumber);

                return  {
                    areaCode: areacode,
                    prefix: prefix,
                    lineNumber: linenumber
                };
            });

            // This runs when the model gets updated on the scope directly and keeps our view in sync
            ngModelCtrl.$render = function() {
                $element.val($filter('tel')(ngModelCtrl.$viewValue, false));
            };

            $element.bind('change', listener);
            $element.bind('keydown', function(event) {
                var key = event.keyCode;
                // If the keys include the CTRL, SHIFT, ALT, or META keys, or the arrow keys, do nothing.
                // This lets us support copy and paste too
                if (key == 91 || (15 < key && key < 19) || (37 <= key && key <= 40)) {
                    return;
                }
                $browser.defer(listener); // Have to do this or changes don't get picked up properly
            });

            $element.bind('paste cut', function() {
                $browser.defer(listener);
            });
        }

    };
});
angular.module('app').filter('tel', function() {
    return function(tel) {
        if (!tel) {
            return '';
        }

        var value = tel.toString().trim().replace(/^\+/, '');

        if (value.match(/[^0-9]/)) {
            return tel;
        }

        var country, city, number;

        switch (value.length) {
            case 1:
            case 2:
            case 3:
                city = value;
                break;

            default:
                city = value.slice(0, 3);
                number = value.slice(3);
        }

        if (number) {
            if (number.length > 3) {
                number = number.slice(0, 3) + '-' + number.slice(3, 7);
            } else {
                number = number;
            }

            return ("(" + city + ") " + number).trim();
        } else {
            return "(" + city;
        }

    };
});


