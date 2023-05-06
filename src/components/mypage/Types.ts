export type Data = {
  createDateTime: string;
  modifiedDateTime: string;
  exerciseId: number;
  title: string;
  body: string;
  exerciseType: Type;
  videoUrl: string;
  score: number;
  time: string;
  calorie: number;
};

export type User = {
  createDateTime: string;
  modifiedDateTime: string;
  userId: number;
  id: string;
  password: string;
  name: string;
  age: number;
  gender: string;
};

export enum Type {
  PULLUP,
  SQUAT,
  LUNGE,
  PLANK,
  CRUNCH,
}

export type UserData = {
  userId: number;
  id: string;
  password: string;
  name: string;
  age: number;
  gender: string;
};
