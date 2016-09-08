/**
 * Created by MStepachev on 08.09.2016.
 */
define([
        "backbone",
        "text!templates/registration/success-message.html"
    ],
    function (Backbone, SuccessTemplate) {
        var AccessView = Backbone.View.extend({
            events: {
                'click #go-to-site-step': "goToSitesStep"
            },
            render: function () {
                this.$el.html(_.template(SuccessTemplate)({}));

                return this;
            },
            goToSitesStep: function () {
                Backbone.history.navigate('sites', {trigger:true});

            }
        });

        return AccessView;
    }
);