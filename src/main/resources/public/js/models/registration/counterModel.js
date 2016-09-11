/**
 * Created by ingvard on 10.09.16.
 */
define(
    ["backbone"],
    function (Backbone) {
        var CounterModel = Backbone.Model.extend({
            defaults: {
                counterId: "",
                name: ""
            }
        });

        return CounterModel;
    }
);