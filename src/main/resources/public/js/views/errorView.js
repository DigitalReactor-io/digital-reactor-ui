/**
 * Created by ingvard on 10.09.16.
 */
define(
    ["backbone", "text!templates/error.html"],
    function (Backbone, ErrorTemplate) {
        return Backbone.View.extend({
            initialize: function () {
                Backbone.on("error", this.errorHandler, this);
                Backbone.on("success", this.errorHideHandler, this);
            },
            ref: function () {
                return this;
            },
            render: function (title, message) {
                this.$el.html(_.template(ErrorTemplate)({
                    title: title,
                    message: message
                }));

                return this;
            },
            errorHandler: function (context) {
                this.render(context.title, context.message);
            },
            errorHideHandler: function () {
                this.$el.empty();
            }
        });
    }
);