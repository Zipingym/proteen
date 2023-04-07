import React from "react";
import * as Ra from "./ranking.style"
import Component from "./ranking.component"
import data from "../../pages/routin/routine.json"
import Scrollbtn from "../../assets/img/scrollbtn.svg"
function Ranking(){
    return(
        <Ra.body>
            <Ra.Title>
                Ranking
            </Ra.Title>
            <Ra.SubTitle>
            오늘의 운동자세 왕을 소개합니다!
            </Ra.SubTitle>
            <Ra.ChoseBtn>
                    <Ra.CB>Pull-up</Ra.CB>
                    <Ra.CB>Squat</Ra.CB>
                    <Ra.CB>Lunge</Ra.CB>
                    <Ra.CB>Plank</Ra.CB>
                    <Ra.CB>Crunch</Ra.CB>
            </Ra.ChoseBtn>
            <Ra.IndexWrap>
                <Ra.Index size={'2.5%'}>랭킹</Ra.Index>
                <Ra.Index size={'3.3%'}>프로필</Ra.Index>
                <Ra.Index size={'8%'}>닉네임</Ra.Index>
                <Ra.Index size={'19.7%'}>평균점수</Ra.Index>
                <Ra.Index size={'6.5%'}>운동시간</Ra.Index>
                <Ra.Index size={'6.5%'}>총 소모 칼로리</Ra.Index>
                <Ra.Index size={'6%'}>출석</Ra.Index>
            </Ra.IndexWrap>
            <Ra.ScrollWrap>
            {
                data.ranking.map((data, idx)=>{
                    return<Component></Component>
                })
            }
            </Ra.ScrollWrap>
            <Ra.ScrollBtn src={Scrollbtn}></Ra.ScrollBtn>
        </Ra.body>
    )
}
export default Ranking;