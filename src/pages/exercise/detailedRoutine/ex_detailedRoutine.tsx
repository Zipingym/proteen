import React, { useEffect, useRef } from 'react';
import * as S from './ex_detailedRoutine.style';
import DetailedImg2 from './img/Polygon 2.png';
import useWebcam from '$/hooks/useWebcam';
import Webcam from '$/components/camera/webcam';
import FeedBack from './feedback';

const ex_detailedRoutine = () => {
  const canvasRef = useRef<HTMLCanvasElement>(document.createElement('canvas'));
  const videoRef = useRef<HTMLVideoElement>(document.createElement('video'));
  return (
    <S.Body>
      <S.WebcamWrapper>
        <Webcam canvasRef={canvasRef} videoRef={videoRef}></Webcam>
      </S.WebcamWrapper>

      <S.Contents>
        <S.topContent>
          <S.exTitle>
            <S.routine>
              <S.topImg2 src={DetailedImg2} alt="Error" />
              복근 루틴 1/12
            </S.routine>
            <S.title>크런치</S.title>
            <S.info>
              복근 중 상부를 강화하는 운동으로 윗몸 일으키기의 변형 동작
            </S.info>
            <S.topVideo
              src="https://www.youtube.com/embed/uxiSkR-oqqs"
              title="YouTube video player"
            />
          </S.exTitle>
        </S.topContent>
        <FeedBack
          comment={''}
          currentCount={0}
          maxCount={0}
          averageScore={0}
          currentScore={0}
        />
      </S.Contents>
    </S.Body>
  );
};

export default ex_detailedRoutine;
