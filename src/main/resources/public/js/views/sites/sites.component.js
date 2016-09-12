/**
 * Created by MStepachev on 12.09.2016.
 */
define([
        "backbone",
        "collections/sites/sitesCollection",
        "views/sites/siteView",
        "text!templates/sites/sites-component.html"
    ],
    function (Backbone, SitesCollection, SiteView, ComponentTemplate) {
        var sitesCollection =  new SitesCollection();


        return Backbone.View.extend({
            initialize: function () {
                var self = this;
                sitesCollection.fetch({
                    success: function () {
                        self.__sitesRender(sitesCollection);
                    },
                    error: function () {
                        Backbone.trigger('error', {
                            title: "Ошибка получения списка доступных сайтов",
                            message: "Обновите страницу или обратитесь в службу поддержки."
                        });
                    }
                });
            },
            render: function () {
                this.$el.html(_.template(ComponentTemplate)({}));
                
                return this;
            },
            __sitesRender: function (sites) {
                var self = this;
                sites.forEach(function (site) {
                    var site = new SiteView({model: site});
                    this.$("#sites-list").append(site.render().el);
                });

            }
        });
    }
);