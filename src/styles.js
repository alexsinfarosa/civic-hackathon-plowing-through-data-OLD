import styled from "styled-components";

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

export const Top = styled.div`
  display: flex;
  height: 10vh;
  width: 100%;
  justify-content: center;
  align-items: center;
  background: #fff;
`;

export const WSlider = styled.div`
  height: 10%;
  margin: 25px 0px 0 25px;
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 90vh;
  background: #fff;
  padding: 10px;
`;

export const Left = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 250px;
  // height: 100vh;
  background: #fff;
`;

export const Right = styled.div`
  display: flex;
  flex: 3;
  // height: 90vh;
  background: #fff;
`;
