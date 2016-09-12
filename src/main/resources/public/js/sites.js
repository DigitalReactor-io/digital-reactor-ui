/**
 * Created by MStepachev on 12.09.2016.
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
    'views/sites/sites.component'
], function (Backbone, SitesComponent) {
    var sitesComponents = new SitesComponent();

    $("#sites-app").html(sitesComponents.render().el);
});