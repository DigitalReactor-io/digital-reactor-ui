/**
 * Created by MStepachev on 08.09.2016.
 */
define([
        "backbone",
        "text!templates/registration/info-message.html"
    ],
    function (Backbone, InfoMessageTemplate) {
        var YANDEX_OAUTH = "https://oauth.yandex.ru/authorize?response_type=code&client_id=";
        var AccessView = Backbone.View.extend({
            applicationId: '',
            events: {
                'click #go-to-site-step': "goToSitesStep"
            },
            initialize: function () {
                //TODO dirty hack
                var self = this;
                $.get("configuration/application/id", function (applicationId) {
                    self.applicationId = applicationId;
                });
            },
            render: function () {
                this.$el.html(_.template(InfoMessageTemplate)({}));

                return this;
            },
            goToSitesStep: function () {
                if (this.applicationId == 'dev') {
                    Backbone.history.navigate('sites/session/dev', {trigger: true});
                } else {
                    window.location = YANDEX_OAUTH + this.applicationId;
                }
            }
        });

        return AccessView;
    }
);