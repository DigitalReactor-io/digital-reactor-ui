package io.digitalreactor.ui.web;

import io.digitalreactor.web.contract.RegistrationControllerContract;
import io.digitalreactor.web.contract.dto.CounterUI;
import io.digitalreactor.web.contract.dto.NewAccountUI;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.util.Arrays;
import java.util.List;

import static io.digitalreactor.web.contract.RegistrationControllerContract.CONTROLLER_PATH;

/**
 * Created by MStepachev on 12.09.2016.
 */
@RestController
@RequestMapping(value = CONTROLLER_PATH)
class RegistrationController implements RegistrationControllerContract {
    @Override
    public ModelAndView activateRegistrationSession(Long aLong) {
        return null;
    }

    @RequestMapping(value = COUNTERS_PATH, method = RequestMethod.GET)
    @ResponseBody
    @Override
    public List<CounterUI> getCountersBySessionId(@PathVariable String sessionId) {
        return Arrays.asList(new CounterUI("name 1", "1"), new CounterUI("name 2", "2"));
    }

    @RequestMapping(value = NEW_ACCOUNT_PATH, method = RequestMethod.POST)
    @ResponseBody
    @Override
    public Boolean createNewAccount(NewAccountUI newAccountUI) {
        return true;
    }
}
