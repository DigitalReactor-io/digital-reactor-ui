/**
 * Created by ingvard on 25.09.16.
 */
define(["backbone", "text!templates/reports/rsr/goalSelector.html"], function (Backbone, GoalSelector) {
    return Backbone.View.extend({
        name: null,
        goals: null,
        events: {
            "change #goalSelectorReferringSources": "__changeGoalSelector"
        },
        initialize: function (options) {
            this.goals = options.goals;
        },
        render: function () {
            this.$el.html(_.template(GoalSelector)({}));
            var goalSelector = this.$el.find("#goalSelectorReferringSources");
            $.each(this.goals, function (i, goal) {
                goalSelector.append(new Option(goal.name, goal.name));
            });

            return this;
        },
        __changeGoalSelector: function () {
            var selector = $('#goalSelectorReferringSources').find(":selected");

            Backbone.trigger('changeGoalSelector', {
                currentGoal: selector.val()
            });
        }
    });
});