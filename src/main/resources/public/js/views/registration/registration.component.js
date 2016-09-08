define([
        "backbone",
        "text!templates/registration/registration-component.html",
        "views/registration/progressBarView",
        "views/registration/enterEmailView",
        "views/registration/accessView",
        "views/registration/sitesView"
    ],
    function (Backbone,
              RegistrationComponentTemplate,
              ProgressBarView,
              EnterEmailView,
              AccessView,
              SitesView) {

        var enterEmailView = new EnterEmailView();
        var accessView = new AccessView();
        var sitesView = new SitesView();

        var progressBarView = new ProgressBarView({step: 0});

        var RegistrationComponent = Backbone.View.extend({
            _views: [enterEmailView, accessView, sitesView],
            STEPS: {
                INITIAL: 1,
                ACCESS: 2,
                SITES: 3
            },
            registrationDialogs: "#registration-dialogs",
            progressBar: "#progress-bar",

            initialize: function () {

            },
            render: function () {
                this.$el.html(_.template(RegistrationComponentTemplate)({}));
                this.$(this.progressBar).html(progressBarView.render().el);
                //this.$(this.registrationDialogs).html(enterEmailView.render().el);

                return this;
            },
            goToStep: function (stepCode) {
                progressBarView.setStep(stepCode);
                this.$(this.progressBar).html(progressBarView.render().el);
                this.$(this.registrationDialogs).html(this._views[stepCode - 1].render().el);
            }
        });

        return RegistrationComponent;
    }
);