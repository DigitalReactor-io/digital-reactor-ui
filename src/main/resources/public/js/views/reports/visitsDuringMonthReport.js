/**
 * Created by MStepachev on 11.05.2016.
 */
define(
    ["backbone", "text!templates/reports/visitsDuringMonthReport.html"],
    function (Backbone, VisitsDuringMonthReport) {
        return Backbone.View.extend({
            data: null,
            initialize: function (options) {
                this.data = options.data;
            },
            render: function () {

                this.$el.html(_.template(VisitsDuringMonthReport)({
                    description: this.__description(),
                    reason: this.data.get("reason")
                }));

                this.__chart();

                return this;
            },
            __description: function () {
                switch (this.data.get("action")) {
                    case 'INCREASING':
                    {
                        return "Посещаемость увеличилась на " + this.data.get("percent") + "% (" + this.data.get("visit") + " визитов)."
                    }
                    case 'DECREASING':
                    {
                        return "Посещаемость уменьшилась на " + this.data.get("percent") + "% (" + this.data.get("visit") + " визитов)."
                    }
                    case 'UNALTERED':
                    {
                        return "Посещаемость не изменилась: " + this.data.get("visit") + " визитов."
                    }
                }
            },
            __chart: function () {
                var self = this;
                google.charts.setOnLoadCallback(drawChart);

                function drawChart() {
                    var ar = [];

                    for (i = 0; i < self.data.get("metrics").length; i++) {

                        ar.push({
                            c: [
                                {v: self.data.get("metrics")[i].date},
                                {v: self.data.get("metrics")[i].number},
                                {v: self.data.get("metrics")[i].dayType == "HOLIDAY" ? 'color: #578EBE' : 'color: #5C9BD1'}
                            ]
                        });
                    }


                    var dt = new google.visualization.DataTable({
                        cols: [{id: 'task', label: 'Task', type: 'string'},
                            {id: 'hours', label: 'Визитов', type: 'number'},
                            {type: 'string', role: 'style'}
                        ],
                        rows: ar
                    }, 0.6);

                    var view = new google.visualization.DataView(dt);

                    var options = {
                        interpolateNulls: true,
                        title: "Визиты за 30 дней",
                        titleTextStyle: {
                            bold: false
                        },
                        chartArea: {
                            left: 50
                        },
                        width: 900,
                        height: 300,
                        bar: {groupWidth: "95%"}
                    };
                    var chart = new google.visualization.ColumnChart(document.getElementById("visitsDuringMonthReport"));
                    chart.draw(view, options);
                }
            }
        });
    }
);