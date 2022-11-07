import {
  ComponentType,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { IFaciApiContext } from "./interface";
import * as faceapi from "face-api.js";

const Context = createContext<IFaciApiContext>({} as IFaciApiContext);

const withFaciApiProvider = (Component: ComponentType) => {
  return () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const previewRef = useRef<HTMLCanvasElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    
    const [stream, setStream] = useState<MediaStream>()
    const [isModelLoaded, setIsModelLoaded] = useState<boolean>(false);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    useEffect(() => {
      const loadModels = async () => {
        const MODEL_URL = process.env.PUBLIC_URL + "/models";
        Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
          faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
          faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
        ]).then(() => setIsModelLoaded(true));
      };
      loadModels();
    }, []);

    return (
      <Context.Provider
        value={{
          isModelLoaded,
          isPlaying,
          setIsPlaying,
          videoRef,
          textRef,
          canvasRef,
          previewRef,
          stream,
          setStream
        }}
      >
        <Component />
      </Context.Provider>
    );
  };
};

export const useFaceApiProvider = () => useContext(Context);

export default withFaciApiProvider;
