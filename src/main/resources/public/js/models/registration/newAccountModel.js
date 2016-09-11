/**
 * Created by ingvard on 10.09.16.
 */
define(
    ["backbone"],
    function (Backbone) {
        return Backbone.Model.extend({
            url: "/registration/account",
            defaults: {
                counterId: "",
                email: "",
                sessionId: "",
                name: ""
            }
        });
    }
);