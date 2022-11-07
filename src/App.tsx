import { Col, Image, Row, Button, Typography } from "antd";
import * as faceapi from "face-api.js";
import React, { useState } from "react";
import withFaciApiProvider, { useFaceApiProvider } from "./providers/face-api";
import styled from "styled-components";

const displaySize = {
  width: 300,
  height: 300,
};

function App() {
  const {
    setIsPlaying,
    isModelLoaded,
    isPlaying,
    videoRef,
    setStream,
    stream,
    textRef,
  } = useFaceApiProvider();

  const openVideo = async () => {
    try {
      const request = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", ...displaySize },
        audio: false,
      });
      if (request.active && videoRef.current) {
        setIsPlaying(true);
        videoRef.current.srcObject = request;
        videoRef.current.play();
        setStream(request);
      }
    } catch (err) {
      //
    }
  };

  const closeVideo = async () => {
    videoRef.current?.pause();
    setIsPlaying(false);
    stream?.getTracks().forEach((e) => {
      if (e.readyState === "live") {
        e.stop();
      }
    });
  };

  if (!isModelLoaded) {
    return <div className="center h-full">Loading...</div>;
  }

  return (
    <div className="center h-full overflow-hidden">
      <Row gutter={[24, 24]} justify="center" className="w-full">
        <Col>
          <Button onClick={isPlaying ? closeVideo : openVideo}>
            {isPlaying ? "Pause video" : "Play Video"}
          </Button>
        </Col>
        <Col span={24}>
          <Typography.Title ref={textRef} className="text-center" level={5}>
            กรุณาปรับใบหน้าให้ตรงกรอบ
          </Typography.Title>
        </Col>
        <Col>
          <VideoPlayer />
        </Col>
        <Col>
          <CapturePreview />
        </Col>
      </Row>
    </div>
  );
}
const CaptureAreaBox = styled.div`
  position: absolute;
  width: 200px;
  height: 200px;
  border: 5px solid red;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
`;
const VideoPlayer = () => {
  const { canvasRef, videoRef, previewRef, textRef } = useFaceApiProvider();

  const onPlay = () => {
    setInterval(async () => {
      if (!videoRef.current || !canvasRef.current || !textRef.current) return;
      faceapi.matchDimensions(canvasRef.current, displaySize);
      const detections = await faceapi
        .detectSingleFace(
          videoRef.current,
          new faceapi.TinyFaceDetectorOptions()
        )
        .withFaceExpressions();
      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      canvasRef.current
        .getContext("2d")
        ?.clearRect(0, 0, displaySize.width, displaySize.height);

      if (!resizedDetections) return;

      const frame_x = resizedDetections.detection.box.x;
      const frame_y = resizedDetections.detection.box.y;
      console.log("frame_x", frame_x);
      console.log("frame_y", frame_y);
      console.log("_________________________");

      if (frame_x < 65 || frame_x > 95 || frame_y < 95 || frame_y > 135) {
        textRef.current.innerText = "ใกล้หรือใกลเกินไป";
        return;
      }

      // faceapi.draw.drawDetections(canvasRef.current, resizedDetections);

      previewRef.current
        ?.getContext("2d")
        ?.drawImage(
          videoRef.current,
          0,
          0,
          displaySize.width,
          displaySize.height
        );
      previewRef.current
        ?.getContext("2d")
        ?.drawImage(
          canvasRef.current,
          0,
          0,
          displaySize.width,
          displaySize.height
        );
        textRef.current.innerText = "ใช้ได้";
    }, 3000);
  };

  return (
    <div className="border relative" style={{ ...displaySize }}>
      <video
        ref={videoRef}
        {...displaySize}
        playsInline
        onPlay={onPlay}
        style={{ transform: "scaleX(-1)", ...displaySize }}
      />
      <canvas
        ref={canvasRef}
        {...displaySize}
        style={{ position: "absolute", transform: "scaleX(-1)", top: 0 }}
      />
      <CaptureAreaBox />
    </div>
  );
};

const CapturePreview = () => {
  const { previewRef } = useFaceApiProvider();
  return (
    <div className="border" style={{ ...displaySize }}>
      <canvas
        ref={previewRef}
        {...displaySize}
        style={{ transform: "scaleX(-1)" }}
      />
    </div>
  );
};

export default withFaciApiProvider(App);
