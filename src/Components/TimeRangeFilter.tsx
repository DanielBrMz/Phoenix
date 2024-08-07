/*
import React from 'react';
import TimeRangeSliderFactory from '../common/TimeRangeSlider';
import {DEFAULT_TIME_FORMAT, FILTER_VIEW_TYPES} from '../constants/settings';
import {TimeRangeFilter} from '../types/reducers';
import {TimeRangeFilterProps} from '../types/index';
export function timeRangeSliderFieldsSelector(filter: TimeRangeFilter) {
  const hasUserFormat = typeof filter.timeFormat === 'string';
  const timeFormat =
    (hasUserFormat ? filter.timeFormat : filter.defaultTimeFormat) || DEFAULT_TIME_FORMAT;

  return {
    id: filter.id,
    domain: filter.domain,
    bins: filter.bins,
    value: filter.value,
    plotType: filter.plotType,
    lineChart: filter.lineChart,
    yAxis: filter.yAxis,
    step: filter.step,
    speed: filter.speed,
    histogram:
      filter.view === FILTER_VIEW_TYPES.enlarged ? filter.enlargedHistogram : filter.histogram,
    animationWindow: filter.animationWindow,
    isAnimating: filter.isAnimating,
    timezone: filter.timezone,
    timeFormat,
    isMinified: filter.view === FILTER_VIEW_TYPES.minified,
    isEnlarged: filter.view === FILTER_VIEW_TYPES.enlarged
  };
}

TimeRangeFilterFactory.deps = [TimeRangeSliderFactory];

function TimeRangeFilterFactory(TimeRangeSlider: ReturnType<typeof TimeRangeSliderFactory>) {
  const TimeRangeFilterComponent: React.FC<TimeRangeFilterProps> = ({
    filter,
    setFilter,
    isAnimatable,
    toggleAnimation,
    hideTimeTitle,
    timeline
  }) => (
    <TimeRangeSlider
      {...timeRangeSliderFieldsSelector(filter)}
      onChange={setFilter}
      toggleAnimation={toggleAnimation}
      isAnimatable={isAnimatable}
      hideTimeTitle={hideTimeTitle}
      timeline={timeline}
    />
  );

  return TimeRangeFilterComponent;
}

export default TimeRangeFilterFactory;
*/