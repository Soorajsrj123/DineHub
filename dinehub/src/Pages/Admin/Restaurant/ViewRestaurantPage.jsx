import React from 'react'
// import Sidebar from '../../../Components/Admin/Sidebar'
import ViewRestaurantComponent from '../../../Components/Admin/ViewRestaurant'
import styled from 'styled-components';

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

function ViewRestaurantPage() {

   
  return (
    <div>
        <Container>

        {/* <Sidebar/> */}
<Wrapper>
      <ViewRestaurantComponent/>
</Wrapper>
        </Container>
    </div>
  )
}

export default ViewRestaurantPage