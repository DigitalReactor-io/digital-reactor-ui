/**
 * Created by MStepachev on 08.09.2016.
 */
define([
        "backbone",
        "text!templates/registration/accessible-project.html",
        "collections/registration/countersCollection",
        "models/registration/newAccountModel"
    ],
    function (Backbone, SitesTemplate, CountersCollection, NewAccountModel) {

        var SitesView = Backbone.View.extend({
            currentSessionId: "",
            events: {
                'click #save': "save"
            },
            initialize: function () {

            },
            render: function (param) {
                this.$el.html(_.template(SitesTemplate)({}));
                this.currentSessionId = param.sessionId;
                var self = this;
                var counters = new CountersCollection({
                    sessionId: param.sessionId
                });

                counters.fetch({
                    success: function () {
                        self.__selectorRender(counters);
                    },
                    error: function () {
                        Backbone.trigger('error', {
                            title: "Ошибка загрузки данных от Yandex.Metrika",
                            message: "Повторите попытку ввода или обратитесь в службу поддержки."
                        });
                    }
                });

                return this;
            },
            save: function () {
                this.$("#project-selector").addClass("hidden");
                this.$(".loading").removeClass("hidden");

                var email = localStorage.getItem('registration-email');
                var selector = $('#project-selector').find(":selected");
                var counterId = selector.val();
                var name = selector.text();

                var newAccount = new NewAccountModel({
                    email: email,
                    counterId: counterId,
                    sessionId: this.currentSessionId,
                    name: name
                });

                newAccount.save(null, {
                    error: function() {
                        Backbone.trigger('error', {
                            title: "Ошибка при регистрации проекта",
                            message: "Повторите попытку ввода или обратитесь в службу поддержки."
                        });
                    },
                    success: function () {
                        Backbone.history.navigate('success', {trigger: true});
                    }
                });
            },
            __selectorRender: function (counters) {
                var list = $("#project-list");
                counters.forEach(function (counter) {
                    list.append(new Option(counter.get("name"), counter.get("counterId")));
                });

                this.$("#save").removeClass("disabled");
                this.$("#project-selector").removeClass("hidden");
                this.$(".loading").addClass("hidden");
            }
        });

        return SitesView;
    }
);