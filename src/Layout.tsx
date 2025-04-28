import { useLocation, Outlet } from "react-router-dom";
import { Container, Stack, Row, Col } from "react-bootstrap";
import Header from "./components/layout/Header";
import SideBar from "./components/layout/Sidebar";
import { ReactNode } from "react";
interface LayoutProps {
  children?: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login"; // Add more paths if needed

  return (
    <Container fluid className="d-flex">
      <Stack>
        {/* Show Header & Sidebar only if not on login page */}
        {!isAuthPage && <Header />}
        <Row>
          {!isAuthPage && (
            <Col xs={12} md={3} lg={1} className="px-0 w-auto min-w-8">
              <SideBar />
            </Col>
          )}
          <Col xs={12} md={!isAuthPage ? 9 : 12} lg={!isAuthPage ? 10 : 12} className="mt-2">
          {children ?? <Outlet />}
          </Col>
        </Row>
      </Stack>
    </Container>
  );
};

export default Layout;
