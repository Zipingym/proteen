import Vector3 from '@zipingym/pose-input/dist/interface/Vector';

export default abstract class Analysis {
  constructor(onResult: (info: exerciseInfo) => void) {
    this.onResult = onResult;
  }
  protected static readonly maxScore: number = 100;
  protected onResult: (info: exerciseInfo) => void;
  protected abstract readonly needInfo: Array<string>;
  protected abstract onInput: (arg: Map<string, number>) => void;

  protected pick(arg: Map<string, number>): Map<string, number> | undefined {
    const result: Map<string, number> = new Map();
    for (let i = 0; i < this.needInfo.length; i++) {
      const temp = arg.get(this.needInfo[i]);
      if (temp === undefined) return undefined;
      else result.set(this.needInfo[i], temp);
    }
    return result;
  }
  public input(arg: Map<string, number>) {
    const temp = this.pick(arg);
    if (temp != undefined) this.onInput(temp);
  }
  protected static RadianToDegree = (radian: number) =>
    (radian * 180) / Math.PI;
  protected static DegreeToRadian = (degree: number) =>
    (degree * Math.PI) / 180;
  public static ThreeDegree = (a: Vector3, b: Vector3, c: Vector3) => {
    const ab = [b.x - a.x, b.y - a.y, b.z - a.z];
    const bc = [c.x - b.x, c.y - b.y, c.z - b.z];
    const abVec = Math.sqrt(ab[0] * ab[0] + ab[1] * ab[1] + ab[2] * ab[2]);
    const bcVec = Math.sqrt(bc[0] * bc[0] + bc[1] * bc[1] + bc[2] * bc[2]);
    const abNorm = [ab[0] / abVec, ab[1] / abVec, ab[2] / abVec];
    const bcNorm = [bc[0] / bcVec, bc[1] / bcVec, bc[2] / bcVec];
    const res =
      abNorm[0] * bcNorm[0] + abNorm[1] * bcNorm[1] + abNorm[2] * bcNorm[2];
    return Math.PI - Math.acos(res);
  };
}
export interface exerciseInfo {
  count: number;
  score: number;
}
