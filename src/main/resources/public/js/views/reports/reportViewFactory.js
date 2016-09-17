/**
 * Created by ingvard on 17.09.16.
 */
define(
    ["backbone"],
    function (Backbone) {
        var registry = {

        };

        return {
            create: function (reportModel) {
                return registry[reportModel.get("type")];
            }
        };
    }
);