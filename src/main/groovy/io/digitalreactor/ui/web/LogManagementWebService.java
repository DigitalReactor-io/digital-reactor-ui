package io.digitalreactor.ui.web;

import io.digitalreactor.web.contract.LogManagementWebServiceContract;
import io.digitalreactor.web.contract.dto.LogUI;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

/**
 * Created by MStepachev on 07.10.2016.
 */
@RequestMapping(value = LogManagementWebServiceContract.WEB_SERVICE_PATH)
public class LogManagementWebService implements LogManagementWebServiceContract {

    @RequestMapping()
    @Override
    public List<LogUI> getLogs(String s) {
        return null;
    }
}
