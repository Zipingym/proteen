import React, { useEffect } from 'react';
import 'aos/dist/aos.css';
import * as M from './main.style';
import bg1 from '../../assets/img/bg1.svg';
import bg2 from '../../assets/img/bg2.svg';
import fire from '../../assets/img/fire.svg';
import startBtn from '../../assets/img/startBtn.svg';
import dumbel from '../../assets/img/dumbel.svg';
import woonwan from '../../assets/img/ohwoonwan.svg';
import report from '../../assets/img/report.svg';
import setting from '../../assets/img/setting.svg';
import AOS from 'aos';
import api from '$/api/customAxios';
import { useNavigate } from 'react-router-dom';
const MainPage = () => {
  const navigate = useNavigate();
  let boxStyle = {
    width: '40%',
    height: '200px',
    fontSize: '30px',
    lineHeight: '200px',
    background: 'black',
    color: 'white',
    textAlign: 'center',
  };

  useEffect(() => {

    AOS.init({
      duration: 1000,
    });

  });
  return (
    <div>
      <M.MainWrap>
        <M.Main1>
          <M.TitleWrap>
            <M.Title data-aos="fade-up">Pro부터 10대까지</M.Title>
            <M.Title data-aos="fade-up">AI 분석 기록 서비스</M.Title>
            <M.PtTitle data-aos="fade-up">ProTeen</M.PtTitle>
          </M.TitleWrap>
          <M.BtnWrap>
            <M.StartBtn
              src={startBtn}
              onClick={() => {
                navigate('/routine');
              }}
            ></M.StartBtn>
          </M.BtnWrap>
        </M.Main1>
        <M.Main2>
          <M.Dumbel src={dumbel} data-aos="fade-up" />
          <div>
            <M.Text
              size={'1.8em'}
              margin={'0.5em'}
              weight={300}
              data-aos="fade-up"
            >
              정확한 운동, 정확한 자세를
            </M.Text>
            <M.Text
              size={'1.8em'}
              margin={'1.5em'}
              weight={300}
              data-aos="fade-up"
            >
              고민하는 당신을 위해,
            </M.Text>
            <M.Text
              size={'3.5em'}
              margin={'0.5em'}
              weight={500}
              data-aos="fade-up"
            >
              ProTeen이 당신을 찾아갑니다!
            </M.Text>
          </div>
        </M.Main2>
        <M.Main3>
          <img src={fire} style={{ margin: 100 }} data-aos="fade-up"></img>
          <M.Text size={'1.5em'} margin={'0'} weight={500} data-aos="fade-up">
            ProTeen과 함께 HOT BODY를 가져보세요
          </M.Text>
          <M.Frame2>
            <img
              src={woonwan}
              data-aos="fade-up"
              onClick={() => {
                navigate('/exercise/bulletin');
              }}
            ></img>
            <M.Frame>
              <img
                src={report}
                style={{ marginBottom: 10 }}
                data-aos="fade-up"
                onClick={() => {
                  navigate('/exercise/register');
                }}
              ></img>
              <img
                src={setting}
                data-aos="fade-up"
                onClick={() => {
                  navigate('/mypage');
                }}
              ></img>
            </M.Frame>
          </M.Frame2>
        </M.Main3>
        {/* <M.Main2>
                <M.Bgimg1 src={bg2} />
                    <img src={dumbel}/>
                    정확한 운동, 정확한 자세를
                </M.Main2>
                <M.Bgimg2 src={bg3} /> */}
      </M.MainWrap>
    </div>
  );
};

export default MainPage;
