import { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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

const ArticleHeader = styled.header`
  margin-bottom: 48px;
`;

const ArticleTitle = styled.h1`
  font-size: 42px;
  font-weight: 300;
  color: #1f1f1f;
  margin: 0 0 24px 0;
  letter-spacing: -1px;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const ArticleIntro = styled.p`
  font-size: 18px;
  font-weight: 300;
  color: #4b5563;
  line-height: 1.8;
  margin: 0 0 24px 0;
`;

const WarningBox = styled.div`
  background: rgba(255, 243, 205, 0.3);
  border-left: 4px solid #ffc107;
  border-radius: 8px;
  padding: 16px 20px;
  margin: 32px 0;
`;

const WarningText = styled.p`
  font-size: 14px;
  font-weight: 300;
  color: #856404;
  line-height: 1.6;
  margin: 0;
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

const SectionHeading = styled.h2`
  font-size: 28px;
  font-weight: 400;
  color: #1f1f1f;
  margin: 0 0 24px 0;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(70, 200, 97, 0.2);
`;

const Paragraph = styled.p`
  font-size: 16px;
  font-weight: 300;
  color: #4b5563;
  line-height: 1.8;
  margin: 0 0 20px 0;

  &:last-child {
    margin-bottom: 0;
  }
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
  padding: 8px 0;
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

const NumberedList = styled.ol`
  list-style: none;
  padding: 0;
  margin: 0 0 24px 0;
  counter-reset: item;
`;

const NumberedListItem = styled.li`
  font-size: 16px;
  font-weight: 300;
  color: #4b5563;
  line-height: 1.8;
  padding: 12px 0;
  padding-left: 36px;
  position: relative;
  counter-increment: item;

  &::before {
    content: counter(item) '.';
    position: absolute;
    left: 0;
    color: #46c861;
    font-weight: 400;
    font-size: 18px;
  }
`;

const SubHeading = styled.h3`
  font-size: 20px;
  font-weight: 400;
  color: #1f1f1f;
  margin: 24px 0 16px 0;
`;

const CTABox = styled.div`
  background: linear-gradient(135deg, rgba(70, 200, 97, 0.1) 0%, rgba(70, 200, 97, 0.05) 100%);
  border: 1px solid rgba(70, 200, 97, 0.2);
  border-radius: 12px;
  padding: 32px;
  margin: 32px 0;
  text-align: center;
`;

const CTATitle = styled.h3`
  font-size: 22px;
  font-weight: 400;
  color: #1f1f1f;
  margin: 0 0 16px 0;
`;

const CTAText = styled.p`
  font-size: 16px;
  font-weight: 300;
  color: #4b5563;
  line-height: 1.8;
  margin: 0 0 24px 0;
`;

const CTAButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  font-size: 16px;
  font-weight: 400;
  background: #46c861;
  color: #ffffff;
  border-radius: 10px;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background: #3db355;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(70, 200, 97, 0.3);
  }
`;

const FAQSection = styled.section`
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

const FAQItem = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 24px 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

const FAQQuestion = styled.h3`
  font-size: 18px;
  font-weight: 400;
  color: #1f1f1f;
  margin: 0 0 12px 0;
`;

const FAQAnswer = styled.p`
  font-size: 15px;
  font-weight: 300;
  color: #4b5563;
  line-height: 1.8;
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

export default function BlogSimpleInvoicesPage() {
  useEffect(() => {
    document.title = 'How to Create Simple Invoices for Small Businesses | InvoiceComposer';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Learn how to create simple invoices for small businesses. See what to include, common mistakes to avoid, and when a basic invoice is enough.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Learn how to create simple invoices for small businesses. See what to include, common mistakes to avoid, and when a basic invoice is enough.';
      document.head.appendChild(meta);
    }

    // Add JSON-LD structured data for FAQ
    const faqStructuredData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the easiest way to create a simple invoice?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Using an online invoice generator with a basic template is usually the fastest and easiest way to create a simple invoice."
          }
        },
        {
          "@type": "Question",
          "name": "Do simple invoices need to be legally compliant?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Even simple invoices must meet local legal and tax requirements."
          }
        },
        {
          "@type": "Question",
          "name": "Can I use a simple invoice for services?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Simple invoices are commonly used for services, consulting, and freelance work."
          }
        },
        {
          "@type": "Question",
          "name": "Do I need a logo on a simple invoice?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. A logo is optional. Clear and accurate information is more important than branding."
          }
        },
        {
          "@type": "Question",
          "name": "Can I reuse the same invoice template?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Reusing the same invoice template helps maintain consistency and professionalism."
          }
        }
      ]
    };

    // Add JSON-LD structured data for BreadcrumbList
    const breadcrumbStructuredData = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://invoicecomposer.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Blog",
          "item": "https://invoicecomposer.com/blog"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "How to Create Simple Invoices for Small Businesses",
          "item": "https://invoicecomposer.com/blog/simple-invoices-for-small-businesses"
        }
      ]
    };

    // Add JSON-LD structured data for BlogPosting
    const blogPostingStructuredData = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": "How to Create Simple Invoices for Small Businesses",
      "description": "Learn how to create simple invoices for small businesses, including what information to include, common mistakes to avoid, and when a basic invoice is enough.",
      "author": {
        "@type": "Organization",
        "name": "InvoiceComposer"
      },
      "publisher": {
        "@type": "Organization",
        "name": "InvoiceComposer",
        "url": "https://invoicecomposer.com/",
        "logo": {
          "@type": "ImageObject",
          "url": "https://invoicecomposer.com/logo.png"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "email": "affsquad@gmail.com",
          "contactType": "Customer Service"
        }
      },
      "datePublished": "2026-01-14",
      "dateModified": "2026-01-18",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://invoicecomposer.com/blog/simple-invoices-for-small-businesses"
      },
      "image": {
        "@type": "ImageObject",
        "url": "https://invoicecomposer.com/og-image.jpg"
      },
      "inLanguage": "en",
      "articleSection": "Invoicing Guides",
      "keywords": [
        "simple invoice",
        "small business invoice",
        "invoice template",
        "invoice generator",
        "how to create an invoice"
      ]
    };

    // Add all JSON-LD schemas to <head> section
    const faqScript = document.createElement('script');
    faqScript.type = 'application/ld+json';
    faqScript.text = JSON.stringify(faqStructuredData);
    document.head.appendChild(faqScript);

    const breadcrumbScript = document.createElement('script');
    breadcrumbScript.type = 'application/ld+json';
    breadcrumbScript.text = JSON.stringify(breadcrumbStructuredData);
    document.head.appendChild(breadcrumbScript);

    const blogPostingScript = document.createElement('script');
    blogPostingScript.type = 'application/ld+json';
    blogPostingScript.text = JSON.stringify(blogPostingStructuredData);
    document.head.appendChild(blogPostingScript);

    return () => {
      // Cleanup: remove scripts when component unmounts
      if (document.head.contains(faqScript)) {
        document.head.removeChild(faqScript);
      }
      if (document.head.contains(breadcrumbScript)) {
        document.head.removeChild(breadcrumbScript);
      }
      if (document.head.contains(blogPostingScript)) {
        document.head.removeChild(blogPostingScript);
      }
    };
  }, []);

  return (
    <PublicLayout>
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
        <ArticleHeader>
          <ArticleTitle>How to Create Simple Invoices for Small Businesses</ArticleTitle>
          <ArticleIntro>
            For small businesses, invoicing doesn't need to be complicated. A simple invoice is often the most effective option — it's easy to create, easy for clients to understand, and sufficient for most accounting needs.
          </ArticleIntro>
          <ArticleIntro>
            In this guide, you'll learn how to create simple invoices for small businesses, what information to include, and how to avoid common invoicing mistakes.
          </ArticleIntro>
          <WarningBox>
            <WarningText>
              ⚠️ This article is for informational purposes only and does not constitute legal or tax advice.
            </WarningText>
          </WarningBox>
        </ArticleHeader>

        <ContentSection>
          <SectionHeading>What Is a Simple Invoice?</SectionHeading>
          <Paragraph>
            A simple invoice is a basic billing document that includes only the essential information required to request payment for goods or services.
          </Paragraph>
          <Paragraph>
            Simple invoices are ideal for:
          </Paragraph>
          <List>
            <ListItem>Small businesses</ListItem>
            <ListItem>Sole traders and freelancers</ListItem>
            <ListItem>Local service providers</ListItem>
            <ListItem>One-off or low-volume transactions</ListItem>
          </List>
          <Paragraph>
            They focus on clarity rather than complex tax structures or advanced accounting features.
          </Paragraph>
        </ContentSection>

        <ContentSection>
          <SectionHeading>Essential Elements of a Simple Invoice</SectionHeading>
          <Paragraph>
            Even the simplest invoice should include the following core elements:
          </Paragraph>
          <SubHeading>1. Seller Information</SubHeading>
          <Paragraph>
            Your business name and contact details, such as:
          </Paragraph>
          <List>
            <ListItem>Business name</ListItem>
            <ListItem>Address (optional but recommended)</ListItem>
            <ListItem>Email or phone number</ListItem>
          </List>
          <SubHeading>2. Client Information</SubHeading>
          <Paragraph>
            Basic details about your customer:
          </Paragraph>
          <List>
            <ListItem>Client name</ListItem>
            <ListItem>Business name (if applicable)</ListItem>
          </List>
          <SubHeading>3. Invoice Number</SubHeading>
          <Paragraph>
            A unique invoice number helps you track payments and keep clean records.
          </Paragraph>
          <SubHeading>4. Invoice Date and Due Date</SubHeading>
          <Paragraph>
            Clearly state:
          </Paragraph>
          <List>
            <ListItem>When the invoice was issued</ListItem>
            <ListItem>When payment is due</ListItem>
          </List>
          <SubHeading>5. Description of Goods or Services</SubHeading>
          <Paragraph>
            Briefly describe what you're billing for. For example:
          </Paragraph>
          <List>
            <ListItem>"Website maintenance – March"</ListItem>
            <ListItem>"Consulting services – 5 hours"</ListItem>
          </List>
          <SubHeading>6. Amount Due</SubHeading>
          <Paragraph>
            Include:
          </Paragraph>
          <List>
            <ListItem>Unit price</ListItem>
            <ListItem>Quantity (if applicable)</ListItem>
            <ListItem>Total amount payable</ListItem>
          </List>
        </ContentSection>

        <ContentSection>
          <SectionHeading>Do Small Businesses Need to Include Tax?</SectionHeading>
          <Paragraph>
            Whether you include tax depends on your location and business status.
          </Paragraph>
          <List>
            <ListItem>If you are not registered for VAT/GST, you typically issue invoices without tax</ListItem>
            <ListItem>If you are registered, your invoice may need to show:</ListItem>
          </List>
          <List style={{ marginLeft: '24px' }}>
            <ListItem>Tax rate</ListItem>
            <ListItem>Tax amount</ListItem>
            <ListItem>Total including tax</ListItem>
          </List>
          <Paragraph>
            Many small businesses start with tax-free invoices and add tax later as they grow.
          </Paragraph>
        </ContentSection>

        <ContentSection>
          <SectionHeading>How to Create a Simple Invoice Step by Step</SectionHeading>
          <NumberedList>
            <NumberedListItem>
              <strong>Choose a Clean Invoice Template</strong>
              <Paragraph style={{ marginTop: '8px', marginBottom: '0' }}>
                Use a layout that is easy to read and print. Avoid unnecessary graphics or clutter.
              </Paragraph>
            </NumberedListItem>
            <NumberedListItem>
              <strong>Add Your Business and Client Details</strong>
              <Paragraph style={{ marginTop: '8px', marginBottom: '0' }}>
                Enter accurate and consistent information to avoid confusion.
              </Paragraph>
            </NumberedListItem>
            <NumberedListItem>
              <strong>List Items or Services Clearly</strong>
              <Paragraph style={{ marginTop: '8px', marginBottom: '0' }}>
                Keep descriptions short and straightforward.
              </Paragraph>
            </NumberedListItem>
            <NumberedListItem>
              <strong>Set Payment Terms</strong>
              <Paragraph style={{ marginTop: '8px', marginBottom: '0' }}>
                Common examples:
              </Paragraph>
              <List style={{ marginLeft: '24px', marginTop: '8px' }}>
                <ListItem>"Payment due within 7 days"</ListItem>
                <ListItem>"Payment due within 14 days"</ListItem>
              </List>
            </NumberedListItem>
            <NumberedListItem>
              <strong>Review and Send</strong>
              <Paragraph style={{ marginTop: '8px', marginBottom: '0' }}>
                Double-check totals and dates before downloading or sending the invoice.
              </Paragraph>
            </NumberedListItem>
          </NumberedList>
        </ContentSection>

        <ContentSection>
          <SectionHeading>Common Mistakes Small Businesses Should Avoid</SectionHeading>
          <List>
            <ListItem>Forgetting to add an invoice number</ListItem>
            <ListItem>Using unclear service descriptions</ListItem>
            <ListItem>Not specifying a due date</ListItem>
            <ListItem>Sending invoices with incorrect totals</ListItem>
            <ListItem>Overcomplicating invoices with unnecessary fields</ListItem>
          </List>
          <Paragraph>
            Simple invoices work best when they are clear, accurate, and consistent.
          </Paragraph>
        </ContentSection>

        <CTABox>
          <CTATitle>Using InvoiceComposer for Simple Invoices</CTATitle>
          <CTAText>
            InvoiceComposer allows small businesses to create clean, simple invoices without registration, automatically calculate totals, download print-ready PDF invoices, and use minimal templates designed for clarity.
          </CTAText>
          <CTAText>
            You can start with a basic invoice and add more details only when your business needs them.
          </CTAText>
          <CTAButton to="/invoice-builder">Create Your Simple Invoice Now</CTAButton>
        </CTABox>

        <ContentSection>
          <SectionHeading>When a Simple Invoice Is Not Enough</SectionHeading>
          <Paragraph>
            As your business grows, you may need more detailed invoices, for example when:
          </Paragraph>
          <List>
            <ListItem>You register for VAT or GST</ListItem>
            <ListItem>You invoice international clients</ListItem>
            <ListItem>You need recurring invoices or advanced reporting</ListItem>
          </List>
          <Paragraph>
            In these cases, upgrading your invoice structure is recommended.
          </Paragraph>
        </ContentSection>

        <FAQSection>
          <SectionHeading>❓ Frequently Asked Questions</SectionHeading>

          <FAQItem>
            <FAQQuestion>What is the easiest way to create a simple invoice?</FAQQuestion>
            <FAQAnswer>Using an online invoice generator with a basic template is usually the fastest and easiest option.</FAQAnswer>
          </FAQItem>

          <FAQItem>
            <FAQQuestion>Do simple invoices need to be legally compliant?</FAQQuestion>
            <FAQAnswer>Yes. Even simple invoices must meet local legal and tax requirements.</FAQAnswer>
          </FAQItem>

          <FAQItem>
            <FAQQuestion>Can I use a simple invoice for services?</FAQQuestion>
            <FAQAnswer>Yes. Simple invoices are commonly used for services, consulting, and freelance work.</FAQAnswer>
          </FAQItem>

          <FAQItem>
            <FAQQuestion>Do I need a logo on a simple invoice?</FAQQuestion>
            <FAQAnswer>No. A logo is optional. Clear information is more important than branding.</FAQAnswer>
          </FAQItem>

          <FAQItem>
            <FAQQuestion>Can I reuse the same invoice template?</FAQQuestion>
            <FAQAnswer>Yes. Using the same template helps keep your invoicing consistent and professional.</FAQAnswer>
          </FAQItem>
        </FAQSection>
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
