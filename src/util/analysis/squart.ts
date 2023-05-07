import Analysis from './analysis';

export class JointList {
  public static readonly leftArm = 'leftArm';
  public static readonly rightArm = 'rightArm';
  public static readonly leftLeg = 'leftLeg';
  public static readonly rightLeg = 'rightLeg';
  public static readonly leftHipY = 'leftHipY';
  public static readonly rightHipY = 'rightHipY';
  public static readonly leftHipX = 'leftHipX';
  public static readonly rightHipX = 'rightHipX';
  public static readonly leftShoulderX = 'leftShoulderX';
  public static readonly rightShoulderX = 'rightShoulderX';
  public static readonly leftShoulderY = 'leftShoulderY';
  public static readonly rightShoulderY = 'rightShoulderY';
}

export const joints: Map<string, Array<number>> = new Map([
  ['leftArm', [11, 13, 15]],
  ['rightArm', [12, 14, 16]],
  ['leftLeg', [23, 25, 27]],
  ['rightLeg', [24, 26, 28]],
  ['leftHipY', [25, 23, 24]],
  ['rightHipY', [26, 24, 23]],
  ['leftHipX', [11, 23, 25]],
  ['rightHipX', [12, 24, 26]],
  ['leftShoulderX', [13, 11, 23]],
  ['rightShoulderX', [14, 12, 24]],
  ['leftShoulderY', [13, 11, 12]],
  ['rightShoulderY', [14, 12, 11]],
]);

export default class SquartAnalysis extends Analysis {
  private stand: Array<Map<string, number>> = new Array();
  private sit: Array<Map<string, number>> = new Array();
  private currentMode: boolean = false;
  protected readonly needInfo = [
    JointList.leftHipX,
    JointList.rightHipX,
    JointList.leftHipY,
    JointList.rightHipY,
    JointList.leftLeg,
    JointList.rightLeg,
  ];
  public onInput = (arg: Map<string, number>) => {
    const before = this.currentMode;
    this.currentMode =
      Analysis.RadianToDegree(arg.get(JointList.leftLeg)!) < 100 &&
      Analysis.RadianToDegree(arg.get(JointList.rightLeg)!) < 100;
    if (before == true && this.currentMode == false) {
      this.onResult({
        count: 1,
        score: this.score(this.sit),
      });
      this.stand = new Array();
      this.sit = new Array();
    }
    if (!this.currentMode) {
      this.stand.push(arg);
    } else {
      this.sit.push(arg);
    }
  };
  private score(arg: Array<Map<string, number>>): number {
    let left = 4,
      right = 4;
    arg.forEach((element: Map<string, number>) => {
      const tempLeft = element.get(JointList.leftLeg)!;
      const tempRight = element.get(JointList.rightLeg)!;
      if (left > tempLeft) left = tempLeft;
      if (right > tempRight) right = tempRight;
    });
    const diff = Math.abs(1.2 - left) + Math.abs(1.2 - right) * 50;
    return Analysis.maxScore - diff;
  }
}
