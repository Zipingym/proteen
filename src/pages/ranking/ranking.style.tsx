import styled from 'styled-components';

export const body = styled.div`
  background: #252525;
  width: 100%;
  height: 100vh;
  padding-left: 13%;
  padding-top: 8%;
  padding-bottom: 10%;
  box-sizing: border-box;
`;
export const Title = styled.div`
  color: white;
  font-size: 2em;
  font-weight: 500;
  margin-bottom: 0.5%;
`;
export const SubTitle = styled.div`
  color: white;
  font-size: 1em;
  font-weight: 300;
`;

export const ChoseBtn = styled.div`
  display: flex;
  margin-top: 2%;
  margin-bottom: 2%;
`;

export const CB = styled.button`
  width: 8%;
  height: 30px;
  cursor: pointer;
  box-sizing: border-box;
  border: 1px solid black;
  border-radius: 50px;
  background: #454545;
  color: white;
  margin-right: 1%;

  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;

  color: #ffffff;

  &:hover {
    border: solid #1df659;
    transition: 0.5s;
  }
`;
export const IndexWrap = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 1%;
`;
export const Index = styled.div<{ size: string }>`
  color: #696969;
  margin-left: ${(props) => props.size};
`;
export const ScrollWrap = styled.div`
  width: 87vw;
  height: 63vh;

  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  scroll-behavior: smooth;
`;
export const ScrollBtn = styled.img`
  margin-left: 40%;
  margin-top: -1.5%;
`;
