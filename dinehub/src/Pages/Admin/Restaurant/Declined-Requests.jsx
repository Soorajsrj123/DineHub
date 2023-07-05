import React from "react";
import DeclinedRequestComponent from "../../../Components/Admin/Declined-List";

import Sidebar from "../../../Components/Admin/Sidebar";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: stretch;
  height: 100vh;
`;

const Wrapper = styled.div`
  flex: 3;
  padding: 1rem;
`;

function DeclinedRequestsPage() {
  return (
    <div>
      <Container>
        <Sidebar />
        <Wrapper>
          <DeclinedRequestComponent />
        </Wrapper>
      </Container>
    </div>
  );
}

export default DeclinedRequestsPage;
