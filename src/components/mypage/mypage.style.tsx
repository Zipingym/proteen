import styled from 'styled-components';
import historyVideo from '../../assets/img/historyVideo.svg';
import logoutIcon from '../../assets/img/logoutIcon.svg';

export const Body = styled.div`
  background: #252525;

  width: 100%;
  height: 100vh;
`;

export const Nav = styled.div`
  height: 5rem;
  background: #212121cc;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.15);

  display: flex;
  align-items: center;
`;

export const NavTitle = styled.div`
  margin-left: 15.6rem;
  margin-right: 50%;

  font-weight: 600;
  font-size: 2.2rem;
  letter-spacing: -0.02em;
  color: #1df659;
`;

export const NavBtnWrapper = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 5px;

  height: 0.1rem;
  display: table;

  margin-left: 2%;
`;

export const NavBtn = styled.button`
  background: rgba(255, 255, 255, 0.3);
  border: 1px solid #1df659;

  border-radius: 5px;
  font-weight: 600;
  font-size: 1.1rem;
  color: #ffffff;

  display: table-row;
  margin: 0.3rem 0.4rem;
`;

export const ContentWrapper = styled.div`
  padding-top: 13vh;
  margin-left: 15.6rem;
`;

export const MypageTitle = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 2.5rem;
  color: #ffffff;
`;

export const Message = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 2.5rem;
  color: #ffffff;
  display: flex;
  justify-content:center;
  align-items:center;
  height:100vh;
`


export const MypageTitleSub = styled.div`
  margin-top: 1rem;

  font-weight: 400;
  font-size: 1.2rem;

  color: #ffffff;
`;

interface Text {
  weight: string;
  size: string;
}

export const StyledLabel = styled.div<Text>`
  margin-top: 1.2rem;

  font-weight: ${(props) => props.weight};
  font-size: ${(props) => props.size};

  color: #ffffff;
`;

export const TimeWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 5%;
`

export const InfoWrapper = styled.div<{ marginLeft: string }>`
  margin-left: calc(100% - ${(props) => props.marginLeft});
`;

export const InfoBox = styled.div<{location : string}>`
  margin-top: 0.8rem;

  width: 25rem;
  height: 11rem;
  background: #494949;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;

  display: flex;
  justify-content: ${(props) => props.location};
  align-items: center;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const PictureNameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ProfilePicture = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;

  background: #d9d9d9;
`;

export const NameAgeGenderWrapper = styled.div`
  margin-left: 2.5rem;
`;

export const StyledLabelWithStar = styled.div`
  margin-bottom: 0.5em;

  .Star {
    color: #1df659;
  }
  .Content {
    color: #ffffff;
  }
`;

export const Input = styled.input<{ width: string }>`
  :hover {
    border: 1px solid #1df659;
    border-radius: 5px;
  }
  :focus {
    outline: none;
    border: 1px solid #1df659;
  }
  ::placeholder{
    font-style: normal;
    font-weight: 600;
    font-size: 0.8rem;
    line-height: 17px;
    color: #FFFFFF;
    text-align: center;
  }

  background: #252525;
  border: 1px solid #252525;
  border-radius: 5px;
  width: ${(props) => props.width};
  height: 1.8rem;
`;

export const HorizontalAlign = styled.div`
  display: flex;
  margin-top: 1.2rem;
`;

export const MarginLeft = styled.div`
  margin-left: 0.6rem;
`;

export const UpdateBtnWrapper = styled.div`
  margin-top: 3.1em;
  margin-left: 0.9rem;
`;

export const UpdateBtn = styled.div`
  background: #747474;
  border: 1px solid #1df659;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px 8px 8px 0px;

  width: 29.8px;
  height: 30px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ActiveUpdateBtn = styled.div`
  margin-top: 0.5rem;

  background: #1df659;
  border: 1px solid #747474;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px 8px 8px 0px;

  width: 29.8px;
  height: 30px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const UpdateBtnIcon = styled.img``;

export const TimeContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TimeGraph = styled.div<{height : string}>`
  width: inherit;
  height: ${(props)=>props.height};
  background: #252525;
`;

export const TimeGraphWrapper = styled.div`
  height: 8vh;
  width: 20px;

  display: flex;
  align-items: end;
`

export const Hr = styled.div`
  width: 2.8rem;
  height: 1px;
  background: #252525;
`;

export const MarginTop = styled.div`
  margin-top: 10vh;
`;

export const HistoryScrollWrapper = styled.div`
  display: flex;
  align-items: center;
`

export const HistoryWrapper = styled.div`
  margin-top: 1.8rem;

  display: flex;
  width: 75vw;
  height: 35vh;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const rightScrollBtnImg = styled.img`
  margin-top: 2rem;
  margin-left: -2vh;
  z-index: 1;
`

export const EachHistoryWrapper = styled.div`
  margin-right: 1vw;
  
  display: flex;
  flex-direction: column;
`;

export const HistoryVideo = styled.video`
  margin-top: 0.3rem;

  width: 12vw;
  height: 26vh;
`;

export const HistoryTitle = styled.div`
  width: 12vw;
  height: 5vh;
  background: #494949;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 0px 0px 5px 5px;
  display: flex;
  justify-content: center;
  align-items: center;

  font-weight: 600;
  font-size: 1rem;
  color: #ffffff;
`;

export const LogoutIcon = styled.div`
  position: fixed;
  bottom: 4vh;
  right: 3vw;

  background: url(${logoutIcon});
  width: 29.09px;
  height: 30.33px;
`;
