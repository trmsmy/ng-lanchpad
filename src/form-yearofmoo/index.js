/**
 * Created by ramast1 on 7/28/2015.
 */


var inputText = function ($compile) {
    var directive = {};

    directive.restrict = 'E';
    /* restrict this directive to elements */
    directive.replace = true;
    directive.scope = {
        name: "@name",
        label: "@label",
        id: "@id",
        placeholder: "@placeholder",
        type: "@type",
        value: "=ngModel"
    };

    /**
     * <div class="group">
     <input type="text" name="first_name" id="input_first_name" ng-model="data.first_name"  required>
     <span class="highlight"></span>
     <span class="bar"></span>
     <label>Name</label>
     </div>
     * @type {string}
     */

    directive.template = ['<div class="group">  ',
        '<input type="text" isempty="{{empty}}"  ' +
        '/> ',
        '<span class="highlight"></span>',
        '<span class="bar"></span>',
        '<label>{{label}}</label> ',
        '</div>'].join('');

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