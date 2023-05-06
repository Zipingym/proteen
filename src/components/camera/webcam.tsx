import useWebcam from '$/hooks/useWebcam';
import { useEffect, useState } from 'react';
import { MutableRefObject, useRef } from 'react';
import DevideInfo from './deviceInfo';
import styled from 'styled-components';
import {
  NormalizedLandmarkList,
  drawConnectors,
  drawLandmarks,
} from '@mediapipe/drawing_utils';
import { POSE_CONNECTIONS } from '@mediapipe/pose';

const Webcam = (props: {
  videoRef: MutableRefObject<HTMLVideoElement>;
  skeleton: NormalizedLandmarkList;
  onPlay: () => void;
}) => {
  const [isWebcam, setIsWebcam] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(document.createElement('canvas'));
  const [devides, setVideo] = useWebcam();

  useEffect(() => {
    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext('2d')!;
    const image = props.videoRef.current;
    canvasElement.height =
      (image.videoHeight * canvasElement.width) / image.videoWidth;
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.globalCompositeOperation = 'source-in';
    canvasCtx.fillStyle = '#00FF00';
    canvasCtx.fillRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.globalCompositeOperation = 'destination-atop';
    canvasCtx.drawImage(image, 0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.globalCompositeOperation = 'source-over';
    if (props.skeleton.length > 0) {
      const landmarks = props.skeleton;
      drawConnectors(canvasCtx, landmarks, POSE_CONNECTIONS, {
        color: '#00FF00',
        lineWidth: 4,
      });
      drawLandmarks(canvasCtx, landmarks, {
        color: '#FF0000',
        lineWidth: 2,
      });
      canvasCtx.restore();
    }
  }, [props.skeleton]);

  return (
    <div style={{ height: '100%', padding: '1rem', boxSizing: 'border-box' }}>
      {isWebcam ? null : (
        <div style={{ width: '700px' }}>
          <Title>Camera</Title>
          {devides.map((device, idx) => {
            return (
              <DevideInfo
                name={device.label}
                onClick={() => {
                  setVideo(props.videoRef.current, idx, {
                    width: 540,
                    height: 540,
                    frameRate: 60,
                  });
                }}
                key={idx}
              />
            );
          })}
          <DevideInfo
            name={'파일'}
            onClick={() => {
              alert('해당 기능은 현재 구현되지 않았습니다');
            }}
          />
        </div>
      )}
      <video
        ref={props.videoRef}
        style={{
          display: isWebcam ? 'none' : 'none',
          height: '100%',
          borderRadius: '10px',
          transform: 'scaleX(-1)',
        }}
        onPlay={() => {
          setIsWebcam(true);
          props.onPlay();
        }}
      ></video>
      <canvas
        ref={canvasRef}
        style={{
          display: isWebcam ? 'block' : 'none',
          height: '100%',
          borderRadius: '10px',
          transform: 'scaleX(-1)',
        }}
      ></canvas>
    </div>
  );
};

export default Webcam;

const Title = styled.div`
  margin-top: 10px;
  color: #ffffff;
  font-size: 25px;
  font-weight: 300;
`;
