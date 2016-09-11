/**
 * Created by MStepachev on 08.09.2016.
 */
define([
        "backbone",
        "text!templates/registration/enter-email.html"
    ],
    function (Backbone, EnterEmailTemplate) {
        var USER_REGEXP_CONDITION = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var EmailEmailView = Backbone.View.extend({
            events: {
                'click #go-to-information-step': "goToInformationStep"
            },
            render: function () {
                this.$el.html(_.template(EnterEmailTemplate)({}));

                return this;
            },
            goToInformationStep: function () {
                this.$("#go-to-information-step").addClass("disabled");
                var email = $("#email").val();
                if (this._isValidEmail(email)) {
                    Backbone.trigger('error', {
                        title: "Недопустимый адрес электронной почты",
                        message: "Повторите попытку ввода или обратитесь в службу поддержки."
                    });
                    this.$("#go-to-information-step").removeClass("disabled");
                    return;
                }

                var self = this;

                $.ajax({
                    type: 'POST',
                    url: "accounts/check/email",
                    contentType: 'application/json',
                    data: JSON.stringify({email: email}),
                    dataType: 'json',
                    success: function (statusResult) {
                        if (statusResult == true) {
                            localStorage.setItem('registration-email', email);
                            Backbone.trigger('success');
                            Backbone.history.navigate('access', {trigger: true});
                        } else {
                            Backbone.trigger('error', {
                                title: "Недопустимый адрес электронной почты",
                                message: "Данный адрес уже используется."
                            });
                        }
                        self.$("#go-to-information-step").removeClass("disabled");
                    },
                    fail: function () {
                        self.$("#go-to-information-step").removeClass("disabled");
                    }
                });
            },
            _isValidEmail: function (email) {
                return !USER_REGEXP_CONDITION.test(email);
            }
        });

        return EmailEmailView;
    }
);