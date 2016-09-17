/**
 * Created by ingvard on 17.09.16.
 */
define(
    ["backbone", "models/sites/siteModel"],
    function (Backbone, SiteModel) {
        return Backbone.Collection.extend({
            url: "/summaries/",
            initialize: function (options) {
                if (options && options.hasOwnProperty("summaryId")) {
                    this.url += options.summaryId;
                }
            }
        });
    }
);