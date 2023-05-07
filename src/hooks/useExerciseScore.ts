import { Analysis, exerciseInfo } from '$/util/analysis/index';
import SquartAnalysis from '$/util/analysis/squart';
import { NormalizedLandmarkList } from '@mediapipe/drawing_utils';
import { useCallback, useState } from 'react';
import { joints } from '$/util/analysis/squart';

const useExerciseScore: () => [
  (lmd: NormalizedLandmarkList, accuracy: Array<number>) => void,
  exerciseInfo
] = () => {
  const [analysis, setAnalysis] = useState(
    new SquartAnalysis((result) => {
      setResult(result);
    })
  );
  const input = useCallback(
    (lmd: NormalizedLandmarkList, accuracy: Array<number>) => {
      const points = lmd;
      const joint: Map<string, number> = new Map();
      joints.forEach((element, key) => {
        if (
          (accuracy[element[0]]! +
            accuracy[element[1]]! +
            accuracy[element[2]]!) /
            3 >
          0.8
        ) {
          joint.set(
            key,
            Analysis.ThreeDegree(
              {
                x: points[element[0]].x,
                y: points[element[0]].y,
                z: points[element[0]].z!,
              },
              {
                x: points[element[1]].x,
                y: points[element[1]].y,
                z: points[element[1]].z!,
              },
              {
                x: points[element[2]].x,
                y: points[element[2]].y,
                z: points[element[2]].z!,
              }
            )
          );
          analysis.input(joint);
        }
      });
    },
    [analysis]
  );
  const [result, setResult] = useState<exerciseInfo>({
    score: 0,
    count: 0,
  });

  return [input, result];
};

export default useExerciseScore;
