import { RefObject } from "react";

export interface IFaciApiContext {
  isModelLoaded: boolean;
  videoRef: RefObject<HTMLVideoElement>;
  canvasRef: RefObject<HTMLCanvasElement>;
}
