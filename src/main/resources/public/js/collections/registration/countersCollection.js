/**
 * Created by ingvard on 10.09.16.
 */
define(
    ["backbone", "models/registration/counterModel"],
    function (Backbone, CounterModel) {
        var CountersCollection = Backbone.Collection.extend({
            baseUrl: 'registration/counters/',
            url: "",
            model: CounterModel,
            initialize: function (options) {
                this.url = this.baseUrl;

                if (options && options.hasOwnProperty("sessionId")) {
                    this.url += options.sessionId;
                }
            }
        });

        return CountersCollection;
    }
);