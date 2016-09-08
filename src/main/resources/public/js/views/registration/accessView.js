/**
 * Created by MStepachev on 08.09.2016.
 */
/**
 * Created by MStepachev on 08.09.2016.
 */
define([
        "backbone",
        "text!templates/registration/info-message.html"
    ],
    function (Backbone, InfoMessageTemplate) {
        var AccessView = Backbone.View.extend({
            events: {
                'click #go-to-site-step': "goToSitesStep"
            },
            render: function () {
                this.$el.html(_.template(InfoMessageTemplate)({}));

                return this;
            },
            goToSitesStep: function () {
                Backbone.history.navigate('sites', {trigger:true});

            }
        });

        return AccessView;
    }
);