/**
 * Created by ingvard on 17.09.16.
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

define(
    ["backbone", "views/summary/summary.component"],
    function (Backbone, SummaryComponent) {
        var summaryComponent = new SummaryComponent();
        
        $("#sites-app").html(summaryComponent.render().el);
    }
);