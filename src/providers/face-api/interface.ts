import { RefObject } from "react";

export interface IFaciApiContext {
  isModelLoaded: boolean;
  isPlaying: boolean;
  setIsPlaying: (v: boolean) => void;
  videoRef: RefObject<HTMLVideoElement>;
  canvasRef: RefObject<HTMLCanvasElement>;
  previewRef: RefObject<HTMLCanvasElement>;
  textRef: RefObject<HTMLHeadingElement>;
  stream?: MediaStream;
  setStream: (v: MediaStream) => void
}
