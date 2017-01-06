package io.digitalreactor.ui.web;

import io.digitalreactor.web.contract.SummaryWebServiceContract;
import io.digitalreactor.web.contract.dto.SummaryStatusEnum;
import io.digitalreactor.web.contract.dto.SummaryStatusUI;
import io.digitalreactor.web.contract.dto.report.*;
import io.digitalreactor.web.contract.dto.report.direct.DSPCutType;
import io.digitalreactor.web.contract.dto.report.direct.DirectSearchPhraseCutDto;
import io.digitalreactor.web.contract.dto.report.direct.DirectSearchPhraseDto;
import io.digitalreactor.web.contract.dto.report.direct.DirectSearchPhraseReportDto;
import io.digitalreactor.web.contract.dto.report.referringsource.GoalReferringSources;
import io.digitalreactor.web.contract.dto.report.referringsource.ReferringSource;
import io.digitalreactor.web.contract.dto.report.referringsource.ReferringSourceReport;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.IntStream;
import java.util.stream.Stream;

import static java.util.Arrays.asList;
import static java.util.Collections.singletonList;
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
        if (siteId.equals("id1")) {
            return new SummaryStatusUI(SummaryStatusEnum.DONE.name(), new Date(), "taskId");
        }

        if (siteId.equals("id3")) {
            return new SummaryStatusUI(SummaryStatusEnum.DONE.name(), new Date(), "taskId2");
        }

        return new SummaryStatusUI(SummaryStatusEnum.LOADING.name(), new Date(), "taskId");
    }

    @RequestMapping(value = SUMMARY_TASK_PATH, method = RequestMethod.GET)
    @ResponseBody
    @Override
    public Summary getSummary(@PathVariable String summaryTaskId) {

        if (summaryTaskId.equals("2")) {
            return new Summary("sfa3r43f3", asList(
                    visitsDuringMonthReportDto(),
                    referringSourceReportWithoutSources(),
                    directSearchPhraseReportDto()
            ));
        }

        return new Summary("sfa3r43f3", asList(
                visitsDuringMonthReportDto(),
                referringSourceReport(),
                directSearchPhraseReportDto()
        ));
    }

    @RequestMapping(value = RELOAD_SUMMARY_PATH, method = RequestMethod.PUT)
    @ResponseBody
    @Override
    public SummaryStatusUI reloadSummary(String siteId) {
        return new SummaryStatusUI(SummaryStatusEnum.LOADING.name(), new Date(), "taskId");
    }

    private ReferringSourceReport referringSourceReportWithoutSources() {
        return new ReferringSourceReport(createReferringSource(), null);
    }

    private ReferringSourceReport referringSourceReport() {
        return new ReferringSourceReport(createReferringSource(), goalReferringSources());
    }

    private List<GoalReferringSources> goalReferringSources() {
        List<GoalReferringSources> goalReferringSources = new ArrayList<>();

        goalReferringSources.add(goalReferringSources("Goal #1"));
        goalReferringSources.add(goalReferringSources("Goal #2"));

        return goalReferringSources;
    }

    private GoalReferringSources goalReferringSources(String name) {
        return new GoalReferringSources(name, createReferringSource(), random(), random(), random());
    }

    private List<ReferringSource> createReferringSource() {
        List<ReferringSource> referringSources = new ArrayList<>();
        referringSources.add(referringSource(ADVERTISING_SOURCE));
        referringSources.add(referringSource(SEARCH_SYSTEM_SOURCE));
        referringSources.add(referringSource(SOCIAL_NETWORK_SOURCE));


        return referringSources;
    }

    private ReferringSource referringSource(String name) {
        return new ReferringSource(
                name,
                crateMetricsVisit(),
                random(),
                random(),
                random(),
                random(),
                random(),
                random()
        );
    }

    private List<Integer> randomListWithInt() {
        return IntStream.range(0, 30).mapToObj(indexDay -> (int) (Math.random() * 1000) + indexDay).collect(toList());
    }

    private int random() {
        return (int) (Math.random() * 1000) - 100;
    }

    private DirectSearchPhraseReportDto directSearchPhraseReportDto() {
        return new DirectSearchPhraseReportDto(asList(
                new DirectSearchPhraseCutDto("System goal", DSPCutType.SYSTEM,
                        asList(
                                new DirectSearchPhraseDto("test 1", 123, 233, 2343, 234, 23),
                                new DirectSearchPhraseDto("test 2", 123, 233, 2343, 234, 23)
                        ),
                        asList(
                                new DirectSearchPhraseDto("test 1", 123, 233, 2343, 234, 23),
                                new DirectSearchPhraseDto("test 2", 123, 233, 2343, 234, 23)
                        )),
                new DirectSearchPhraseCutDto("Goal2", DSPCutType.GOAL,
                        asList(
                                new DirectSearchPhraseDto("test 1", 123, 233, 2343, 234, 11),
                                new DirectSearchPhraseDto("test 2", 123, 233, 2343, 234, 11)
                        ),
                        asList(
                                new DirectSearchPhraseDto("test 1", 123, 233, 2343, 234, 12),
                                new DirectSearchPhraseDto("test 2", 123, 233, 2343, 234, 13)
                        ))
        ));
    }

    private VisitsDuringMonthReportDto visitsDuringMonthReportDto() {
        return new VisitsDuringMonthReportDto(
                10,
                10,
                1.235346643643534,
                ActionEnum.INCREASING,
                crateMetricsVisit(),
                "Reason"
        );
    }

    private List<VisitDto> crateMetricsVisit() {
        return IntStream.range(0, 30).mapToObj(indexDay -> new VisitDto(
                Math.abs(random()),
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
