import { useNavigate } from 'react-router-dom';
import * as S from './signin.style';
import { useEffect, useState } from 'react';
import { Input } from '../mypage/mypage.style';
import api from '$/api/customAxios';
import axios from 'axios';

const signin = () => {
  useEffect(() => {
    api
      .get('/user/login')
      .then((res) => console.log(res))
      .catch();
  }, []);

  const navigate = useNavigate();

  interface User {
    id: string;
    password: string;
  }

  const [user, setUser] = useState<User>({
    id: '',
    password: '',
  });

  interface Input {
    idValid: boolean;
    pwValid: boolean;
  }
  const [inputValid, setInputValid] = useState<Input>({
    idValid: true,
    pwValid: true,
  });

  const handleUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    const regex = new RegExp('^[a-zA-Z]*$');

    setInputValid({
      ...inputValid,
      idValid: regex.test(user.id),
      pwValid: regex.test(user.password),
    });
    console.log(inputValid);
  };

  const onSubmit = () => {
    if (user.id.length > 0 || user.password.length > 0) {
      api
        .post('/user/login', {
          id: user.id,
          password: user.password,
        })
        .then((res: any) => {
          localStorage.setItem('accessToken', res.data.accessToken);
        })
        .catch(() => {
          alert('로그인 실패');
        });
    }
  };

  return (
    <S.BackImage>
      <S.BackBlur>
        <S.ProTeenTitle
          onClick={() => {
            navigate('/');
          }}
        >
          ProTeen
        </S.ProTeenTitle>
        <S.SignInTitle>Sign In</S.SignInTitle>
        <S.Explanation>ProTeen과 함께 운동을 시작해보세요.</S.Explanation>
        <S.ContentWrapper>
          <S.ComponentLabel>Id</S.ComponentLabel>
          <S.idInput
            name="id"
            value={user.id}
            onChange={handleUser}
            style={
              inputValid.idValid
                ? { border: '3px solid #494949' }
                : { border: '3px solid #FF0000' }
            }
          ></S.idInput>
        </S.ContentWrapper>
        {!inputValid.idValid && user.id.length > 0 && (
          <S.WarningMsg>*아이디가 올바르지 않습니다.</S.WarningMsg>
        )}
        ㄴ
        <S.ContentWrapper>
          <S.ComponentLabel>Pw</S.ComponentLabel>
          <S.pwInput
            type="password"
            name="password"
            value={user.password}
            onChange={handleUser}
            style={
              inputValid.pwValid
                ? { border: '3px solid #494949' }
                : { border: '3px solid #FF0000' }
            }
          ></S.pwInput>
        </S.ContentWrapper>
        <S.GotoSignup
          onClick={() => {
            navigate('/signup');
          }}
        >
          회원정보가 없으십니까?
        </S.GotoSignup>
        {!inputValid.pwValid && user.password.length > 0 && (
          <S.WarningMsg>*비밀번호가 올바르지 않습니다.</S.WarningMsg>
        )}
        <S.SubmitBtn onClick={onSubmit}>ProTeen 입장</S.SubmitBtn>
      </S.BackBlur>
    </S.BackImage>
  );
};

export default signin;
