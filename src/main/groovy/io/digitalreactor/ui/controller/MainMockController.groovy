package io.digitalreactor.ui.controller

import io.digitalreactor.ui.model.EmailCheckUI
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.ResponseBody
import org.springframework.web.bind.annotation.RestController

import java.time.LocalDate

/**
 * Created by MStepachev on 07.09.2016.
 */
@RestController
class MainMockController {
    @RequestMapping(value = "/check/email", method = RequestMethod.POST)
    @ResponseBody
    Boolean checkEmail(@RequestBody EmailCheckUI email) {
        return !["test@test.com"].contains(email.email);
    }

    @RequestMapping(value = "/configuration/application/id", method = RequestMethod.GET)
    @ResponseBody
    String configurationApplicationId() {
        return "dev";
    }

    @RequestMapping(value = "/registration/counters/{sessionId}", method = RequestMethod.GET)
    @ResponseBody
    List<Map> getCounterBySessionId(@PathVariable String sessionId) {
        return [
                [
                        "id"  : 1,
                        "name": "name 1",
                ],
                [
                        "id"  : 2,
                        "name": "name 2"
                ]
        ];
    }

    @RequestMapping(value = "/accounts/sites", method = RequestMethod.GET)
    @ResponseBody
    List<Map> getSites() {
        return [
                [
                        "name": "milktech.ru"
                ],
                [
                        "name": "cvetomaster.ru"
                ]
        ];
    }

    @RequestMapping(value = "/summaries/status/{siteName}", method = RequestMethod.GET)
    @ResponseBody
    Map getSummaryStatus(@PathVariable String siteName) {
        return [
                "status": "LOADING",
                "date"  : LocalDate.now()
        ];
    }


}
