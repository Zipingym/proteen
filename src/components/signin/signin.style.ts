import styled from "styled-components";
import authBackground from "../../../static/authBackground.svg";
import BackBlurImg from "../../../static/BackBlurImg.svg";

export const BackImage = styled.div`
    width: 100%;
    height: 100vh;
    background-image: url(${authBackground});
    background-repeat: no-repeat;
    background-size: cover;

    position: absolute;
`

export const BackBlur = styled.div`
    width: 100%;
    height: 100%;
    background: linear-gradient(252.44deg, rgba(1, 3, 40, 0) 0%, #000000 100%);
    position: absolute;
`

export const ProTeenTitle = styled.div`
    margin-left: 10rem;
    margin-top: 1.5rem;

    font-family: 'Pretendard';
    font-weight: 600;
    font-size: 2rem;
    letter-spacing: -0.02em;

    color: #1DF659;
    :hover{
        cursor: pointer;
    }
`

export const SignInTitle = styled.div`
    margin-top: 18rem;
    margin-left: 10.5rem;

    font-family: 'Pretendard';
    font-weight: 400;
    font-size: 2.2rem;
    letter-spacing: -0.02em;

    color: #FFFFFF;

`

export const Explanation = styled.div`
margin-left: 10.5rem;
margin-top: 0.5rem;

font-family: 'Pretendard';
font-weight: 500;
font-size: 1.5rem;
letter-spacing: -0.02em;

color: #7E7E7E;
`

export const ComponentLabel = styled.div`
margin-left: 0.3rem;

font-family: 'Pretendard';
font-weight: 400;
font-size: 1.2rem;
letter-spacing: -0.02em;

color: #FFFFFF;

`

export const ContentWrapper = styled.div`
    margin-top: 2rem;
    margin-left: 10.5rem;
`

export const InactiveInput = styled.input`
margin-top: 0.7rem;

background: rgba(37, 37, 37, 0.8);
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border: none;
border-radius: 15px;

width: 26rem;
height: 3rem;

padding-left: 0.9rem;

font-family: 'Pretendard';
font-size: 1rem;
::placeholder{
    color: #7B7B7B;
}
`

export const ActiveInput = styled.input`
margin-top: 0.7rem;
padding-left: 0.9rem;

width: 26rem;
height: 3rem;

background: #0A0A14;
border: 3px solid #494949;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 15px;

font-family: 'Pretendard';
font-size: 17px;
color: #FFFFFF;
`

export const WarningInput = styled.input`
margin-top: 0.7rem;
padding-left: 0.9rem;

width: 26rem;
height: 3rem;

font-family: 'Pretendard';
font-size: 1rem;
color: #FFFFFF;
background: rgba(0, 0, 0, 0.8);
border: 3px solid #FA0000;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 15px;
    :focus{
        outline:none;
    }
`

export const WarningMsg = styled.div`
    margin-left: 11.2rem;
    margin-top: 2.6rem;

font-family: 'Pretendard';
font-size: 1rem;
line-height: 1.2rem;
letter-spacing: -0.02rem;
color: #FA0000;
`

export const GotoSignup = styled.div`
margin-left: 28.8rem;
margin-top: 0.8rem;

font-family: 'Pretendard';
font-size: 1rem;
line-height: 1rem;
letter-spacing: -0.02em;
color: #7E7E7E;

`

export const SubmitBtn = styled.button`
margin-top: 1rem;
margin-left: 10.5rem;

width: 10rem;
height: 3rem;
background: #1DF659;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border: none;
border-radius: 5px;

font-family: 'Pretendard';
font-weight: 700;
font-size: 1rem;
color: #252525;
letter-spacing: -0.02rem;
`
