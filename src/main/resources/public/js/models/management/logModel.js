/**
 * Created by MStepachev on 07.10.2016.
 */

define(["backbone"], function (Backbone) {
    return Backbone.Model.extend({
        defaults: {
            message: "",
            level: "",
            timeStamp: "",
            loggerName: "",
            threadName: ""
        }
    });
});