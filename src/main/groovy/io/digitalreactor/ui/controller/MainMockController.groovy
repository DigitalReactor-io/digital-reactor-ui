package io.digitalreactor.ui.controller

import io.digitalreactor.ui.model.EmailCheckUI
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.ResponseBody
import org.springframework.web.bind.annotation.RestController

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
}
