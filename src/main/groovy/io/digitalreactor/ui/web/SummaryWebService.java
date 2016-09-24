package io.digitalreactor.ui.web;

import io.digitalreactor.web.contract.SummaryWebServiceContract;
import io.digitalreactor.web.contract.dto.SummaryStatusEnum;
import io.digitalreactor.web.contract.dto.SummaryStatusUI;
import io.digitalreactor.web.contract.dto.report.*;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.IntStream;
import java.util.stream.Stream;

import static java.util.stream.Collectors.toList;

/**
 * Created by MStepachev on 12.09.2016.
 */
@RestController
@RequestMapping(value = SummaryWebServiceContract.WEB_SERVICE_PATH)
public class SummaryWebService implements SummaryWebServiceContract {

    private final String ADVERTISING_SOURCE = "Переходы по рекламе";
    private final String SEARCH_SYSTEM_SOURCE = "Переходы из поисковых систем";
    private final String SOCIAL_NETWORK_SOURCE = "Переходы из соц. сетей";

    @RequestMapping(value = SITE_STATUS_PATH, method = RequestMethod.GET)
    @ResponseBody
    @Override
    public SummaryStatusUI getSummaryStatus(@PathVariable String siteId) {
        if(siteId.equals("id1")) {
            return new SummaryStatusUI(SummaryStatusEnum.DONE.name(), LocalDate.now(), "taskId");
        }

        return new SummaryStatusUI(SummaryStatusEnum.LOADING.name(), LocalDate.now(), "taskId");
    }

    @RequestMapping(value = SUMMARY_TASK_PATH, method = RequestMethod.GET)
    @ResponseBody
    @Override
    public Summary getSummary(@PathVariable String summaryTaskId) {

        return new Summary("sfa3r43f3", Arrays.asList(
                visitsDuringMonthReportDto(),
                referringSourceReportDto()
        ));
    }

    private ReferringSourceReportDto referringSourceReportDto() {
        return new ReferringSourceReportDto(
                Arrays.asList(
                        new ReferringSourceDto(ADVERTISING_SOURCE, 10, 10, 10, 10, 10, 10, crateMetricsVisit()),
                        new ReferringSourceDto(SEARCH_SYSTEM_SOURCE, 10, 10, 10, 10, 10, 10, crateMetricsVisit()),
                        new ReferringSourceDto(SOCIAL_NETWORK_SOURCE, 10, 10, 10, 10, 10, 10, crateMetricsVisit())
                ),
                40,
                12.3,
                232,
                ActionEnum.INCREASING
        );
    }

    private VisitsDuringMonthReportDto visitsDuringMonthReportDto() {
        return new VisitsDuringMonthReportDto(
                10,
                10,
                ActionEnum.INCREASING,
                crateMetricsVisit(),
                "Reason"
        );
    }

    private List<VisitDto> crateMetricsVisit() {
        return IntStream.range(0, 30).mapToObj(indexDay -> new VisitDto(
                indexDay,
                LocalDate.now().minusDays(indexDay).toString(),
                dayType(indexDay)
        )).collect(toList());
    }

    private VisitDto.DayType dayType(int dayIndex) {
        return isHoliday(dayIndex) ? VisitDto.DayType.HOLIDAY : VisitDto.DayType.WEEKDAY;
    }

    private boolean isHoliday(int dayIndex) {
        return dayIndex % 7 == 0 || (dayIndex + 1) % 7 == 0;
    }

}
