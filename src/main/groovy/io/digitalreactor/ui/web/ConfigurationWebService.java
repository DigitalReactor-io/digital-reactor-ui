package io.digitalreactor.ui.web;

import io.digitalreactor.web.contract.ConfigurationWebServiceContract;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import static io.digitalreactor.web.contract.ConfigurationWebServiceContract.WEB_SERVICE_PATH;

/**
 * Created by MStepachev on 12.09.2016.
 */
@RestController
@RequestMapping(value = WEB_SERVICE_PATH)
class ConfigurationWebService implements ConfigurationWebServiceContract {
    @RequestMapping(value = APPLICATION_ID_PATH, method = RequestMethod.GET)
    @ResponseBody
    @Override
    public String configurationApplicationId() {
        return "dev";
    }
}
