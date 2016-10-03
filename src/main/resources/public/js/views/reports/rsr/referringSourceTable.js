/**
 * Created by ingvard on 25.09.16.
 */
define(
    [
        "backbone",
        "text!templates/reports/rsr/table.html",
        "text!templates/reports/rsr/conversionTable.html",
        "text!templates/reports/rsr/row.html",
        "text!templates/reports/rsr/conversionRow.html"

    ],
    function (backbone, Table, ConversionTable, Row, ConversionRow) {


        return Backbone.View.extend({
            sources: null,
            withConversion: false,
            initialize: function (options) {
                this.sources = options.sources;
                this.withConversion = options.withConversion;
            },
            render: function () {
                var self = this;
                var currentTable = Table;
                var currentRow = Row;

                if (this.withConversion) {
                    currentTable = ConversionTable;
                    currentRow = ConversionRow;
                }

                this.$el.html(_.template(currentTable)({}));
                $.each(this.sources, function (i, source) {
                    self.$el.find("tbody").append(_.template(currentRow)(self.__makeRowForTemplate(source)));
                });

                return this;
            },
            __makeRowForTemplate: function (source) {
                var objectViewData = {
                    "name": source.name,
                    "visits": source.totalVisits,
                    "visitsChange": this.__resolveChangeForView(source.totalVisitsChangePercent)
                };

                if (this.withConversion) {
                    objectViewData.goalVisits = source.totalGoalVisits;
                    objectViewData.goalVisitsChange = this.__resolveChangeForView(source.totalGoalVisitsChangePercent);
                    objectViewData.conversion = source.conversion;
                    objectViewData.conversionChange = this.__resolveChangeForView(source.conversionChangePercent);
                }

                return objectViewData;

            },
            __resolveChangeForView: function (percent) {
                if (percent === 0.0) {
                    return "";
                }
                var sign = percent > 0.0 ? "+" : "";

                return "( " + sign + " " + percent + "% )"
            }
        });
    });