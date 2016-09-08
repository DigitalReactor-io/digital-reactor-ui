/**
 * Created by MStepachev on 08.09.2016.
 */
define([
        "backbone",
        "text!templates/registration/enter-email.html"
    ],
    function (Backbone, EnterEmailTemplate) {
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
                if (!email) {

                }

               /* $.ajax({
                    type: 'POST',
                    url: "/check/email",
                    contentType: 'application/json',
                    data: {email: email},
                    dataType: 'json',
                    success: function (statusResult) {

                        if (statusResult == true) {
                            alert('fine');
                        }
                    }
                });*/

                Backbone.history.navigate('access', {trigger:true});
                //window.location = 'registration.html#access'
              //  Backbone.history.navigate('cart');

            },
            _isFreeEmail: function (email) {

            }
        });

        return EmailEmailView;
    }
);