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

tflite.setWasmPath('http://localhost:8000/tf/');
let globalJoint: null | MpJointPosition = null;

const usePipeline: (
  onResult: (value: {
    joint: Array<Vector3>;
    result: Array<number>;
    accuracy: Array<number>;
    landmarks: NormalizedLandmarkList;
  }) => void
) => [
  () => Promise<void>,
  (buffer: HTMLVideoElement | HTMLImageElement | HTMLCanvasElement) => void
] = (
  onResult: (value: {
    joint: Array<Vector3>;
    result: Array<number>;
    accuracy: Array<number>;
    landmarks: NormalizedLandmarkList;
  }) => void
) => {
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
    (buffer: HTMLVideoElement | HTMLImageElement | HTMLCanvasElement) => {
      pipeline.run(buffer).then(onResult);
    },
    [pipeline]
  );

  return [initalize, send];
};

export default usePipeline;
