import * as S from './mypage.style';
//import Image, {ImageProps} from "next/image";
import trashIcon from '../../assets/img/trashIcon.svg';
import pencilIcon from '../../assets/img/pencilIcon.svg';
import axios from 'axios';

/* interface ImgProps {
    src : string,
    alt : string,
    objectFit : ImageProps['objectFit']
} */

const mypage = () => {
  // 파라메타로 토큰 넣어줘야함
  const userData = axios.get('http://dev.ec2.proteen.degaja.com:8080/user/myinfo')
  console.log(userData)
  return (
    <S.Body>
      <S.ContentWrapper>
        <S.MypageTitle>MY PAGE</S.MypageTitle>
        <S.MypageTitleSub>개인 설정을 수정 및 확인 하세요.</S.MypageTitleSub>

        <S.HorizontalAlign>
          <S.InfoWrapper marginLeft="100%">
            <S.StyledLabel weight="600" size="1rem">
              Profile
            </S.StyledLabel>
            <S.InfoBox>
              <S.PictureNameWrapper>
                <S.ProfilePicture />
                <S.StyledLabel weight="600" size="1rem">
                  Steel Supplements
                </S.StyledLabel>
              </S.PictureNameWrapper>

              <S.NameAgeGenderWrapper>
                <S.StyledLabelWithStar>
                  <span className="Star">*</span>
                  <span className="Content">name</span>
                </S.StyledLabelWithStar>
                <S.Input width="4.3rem" placeholder={userData.name}/>

                <S.HorizontalAlign>
                  <div>
                    <S.StyledLabelWithStar>
                      <span className="Star">*</span>
                      <span className="Content">age</span>
                    </S.StyledLabelWithStar>
                    <S.Input width="3.8rem" >userData.age</S.Input>
                  </div>
                  <S.MarginLeft>
                    <S.StyledLabelWithStar>
                      <span className="Star">*</span>
                      <span className="Content">gender</span>
                    </S.StyledLabelWithStar>
                    <S.Input width="3.8rem" >userData.gender</S.Input>
                  </S.MarginLeft>
                </S.HorizontalAlign>
              </S.NameAgeGenderWrapper>
            </S.InfoBox>
          </S.InfoWrapper>

          <S.UpdateBtnWrapper>
            <S.UpdateBtn>
              <S.UpdateBtnIcon src={trashIcon} />
            </S.UpdateBtn>

            <S.ActiveUpdateBtn>
              <S.UpdateBtnIcon src={pencilIcon} />
            </S.ActiveUpdateBtn>
          </S.UpdateBtnWrapper>

          <S.InfoWrapper marginLeft="97%">
            <S.StyledLabel weight="400" size="1rem">
              Time
            </S.StyledLabel>
            <S.InfoBox>
              <S.TimeContent>
                <S.TimeGraph />
                <S.Hr />
                <S.StyledLabel weight="400" size="0.8">
                  03.27
                </S.StyledLabel>
              </S.TimeContent>
            </S.InfoBox>
          </S.InfoWrapper>

          <S.InfoWrapper marginLeft="95%">
            <S.StyledLabel weight="400" size="1rem">
              <br />
            </S.StyledLabel>
            <S.InfoBox></S.InfoBox>
          </S.InfoWrapper>
        </S.HorizontalAlign>

        <S.MarginTop />

        <S.StyledLabel weight="600" size="1.5rem">
          My History
        </S.StyledLabel>

        <S.HistoryWrapper>
          <S.EachHistoryWrapper>
            <S.StyledLabelWithStar>
              <span className="Star">*</span>
              <span className="Content">2023.03.25</span>
            </S.StyledLabelWithStar>

            <S.HistoryVideo />
            <S.HistoryTitle>오전 풀업! 오운완</S.HistoryTitle>
          </S.EachHistoryWrapper>
        </S.HistoryWrapper>
      </S.ContentWrapper>

      <S.LogoutIcon />
    </S.Body>
  );
};

export default mypage;
