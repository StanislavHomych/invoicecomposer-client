import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SEO from '../components/SEO';
import { HiOutlineHome, HiOutlineDocumentText } from 'react-icons/hi';

const PublicLayout = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e9ecef 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
`;

const Container = styled.div`
  max-width: 600px;
  text-align: center;
`;

const ErrorCode = styled.h1`
  font-size: 120px;
  font-weight: 300;
  color: #46c861;
  margin: 0;
  line-height: 1;
  letter-spacing: -5px;

  @media (max-width: 768px) {
    font-size: 80px;
  }
`;

const Title = styled.h2`
  font-size: 32px;
  font-weight: 300;
  color: #1f1f1f;
  margin: 24px 0 16px 0;
  letter-spacing: -0.5px;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const Description = styled.p`
  font-size: 16px;
  font-weight: 300;
  color: #4b5563;
  line-height: 1.6;
  margin: 0 0 32px 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
`;

const StyledButton = styled.button`
  padding: 14px 24px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 400;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  border: none;
  
  &.primary {
    background: #46c861;
    color: #ffffff;
    box-shadow: 0 2px 8px rgba(70, 200, 97, 0.2);
    
    &:hover {
      background: #3db355;
      box-shadow: 0 4px 12px rgba(70, 200, 97, 0.3);
      transform: translateY(-1px);
    }
  }
  
  &.secondary {
    background: rgba(0, 0, 0, 0.05);
    color: #1f1f1f;
    border: 1px solid rgba(0, 0, 0, 0.15);
    
    &:hover {
      background: rgba(0, 0, 0, 0.08);
      border-color: rgba(0, 0, 0, 0.2);
    }
  }
  
  svg {
    width: 18px;
    height: 18px;
  }
`;

export default function NotFoundPage() {
  const baseUrl = import.meta.env.VITE_BASE_URL || 'https://invoicecomposer.com';
  
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: '404 - Page Not Found',
    description: 'The page you are looking for does not exist. Return to Invoice Composer homepage or create a new invoice.',
    url: `${baseUrl}/404`,
  };

  return (
    <PublicLayout>
      <SEO
        title="404 - Page Not Found"
        description="The page you are looking for does not exist. Return to Invoice Composer homepage or create a new invoice."
        url="/404"
        type="website"
        noindex={true}
        structuredData={structuredData}
      />
      <Container>
        <ErrorCode>404</ErrorCode>
        <Title>Page Not Found</Title>
        <Description>
          Sorry, the page you are looking for doesn't exist or has been moved.
          <br />
          You can return to the homepage or create a new invoice.
        </Description>
        <ButtonGroup>
          <StyledButton className="primary" as={Link} to="/">
            <HiOutlineHome />
            <span>Go Home</span>
          </StyledButton>
          <StyledButton className="secondary" as={Link} to="/invoice-builder">
            <HiOutlineDocumentText />
            <span>Create Invoice</span>
          </StyledButton>
        </ButtonGroup>
      </Container>
    </PublicLayout>
  );
}
