/**
 * Created by ingvard on 25.09.16.
 */
define(
    [
        "backbone",
        "text!templates/reports/rsr/infoAboutChange.html",
        "text!templates/reports/rsr/infoGoalDoesntWork.html"
    ],
    function (Backbone, InfoAboutChange, InfoGoalDoesntWork) {
        return Backbone.View.extend({
            withConversion: false,
            conversion: null,
            conversionChange: null,
            numberOfCompletedGoal: null,
            initialize: function (options) {
                this.withConversion = options.withConversion;
                if (this.withConversion) {
                    this.conversion = options.conversion;
                    this.conversionChange = options.conversionChange;
                    this.numberOfCompletedGoal = options.numberOfCompletedGoal;
                }
            },
            render: function () {
                if (!this.withConversion) {
                    this.$el.html(_.template(InfoGoalDoesntWork)({}));
                } else {
                    this.$el.html(_.template(InfoAboutChange)({
                        numberCompletedGoals: this.numberOfCompletedGoal,
                        info: this.__makeInfo()
                    }));
                }

                return this;
            },
            __makeInfo: function () {
                if (this.conversionChange === 0.0) {
                   return "Конверсия сайта не изменилась."
                }

                if (this.conversionChange > 0.0) {
                    return "Конверсия сайта увеличилась на "+this.conversionChange+"% и составила "+this.conversion+"%."
                } else {
                    return "Конверсия сайта уменшилась на "+this.conversionChange+"% и составила "+this.conversion+"%."
                }
            }
        });
    }
);