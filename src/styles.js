import styled from "styled-components";

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  font-size: 12px;
`;

export const Top = styled.div`
  display: flex;
  height: 15vh;
  width: 100%;
  justify-content: center;
  align-items: center;
  background: #fff;
`;


export const Body = styled.div`
  display: flex;
  width: 100%;
  height: 85vh;
  background: #fff;
  padding: 10px 20px;
`;

export const Left = styled.div`
  display: flex;
  flex-direction: column;
  align-content: space-between;
  // height: 100vh;
  flex: 1;
  min-width: 250px;
  // background: teal;
`;

export const DataSetButtons = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // background: lightblue;
`;

export const Title = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  // background: teal;
`;

export const Legend = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // background: lightgreen;
`;

export const Row = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: baseline;
  height: 36px;
`;

export const Grey = styled.div`
  background: #eee;
  opacity: 0.7;
  width: 60px;
  height: 8px;
  border-radius: 4px;
  margin-right: 10px;
`;

export const Green = styled.div`
  background: green;
  opacity: 0.7;
  width: 60px;
  height: 8px;
  border-radius: 4px;
  margin-right: 10px;
`;

export const Orange = styled.div`
  background: orange;
  opacity: 0.7;
  width: 60px;
  height: 8px;
  border-radius: 4px;
  margin-right: 10px;
`;

export const Red = styled.div`
  background: red;
  opacity: 0.7;
  width: 60px;
  height: 8px;
  border-radius: 4px;
  margin-right: 10px;
`;

export const Right = styled.div`
  display: flex;
  flex: 3;
  // background: #fff;
`;
