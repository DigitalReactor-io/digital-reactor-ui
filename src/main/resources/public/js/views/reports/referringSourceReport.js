/**
 * Created by MStepachev on 12.05.2016.
 */

define(
    [
        "backbone",
        "text!templates/reports/referringSourceReport.html",
        "views/reports/rsr/referringSourceTable",
        "views/reports/rsr/goalSelector",
        "views/reports/rsr/infoAboutChange"

    ],
    function (Backbone, ReferringSourceReport, ReferringSourceTable, GoalSelector, InfoAboutChange) {
        return Backbone.View.extend({
            data: null,
            goalSelector: null,
            sourceTable: null,
            sourceInfo: null,
            withConversion: false,
            initialize: function (options) {
                this.data = options.data;
                if (this.data.get("sourcesWithGoals")) {
                    this.goalSelector = new GoalSelector({
                        goals: this.data.get("sourcesWithGoals")
                    });
                    this.withConversion = true;
                }

                this.__initSubComponent(0);

                Backbone.on("changeGoalSelector", this.__changeGoal, this);
            },
            render: function () {
                this.$el.html(_.template(ReferringSourceReport)({}));

                if (this.goalSelector) {
                    var referringSourceSelector = this.$el.find("#referringSourceSelector");
                    referringSourceSelector.html(this.goalSelector.render().el);
                }

                this.chart();

                this.__dataRender();

                return this;
            },
            __dataRender: function () {
                var referringSourceTable = this.$el.find("#referringSourceTable");
                referringSourceTable.html(this.sourceTable.render().el);

                var referringSourceInfo = this.$el.find("#referringSourceInfo");
                referringSourceInfo.html(this.sourceInfo.render().el);
            },
            __changeGoal: function (context) {
                var goalIndex = this.__findGoalIndex(context.currentGoal);
                this.__initSubComponent(goalIndex);

                this.__dataRender();
            },
            __findGoalIndex: function (name) {
                var index = 0;
                $.each(this.data.get("sourcesWithGoals"), function (i, value) {
                    if (value.name === name) {
                        index = i;
                        return;
                    }
                });

                return index;
            },
            __initSubComponent: function (indexGoal) {

                var sources = this.data.get("sources");
                var infoConstructorData = {
                    withConversion: this.withConversion
                };

                if (this.withConversion) {
                    sources = this.data.get("sourcesWithGoals")[indexGoal].sources;
                    infoConstructorData.conversion = this.data.get("sourcesWithGoals")[indexGoal].conversion;
                    infoConstructorData.conversionChange = this.data.get("sourcesWithGoals")[indexGoal].conversionChange;
                    infoConstructorData.numberOfCompletedGoal = this.data.get("sourcesWithGoals")[indexGoal].numberOfCompletedGoal;
                }

                this.sourceTable = new ReferringSourceTable({
                    withConversion: this.withConversion,
                    sources: sources
                });

                this.sourceInfo = new InfoAboutChange(infoConstructorData);
            },
            chart: function () {
                google.charts.setOnLoadCallback(drawReferringSourceChart);

                var self = this;

                function drawReferringSourceChart() {
                    var data = new google.visualization.DataTable();
                    data.addColumn('string');

                    for (i = 0; i < self.data.get("sources").length; i++) {
                        data.addColumn('number', self.data.get("sources")[i].name);
                    }


                    var chartDots = [];


                    for (i = 0; i < self.data.get("sources")[0].metrics.length; i++) {
                        var row = [];
                        row.push(self.data.get("sources")[0].metrics[i].date);
                        for (j = 0; j < self.data.get("sources").length; j++) {
                            row.push(self.data.get("sources")[j].metrics[i].number);
                        }

                        chartDots.push(row);
                    }

                    data.addRows(chartDots);

                    var options = {
                        chart: {
                            title: 'Иточники трафика'
                        },
                        interpolateNulls: true,
                        width: 900,
                        height: 300
                    };

                    var chart = new google.charts.Line(document.getElementById("referring-source-chart"));

                    chart.draw(data, options);
                }

            }
        });
    }
);