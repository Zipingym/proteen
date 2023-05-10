import useWebcam from '$/hooks/useWebcam';
import { useEffect, useState } from 'react';
import { MutableRefObject, useRef } from 'react';
import DevideInfo from './deviceInfo';
import styled from 'styled-components';
import { NormalizedLandmarkList } from '@mediapipe/drawing_utils';
import useMpDrawutil from '$/hooks/useMpDrawutil';
import useFileInput from '$/hooks/useFileInput';

const Webcam = (props: {
  videoRef: MutableRefObject<HTMLVideoElement>;
  canvasRef: MutableRefObject<HTMLCanvasElement>;
  skeleton: NormalizedLandmarkList;
  onPlay: (count: number) => void;
}) => {
  const [device, setDevice] = useState<number>(-2);
  const [isPlaying, setIsPlaying] = useState(false);
  const [countVal, setCountVal] = useState(10);
  const canvasRef = useRef<HTMLCanvasElement>(document.createElement('canvas'));
  const [devideList, setWebcam] = useWebcam();
  const mpDrawutil = useMpDrawutil(canvasRef.current, props.videoRef.current);
  const [fileSelect, fileData] = useFileInput('video/*');

  useEffect(() => {
    mpDrawutil(props.skeleton);
  }, [props.skeleton]);

  const onStart = () => {
    if (device === -2) {
      alert('입력기기가 선택되지 않았습니다');
      return;
    } else if (device === -1) {
      if (fileData === null) {
        alert('파일이 선택되지 않았습니다');
        return;
      } else {
        props.videoRef.current.src = URL.createObjectURL(fileData);
        props.videoRef.current.muted = true;
        props.onPlay(countVal);
      }
    } else {
      setWebcam(props.videoRef.current, device, {
        width: 540,
        height: 540,
      });
      props.onPlay(countVal);
    }
  };

  return (
    <div
      style={{
        height: '100%',
        padding: '1rem',
        boxSizing: 'border-box',
        position: 'relative',
      }}
    >
      {isPlaying ? null : (
        <div style={{ width: '700px', marginTop: '7%', marginLeft: '12%' }}>
          <Title>Camera</Title>
          {devideList.map((deviceInfo, idx) => {
            return (
              <DevideInfo
                name={deviceInfo.label}
                onClick={() => {
                  setDevice(idx);
                }}
                key={idx}
                focus={idx == device}
              />
            );
          })}
          <DevideInfo
            name={fileData === null ? '파일' : `파일 (${fileData.name})`}
            onClick={() => {
              setDevice(-1);
              fileSelect();
            }}
            focus={device == -1}
          />
          <Input
            type="range"
            min={0}
            max={100}
            value={countVal}
            onChange={(e) => {
              setCountVal(Number(e.target.value));
            }}
          ></Input>
          <InputVal>{countVal}</InputVal>
          <Button onClick={onStart}> 분석 시작 </Button>
        </div>
      )}
      <video
        ref={props.videoRef}
        style={{
          display: 'none',
          height: '100%',
          borderRadius: '10px',
          transform: 'scaleX(-1)',
        }}
        onPlay={() => {
          setIsPlaying(true);
        }}
      ></video>
      <canvas
        ref={canvasRef}
        style={{
          display: isPlaying ? 'block' : 'none',
          height: '100%',
          borderRadius: '10px',
          transform: 'scaleX(-1)',
          minWidth: '700px',
          maxWidth: '1100px',
        }}
      ></canvas>
    </div>
  );
};

export default Webcam;

const Title = styled.div`
  margin-top: 13%;
  margin-left: 15px;
  color: #ffffff;
  font-size: 25px;
  font-weight: 400;
`;

const Button = styled.button`
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  width: 500px;
  height: 80px;
  position: absolute;
  bottom: 14%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #3b3b3b;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ddd;
  font-size: 32px;
  cursor: pointer;

  &:before,
  &:after {
    position: absolute;
    content: '';
    right: 0;
    bottom: 0;
    background: #1df659;
    box-shadow: 4px 4px 6px 0 rgba(255, 255, 255, 0.5),
      -4px -4px 6px 0 rgba(116, 125, 136, 0.2),
      inset -4px -4px 6px 0 rgba(255, 255, 255, 0.5),
      inset 4px 4px 6px 0 rgba(116, 125, 136, 0.3);
    transition: all 0.3s ease;
  }
  &:before {
    height: 0%;
    width: 2px;
  }
  &:after {
    width: 0%;
    height: 2px;
  }
  &:hover:before {
    height: 100%;
  }
  &:hover:after {
    width: 100%;
  }
  &:hover {
    background: black;
    color: #1df659;
  }
`;

const Input = styled.input`
  bottom: 25%;
  width: 500px;
  height: 80px;
  position: absolute;
  left: 15%;
`;

const InputVal = styled.div`
  width: 100px;
  height: 80px;
  position: absolute;
  bottom: 30%;
  left: 11%;
  color: #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
`;
