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
            id: '',
            initialize: function (options) {
                var self = this;
                this.id = options.id;
                var summaryStatus = new SummaryStatusModel({id: this.id});

                summaryStatus.fetch({
                    success: function () {
                        self.__statusRender(summaryStatus);
                    },
                    error: function () {
                        //TODO
                    }
                });

            },
            render: function () {
                return this;
            },
            __statusRender: function (status) {
                this.$el.html(_.template(SiteStatusTemplate)({
                    taskId: status.get('taskId'),
                    date: status.get("date") ? status.get("date") : ""
                }));

                this.$el.find(".loading").hide();
                switch(status.get('status')){
                    case "NEW":{
                        this.$el.find(".awaiting").show();
                        break;
                    }
                    case "DONE":{
                        this.$el.find(".project-selector").show();
                        break;
                    }
                    case "LOADING":{
                        this.$el.find(".loading").show();
                        break;
                    }
                }
            }
        });
    }
);