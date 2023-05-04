type Data = {
    createDateTime: string
    modifiedDateTime: string
    exerciseId	:number
    title:string
    body:string
    exerciseType: Type
    videoUrl:string
    score:number
    time:string
    calorie :number
}

type User = {
    createDateTime: string
    modifiedDateTime: string
    userId	:number,
    id	: string,
    password :string,
    name:string,
    age	:number,
    gender:string
}

enum Type{
    PULLUP, SQUAT, LUNGE, PLANK, CRUNCH
}

type UserData = {
    userId: Number,
    id : String,
    password : String,
    name:String,
    age	: Number,
    gender : String
  }