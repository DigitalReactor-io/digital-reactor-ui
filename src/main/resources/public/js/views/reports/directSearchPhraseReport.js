/**
 * Created by ingvard on 05.01.17.
 */

define(
    [
        "backbone",
        "text!templates/reports/DirectSearchPhraseReport.html",
        "views/reports/spyd/directPhraseTable"

    ],
    function (Backbone, DirectSearchPhraseReport, DirectPhraseTable) {
        return Backbone.View.extend({
            reports: null,
            events: {
                "change #directSearchPhrasesSelector": "__changeSelector"
            },
            initialize: function (options) {
                this.reports = options.data.get('reports');
            },
            render: function () {
                this.$el.html(_.template(DirectSearchPhraseReport)({}));

                var selector = this.$el.find("#directSearchPhrasesSelector");

                $.each(this.reports, function (i, report) {
                    selector.append(new Option(report.goalName, i));
                });

                this.__renderData(0);

                return this;
            },
            __renderData: function (index) {
                var report = this.reports[index];

                var tableWithSuccessPhrases = new DirectPhraseTable({
                    phrases: report.successPhrases,
                    type: report.type
                });

                this.$el.find("#successPhrases").html(tableWithSuccessPhrases.render().el);

                var tableWithBadPhrases = new DirectPhraseTable({
                    phrases: report.badPhrases,
                    type: report.type
                });

                this.$el.find("#badPhrases").html(tableWithBadPhrases.render().el);
            },
            __changeSelector: function () {
                var selector = $('#directSearchPhrasesSelector').find(":selected");

                this.__renderData(selector.val());
            }
        });
    }
);