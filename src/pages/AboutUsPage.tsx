import styled from 'styled-components';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const PublicLayout = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e9ecef 100%);
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  background: #ffffff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 20px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  @media (max-width: 768px) {
    padding: 16px 20px;
    flex-direction: column;
    gap: 16px;
  }
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: 300;
  color: #1f1f1f;
  letter-spacing: -0.5px;

  span {
    background: linear-gradient(135deg, #4ade80, #22c55e);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
  }
`;

const StyledLink = styled(Link)`
  padding: 10px 20px;
  border-radius: 8px;
  text-decoration: none;
  font-size: 14px;
  font-weight: 300;
  transition: all 0.3s ease;
  color: #1f1f1f;

  &:hover {
    background: rgba(70, 200, 97, 0.1);
    color: #46c861;
  }
`;

const PrimaryLink = styled(Link)`
  padding: 10px 20px;
  border-radius: 8px;
  text-decoration: none;
  font-size: 14px;
  font-weight: 400;
  background: #46c861;
  color: #ffffff;
  transition: all 0.3s ease;

  &:hover {
    background: #3db355;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(70, 200, 97, 0.3);
  }
`;

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 60px 32px;
  flex: 1;

  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`;

const PageTitle = styled.h1`
  font-size: 42px;
  font-weight: 300;
  color: #1f1f1f;
  margin: 0 0 24px 0;
  letter-spacing: -1px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const ContentSection = styled.section`
  background: #ffffff;
  border-radius: 16px;
  padding: 48px;
  margin-bottom: 32px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);

  @media (max-width: 768px) {
    padding: 32px 24px;
  }
`;

const Paragraph = styled.p`
  font-size: 16px;
  font-weight: 300;
  color: #4b5563;
  line-height: 1.8;
  margin: 0 0 24px 0;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Heading = styled.h2`
  font-size: 24px;
  font-weight: 400;
  color: #1f1f1f;
  margin: 0 0 20px 0;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(70, 200, 97, 0.2);
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 24px 0;
`;

const ListItem = styled.li`
  font-size: 16px;
  font-weight: 300;
  color: #4b5563;
  line-height: 1.8;
  padding: 12px 0;
  padding-left: 24px;
  position: relative;

  &::before {
    content: '•';
    position: absolute;
    left: 0;
    color: #46c861;
    font-size: 24px;
    line-height: 1;
  }
`;

const Disclaimer = styled.div`
  background: rgba(255, 243, 205, 0.3);
  border-left: 4px solid #ffc107;
  border-radius: 8px;
  padding: 20px;
  margin-top: 32px;
`;

const DisclaimerText = styled.p`
  font-size: 14px;
  font-weight: 300;
  color: #856404;
  line-height: 1.6;
  margin: 0;
`;

const Footer = styled.footer`
  background: #ffffff;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding: 32px;
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const FooterLink = styled(Link)`
  font-size: 14px;
  font-weight: 300;
  color: #6b7280;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #46c861;
  }
`;

const FooterText = styled.p`
  font-size: 14px;
  font-weight: 300;
  color: #6b7280;
  margin: 0;
`;

const FooterDisclaimer = styled.p`
  font-size: 12px;
  font-weight: 300;
  color: #9ca3af;
  margin: 16px 0 0 0;
  text-align: center;
  line-height: 1.6;
  width: 100%;
`;

const FooterContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export default function AboutUsPage() {
  const baseUrl = import.meta.env.VITE_BASE_URL || 'https://invoicecomposer.com';
  
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About Invoice Composer',
    description: 'Learn about Invoice Composer - a free online invoice generator designed to help freelancers and small businesses create professional invoices.',
    url: `${baseUrl}/about`,
    mainEntity: {
      '@type': 'Organization',
      name: 'Invoice Composer',
      description: 'Free online invoice generator for freelancers and small businesses',
    },
  };

  return (
    <PublicLayout>
      <SEO
        title="About Us - Invoice Composer"
        description="Learn about Invoice Composer - a simple, fast, and free online invoice generator designed to help freelancers, small businesses, and independent professionals create professional invoices."
        keywords="about invoice composer, invoice generator company, free invoice tool, online invoice service"
        url="/about"
        type="website"
        structuredData={structuredData}
      />
      <Header>
        <Logo>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            Invoice<span>Composer</span>
          </Link>
        </Logo>
        <HeaderActions>
          <StyledLink to="/blog">Blog</StyledLink>
          <StyledLink to="/about">About Us</StyledLink>
          <StyledLink to="/login">Sign In</StyledLink>
          <PrimaryLink to="/register">Register</PrimaryLink>
        </HeaderActions>
      </Header>

      <Container>
        <PageTitle>About Us</PageTitle>

        <ContentSection>
          <Paragraph>
            InvoiceComposer is a simple, fast, and free online invoice generator designed to help freelancers, small businesses, and independent professionals create professional invoices in minutes.
          </Paragraph>
          <Paragraph>
            Our goal is to remove unnecessary complexity from invoicing. With InvoiceComposer, you can quickly compose invoices, customize templates, calculate totals accurately, and download ready-to-use invoices without creating an account or installing software.
          </Paragraph>
        </ContentSection>

        <ContentSection>
          <Heading>We focus on:</Heading>
          <List>
            <ListItem>Clean and intuitive design</ListItem>
            <ListItem>Accurate calculations for totals, taxes, and discounts</ListItem>
            <ListItem>Practical invoice templates suitable for real-world business use</ListItem>
            <ListItem>Privacy-friendly usage with no mandatory sign-ups</ListItem>
          </List>
        </ContentSection>

        <ContentSection>
          <Paragraph>
            InvoiceComposer is built as a utility tool - lightweight, accessible, and easy to use from any modern browser. Whether you're issuing a one-time invoice or preparing documents for regular clients, our platform helps you get it done efficiently.
          </Paragraph>
        </ContentSection>

        <Disclaimer>
          <DisclaimerText>
            <strong>Disclaimer:</strong> InvoiceComposer does not provide legal, tax, or accounting advice. Users are responsible for ensuring their invoices comply with local laws, tax regulations, and business requirements.
          </DisclaimerText>
        </Disclaimer>
      </Container>

      <Footer>
        <FooterContent>
          <FooterLinks>
            <FooterLink to="/">Home</FooterLink>
            <FooterLink to="/about">About Us</FooterLink>
            <FooterLink to="/privacy">Privacy Policy</FooterLink>
            <FooterLink to="/terms">Terms of Service</FooterLink>
            <FooterLink to="/invoice-builder">Create Invoice</FooterLink>
          </FooterLinks>
          <FooterContentWrapper>
            <FooterText>© {new Date().getFullYear()} InvoiceComposer. All rights reserved.</FooterText>
            <FooterDisclaimer>
              InvoiceComposer is a free invoice generator. No legal or tax advice is provided. Users are responsible for compliance with local laws and regulations.
            </FooterDisclaimer>
          </FooterContentWrapper>
        </FooterContent>
      </Footer>
    </PublicLayout>
  );
}
