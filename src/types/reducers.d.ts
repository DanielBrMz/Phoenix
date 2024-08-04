export type TimeRangeFilter = {
    type: "timeRange";
    fieldType: "timestamp";
    fixedDomain: true;
    value: [number, number];
    bins?: unknown;
    plotType: Record<string, unknown>;
    animationWindow: string;
  }; /* */
