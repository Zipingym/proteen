import Vector3 from '@zipingym/pose-input/dist/interface/Vector';
import ExerciseClassfier from '@zipingym/pose-input/dist/interface/ExerciseClassfier';
import JointPosition from '@zipingym/pose-input/dist/interface/JointPosition';
import Preprocesser from '@zipingym/pose-input/dist/interface/Preprocesser';
import { NormalizedLandmarkList } from '@mediapipe/drawing_utils';

export default class CustomExercisePipeline {
  private jointPosition?: JointPosition;
  private preprocesser?: Preprocesser;
  private classfier?: ExerciseClassfier;

  setJointPosition(pos: JointPosition): void {
    this.jointPosition = pos;
  }
  setPreprocesser(pro: Preprocesser): void {
    this.preprocesser = pro;
  }
  setClassfier(cla: ExerciseClassfier): void {
    this.classfier = cla;
  }

  async run(
    buffer: HTMLVideoElement | HTMLImageElement | HTMLCanvasElement
  ): Promise<{
    joint: Array<Vector3>;
    result: Array<number>;
    accuracy: Array<number>;
    landmarks: NormalizedLandmarkList;
  }> {
    if (
      this.jointPosition != undefined &&
      this.preprocesser != undefined &&
      this.classfier != undefined
    ) {
      const { joint, accuracy, landmarks } = await this.jointPosition.getJoint(
        buffer
      );
      const result = await this.classfier.classfier(
        this.preprocesser.calculate(joint)
      );
      return {
        joint,
        result,
        accuracy,
        landmarks,
      };
    } else {
      throw new Error('');
    }
  }
}
