import React from "react";
import Sidebar from "../../Components/Admin/Sidebar";
import styled from "styled-components";
import RestaurantListComponent from "../../Components/Admin/RestaurantLists";
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
function Restaurants() {
  return (
    <div>
      <Container>
        <Sidebar />
        <OwnerListWrapper>
          <RestaurantListComponent />
        </OwnerListWrapper>
      </Container>
    </div>
  );
}

export default Restaurants;
