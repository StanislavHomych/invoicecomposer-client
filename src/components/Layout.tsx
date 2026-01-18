import { ReactNode } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { logout } from '../features/auth/authSlice';
import { Button } from './Button';
import { 
  HiOutlineHome, 
  HiOutlineDocumentPlus, 
  HiOutlineUsers, 
  HiOutlineBuildingOffice2,
  HiOutlineArrowRightOnRectangle,
  HiOutlineUserCircle
} from 'react-icons/hi2';

const Shell = styled.div`
  display: flex;
  min-height: 100vh;
  background: var(--app-bg);

  @media (max-width: 980px) {
    flex-direction: column;
  }
`;

const Sidebar = styled.aside`
  position: fixed;
  left: 0;
  top: 0;
  width: 260px;
  height: 100vh;
  background: linear-gradient(180deg, #262626 0%, #1f1f1f 100%);
  color: #ffffff;
  padding: 0;
  display: flex;
  flex-direction: column;
  border-right: 2px solid rgba(34, 197, 94, 0.15);
  overflow: hidden;
  z-index: 1000;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(180deg, rgba(34, 197, 94, 0.3), rgba(34, 197, 94, 0.1));
    pointer-events: none;
  }

  /* Стилі для скролбара */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.2);
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(34, 197, 94, 0.3);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(34, 197, 94, 0.5);
  }

  @media (max-width: 980px) {
    position: sticky;
    top: 0;
    width: 100%;
    height: auto;
    min-height: auto;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-right: none;
    border-bottom: 2px solid rgba(34, 197, 94, 0.15);
    padding: 0;
    
    &::before {
      display: none;
    }
  }

  @media (max-width: 768px) {
    flex-wrap: wrap;
    padding: 0;
  }
`;

const SidebarHeader = styled.div`
  padding: 24px 20px;
  flex-shrink: 0;

  @media (max-width: 980px) {
    padding: 12px 16px;
    flex-shrink: 0;
  }

  @media (max-width: 768px) {
    padding: 10px 12px;
  }
`;

const Brand = styled.div`
  font-weight: 300;
  font-size: 24px;
  letter-spacing: -0.5px;
  color: #ffffff;
  padding: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;

  @media (max-width: 980px) {
    font-size: 18px;
  }

  @media (max-width: 768px) {
    font-size: 16px;
    gap: 4px;
  }

  span {
    background: linear-gradient(135deg, #4ade80, #22c55e);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const SidebarContent = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0 20px;
  min-height: 0;

  @media (max-width: 980px) {
    flex: 1;
    padding: 0 8px;
    overflow-x: auto;
    overflow-y: hidden;
    min-width: 0;
  }

  @media (max-width: 768px) {
    padding: 0 4px;
  }
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 6px;

  @media (max-width: 980px) {
    flex-direction: row;
    flex-wrap: nowrap;
    gap: 4px;
    align-items: center;
    width: 100%;
  }

  @media (max-width: 768px) {
    gap: 3px;
  }
`;

const NavItem = styled(NavLink)`
  padding: 14px 16px;
  border-radius: 12px;
  color: #ffffff;
  font-weight: 300;
  font-size: 15px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
  border: 1px solid transparent;
  text-decoration: none;
  white-space: nowrap;

  @media (max-width: 980px) {
    padding: 8px 10px;
    font-size: 13px;
    gap: 6px;
    flex-shrink: 0;
    min-width: fit-content;
  }

  @media (max-width: 768px) {
    padding: 6px 8px;
    font-size: 12px;
    gap: 4px;
    border-radius: 8px;
  }

  span {
    color: #ffffff;
    font-weight: 300;

    @media (max-width: 980px) {
      display: none;
    }
  }

  svg {
    width: 20px;
    height: 20px;
    transition: transform 0.2s ease;
    color: #ffffff;
    flex-shrink: 0;

    @media (max-width: 980px) {
      width: 18px;
      height: 18px;
    }

    @media (max-width: 768px) {
      width: 16px;
      height: 16px;
    }
  }

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 3px;
    height: 0;
    background: linear-gradient(180deg, #4ade80, #22c55e);
    border-radius: 0 4px 4px 0;
    transition: height 0.3s ease;
  }

  &:hover {
    background: linear-gradient(90deg, rgba(34, 197, 94, 0.1), rgba(34, 197, 94, 0.05));
    color: #ffffff;
    border-color: rgba(34, 197, 94, 0.2);
    transform: translateX(4px);

    @media (max-width: 768px) {
      transform: none;
    }

    span {
      color: #ffffff;
    }

    svg {
      transform: scale(1.1);
      color: #4ade80;

      @media (max-width: 768px) {
        transform: none;
      }
    }

    &::before {
      height: 60%;

      @media (max-width: 768px) {
        display: none;
      }
    }
  }

  &.active {
    background: linear-gradient(90deg, rgba(34, 197, 94, 0.2), rgba(34, 197, 94, 0.1));
    color: #ffffff;
    border-color: rgba(34, 197, 94, 0.3);
    box-shadow: 0 2px 8px rgba(34, 197, 94, 0.15);
    font-weight: 400;

    span {
      color: #ffffff;
      font-weight: 400;
    }

    svg {
      color: #4ade80;
      transform: scale(1.1);
    }

    &::before {
      height: 80%;
      opacity: 1;
    }
  }
`;


