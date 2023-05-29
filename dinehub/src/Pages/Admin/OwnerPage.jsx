import React from 'react'
import Sidebar from '../../Components/Admin/Sidebar'
import Owners from '../../Components/Admin/Owners'
import styled from "styled-components";

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
         <Owners/>
        </OwnerListWrapper>
      </Container>
    </div>
  );
}

export default Dashboad;