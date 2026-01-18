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

const ContactInfo = styled.div`
  background: rgba(70, 200, 97, 0.05);
  border-left: 4px solid #46c861;
  border-radius: 8px;
  padding: 20px;
  margin-top: 32px;
`;

const ContactText = styled.p`
  font-size: 15px;
  font-weight: 300;
  color: #1f1f1f;
  line-height: 1.6;
  margin: 0 0 8px 0;

  &:last-child {
    margin-bottom: 0;
  }

  a {
    color: #46c861;
    text-decoration: none;
    font-weight: 400;

    &:hover {
      text-decoration: underline;
    }
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

export default function PrivacyPolicyPage() {
  return (
    <PublicLayout>
      <SEO
        title="Privacy Policy - Invoice Composer"
        description="Read our privacy policy to understand how Invoice Composer collects, uses, and protects your personal information when using our free invoice generator."
        keywords="privacy policy, data protection, user privacy, invoice generator privacy"
        url="/privacy"
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
        <PageTitle>Privacy Policy</PageTitle>
        <LastUpdated>Last updated: 14.01.2026</LastUpdated>

        <ContentSection>
          <Paragraph>
            InvoiceComposer respects your privacy. This Privacy Policy explains how we handle information when you use our website.
          </Paragraph>
        </ContentSection>

        <ContentSection>
          <SectionHeading>
            <SectionNumber>1.</SectionNumber>Information We Do Not Collect
          </SectionHeading>
          <Paragraph>
            We do not require users to create accounts or submit personal information to use the invoice generator.
          </Paragraph>
          <Paragraph>
            Invoice data entered into the invoice editor (such as names, addresses, or amounts) is processed locally in your browser and is not stored on our servers by default.
          </Paragraph>
        </ContentSection>

        <ContentSection>
          <SectionHeading>
            <SectionNumber>2.</SectionNumber>Local Storage
          </SectionHeading>
          <Paragraph>
            To improve usability, InvoiceComposer may use your browser's local storage to temporarily save invoice drafts. This data remains on your device and can be cleared at any time through your browser settings.
          </Paragraph>
        </ContentSection>

        <ContentSection>
          <SectionHeading>
            <SectionNumber>3.</SectionNumber>Analytics
          </SectionHeading>
          <Paragraph>
            We may use privacy-friendly analytics tools to understand general website usage (such as page views, device type, or country). This information is aggregated and does not identify individual users.
          </Paragraph>
        </ContentSection>

        <ContentSection>
          <SectionHeading>
            <SectionNumber>4.</SectionNumber>Cookies
          </SectionHeading>
          <Paragraph>
            InvoiceComposer may use essential cookies required for basic website functionality. We do not use cookies to track users across websites or for behavioral advertising.
          </Paragraph>
        </ContentSection>

        <ContentSection>
          <SectionHeading>
            <SectionNumber>5.</SectionNumber>Third-Party Services
          </SectionHeading>
          <Paragraph>
            We may display advertisements provided by third-party advertising networks such as Google AdSense. These providers may use cookies or similar technologies according to their own privacy policies.
          </Paragraph>
        </ContentSection>

        <ContentSection>
          <SectionHeading>
            <SectionNumber>6.</SectionNumber>Data Security
          </SectionHeading>
          <Paragraph>
            While we strive to keep the website secure, no online service can guarantee absolute security. Users are encouraged not to enter sensitive or confidential information unless necessary.
          </Paragraph>
        </ContentSection>

        <ContentSection>
          <SectionHeading>
            <SectionNumber>7.</SectionNumber>Changes to This Policy
          </SectionHeading>
          <Paragraph>
            We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.
          </Paragraph>
        </ContentSection>

        <ContentSection>
          <SectionHeading>
            <SectionNumber>8.</SectionNumber>Contact
          </SectionHeading>
          <Paragraph>
            If you have questions about this Privacy Policy, please contact us at:
          </Paragraph>
          <ContactInfo>
            <ContactText>
              <a href="mailto:hello@affsquad.com">hello@affsquad.com</a>
            </ContactText>
          </ContactInfo>
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
