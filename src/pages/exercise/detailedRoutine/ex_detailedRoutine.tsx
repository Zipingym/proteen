import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as S from './ex_detailedRoutine.style';
import DetailedImg2 from './img/Polygon 2.png';
import '@tensorflow/tfjs-backend-webgl';
import Webcam from '$/components/camera/webcam';
import FeedBack from './feedback';
import usePipeline from '$/hooks/usePipeline';
import { NormalizedLandmarkList } from '@mediapipe/drawing_utils';

const ex_detailedRoutine = () => {
  const videoRef = useRef<HTMLVideoElement>(document.createElement('video'));
  const [skeleton, setSkeleton] = useState<NormalizedLandmarkList>(new Array());
  const [init, send] = usePipeline();
  useEffect(() => {
    init();
  }, [init]);
  const [isPlay, setIsPlay] = useState(false);
  const onPlay = useCallback(() => {
    if (isPlay === false) {
      setIsPlay(true);
    }
  }, [isPlay]);
  useEffect(() => {
    if (isPlay) {
      let intervalId: NodeJS.Timer;
      let timer = setTimeout(() => {
        intervalId = setInterval(() => {
          send(videoRef.current).then((value) => {
            setSkeleton(value.landmarks);
          });
        }, 1000 / 60);
      }, 1000);
      return () => {
        clearTimeout(timer);
        clearInterval(intervalId);
      };
    }
  }, [isPlay]);
  return (
    <S.Body>
      <S.WebcamWrapper>
        <Webcam
          skeleton={skeleton}
          videoRef={videoRef}
          onPlay={onPlay}
        ></Webcam>
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
