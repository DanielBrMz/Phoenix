/* import * as React from 'react';

declare function KeyMirror<T>(obj: T): {[K in keyof T]: K};
export = KeyMirror;


export function polyfill<T extends React.ComponentType<any>>(
  Comp: T
): T & { [K in keyof T]: T[K] };

export type Value = string | number | boolean | undefined | null;
export type Mapping = { [key: string]: any };
export type Argument = Value | Mapping | Argument[];

export function classNames(...args: Argument[]): string;

export type TimeRangeFilterProps = {
    filter: TimeRangeFilter;
    isAnimatable: boolean;
    hideTimeTitle: boolean;
    setFilter: (v: number[]) => void;
    toggleAnimation: () => void;
    timeline: Timeline;
  }; */