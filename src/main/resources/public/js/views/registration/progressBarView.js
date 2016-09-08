/**
 * Created by MStepachev on 07.09.2016.
 */
define(
    [
        "backbone",
        "text!templates/registration/progress-bar.html"
    ],
    function (Backbone, ProgressBarTemplate) {
        var ProgressBar = Backbone.View.extend({
            CURRENT: "error",
            DONE: "done",
            step: 0,
            initialize: function (options) {
                this.step = options.step ? options.step : this.step;

                return this;
            },
            render: function () {
                var self = this;
                this.$el.html(_.template(ProgressBarTemplate)({}));

                var steps = this.$(".step-line").children();
                _.each(steps, function (div, stepNumber) {
                    $(div).removeClass(self.DONE).removeClass(self.CURRENT);
                    var indexStep = self.step - 1;
                    if(stepNumber < indexStep) {
                        $(div).addClass(self.DONE);
                    }
                    if(stepNumber == indexStep) {
                        $(div).addClass(self.CURRENT);
                    }
                });

                return this;
            },
            setStep: function (number) {
                this.step = number;
            }
        });


        return ProgressBar;
    }
);