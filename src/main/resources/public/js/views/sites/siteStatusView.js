/**
 * Created by MStepachev on 12.09.2016.
 */
define([
        "backbone",
        "text!templates/sites/site-status.html",
        "models/sites/summaryStatusModel"
    ],
    function (Backbone, SiteStatusTemplate, SummaryStatusModel) {
        return Backbone.View.extend({
            site: '',
            initialize: function (options) {
                var self = this;
                this.site = options.site;
                var summaryStatus = new SummaryStatusModel({site: this.site}).fetch({
                    success: function () {
                        self.__statusRender(summaryStatus);
                    },
                    error: function () {
                        //TODO
                    }
                });

            },
            render: function () {
                this.$el.html(_.template(SiteStatusTemplate)({}));

                return this;
            },
            __statusRender: function (status) {
                this.$el.find(".loading").hide();
                this.$el.find(".project-selector").show();
            }
        });
    }
);