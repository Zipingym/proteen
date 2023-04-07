import React from "react";
import styled from "styled-components";
import test from "../../assets/img/bgimg.svg"
function RankingComponent() {
    return (
        <div>
            <ComponentWrap>
                <RankingNumber>1</RankingNumber>
                <Profile src={test}></Profile>
                <Nickname>Steel Supplements</Nickname>
                <ContentWrap>
                    <Score>78.2</Score>
                    <Time>01h30m</Time>
                    <Kcal>150kcal</Kcal>
                    <Attendance>100</Attendance>
                </ContentWrap>
            </ComponentWrap>
        </div>
    )
}
export default RankingComponent;

const ComponentWrap = styled.div`
    width:85%;
    height:60px;
    background-color: #494949;

    border-radius: 10px;

    display: flex;
    align-items: center;
    padding-left: 3%;
    box-sizing: border-box;
    margin-bottom: 0.5%;
`
const RankingNumber = styled.div`
    font-size:1.2em;
    color:white;
`
const Profile = styled.img`
    border-radius: 100%;
    width:40px;
    height:40px;

    margin-left:5%;
`
const Nickname = styled.div`
    font-size:1.2em;
    color:white;
    margin-left:5%;
`
const Score = styled.div`
    font-size:1.2em;
    color:white;
`
const Time = styled.div`
    font-size:1.2em;
    color:white;

`
const Kcal = styled.div`
    font-size:1.2em;
    color:white;
`
const Attendance = styled.div`
    font-size:1.2em;
    color:white;
`
const ContentWrap = styled.div`
    width:50%;
    display: flex;
    justify-content: space-around;

    margin-left: 20vh;

`