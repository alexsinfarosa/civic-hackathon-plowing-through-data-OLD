import styled from "styled-components";

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

export const Top = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 10vh;
  background: #fff;
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
