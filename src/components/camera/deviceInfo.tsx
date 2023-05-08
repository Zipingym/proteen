import styled from 'styled-components';

const DevideInfo = (props: {
  name: string;
  onClick: () => void;
  focus?: boolean;
}) => {
  return (
    //@ts-expect-error
    <CameraWrapper onClick={props.onClick} focus={props.focus}>
      <Camera>{props.name}</Camera>
    </CameraWrapper>
  );
};

export default DevideInfo;

const Camera = styled.div`
  color: #ffffff;
  font-size: 110%;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
`;

const CameraWrapper = styled.div<{ focus: boolean }>`
  margin-left: 2%;
  width: 30%;
  height: 50px;
  background-color: #3b3b3b;
  border-radius: 5px;
  margin-top: 30px;
  display: flex;
  align-items: center;
  padding-left: 5%;
  cursor: pointer;

  ${({ focus }) =>
    focus ? 'outline: 1px solid #1df659;     background-color: black;' : ''}
  :hover {
    > div {
      color: #1df659;
      transition: 0.5s;
    }
  }
`;
