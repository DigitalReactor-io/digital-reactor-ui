package io.digitalreactor.ui.web;



import io.digitalreactor.web.contract.AccountWebServiceContract;
import io.digitalreactor.web.contract.dto.EmailCheckUI;
import io.digitalreactor.web.contract.dto.SiteUI;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static io.digitalreactor.web.contract.AccountWebServiceContract.WEB_SERVICE_PATH;

/**
 * Created by MStepachev on 12.09.2016.
 */
@RestController
@RequestMapping(value = WEB_SERVICE_PATH)
class AccountWebService implements AccountWebServiceContract {
    @RequestMapping(value = EMAIL_CHECK_PATH, method = RequestMethod.POST)
    @ResponseBody
    @Override
    public Boolean isEmailFree(@RequestBody EmailCheckUI emailCheckUI) {
        return !Collections.singletonList("test@test.com").contains(emailCheckUI.getEmail());
    }

    @RequestMapping(value = SITES_PATH, method = RequestMethod.GET)
    @ResponseBody
    @Override
    public List<SiteUI> getSites() {
        return Arrays.asList(new SiteUI("milktech.ru","id 1"), new SiteUI("cvetomaster.ru", "id 2"));
    }
}
