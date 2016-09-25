/**
 * Created by ingvard on 17.09.16.
 */
define(
    [
        "backbone",
        "views/reports/visitsDuringMonthReport",
        "views/reports/referringSourceReport"
    ],
    function (Backbone, VisitsDuringMonthReport, ReferringSourceReport) {
        var registry = {
            "VISITS_DURING_MONTH": VisitsDuringMonthReport,
            "REFERRING_SOURCE": ReferringSourceReport
        };

        return {
            create: function (reportModel) {
                return registry[reportModel.get("type")];
            }
        };
    }
);