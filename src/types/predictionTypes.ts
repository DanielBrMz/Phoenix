// /types/predictionTypes.ts

export type GridData = number[][];

export interface PredictionRequest {
  frames: GridData[];
}

// export interface PredictionResponse {
//   predictedFrames: GridData[]; // Response might contain predicted frames in the same format
// }
