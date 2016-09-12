/**
 * Created by MStepachev on 12.09.2016.
 */
define(
    ["backbone"],
    function (Backbone) {
        return Backbone.Model.extend({
            defaults: {
                name: ""
            }
        });
    }
);