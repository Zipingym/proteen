import styled from 'styled-components';

export const Body = styled.body`
  width: 100%;
  height: 100%;
  background: #252525;
  color: white;
`;

export const AllContainer = styled.div`
  width: 100%;
  display: black;
  padding-left: 13%;
  padding-top: 5.7%;
  box-sizing: border-box;
`;

export const Title = styled.h1`
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 600;
  font-size: 200%;
  margin-top: 2%;
`;

export const T_info = styled.h1`
  margin-top: 1%;
  font-family: 'ABeeZee';
  font-style: lighter;
  font-weight: 350;
  font-size: 100%;
`;

export const MainContainer = styled.div`
  display: flex;
  margin: 0 8%;
  width: 950px;
  height: 620px;
  margin-top: 2.5%;
  background: #494949;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;
export const ScrollContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 740px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  &::-webkit-scrollbar-thumb {
    display: none;
  }
`;
export const Reels_view = styled.img`
  cursor: pointer;
  padding-top: 0.5%;
  padding-left: 0.2%;
  object-fit: cover;
`;

export const Write = styled.div`
  width: 18vw;
  margin-left: 4.1%;
  margin-top: 7.5%;
`;

export const Date = styled.div`
  display: flex;
`;

export const cDate = styled.h3`
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 350;
  font-size: 90%;
  margin-right: 4%;
`;
export const cTime = styled.h6`
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 300;
  font-size: 50%;
  margin-top: 1%;
`;

export const cTitle = styled.h1`
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 180%;
`;
export const profile = styled.div`
  display: flex;
  margin-top: 10%;
`;

export const profileImg = styled.img`
  width: 10%;
  padding-right: 3%;
`;

export const profileName = styled.h5`
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 350;
  font-size: 90%;
  margin-top: 2%;
`;

export const cBar = styled.div`
  margin-top: 4%;
  width: 130%;
  hegiht: 1px;
  border: 1px solid rgba(217, 217, 217, 0.5);
  margin-bottom: 10%;
`;

export const cWrite = styled.p`
  padding-top: 2%;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 300;
  font-size: 80%;
`;

export const cTag = styled.h1`
  margin-top: 50%;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 350;
  font-size: 70%;
`;

export const Click = styled.div`
  margin-top: -5%;
  display: flex;
`;
export const iconH = styled.img`
  width: 10%;
  width: 12%;
  margin-right: 4%;
`;
export const iconB = styled.img`
  width: 10%;
  width: 12%;
`;

export const Extag = styled.div`
  width: 35%;
  height: 20px;
  border: 1px solid #1df659;
  border-radius: 50px;
  text-align: center;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  font-size: 80%;
  padding-top: 2%;

  margin-top: -12%;
  margin-left: 95%;
  margin-bottom: 20%;
`;

export const Record = styled.div`
  width: 130%;
  height: 20%;
  margin-top: 3%;
  background: #252523;
  border: none;
  border-radius: 5px;
`;

export const rContent = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  padding-top: 10%;
  margin-left: 12%;
`;

export const rTitle = styled.h5`
  display: flex;
  margin-right: 15%;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 300;
  font-size: 10%;
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
  margin-top: 10%;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 300;
  font-size: 30%;
`;
export const rTime = styled.div`
  display: flex;
  margin-left: 10%;
`;
export const rKcal = styled.div`
  display: flex;
  margin-left: 10%;
`;
