define([
        "backbone",
        "text!templates/registration/registration-component.html",
        "views/registration/progressBarView",
        "views/registration/enterEmailView"
    ],
    function (Backbone,
              RegistrationComponentTemplate,
              ProgressBarView,
              EnterEmailView
    ) {

        var enterEmailView = new EnterEmailView();
        var progressBarView = new ProgressBarView({
            step: 1
        });

        var RegistrationComponent = Backbone.View.extend({
            registrationDialogs: "#registration-dialogs",
            progressBar: "#progress-bar",
            initialize: function () {

            },
            render: function () {
                this.$el.html(_.template(RegistrationComponentTemplate)({}));
                this.$(this.progressBar).html(progressBarView.render().el);
                this.$(this.registrationDialogs).html(enterEmailView.render().el);

                return this;
            }
        });

        return RegistrationComponent;
    }
);