package io.digitalreactor.ui.web;

import io.digitalreactor.web.contract.SummaryWebServiceContract;
import io.digitalreactor.web.contract.dto.SummaryStatusEnum;
import io.digitalreactor.web.contract.dto.SummaryStatusUI;
import io.digitalreactor.web.contract.dto.report.ActionEnum;
import io.digitalreactor.web.contract.dto.report.VisitDto;
import io.digitalreactor.web.contract.dto.report.VisitsDuringMonthReportDto;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
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
    @RequestMapping(value = SITE_STATUS_PATH, method = RequestMethod.GET)
    @ResponseBody
    @Override
    public SummaryStatusUI getSummaryStatus(@PathVariable String siteName) {
        return new SummaryStatusUI(SummaryStatusEnum.LOADING.name(), LocalDate.now());
    }

    @RequestMapping(value = SUMMARY_PATH, method = RequestMethod.GET)
    @ResponseBody
    @Override
    public List<Object> getSummary(@PathVariable String summaryId) {

        List<VisitDto> visitDtos = IntStream.range(0, 30).mapToObj(indexDay -> new VisitDto(
                indexDay,
                LocalDate.now().minusDays(indexDay).toString(),
                dayType(indexDay)
        )).collect(toList());

        VisitsDuringMonthReportDto visitsDuringMonthReportDto = new VisitsDuringMonthReportDto(
                10,
                10,
                ActionEnum.INCREASING,
                visitDtos,
                "Reason"
        );

        return Arrays.asList(visitsDuringMonthReportDto);
    }

    private VisitDto.DayType dayType(int dayIndex) {
        return isHoliday(dayIndex) ? VisitDto.DayType.HOLIDAY : VisitDto.DayType.WEEKDAY;
    }

    private boolean isHoliday(int dayIndex) {
        return dayIndex % 7 == 0 || (dayIndex+1) % 7 == 0;
    }

}
