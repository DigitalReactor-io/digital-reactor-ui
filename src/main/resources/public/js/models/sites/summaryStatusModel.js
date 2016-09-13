/**
 * Created by MStepachev on 12.09.2016.
 */
define(
    ["backbone"],
    function (Backbone) {
        return Backbone.Model.extend({
            url: "/summaries/status/",
            defaults: {
                status: "UNKNOWN",
                date: ""
            },
            initialize: function (options) {
                this.url += options.id;
            }
        });
    }
);