const SidebarFooter = styled.div`
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-top: 1px solid rgba(34, 197, 94, 0.15);
  flex-shrink: 0;
  background: linear-gradient(180deg, transparent, rgba(31, 31, 31, 0.5));

  @media (max-width: 980px) {
    border-top: none;
    padding: 8px 12px;
    flex-direction: row;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
  }

  @media (max-width: 768px) {
    padding: 6px 8px;
    gap: 6px;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 12px;
  background: rgba(34, 197, 94, 0.05);
  border: 1px solid rgba(34, 197, 94, 0.1);
  color: #ffffff;

  @media (max-width: 980px) {
    padding: 6px 8px;
    gap: 6px;
    flex: 1;
    min-width: 0;
    max-width: 200px;
  }

  @media (max-width: 768px) {
    padding: 4px 6px;
    gap: 4px;
    max-width: 150px;
  }
`;

const UserIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(34, 197, 94, 0.1));
  border: 1px solid rgba(34, 197, 94, 0.3);
  color: #4ade80;
  flex-shrink: 0;

  @media (max-width: 980px) {
    width: 28px;
    height: 28px;
  }

  @media (max-width: 768px) {
    width: 24px;
    height: 24px;
  }

  svg {
    width: 24px;
    height: 24px;
    color: #4ade80;

    @media (max-width: 980px) {
      width: 16px;
      height: 16px;
    }

    @media (max-width: 768px) {
      width: 14px;
      height: 14px;
    }
  }
`;

const UserEmail = styled.div`
  flex: 1;
  font-size: 13px;
  color: #ffffff;
  font-weight: 300;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;

  @media (max-width: 980px) {
    font-size: 11px;
  }

  @media (max-width: 768px) {
    font-size: 10px;
  }
`;

const LogoutButton = styled(Button)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  font-weight: 300;
  color: #ffffff;
  border: 1px solid rgba(239, 68, 68, 0.2);
  flex-shrink: 0;
  
  @media (max-width: 980px) {
    width: auto;
    padding: 6px 10px;
    font-size: 12px;
    gap: 4px;
  }
  
  @media (max-width: 768px) {
    padding: 4px 8px;
    font-size: 11px;
    gap: 3px;
  }
  
  span {
    color: #ffffff;
    font-weight: 300;

    @media (max-width: 980px) {
      display: none;
    }
  }
  
  &:hover {
    background: rgba(239, 68, 68, 0.1);
    border-color: rgba(239, 68, 68, 0.3);
    color: #ffffff;
    
    span {
      color: #ffffff;
    }
  }

  svg {
    width: 18px;
    height: 18px;
    color: #ffffff;
    flex-shrink: 0;

    @media (max-width: 980px) {
      width: 16px;
      height: 16px;
    }

    @media (max-width: 768px) {
      width: 14px;
      height: 14px;
    }
  }
`;

const Main = styled.main`
  margin-left: 260px;
  display: flex;
  flex-direction: column;
  min-width: 0;
  flex: 1;
  width: calc(100% - 260px);

  @media (max-width: 980px) {
    margin-left: 0;
    width: 100%;
  }
`;

const Content = styled.section`
  padding: 28px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`;

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = async () => {
    await dispatch(logout());
    navigate('/');
  };

  return (
    <Shell>
      <Sidebar>
        <SidebarHeader>
          <Brand>
            Invoice<span>Composer</span>
          </Brand>
        </SidebarHeader>
        <SidebarContent>
          <Nav>
            <NavItem to="/dashboard">
              <HiOutlineHome />
              <span>Dashboard</span>
            </NavItem>
            <NavItem to="/invoices/new">
              <HiOutlineDocumentPlus />
              <span>New Invoice</span>
            </NavItem>
            <NavItem to="/clients">
              <HiOutlineUsers />
              <span>Clients</span>
            </NavItem>
            <NavItem to="/company">
              <HiOutlineBuildingOffice2 />
              <span>Company</span>
            </NavItem>
          </Nav>
        </SidebarContent>
        <SidebarFooter>
          <UserInfo>
            <UserIcon>
              <HiOutlineUserCircle />
            </UserIcon>
            <UserEmail>{user?.email || 'Signed in'}</UserEmail>
          </UserInfo>
          <LogoutButton $variant="secondary" onClick={handleLogout}>
            <HiOutlineArrowRightOnRectangle />
            <span>Sign out</span>
          </LogoutButton>
        </SidebarFooter>
      </Sidebar>
      <Main>
        <Content>{children}</Content>
      </Main>
    </Shell>
  );
}
