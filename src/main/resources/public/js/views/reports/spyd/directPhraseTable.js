/**
 * Created by ingvard on 05.01.17.
 */
/**
 * Created by ingvard on 25.09.16.
 */
define(
    [
        "backbone",
        "text!templates/reports/spyd/table.html",
        "text!templates/reports/spyd/row.html"
    ],
    function (backbone, Table, Row) {
        //Конверсия / показатель качества qualityName
        return Backbone.View.extend({
            phrases: null,
            type: null,
            CONVERSION: "Конверсия",
            EVALUATION: "Показатель качества DR",
            initialize: function (options) {
                this.phrases = options.phrases;
                this.type = options.type;
            },
            render: function () {
                var self = this;
                var qualityName = this.EVALUATION;

                if (this.type != "SYSTEM") {
                    qualityName = this.CONVERSION;
                }

                this.$el.html(_.template(Table)({qualityName: qualityName}));
                $.each(this.phrases, function (i, phrase) {
                    self.$el.find("tbody").append(_.template(Row)(phrase));
                });

                return this;
            }
        });
    });