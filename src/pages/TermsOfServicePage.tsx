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
  margin: 0 0 12px 0;
  letter-spacing: -1px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const LastUpdated = styled.p`
  font-size: 14px;
  font-weight: 300;
  color: #6b7280;
  text-align: center;
  margin: 0 0 48px 0;
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

const SectionHeading = styled.h2`
  font-size: 24px;
  font-weight: 400;
  color: #1f1f1f;
  margin: 0 0 20px 0;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(70, 200, 97, 0.2);
`;

const SectionNumber = styled.span`
  color: #46c861;
  margin-right: 8px;
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

export default function TermsOfServicePage() {
  return (
    <PublicLayout>
      <SEO
        title="Terms of Service - Invoice Composer"
        description="Read our terms of service to understand the rules and guidelines for using Invoice Composer's free invoice generator service."
        keywords="terms of service, user agreement, invoice generator terms, service terms"
        url="/terms"
        type="website"
        noindex={true}
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
        <PageTitle>Terms of Service</PageTitle>
        <LastUpdated>Last updated: 14.01.2026</LastUpdated>

        <ContentSection>
          <Paragraph>
            By accessing or using InvoiceComposer, you agree to the following Terms of Service.
          </Paragraph>
        </ContentSection>

        <ContentSection>
          <SectionHeading>
            <SectionNumber>1.</SectionNumber>Service Description
          </SectionHeading>
          <Paragraph>
            InvoiceComposer provides an online tool that allows users to create, view, and export invoice documents for personal or business use.
          </Paragraph>
          <Paragraph>
            The service is provided "as is" and "as available."
          </Paragraph>
        </ContentSection>

        <ContentSection>
          <SectionHeading>
            <SectionNumber>2.</SectionNumber>No Legal or Tax Advice
          </SectionHeading>
          <Paragraph>
            InvoiceComposer does not provide legal, tax, or accounting advice. All content and calculations are provided for informational purposes only.
          </Paragraph>
          <Paragraph>
            Users are solely responsible for:
          </Paragraph>
          <List>
            <ListItem>Verifying the accuracy of invoice data</ListItem>
            <ListItem>Ensuring compliance with applicable laws and tax regulations</ListItem>
            <ListItem>Determining whether generated invoices meet legal requirements in their jurisdiction</ListItem>
          </List>
        </ContentSection>

        <ContentSection>
          <SectionHeading>
            <SectionNumber>3.</SectionNumber>User Responsibility
          </SectionHeading>
          <Paragraph>
            You agree not to use InvoiceComposer for unlawful purposes or to generate misleading, fraudulent, or illegal documents.
          </Paragraph>
        </ContentSection>

        <ContentSection>
          <SectionHeading>
            <SectionNumber>4.</SectionNumber>Intellectual Property
          </SectionHeading>
          <Paragraph>
            All website content, branding, layout, and software components are the property of InvoiceComposer unless otherwise stated. You may use generated invoices for your own business purposes.
          </Paragraph>
        </ContentSection>

        <ContentSection>
          <SectionHeading>
            <SectionNumber>5.</SectionNumber>Limitation of Liability
          </SectionHeading>
          <Paragraph>
            InvoiceComposer shall not be liable for any direct, indirect, incidental, or consequential damages arising from the use or inability to use the service, including but not limited to financial loss, data loss, or regulatory issues.
          </Paragraph>
        </ContentSection>

        <ContentSection>
          <SectionHeading>
            <SectionNumber>6.</SectionNumber>Service Availability
          </SectionHeading>
          <Paragraph>
            We reserve the right to modify, suspend, or discontinue any part of the service at any time without notice.
          </Paragraph>
        </ContentSection>

        <ContentSection>
          <SectionHeading>
            <SectionNumber>7.</SectionNumber>Changes to These Terms
          </SectionHeading>
          <Paragraph>
            We may update these Terms of Service periodically. Continued use of the website constitutes acceptance of the updated terms.
          </Paragraph>
        </ContentSection>
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
