import React from 'react'
import Sidebar from "../../Components/Admin/Sidebar";
import styled from "styled-components";
// import Dashboard from "../../Components/Admin/dashboard";
import Chart from '../../Components/Admin/Dashboard/Chart';
import Graph from '../../Components/Admin/Dashboard/Graph';
const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: stretch;
  height: 100vh;
`;

const OwnerListWrapper = styled.div`
  flex: 3;
  padding: 1rem;
`;
function Dashboad() {
  return (
    <div>
      <Container>
        <Sidebar />
        <OwnerListWrapper>
         <Chart/>
         <Graph/>
        </OwnerListWrapper>
      </Container>
    </div>
  );
}

export default Dashboad;
