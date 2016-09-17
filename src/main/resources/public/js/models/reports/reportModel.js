/**
 * Created by ingvard on 17.09.16.
 */
define(
    ["backbone"],
    function (Backbone) {
        return Backbone.Model.extend({
            defaults: {
                type: "",
                data: ""
            }
        });
    }
);