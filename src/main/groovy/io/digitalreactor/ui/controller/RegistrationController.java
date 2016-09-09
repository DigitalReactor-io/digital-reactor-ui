package io.digitalreactor.ui.controller;

import io.digitalreactor.web.contract.RegistrationControllerContract;
import io.digitalreactor.web.dto.NewAccountUI;
import org.springframework.web.servlet.ModelAndView;

/**
 * Created by MStepachev on 09.09.2016.
 */
public class RegistrationController implements RegistrationControllerContract {
    @Override
    public ModelAndView activateRegistrationSession(Long aLong) {
        return null;
    }

    @Override
    public void createNewAccount(NewAccountUI newAccountUI) {

    }
}
