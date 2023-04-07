import React,{useState} from "react";
import styled, { css } from "styled-components";
import Routine from "./routine";
import OnBtn from "../../assets/img/onBtn.svg"
import OffBtn from "../../assets/img/offBtn.svg"

function RoutinComponent(){
    const [hover,setHover] = useState(false)
    return(
        <ComponentWrap onMouseOver={()=>(setHover(true))} onMouseOut={()=>(setHover(false))}>
            <RoutineDate>2023.04.05</RoutineDate>
            <RoutineTitle>크런치 (crunch)</RoutineTitle>
            <RoutineSet>30개 / 2 set</RoutineSet>
            {hover ? <RoutineBtn src={OnBtn}/>:<RoutineBtn src={OffBtn}/>}
            
        </ComponentWrap>
    )
}
export default RoutinComponent;
const ComponentWrap = styled.div`
    width:40vw;
    height:6vh;
    background-color: #494949;
    color: white;
    
    border-radius: 5px;
    margin-bottom: 1%;
    margin-top: 1%;

    display: flex;
    align-items: center;
    padding-left:5%;
    box-sizing: border-box;

    &:hover{
        background-color: #1DF65940;
        transition: 0.3s;
    }

`
const RoutineDate = styled.div`
`
const RoutineTitle = styled.div`
    margin-left: 40%;
`
const RoutineSet = styled.div`
    margin-left: 5%;
`
const RoutineBtn = styled.img`
    margin-left: 5%;
`