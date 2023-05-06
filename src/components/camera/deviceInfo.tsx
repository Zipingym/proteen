import styled from "styled-components";

const DevideInfo = (props: { name: string; onClick: () => void }) => {
  return (
    <>
      <CameraWrapper onClick={props.onClick}>
        <Camera>{props.name}</Camera>
      </CameraWrapper> 
    </>

  );
};

export default DevideInfo;

const Camera = styled.div`
  color: #ffffff;
  font-size: 35px;
`

const CameraWrapper = styled.div`
  margin-left: 2%;
  width: 650px;
  height: 100px;
  background-color: #3B3B3B;
  border-radius: 5px;
  margin-top: 30px;
  display: flex;
  align-items: center;
  padding-left: 5%;
  cursor: pointer;

  :hover{
    > div{
      color: #1DF659;
      transition: 0.5s;
    }
  }
`