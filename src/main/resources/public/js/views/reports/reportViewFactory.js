/**
 * Created by ingvard on 17.09.16.
 */
define(
    ["backbone", "views/reports/visitsDuringMonthReport"],
    function (Backbone, VisitsDuringMonthReport) {
        var registry = {
            "VISITS_DURING_MONTH": VisitsDuringMonthReport
        };

        return {
            create: function (reportModel) {
                return registry[reportModel.get("type")];
            }
        };
    }
);