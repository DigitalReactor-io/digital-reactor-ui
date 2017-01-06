/**
 * Created by ingvard on 17.09.16.
 */
define(
    [
        "backbone",
        "views/reports/visitsDuringMonthReport",
        "views/reports/referringSourceReport",
        "views/reports/directSearchPhraseReport"
    ],
    function (Backbone, VisitsDuringMonthReport, ReferringSourceReport, directSearchPhraseReport) {
        var registry = {
            "VISITS_DURING_MONTH": VisitsDuringMonthReport,
            "REFERRING_SOURCE": ReferringSourceReport,
            "SEARCH_PHRASE_YANDEX_DIRECT": directSearchPhraseReport
        };

        return {
            create: function (reportModel) {
                return registry[reportModel.get("type")];
            }
        };
    }
);