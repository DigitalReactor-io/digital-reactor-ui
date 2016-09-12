package io.digitalreactor.ui.web;

import io.digitalreactor.web.contract.SummaryWebServiceContract;
import io.digitalreactor.web.contract.dto.SummaryStatusEnum;
import io.digitalreactor.web.contract.dto.SummaryStatusUI;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

/**
 * Created by MStepachev on 12.09.2016.
 */
@RestController
@RequestMapping(value = SummaryWebServiceContract.WEB_SERVICE_PATH)
public class SummaryWebService implements SummaryWebServiceContract {
    @RequestMapping(value = SITE_STATUS_PATH, method = RequestMethod.GET)
    @ResponseBody
    @Override
    public SummaryStatusUI getSummaryStatus(@PathVariable String siteName) {
        return new SummaryStatusUI(SummaryStatusEnum.LOADING, LocalDate.now());
    }
}
