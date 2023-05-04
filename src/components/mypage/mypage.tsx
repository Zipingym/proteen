import * as S from './mypage.style';
//import Image, {ImageProps} from "next/image";
import trashIcon from '../../assets/img/trashIcon.svg';
import pencilIcon from '../../assets/img/pencilIcon.svg';
import axios from 'axios';
import { useEffect, useState } from 'react';
import api from '$/api/customAxios';
import Score from './mypageScore';
import History from './mypageHistory';
import rightScrollBtn from '../../assets/img/rightScrollBtn.svg';

/* interface ImgProps {
    src : string,
    alt : string,
    objectFit : ImageProps['objectFit']
} */

const mypage = () => {
  const token = localStorage.getItem('accessToken')
  const [userData,setUserData] = useState<UserData|null>();
  const [isLoading, setIsLoading] = useState(true);

  const handleHistoryScroll = () => {
    const obj:Element|any = document.querySelector('.HistoryWrapper')
    obj.scrollLeft += 100;
  }

  useEffect(()=>{
    api.get('/user/myinfo',{
      headers:{
        Authorization : `Bearer ${token}`
    }})
    .then((res)=>{
      setUserData(res.data)
      setIsLoading(false)
    })

  },[])


  // const {age, gender, id, name, password}:any = userData.data

  if(isLoading){
    return <p>loding.....</p>
  }



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
                <S.Input width="4.3rem" placeholder={userData.name} disabled/>

                <S.HorizontalAlign>
                  <div>
                    <S.StyledLabelWithStar>
                      <span className="Star">*</span>
                      <span className="Content">age</span>
                    </S.StyledLabelWithStar>
                    <S.Input width="3.8rem" placeholder={userData.age} disabled/>
                  </div>
                  <S.MarginLeft>
                    <S.StyledLabelWithStar>
                      <span className="Star">*</span>
                      <span className="Content">gender</span>
                    </S.StyledLabelWithStar>
                    <S.Input width="3.8rem" placeholder={userData.gender} disabled/>
                  </S.MarginLeft>
                </S.HorizontalAlign>
              </S.NameAgeGenderWrapper>
            </S.InfoBox>
          </S.InfoWrapper>

          <S.InfoWrapper marginLeft="97%">
            <S.StyledLabel weight="400" size="1rem">
              Time
            </S.StyledLabel>
            <S.InfoBox>
              <Score></Score>
            </S.InfoBox>
          </S.InfoWrapper>
        </S.HorizontalAlign>

        <S.MarginTop />

        <S.StyledLabel weight="600" size="1.5rem">
          My History
        </S.StyledLabel>

        <S.HistoryScrollWrapper>
          <S.HistoryWrapper className='HistoryWrapper'>
            <History/>
          </S.HistoryWrapper>
          <S.rightScrollBtnImg src={rightScrollBtn} onClick={handleHistoryScroll}/>
        </S.HistoryScrollWrapper>
      </S.ContentWrapper>

      <S.LogoutIcon/>
    </S.Body>
  );
};

export default mypage;
