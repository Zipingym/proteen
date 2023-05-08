import React, { useState } from 'react';
import * as Ra from './ranking.style';
import Component from './ranking.component';
import data from '../../pages/routin/routine.json';
import Scrollbtn from '../../assets/img/scrollbtn.svg';

function Ranking() {
  const [Exercise, setExercise] = useState([
    {exercise : "PULLUP", isFocus : true},
    {exercise : "SQUAT", isFocus : false},
    {exercise : "LUNGE", isFocus : false},
    {exercise : "PLANK", isFocus : false},
    {exercise : "CRUNCH", isFocus : false},
  ]); 
  const [currentExercise,setCurrentExercise] = useState<string>("PULLUP")

  const handleScrollBtn = () => {
    const scrollWarp:Element|any = document.querySelector('.ScrollWrap')
    scrollWarp.scrollTop = scrollWarp?.scrollTop + 100
  }

  const handleOnFocus = (e:any) => {
    const ex = Exercise.map((data)=>{
      const trueValue = {
        exercise:data.exercise,
        isFocus:true
      }
      const falseValue = {
        exercise:data.exercise,
        isFocus:false
      }

      if(data.exercise === e.target.id){
        setCurrentExercise(data.exercise)
        return {...trueValue}
        //"..."(spread 문법) : 배열 요소만 다 복사
      } else {
        return {...falseValue} 
      }
    })
    setExercise(ex)
  }

  return (
    <Ra.body>
      <Ra.Title>Ranking</Ra.Title>
      <Ra.SubTitle>오늘의 운동자세 왕을 소개합니다!</Ra.SubTitle>
      <Ra.ChoseBtn>
        <Ra.CB onFocus={handleOnFocus} isFocus={Exercise[0].isFocus} id='PULLUP'>Pull-up</Ra.CB>
        <Ra.CB onFocus={handleOnFocus} isFocus={Exercise[1].isFocus} id='SQUAT'>Squat</Ra.CB>
        <Ra.CB onFocus={handleOnFocus} isFocus={Exercise[2].isFocus} id='LUNGE'>Lunge</Ra.CB>
        <Ra.CB onFocus={handleOnFocus} isFocus={Exercise[3].isFocus} id='PLANK'>Plank</Ra.CB>
        <Ra.CB onFocus={handleOnFocus} isFocus={Exercise[4].isFocus} id='CRUNCH'>Crunch</Ra.CB>
      </Ra.ChoseBtn>
      <Ra.IndexWrap>
        <Ra.Index size={'2.5%'}>랭킹</Ra.Index>
        <Ra.Index size={'4%'}>프로필</Ra.Index>
        <Ra.Index size={'8%'}>닉네임</Ra.Index>
        <Ra.Index size={'20%'}>평균점수</Ra.Index>
        <Ra.Index size={'8%'}>운동시간</Ra.Index>
        <Ra.Index size={'8%'}>총 소모 칼로리</Ra.Index>
        <Ra.Index size={'8%'}>연속 출석</Ra.Index>
      </Ra.IndexWrap>
      <Ra.ScrollWrap className='ScrollWrap'>
        <Component exercise={currentExercise}></Component>
      </Ra.ScrollWrap>
      <Ra.ScrollBtn src={Scrollbtn} onClick={handleScrollBtn}></Ra.ScrollBtn>
    </Ra.body>
  );
}
export default Ranking;
