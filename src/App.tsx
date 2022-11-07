import { Col, Image, Row } from "antd";
import * as faceapi from "face-api.js";
import React, { useState } from "react";
import withFaciApiProvider, { useFaceApiProvider } from "./providers/face-api";

const displaySize = {
  width: 300,
  height: 300,
};

function App() {
  const [modelsLoaded, setModelsLoaded] = React.useState(false);
  const [captureVideo, setCaptureVideo] = React.useState(false);
  const [previewSrc, setPreviewSrc] = useState<string>();

  const startVideo = () => {
    // setCaptureVideo(true);
    // navigator.mediaDevices
    //   .getUserMedia({ video: { width: 300, facingMode: 'user' }, audio: false })
    //   .then((stream) => {
    //     if (!videoRef.current) return;
    //     let video = videoRef.current;
    //     video.srcObject = stream;
    //     video.play();
    //   })
    //   .catch((err) => {
    //     console.error("error:", err);
    //     alert(err)
    //   });
  };

  const handleVideoOnPlay = () => {
    // setInterval(async () => {
    // if (!canvasRef.current || !videoRef.current) return;
    // canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(
    //   videoRef.current
    // ).outerHTML;
    // faceapi.matchDimensions(canvasRef.current, displaySize);
    // const detections = await faceapi
    //   .detectSingleFace(
    //     videoRef.current,
    //     new faceapi.TinyFaceDetectorOptions()
    //   )
    //   .withFaceExpressions();
    // const resizedDetections = faceapi.resizeResults(detections, displaySize);
    // canvasRef.current
    //   .getContext("2d")
    //   ?.clearRect(0, 0, videoWidth, videoHeight);
    // if (!resizedDetections) return;
    // const frame_height = resizedDetections.detection.box.height;
    // const frame_width = resizedDetections.detection.box.width;
    // const frame_x = resizedDetections.detection.box.x;
    // const frame_y = resizedDetections.detection.box.y;
    // console.log("frame_x", frame_x);
    // console.log("frame_y", frame_y);
    // console.log("_________________________");
    // if (frame_x > 10 || frame_y < 200) return;
    // console.log('frame_height', frame_height)
    // console.log('frame_width', frame_width)
    // faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
    // faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
    // faceapi.draw.drawFaceExpressions(canvasRef.current, resizedDetections);
    // const base64 = canvasRef.current.getContext('2d')?.canvas.toDataURL()
    // }, 5000);
  };

  const closeWebcam = () => {
    // if (!videoRef.current) return;
    // videoRef.current.pause();
    // videoRef.current?.srcObject?.getTracks?.()[0].stop();
    // setCaptureVideo(false);
  };

  return (
    <Row>
      <Col span={12}>
        <VideoPlayer />
      </Col>
      <Col span={12}>
        <CapturePreview />
      </Col>
    </Row>
  );
}

const VideoPlayer = () => {
  const { canvasRef, videoRef } = useFaceApiProvider();
  return (
    <React.Fragment>
      <video ref={videoRef} {...displaySize} playsInline />
      <canvas ref={canvasRef} {...displaySize}  />
    </React.Fragment>
  );
};

const CapturePreview = () => {
  return null;
};

export default withFaciApiProvider(App);
