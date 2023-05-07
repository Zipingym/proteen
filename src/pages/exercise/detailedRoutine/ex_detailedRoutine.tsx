import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as S from './ex_detailedRoutine.style';
import DetailedImg2 from './img/Polygon 2.png';
import '@tensorflow/tfjs-backend-webgl';
import Webcam from '$/components/camera/webcam';
import FeedBack from './feedback';
import usePipeline from '$/hooks/usePipeline';
import { NormalizedLandmarkList } from '@mediapipe/drawing_utils';
import useExerciseScore from '$/hooks/useExerciseScore';

const ex_detailedRoutine = () => {
  const videoRef = useRef<HTMLVideoElement>(document.createElement('video'));
  const [skeleton, setSkeleton] = useState<NormalizedLandmarkList>(new Array());
  const [init, send] = usePipeline();
  const [input, score] = useExerciseScore();
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
        videoRef.current.play();
        intervalId = setInterval(() => {
          send(videoRef.current).then((value) => {
            setSkeleton(value.landmarks);
            input(value.joint, value.accuracy);
          });
        }, 1000 / 60);
      }, 3000);
      return () => {
        clearTimeout(timer);
        clearInterval(intervalId);
      };
    }
  }, [isPlay]);
  useEffect(() => {
    console.log(score);
  }, [score]);
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
        <FeedBack maxCount={0} score={score} />
      </S.Contents>
    </S.Body>
  );
};

export default ex_detailedRoutine;
