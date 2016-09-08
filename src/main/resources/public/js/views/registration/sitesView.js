/**
 * Created by MStepachev on 08.09.2016.
 */
define([
        "backbone",
        "text!templates/registration/accessible-project.html"
    ],
    function (Backbone, SitesTemplate) {
        var SitesView = Backbone.View.extend({
            events: {
                'click #save': "save"
            },
            render: function () {
                this.$el.html(_.template(SitesTemplate)({}));

                return this;
            },
            save: function () {
                Backbone.history.navigate('success', {trigger:true});

            }
        });

        return SitesView;
    }
);