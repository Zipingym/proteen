import styled from 'styled-components';

export const bottomContent = styled.div`
  display: block;
  height: 40%;
  padding: 1.5rem;
  position: relative;
`;
export const btmTitle = styled.h3`
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 100%;
  color: #ffffff;
  padding-bottom: 2%;
`;

export const btmInfo = styled.h5`
  padding-bottom: 2%;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 300;
  font-size: 130%;

  color: #ffffff;
`;

export const exPoint = styled.div`
  display: flex;
`;
export const exPoint1 = styled.div`
  display: block;
  margin-right: 30%;
`;
export const exPoint2 = styled.div`
  display: block;
`;

export const exCount = styled.h3`
  padding-bottom: 2%;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 300;
  font-size: 80%;

  color: #ffffff;
`;
export const exCounter = styled.h5`
  padding-bottom: 2%;
  padding-top: 10%;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  font-size: 200%;

  color: #ffffff;
`;
export const exAvg = styled.h3`
  padding-bottom: 2%;

  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 300;
  font-size: 80%;

  color: #ffffff;
`;
export const exAvgPoint = styled.h5`
  padding-bottom: 2%;
  padding-top: 10%;
  height: 30px;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  font-size: 200%;

  color: #ffffff;
`;

export const exBar = styled.div`
  width: 70%;
  height: 35px;
  margin-top: 3%;
  background: linear-gradient(90deg, #1df659 0%, #9fadfe 100%);
  border-radius: 10px;
  position: relative;
`;

interface pointerCheckBar {
  score: number;
}
export const pointCheckBar = styled.div<pointerCheckBar>`
  position: absolute;
  height: 60px;
  width: 3px;
  background-color: white;
  top: -30%;
  left: ${(props) => props.score + '%'};
  /* transform: rotate(-90deg); */
`;
export const pointCheckScore = styled.h3`
  margin-top: 4%;
  margin-left: 1.5%;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 350;
  font-size: 100%;
  line-height: 24px;

  color: #ffffff;
`;

export const EndButton = styled.button`
  margin-left: 85%;
  margin-top: -3%;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  width: 8vw;
  height: 5vh;
  transform: translateX(-50%);
  background-color: #3b3b3b;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ddd;
  font-size: 20px;
  cursor: pointer;

  &:before,
  &:after {
    position: absolute;
    content: '';
    right: 0;
    bottom: 0;
    background: #1df659;
    box-shadow: 4px 4px 6px 0 rgba(255, 255, 255, 0.5),
      -4px -4px 6px 0 rgba(116, 125, 136, 0.2),
      inset -4px -4px 6px 0 rgba(255, 255, 255, 0.5),
      inset 4px 4px 6px 0 rgba(116, 125, 136, 0.3);
    transition: all 0.3s ease;
  }
  &:before {
    height: 0%;
    width: 2px;
  }
  &:after {
    width: 0%;
    height: 2px;
  }
  &:hover:before {
    height: 100%;
  }
  &:hover:after {
    width: 100%;
  }
  &:hover {
    background: black;
    color: #1df659;
  }
`;
