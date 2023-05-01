import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import * as S from './signup.style';
import api from '$/api/customAxios';
interface User {
  id: string;
  password: string;
  name: string;
  age: number;
  gender: string;
}
let ages: Number[] = [];
for (let i = 1; i < 80; i++) {
  ages.push(i);
}
let genders: String[] = ['MAN', 'GIRL'];

const signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>({
    id: '',
    password: '',
    name: '',
    age: 0,
    gender: '',
  });

  const handleChangerUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const onSubmit = (data) => {
    api
      .post('/user/signup', user)
      .then(console.log)
      .catch((err) => {
        console.log(err);
        // console.log()
      });
  };
  useEffect(() => {});
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
        <S.SignUpTitle>Sign Up</S.SignUpTitle>
        <S.Explanation>ProTeen과 함께 운동을 시작해보세요.</S.Explanation>

        <S.ContentWrapper>
          <S.ComponentLabel>Name</S.ComponentLabel>
          <S.ActiveInput
            name="name"
            type="text"
            placeholder="이름"
            onChange={handleChangerUser}
          ></S.ActiveInput>
        </S.ContentWrapper>

        <S.align>
          <S.ContentWrapper>
            <S.ComponentLabel>Age</S.ComponentLabel>
            <S.HalfSelect
              name="age"
              type="number"
              placeholder="나이를 선택해 주세요."
              onChange={handleChangerUser}
            >
              {ages.map((value: any) => (
                <S.HalfContent value={value} key={value}>
                  {value}
                </S.HalfContent>
              ))}
            </S.HalfSelect>
          </S.ContentWrapper>

          <S.HalfContentWrapper>
            <S.ComponentLabel>Gender</S.ComponentLabel>
            <S.HalfSelect
              name="gender"
              type="text"
              onChange={handleChangerUser} // 왜 에러나죠ㅠ
              placeholder="성별을 선택해 주세요."
            >
              {genders.map((value: any) => (
                <S.HalfContent value={value} key={value}>
                  {value}
                </S.HalfContent>
              ))}
            </S.HalfSelect>
          </S.HalfContentWrapper>
        </S.align>

        <S.ContentWrapper>
          <S.ComponentLabel>ID</S.ComponentLabel>
          <S.InactiveInput
            placeholder="아이디를 입력해 주세요."
            name="id"
            type="text"
            onChange={handleChangerUser}
          ></S.InactiveInput>
        </S.ContentWrapper>

        <S.ContentWrapper>
          <S.ComponentLabel>Password</S.ComponentLabel>
          <S.InactiveInput
            name="password"
            onChange={handleChangerUser}
            type="password"
            placeholder="비밀번호를 입력해 주세요."
          ></S.InactiveInput>
        </S.ContentWrapper>

        <S.SubmitBtn onClick={onSubmit}>ProTeen 가입</S.SubmitBtn>
      </S.BackBlur>
    </S.BackImage>
  );
};

export default signup;
