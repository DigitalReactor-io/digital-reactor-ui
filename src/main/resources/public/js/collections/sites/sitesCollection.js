/**
 * Created by MStepachev on 12.09.2016.
 */
define(
    ["backbone", "models/sites/siteModel"],
    function (Backbone, SiteModel) {
        return Backbone.Collection.extend({
            url: "/accounts/sites",
            model: SiteModel
        });
    }
);