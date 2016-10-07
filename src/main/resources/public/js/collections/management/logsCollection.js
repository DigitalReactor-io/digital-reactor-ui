/**
 * Created by MStepachev on 07.10.2016.
 */
define(["backbone", "models/management/logModel"], function (Backbone, LogModel) {
    return Backbone.Collection.extend({
        baseUrl: 'registration/counters/',
        url: "",
        model: LogModel,
        initialize: function (options) {
            this.url = this.baseUrl;

            if (options && options.hasOwnProperty("level")) {
                this.url += options.level;
            }
        }
    });
});