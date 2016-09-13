/**
 * Created by MStepachev on 12.09.2016.
 */
define([
        "backbone",
        "text!templates/sites/site.html",
        "views/sites/siteStatusView"
    ],
    function (Backbone, SiteTemplate, SiteStatusView) {
        return Backbone.View.extend({
            model: null,
            initialize: function (options) {
                this.model = options.model;
            },
            render: function () {
                var statusView = new SiteStatusView({id: this.model.get("id")});
                this.$el.html(_.template(SiteTemplate)({
                    name: this.model.get("name")
                }));
                this.$el.find(".status-box").html(statusView.render().el);

                return this;
            }
        });
    }
);