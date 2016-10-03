/**
 * Created by MStepachev on 14.09.2016.
 */
define([
        "backbone", "models/summary/summaryModel", "views/reports/reportViewFactory"
    ],
    function (Backbone, SummaryModel, ReportViewFactory) {
        
        return Backbone.View.extend({
            initialize: function (options) {
                var summaryModel = new SummaryModel({
                    summaryTaskId: options.summaryTaskId
                });
                
                var self = this;
                summaryModel.fetch({
                    success: function () {
                        summaryModel.get('reports').forEach(function (reportModel) {
                            self.__reportRender(new Backbone.Model(reportModel));
                        });
                    },
                    error: function () {

                    }
                });
            },
            render: function () {
                google.charts.load('current', {'packages':['line', 'corechart']});
                
                return this;
            },
            __reportRender: function (reportModel) {
                var ReportView = ReportViewFactory.create(reportModel);
                var reportView = new ReportView({
                    data: reportModel
                });

                this.$el.append(reportView.render().el);
            }
        });
    }
);