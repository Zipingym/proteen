import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as S from './ex_detailedRoutine.style';
import DetailedImg2 from './img/Polygon 2.png';
import '@tensorflow/tfjs-backend-webgl';
import Webcam from '$/components/camera/webcam';
import FeedBack from './feedback';
import usePipeline from '$/hooks/usePipeline';
import { NormalizedLandmarkList } from '@mediapipe/drawing_utils';
import useExerciseScore from '$/hooks/useExerciseScore';
import useRecord from '$/hooks/useRecord';

function downloadFile(url: string) {
  const a = document.createElement('a');
  a.href = url;
  a.download = `test.webm`;
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
}
const ex_detailedRoutine = () => {
  const [maxCount, setMaxCount] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(document.createElement('video'));
  const canvasRef = useRef<HTMLCanvasElement>(document.createElement('canvas'));
  const [skeleton, setSkeleton] = useState<NormalizedLandmarkList>(new Array());
  const [init, send] = usePipeline();
  const [input, score] = useExerciseScore();
  const [recorder, setRecorder] = useState(
    new MediaRecorder(canvasRef.current.captureStream(30))
  );
  const [recordResult, setRecordResult] = useState(new Array());
  useEffect(() => {
    init();
  }, [init]);
  const [isPlay, setIsPlay] = useState(false);
  const onPlay = useCallback(
    (count: number) => {
      if (isPlay === false) {
        setIsPlay(true);
        setMaxCount(count);
        setRecorder(
          //@ts-expect-error
          () => new MediaRecorder(videoRef.current.captureStream(30))
        );
        setRecordResult(() => new Array());
        const record = new MediaRecorder(videoRef.current.captureStream(30), {
          audioBitsPerSecond: 128000,
          videoBitsPerSecond: 2500000,
        });
        const result = [];
        record.ondataavailable = (event) => {
          console.log(event.data);
          result.push(event.data);
        };

        setTimeout(() => {
          record.start();
          setTimeout(() => {
            record.stop();
            setTimeout(() => {
              console.log(result);
              const blob = new Blob(result, {
                type: 'video/webm',
              });
              downloadFile(window.URL.createObjectURL(blob));
              document.body.innerHTML = '';
              const video = document.createElement('video');
              video.src = window.URL.createObjectURL(blob);
              video.play();
              document.body.appendChild(video);
            }, 1000);
          }, 5000);
        }, 5000);
      }
    },
    [isPlay, videoRef]
  );
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
    recorder.ondataavailable = (event) => {
      console.log(event.data);
      setRecordResult([...recordResult, event.data]);
    };
  }, [recorder]);
  return (
    <S.Body>
      <S.WebcamWrapper>
        <Webcam
          skeleton={skeleton}
          videoRef={videoRef}
          canvasRef={canvasRef}
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
        <FeedBack maxCount={maxCount} score={score} />
      </S.Contents>
    </S.Body>
  );
};

export default ex_detailedRoutine;
