import {
  TfliteClassfier,
  MpJointPosition,
  DisPreprocesser,
} from '@zipingym/pose-input';
import { useCallback, useState } from 'react';
import CustomExercisePipeline from '$/util/customPipeline';
import { NormalizedLandmarkList } from '@mediapipe/drawing_utils';
import Vector3 from '@zipingym/pose-input/dist/interface/Vector';
import model from '$static/model/work.tflite';
import * as tflite from '@tensorflow/tfjs-tflite';

tflite.setWasmPath(`${window.location.origin}/tf/`);
let globalJoint: null | MpJointPosition = null;

const usePipeline: () => [
  () => Promise<void>,
  (buffer: HTMLVideoElement | HTMLImageElement | HTMLCanvasElement) => Promise<{
    joint: Array<Vector3>;
    result: Array<number>;
    accuracy: Array<number>;
    landmarks: NormalizedLandmarkList;
  }>
] = () => {
  const [pipeline] = useState(new CustomExercisePipeline());

  const initalize = useCallback(async () => {
    const classfier = new TfliteClassfier(model);
    const preprocesser = new DisPreprocesser();
    if (globalJoint == null) {
      globalJoint = new MpJointPosition({
        modelComplexity: 1,
        enableSegmentation: false,
      });
      await globalJoint.init();
    }
    const joint = globalJoint;
    await classfier.init();
    pipeline.setClassfier(classfier);
    pipeline.setJointPosition(joint);
    pipeline.setPreprocesser(preprocesser);
  }, [pipeline]);

  const send = useCallback(
    async (buffer: HTMLVideoElement | HTMLImageElement | HTMLCanvasElement) => {
      return await pipeline.run(buffer);
    },
    [pipeline]
  );

  return [initalize, send];
};

export default usePipeline;
