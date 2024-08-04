/* eslint-disable @typescript-eslint/no-unsafe-return */
import { snapToMarks } from "./plot";
import assert from 'assert';

export function clamp([min, max]: [number, number], val = 0): number {
  return val <= min ? min : val >= max ? max : val;
}

export function getSampleData(data: string | number[], sampleSize = 500, getValue = (d: number) => d) {
  const sampleStep = Math.max(Math.floor(data.length / sampleSize), 1);
  const output: number[] = [];
  for (let i = 0; i < data.length; i += sampleStep) {
    output.push(getValue(data[i] as number));
  }

  return output;
}

/**
 * Whether d is a number, this filtered out NaN as well
 */
export function isNumber(d: unknown) {
    return Number.isFinite(d);
  }

/**
 * round number with exact number of decimals
 * return as a string
 */
export function preciseRound(num: number, decimals: number): string {
    const t = Math.pow(10, decimals);
    return (
      Math.round(
        num * t + (decimals > 0 ? 1 : 0) * (Math.sign(num) * (10 / Math.pow(100, decimals)))
      ) / t
    ).toFixed(decimals);
  }
  

/**
 * get number of decimals to round to for slider from step
 * @param step
 * @returns- number of decimal
 */
export function getRoundingDecimalFromStep(step: number): number {
    if (isNaN(step)) {
      assert('step is not a number');
      assert(step);
    }
  
    const stepStr = step.toString();
  
    // in case the step is a very small number e.g. 1e-7, return decimal e.g. 7 directly
    const splitExponential = stepStr.split('e-');
    if (splitExponential.length === 2) {
      const coeffZero = splitExponential[0]!.split('.');
      const coeffDecimal = coeffZero.length === 1 ? 0 : coeffZero[1]!.length;
      return parseInt(splitExponential[1]!, 10) + coeffDecimal;
    }
  
    const splitZero = stepStr.split('.');
    if (splitZero.length === 1) {
      return 0;
    }
    return splitZero[1]!.length;
  }

export function normalizeSliderValue(
    val: number,
    minValue: number,
    step: number,
    marks?: number[]
  ): number {
    if (marks?.length) {
      // Use in slider, given a number and an array of numbers, return the nears number from the array
      return snapToMarks(val, marks);
    }
  
    return roundValToStep(minValue, step, val);
  }

  /**
 * round the value to step for the slider
 * @param minValue
 * @param step
 * @param val
 * @returns - rounded number
 */
export function roundValToStep(minValue: number, step: number, val: number): number {
    if (!isNumber(step) || !isNumber(minValue)) {
      return val;
    }
  
    const decimal = getRoundingDecimalFromStep(step);
    const steps = Math.floor((val - minValue) / step);
    let remain = val - (steps * step + minValue);
  
    // has to round because javascript turns 0.1 into 0.9999999999999987
    remain = Number(preciseRound(remain, 8));
  
    let closest: number;
    if (remain === 0) {
      closest = val;
    } else if (remain < step / 2) {
      closest = steps * step + minValue;
    } else {
      closest = (steps + 1) * step + minValue;
    }
  
    // precise round return a string rounded to the defined decimal
    const rounded = preciseRound(closest, decimal);
  
    return Number(rounded);
  }