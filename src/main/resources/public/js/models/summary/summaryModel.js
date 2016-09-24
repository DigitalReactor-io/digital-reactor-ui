/**
 * Created by ingvard on 24.09.16.
 */
define(
    ["backbone", "models/sites/siteModel"],
    function (Backbone, SiteModel) {
        return Backbone.Model.extend({
            url: "/summaries/taskId/",
            initialize: function (options) {
                if (options && options.hasOwnProperty("summaryTaskId")) {
                    this.url += options.summaryTaskId;
                }
            }
        });
    }
);