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
  const [resultUrl, setResultUrl] = useState('');
  useEffect(() => {
    init();
  }, [init]);
  const [isPlay, setIsPlay] = useState(false);
  const [recorder, setRecorder] = useState(
    new MediaRecorder(videoRef.current.captureStream(60))
  );

  const onPlay = useCallback(
    (count: number) => {
      if (isPlay === false) {
        setIsPlay(true);
        setMaxCount(count);
        const record = new MediaRecorder(videoRef.current.captureStream(60));

        const result: Array<Blob> = [];
        record.ondataavailable = (event: BlobEvent) => {
          result.push(event.data);
        };
        setRecorder(record);
        record.onstop = (event) => {
          const blob = new Blob(result, {
            type: 'video/webm',
          });
          setResultUrl(window.URL.createObjectURL(blob));
        };

        setTimeout(() => {
          record.start();
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
          <div
            style={{
              marginLeft: '5%',
              marginTop: '2%',
            }}
          >
            <S.exTitle>
              <S.routine>
                <S.topImg2 src={DetailedImg2} alt="Error" />
                <div
                  style={{
                    marginTop: '-1.5%',
                    marginLeft: '3.5%',
                  }}
                >
                  하체 루틴 1/12
                </div>
              </S.routine>
              <S.title>스쿼트</S.title>
              <S.info>
                하체 하반신의 대퇴사두근과 하퇴삼두근, 대둔근, 중전근 등의
                근육을 성장시키는 운동이다.
              </S.info>
              <S.topVideo
                src="https://www.youtube.com/embed/uxiSkR-oqqs"
                title="YouTube video player"
              />
            </S.exTitle>
          </div>
        </S.topContent>
        <FeedBack
          maxCount={maxCount}
          score={score}
          videoUrl={resultUrl}
          record={recorder}
        />
      </S.Contents>
    </S.Body>
  );
};

export default ex_detailedRoutine;
