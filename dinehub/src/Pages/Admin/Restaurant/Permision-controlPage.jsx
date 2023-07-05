import React from "react";
import AccessPermisionComponent from "../../../Components/Admin/Access-Permision";
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

function PermisionControlPage() {
  return (
    <>
      <Container>
        <Sidebar />
        <Wrapper>
          <AccessPermisionComponent />
        </Wrapper>
      </Container>
    </>
  );
}

export default PermisionControlPage;
