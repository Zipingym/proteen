import useWebcam from '$/hooks/useWebcam';
import { useState } from 'react';
import { MutableRefObject, useRef } from 'react';
import DevideInfo from './deviceInfo';
import styled from 'styled-components';

const Webcam = (props: {
  videoRef: MutableRefObject<HTMLVideoElement>;
  canvasRef: MutableRefObject<HTMLCanvasElement>;
}) => {
  const [isWebcam, setIsWebcam] = useState(false);
  const [devides, setVideo] = useWebcam();

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
        </div>
      )}
      <video
        ref={props.videoRef}
        style={{
          display: isWebcam ? 'block' : 'none',
          height: '100%',
          borderRadius: '10px',
          transform: 'scaleX(-1)',
        }}
        onPlay={() => {
          setIsWebcam(true);
        }}
      ></video>
      {/* <canvas ref={props.canvasRef}></canvas> */}
    </div>
  );
};

export default Webcam;

const Title = styled.div`
  margin-top: 10px;
  color: #ffffff;
  font-size: 25px; 
  font-weight: 300;
`