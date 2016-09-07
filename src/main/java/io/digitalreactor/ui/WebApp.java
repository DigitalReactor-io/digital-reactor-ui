package io.digitalreactor.ui;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.ComponentScans;
import org.springframework.stereotype.Controller;

/**
 * Created by MStepachev on 07.09.2016.
 */
@Controller
@EnableAutoConfiguration
@ComponentScan("io.digitalreactor.ui.controller")
public class WebApp {
    public static void main(String[] args) throws Exception {
        SpringApplication.run(WebApp.class, args);
    }
}
