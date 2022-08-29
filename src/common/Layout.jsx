import styled from "styled-components";

const Layout = () => {
  return (
    <StLayout></StLayout>
  )
};

export default Layout;

const StLayout = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: 0 auto;
`;
