import { NormalizedLandmark } from '@mediapipe/drawing_utils';
import {
  NormalizedLandmarkList,
  drawConnectors,
  drawLandmarks,
} from '@mediapipe/drawing_utils';
import { POSE_CONNECTIONS } from '@mediapipe/pose';
import { useCallback } from 'react';

const useMpDrawutil: (
  canvas: HTMLCanvasElement,
  image: HTMLVideoElement
) => (skeleton: NormalizedLandmarkList) => void = (
  canvas: HTMLCanvasElement,
  image: HTMLVideoElement
) => {
  const draw = useCallback(
    (skeleton: NormalizedLandmarkList) => {
      const canvasElement = canvas;
      const canvasCtx = canvasElement.getContext('2d')!;
      canvasElement.height =
        (image.videoHeight * canvasElement.width) / image.videoWidth;
      canvasCtx.save();
      canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
      canvasCtx.globalCompositeOperation = 'source-in';
      canvasCtx.fillStyle = '#00FF00';
      canvasCtx.fillRect(0, 0, canvasElement.width, canvasElement.height);
      canvasCtx.globalCompositeOperation = 'destination-atop';
      canvasCtx.drawImage(
        image,
        0,
        0,
        canvasElement.width,
        canvasElement.height
      );
      canvasCtx.globalCompositeOperation = 'source-over';
      if (skeleton.length > 0) {
        const landmarks = skeleton;
        //@ts-expect-error
        (drawConnectors ?? window.drawConnectors)(
          canvasCtx,
          landmarks,
          //@ts-expect-error
          POSE_CONNECTIONS ?? window.POSE_CONNECTIONS,
          {
            color: '#00FF00',
            lineWidth: 4,
          }
        );
        //@ts-expect-error
        (drawLandmarks ?? window.drawLandmarks)(canvasCtx, landmarks, {
          color: '#FF0000',
          lineWidth: 2,
        });
        canvasCtx.restore();
      }
    },
    [canvas, image]
  );
  return draw;
};

export default useMpDrawutil;
