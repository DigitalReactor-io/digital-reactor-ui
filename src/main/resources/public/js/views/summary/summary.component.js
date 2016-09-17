/**
 * Created by MStepachev on 14.09.2016.
 */
define([
        "backbone", "collections/summary/summaryCollection", "views/reports/reportViewFactory"
    ],
    function (Backbone, SummaryCollection, ReportViewFactory) {
        var summaryCollection = new SummaryCollection({
            summaryId: "devSummaryId"
        });
        return Backbone.View.extend({
            initialize: function () {
                var self = this;
                summaryCollection.fetch({
                    success: function () {
                        summaryCollection.forEach(function (reportModel) {
                            self.__reportRender(reportModel);
                        });
                    },
                    error: function () {

                    }
                });
            },
            render: function () {
                return this;
            },
            __reportRender: function (reportModel) {
                var reportView = ReportViewFactory.create(reportModel);

            }
        });
    }
);