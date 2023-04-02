import styled from "styled-components";
import historyVideo from "../../assets/img/historyVideo.svg";
import logoutIcon from "../../assets/img/logoutIcon.svg";

export const Body = styled.div`
    background: #252525;

    weight:100%;
    height: 100vh;

    font-family: 'Pretendard';
`

export const Nav = styled.div`
    height: 5rem;
    background: #212121CC;
    box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.15);

    display: flex;
    align-items: center;
`

export const NavTitle = styled.div`
margin-left : 15.6rem;
margin-right: 50%;

font-weight: 600;
font-size: 2.2rem;
letter-spacing: -0.02em;
color: #1DF659;
`

export const NavBtnWrapper = styled.div`
    background: rgba(255, 255, 255, 0.1);
    border-radius: 5px;

    height: 0.1rem;
    display: table;

    margin-left: 2%;
`

export const NavBtn = styled.button`
background: rgba(255, 255, 255, 0.3);
border: 1px solid #1DF659;

border-radius: 5px;
font-weight: 600;
font-size: 1.1rem;
color: #FFFFFF;

display: table-row;
margin: 0.3rem 0.4rem;

`

export const ContentWrapper = styled.div`
margin-top: 5.7rem;
margin-left: 15.6rem;
`

export const MypageTitle = styled.div`


font-style: normal;
font-weight: 700;
font-size: 2.5rem;
color: #FFFFFF;
`

export const MypageTitleSub = styled.div`
margin-top: 1rem;

font-weight: 400;
font-size: 1.2rem;

color: #FFFFFF;
`

interface Text {
    weight : string,
    size : string
}

export const StyledLabel = styled.div<Text>`
margin-top: 1.2rem;

font-weight: ${(props)=>props.weight};
font-size: ${(props)=>props.size};

color: #FFFFFF;
`

export const InfoWrapper = styled.div<{marginLeft:string}>`
    margin-left : calc(100% - ${(props)=>props.marginLeft});
`

export const InfoBox = styled.div`
margin-top: 0.8rem;


width: 25rem;
height: 11rem;
background: #494949;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 20px;

display: flex;
justify-content: center;
align-items: center;
`

export const PictureNameWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const ProfilePicture = styled.div`
    width: 70px;
    height: 70px;
    border-radius: 50%;

    background: #D9D9D9;
`

export const NameAgeGenderWrapper = styled.div`
    margin-left: 2.5rem;
`

export const StyledLabelWithStar = styled.div`
    margin-bottom: 0.5em;
    
    .Star {
        color: #1DF659;
    }
    .Content {
        color: #FFFFFF;
    }
`

export const Input = styled.input<{width:string}>`

    :hover {
        border: 1px solid #1DF659;
        border-radius: 5px;
    }
    :focus {
        outline: none;
        border: 1px solid #1DF659;
    }

    background: #252525;
    border: 1px solid #252525;
    border-radius: 5px;
    width: ${(props)=>props.width};
    height: 1.8rem;
    padding-left: 0.6rem;
    font-size: 0.8rem;
    font-weight: 600;
    color: #FFFFFF;
`

export const HorizontalAlign = styled.div`
    display: flex;
    margin-top: 1.2rem;
`

export const MarginLeft = styled.div`
    margin-left: 0.6rem;
`

export const UpdateBtn = styled.div`
background: #747474;
border: 1px solid #1DF659;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 8px 8px 8px 0px;

    width: 29.8px;
    height: 30px;
`

export const UpdateBtnIcon = styled.div`

`

export const TimeContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const TimeGraph = styled.div`
    width: 20px;
    height: 61px;
    background: #252525;
`

export const Hr = styled.div`
    width: 2.8rem;
    height: 1px;
    background: #252525;
`

export const MarginTop = styled.div`
    margin-top: 4rem;
`

export const HistoryWrapper = styled.div`
    margin-top: 1.8rem;
`

export const EachHistoryWrapper = styled.div`
    display: flex;
    flex-direction: column;
`

export const HistoryVideo = styled.video`
    margin-top: 0.3rem;

    width: 199px;
    height: 257px;
    background: url(${historyVideo});

`

export const HistoryTitle = styled.div`
    width: 199px;
    height: 43px;
    background: #494949;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 0px 0px 5px 5px;
    display:flex;
    justify-content: center;
    align-items: center;

    font-weight: 600;
    font-size: 1rem;
    color: #FFFFFF;

`

export const LogoutIcon = styled.div`
    position: relative;
    left: 93%;

    background: url(${logoutIcon});
    width:29.09px;
    height: 30.33px;
`
