"use strict";
require('app.less');

var appModule = angular.module('ngMailClient', ['ui.router']);

var $controllerProvider,
    $provide;

appModule.config(
    ['$controllerProvider', '$compileProvider', '$filterProvider', '$animateProvider',
        '$provide', '$injector', function (controllerProvider, compileProvider,
                                           filterProvider, animateProvider, provide, injector) {

        $controllerProvider = controllerProvider;
        $provide = provide;

        console.log('app config runs here ');

        appModule.lazyLoader = {
            controller : function (name, constructor) {
                $controllerProvider.register(name, constructor);
            },
            factory : function (name, constructor) {
                $provide.factory(name, constructor) ;
            }
        };

    }]);

require('./app-config.js')(appModule);



appModule.controller('InboxCtrl', function ($state) {
        console.log(',ian ctrl')

        var self = this;
        self.mails = [];

        self.onRowSelection = function(selection) {
            console.log(selection);
            $state.go('readerview', {mailId : selection.id});
        };

        console.log(" this si in inbox controler ");
        (function () {

            for(var i=0; i< 20; i++) {
                self.mails.push({
                    id : i,
                    from: 'someemail@somedomain.com',
                    receivedat: new Date(i),
                    subject: i + '  Mail subject... ',
                    body : ' sjalkj ldas klsjf aj lkjas al kjal k lkjs lkj lkjas lkjkdls jlkdsj lkjslkd fjlkdsa j klj lkjsfd '
                })
            }
        })();

    }
);