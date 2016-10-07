package io.digitalreactor.ui.web;

import io.digitalreactor.web.contract.LogManagementWebServiceContract;
import io.digitalreactor.web.contract.dto.LogUI;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

/**
 * Created by MStepachev on 07.10.2016.
 */
@RestController
@RequestMapping(value = LogManagementWebServiceContract.WEB_SERVICE_PATH)
public class LogManagementWebService implements LogManagementWebServiceContract {

    @RequestMapping(value = LOGS_PATH, method = RequestMethod.GET)
    @Override
    public List<LogUI> getLogs(@RequestParam("level") String level) {

        if (level.equals("error")) {
            return Arrays.asList(new LogUI("error", "123", "testLogger", "some message", "main"));
        } else if (level.equals("info")) {
            return Arrays.asList(new LogUI("info", "123", "testLogger", "some message", "main"));
        }

        return Collections.emptyList();
    }
}
