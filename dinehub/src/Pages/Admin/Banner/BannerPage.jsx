import React from "react";
import Banner from "../../../Components/Admin/Banner/Banner";
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
function BannerPage() {
    

  return (
    <>
      <Container>
        <Sidebar />
        <Wrapper>
          <Banner />
        </Wrapper>
      </Container>
    </>
  );
}

export default BannerPage;
