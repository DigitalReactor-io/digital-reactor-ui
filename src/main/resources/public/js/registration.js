/**
 * Created by MStepachev on 07.09.2016.
 */
require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        }
    },
    paths: {
        jquery: 'libs/jquery',
        underscore: 'libs/underscore',
        backbone: 'libs/backbone',
        text: 'libs/text'
    }
});

require([
    'backbone',
    'views/registration/registration.component'
], function (Backbone, RegistrationComponent) {
    //localStorage.setItem('myCat', 'Tom');
    var registrationComponent = new RegistrationComponent();

    var Router = Backbone.Router.extend({
        routes: {
            '': 'index',
            'access': 'access',
            'sites': 'sites'
        },
        index: function () {
            $("#registration-app").html(registrationComponent.render().el);
        },
        access: function () {

        },
        sites: function () {

        }
    });

    new Router();
    Backbone.history.start();
});