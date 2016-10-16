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
            events: {
                'click .reload': "__reload"
            },
            initialize: function (options) {
                this.id = options.id;
                this.__loadingData(this);
            },
            __loadingData: function (self) {
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
                var self = this;
                this.$el.html(_.template(SiteStatusTemplate)({
                    taskId: status.get('taskId'),
                    date: status.get("date") ? status.get("date") : ""
                }));

                this.$el.find(".loading").hide();
                switch(status.get('status')){
                    case "NEW":{
                        this.$el.find(".awaiting").show();
                        setTimeout(function () {
                            self.__loadingData(self);
                        }, 2000);
                        break;
                    }
                    case "DONE":{
                        this.$el.find(".project-selector").show();
                        break;
                    }
                    case "LOADING":{
                        this.$el.find(".loading").show();
                        setTimeout(function () {
                            self.__loadingData(self);
                        }, 2000);
                        break;
                    }
                }
            },
            __reload: function () {
                var self = this;
                $.ajax({
                    type: 'PUT',
                    url: "summaries/reload/"+this.id,
                    contentType: 'application/json',
                    dataType: 'json',
                    success: function (statusResult) {
                        statusResult.id = self.id;
                        self.__statusRender(new SummaryStatusModel(statusResult));
                    },
                    fail: function () {
                        //TODO fail implement
                    }
                });
            }
        });
    }
);