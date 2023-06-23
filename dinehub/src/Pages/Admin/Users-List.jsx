import React from "react";
import UsersListComponent from "../../Components/Admin/users-List";
import Sidebar from "../../Components/Admin/Sidebar";
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

function UsersListPage() {
  return (
    <div>
      <Container>
        <Sidebar />
        <Wrapper>
          <UsersListComponent />
        </Wrapper>
      </Container>
    </div>
  );
}

export default UsersListPage;
