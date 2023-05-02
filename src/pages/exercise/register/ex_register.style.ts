import styled from 'styled-components';

export const Body = styled.body`
  width: 100%;
  height: 100%;
  background: #252525;
  color: white;
`;

export const AllContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  align-items: center;
`;
export const Container = styled.div``;

export const Title = styled.h1`
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 600;
  font-size: 200%;
`;

export const T_info = styled.h1`
  margin-top: 1%;
  font-family: 'ABeeZee';
  font-style: lighter;
  font-weight: 350;
  font-size: 100%;
  margin-bottom: 2%;
`;

export const MainContainer = styled.div`
  display: flex;
  width: 50%;
  min-width: 900px;
  padding: 5px;
  background: #494949;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export const Reels_view = styled.img`
  cursor: pointer;
  width: 50%;
  height: 100%;
  object-fit: cover;
`;

export const Write = styled.div`
  width: 50%;
  height: 600px;
  padding: 4%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: space-between;
  gap: 10%;
`;

export const Content = styled.div`
  display: flex;
`;

export const cTitle = styled.h1`
  margin-top: 8%;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 320;
  font-size: 80%;
`;

export const cSymbol = styled.h1`
  margin-top: 8%;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 320;
  font-size: 80%;
  color: #1df659;
`;

export const inputTitle = styled.input`
  padding-left: 5%;
  padding-right: 5%;
  width: 100%;
  height: 6%;
  background: #252523;
  border: none;
  border-radius: 5px;

  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  font-size: 90%;
  color: white;

  &:focus {
    outline: solid #1df659;
  }
`;

export const inputInfo = styled.textarea`
  padding-top: 5%;
  padding-left: 5%;
  padding-right: 5%;
  width: 100%;
  height: 30%;
  margin-top: 3%;
  background: #252523;
  border: none;
  border-radius: 5px;

  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  font-size: 90%;
  color: white;

  &:focus {
    outline: solid #1df659;
  }
`;

export const ChoseBtn = styled.div`
  display: flex;
  margin-top: 3%;
  margin-left: -3%;
`;

export const CB = styled.button`
  cursor: pointer;
  box-sizing: border-box;
  border: 1px solid black;
  border-radius: 50px;
  background: #454545;
  color: white;
  margin-left: 2%;
  margin-bottom: 5%;

  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;

  color: #ffffff;

  &:hover {
    border: 1px solid #1df659;
  }
`;

export const Record = styled.div`
  width: 100%;
  height: 80%;
  box-sizing: border-box;
  background: #252523;
  border: none;
  border-radius: 5px;
`;

export const rContent = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  padding-top: 6%;
  margin-left: 12%;
`;

export const rTitle = styled.h5`
  display: flex;
  margin-right: 15%;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
`;
export const rElement = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  display: flex;
  margin-top: 7%;
`;

export const rElementB = styled.h1`
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  font-size: 130%;
`;

export const rElementS = styled.h5`
  margin-top: 13%;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 300;
  font-size: 60%;
`;

export const rTime = styled.div`
  display: flex;
  margin-left: 10%;
`;
export const rKcal = styled.div`
  display: flex;
  margin-left: 10%;
`;

export const submit = styled.div`
  float: right;
`;

export const submitU = styled.button`
cursor:pointer;
padding: 6px 25px 6px 25px;
width: 100%;
background: #252523;
border: 1px solid #1DF659;
border-radius: 5px;
color: #1DF659;
font-style: normal;
font-weight: 500;
font-size: 10px;

&:hover{
    box-shadow : 1px 1px 1px 1px #252523;
    background: #1DF659;
    border: 1px solid #252523;
    border-radius: 5px;
    color: #252523;
}}
`;

export const Label = styled.div`
  font-weight: 300;
  display: flex;
  gap: 0.2em;
  h4 {
    font-size: 12px;
    font-weight: inherit;
    color: #eee;
  }
  h6 {
    color: green;
  }
`;

export const InputTitle = styled.input`
  padding: 3% 4%;
  width: 100%;
  background: #252523;
  border: none;
  border-radius: 5px;
  font-style: normal;
  font-weight: 400;
  font-size: 90%;
  color: white;
  box-sizing: border-box;

  &:focus {
    outline: solid #1df659;
  }
`;

export const InputInfo = styled.textarea`
  padding: 5%;
  width: 100%;
  height: 70%;
  background: #252523;
  border: none;
  border-radius: 5px;
  box-sizing: border-box;
  resize: none;
  font-style: normal;
  font-weight: 400;
  font-size: 90%;
  color: white;

  &:focus {
    outline: solid #1df659;
  }
`;

export const InputWrapper = styled.div<{ height: number }>`
  display: flex;
  height: ${({ height }) => height}%;
  flex-direction: column;
  width: 100%;
`;
