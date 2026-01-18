import { useEffect } from 'react';
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
  display: flex;
  align-items: center;
  gap: 12px;
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

const SubHeading = styled.h3`
  font-size: 20px;
  font-weight: 400;
  color: #1f1f1f;
  margin: 24px 0 16px 0;
`;

const ComparisonTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 32px 0;
  background: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const TableHeader = styled.thead`
  background: rgba(70, 200, 97, 0.1);
`;

const TableHeaderCell = styled.th`
  padding: 16px;
  text-align: left;
  font-size: 14px;
  font-weight: 400;
  color: #1f1f1f;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 2px solid rgba(70, 200, 97, 0.2);
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: rgba(70, 200, 97, 0.02);
  }
`;

const TableCell = styled.td`
  padding: 16px;
  font-size: 15px;
  font-weight: 300;
  color: #4b5563;
  line-height: 1.6;
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

export default function BlogCountryRequirementsPage() {
  useEffect(() => {
    document.title = 'Country-Specific Invoice Requirements (EU, US, UK, Canada, Australia) | InvoiceComposer';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Learn the invoice requirements for the EU, US, UK, Canada, and Australia. Understand VAT, GST, and sales tax rules when issuing invoices internationally.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Learn the invoice requirements for the EU, US, UK, Canada, and Australia. Understand VAT, GST, and sales tax rules when issuing invoices internationally.';
      document.head.appendChild(meta);
    }

    // Add JSON-LD structured data for FAQ
    const faqStructuredData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Do invoice requirements really differ between countries?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Required fields and tax-related wording vary by jurisdiction, and sometimes by transaction type (B2B vs B2C)."
          }
        },
        {
          "@type": "Question",
          "name": "What are the most common required fields worldwide?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Most invoices include an invoice number, issue date, seller and buyer details, item description, quantities, prices, and the total amount due."
          }
        },
        {
          "@type": "Question",
          "name": "Is a VAT/GST number always required?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. VAT/GST IDs are generally required when the seller is tax-registered and the invoice is for a taxable supply. Exact requirements vary by country and scenario."
          }
        },
        {
          "@type": "Question",
          "name": "Do I need to show sales tax on U.S. invoices?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Only when sales tax applies to your transaction and you have an obligation to collect it, which often depends on the state and your tax nexus."
          }
        },
        {
          "@type": "Question",
          "name": "Can I use the same invoice template in the EU, UK, Canada, and Australia?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can reuse the same layout, but you may need to adjust fields and wording depending on local requirements, such as VAT/GST breakdowns or specific labels."
          }
        },
        {
          "@type": "Question",
          "name": "Are digital invoices legally accepted?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "In many countries, digital invoices are accepted as long as they include required information and are stored appropriately for recordkeeping."
          }
        },
        {
          "@type": "Question",
          "name": "What is reverse charge in the EU/UK, and does it affect invoice wording?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Reverse charge is a VAT mechanism that shifts VAT accounting to the buyer in certain B2B cases. When it applies, invoices often require specific wording indicating VAT is reverse-charged."
          }
        },
        {
          "@type": "Question",
          "name": "Does InvoiceComposer guarantee compliance for my country?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. InvoiceComposer provides templates and calculation tools, but you are responsible for ensuring compliance with local laws and tax rules."
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
          "name": "Country-Specific Invoice Requirements",
          "item": "https://invoicecomposer.com/blog/country-specific-invoice-requirements"
        }
      ]
    };

    // Add JSON-LD structured data for BlogPosting
    const blogPostingStructuredData = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": "Country-Specific Invoice Requirements: EU, US, Canada, UK & Australia",
      "description": "A practical guide to invoice requirements across the EU, United States, Canada, United Kingdom, and Australia, including VAT, GST, and sales tax rules.",
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
        "@id": "https://invoicecomposer.com/blog/country-specific-invoice-requirements"
      },
      "image": {
        "@type": "ImageObject",
        "url": "https://invoicecomposer.com/og-image.jpg"
      }
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
      <SEO
        title="Country-Specific Invoice Requirements: A Complete Guide"
        description="Learn about invoice requirements for different countries including tax regulations, required fields, VAT compliance, and country-specific standards for US, UK, EU, Canada, and Australia."
        keywords="invoice requirements by country, international invoicing, VAT invoice, tax invoice, invoice compliance, country invoice standards, invoice regulations"
        url="/blog/country-specific-invoice-requirements"
        type="article"
        publishedTime="2026-01-14T08:00:00+00:00"
        modifiedTime="2026-01-18T08:00:00+00:00"
        structuredData={[
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": "Country-Specific Invoice Requirements: EU, US, Canada, UK & Australia",
            "description": "A practical guide to invoice requirements across the EU, United States, Canada, United Kingdom, and Australia, including VAT, GST, and sales tax rules.",
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
              }
            },
            "datePublished": "2026-01-14",
            "dateModified": "2026-01-18",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://invoicecomposer.com/blog/country-specific-invoice-requirements"
            },
            "image": {
              "@type": "ImageObject",
              "url": "https://invoicecomposer.com/og-image.jpg"
            }
          }
        ]}
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
        <ArticleHeader>
          <ArticleTitle>Country-Specific Invoice Requirements (EU, US, UK, Canada, Australia)</ArticleTitle>
          <ArticleIntro>
            Issuing invoices may seem straightforward, but invoice requirements vary significantly by country. What is considered a valid invoice in one jurisdiction may be incomplete or non-compliant in another.
          </ArticleIntro>
          <ArticleIntro>
            This guide explains the key invoice requirements for businesses and freelancers operating in the European Union, United States, Canada, United Kingdom, and Australia, helping you avoid common mistakes and compliance issues.
          </ArticleIntro>
          <WarningBox>
            <WarningText>
              ⚠️ This article is for informational purposes only and does not constitute legal or tax advice.
            </WarningText>
          </WarningBox>
        </ArticleHeader>

        <ContentSection>
          <SectionHeading>
            <span>🇪🇺</span>
            <span>Invoice Requirements in the European Union (EU)</span>
          </SectionHeading>
          <Paragraph>
            In the European Union, invoicing rules are largely harmonized under EU VAT directives, though local variations may apply.
          </Paragraph>
          <SubHeading>Standard EU invoice requirements include:</SubHeading>
          <List>
            <ListItem>Invoice number (unique and sequential)</ListItem>
            <ListItem>Issue date</ListItem>
            <ListItem>Seller's full legal name and address</ListItem>
            <ListItem>Buyer's name and address</ListItem>
            <ListItem>Seller's VAT identification number</ListItem>
            <ListItem>Buyer's VAT ID (for B2B and reverse-charge scenarios)</ListItem>
            <ListItem>Description of goods or services</ListItem>
            <ListItem>Quantity and unit price</ListItem>
            <ListItem>Applicable VAT rate(s)</ListItem>
            <ListItem>VAT amount per rate</ListItem>
            <ListItem>Total amount payable (gross)</ListItem>
            <ListItem>Currency used</ListItem>
          </List>
          <SubHeading>Special cases:</SubHeading>
          <List>
            <ListItem>Reverse charge invoices must clearly state "VAT reverse-charged"</ListItem>
            <ListItem>Simplified invoices may be allowed for low-value transactions</ListItem>
            <ListItem>Cross-border EU invoices have stricter VAT wording requirements</ListItem>
          </List>
        </ContentSection>

        <ContentSection>
          <SectionHeading>
            <span>🇺🇸</span>
            <span>Invoice Requirements in the United States</span>
          </SectionHeading>
          <Paragraph>
            The United States does not impose a standardized federal invoice format. Requirements depend on state laws, industry, and tax nexus.
          </Paragraph>
          <SubHeading>Common best practices for U.S. invoices:</SubHeading>
          <List>
            <ListItem>Invoice number</ListItem>
            <ListItem>Issue date</ListItem>
            <ListItem>Seller and buyer names</ListItem>
            <ListItem>Description of goods or services</ListItem>
            <ListItem>Quantity and unit price</ListItem>
            <ListItem>Subtotal and total amount</ListItem>
            <ListItem>Sales tax (if applicable)</ListItem>
            <ListItem>Payment terms and due date</ListItem>
          </List>
          <SubHeading>Important notes:</SubHeading>
          <List>
            <ListItem>Sales tax rules vary by state</ListItem>
            <ListItem>Many services are non-taxable, but physical goods often are</ListItem>
            <ListItem>Invoices are often used primarily as accounting records rather than legal documents</ListItem>
          </List>
        </ContentSection>

        <ContentSection>
          <SectionHeading>
            <span>🇨🇦</span>
            <span>Invoice Requirements in Canada</span>
          </SectionHeading>
          <Paragraph>
            In Canada, invoice requirements are closely tied to GST/HST and PST regulations.
          </Paragraph>
          <SubHeading>A compliant Canadian invoice typically includes:</SubHeading>
          <List>
            <ListItem>Invoice number</ListItem>
            <ListItem>Issue date</ListItem>
            <ListItem>Seller's business name and address</ListItem>
            <ListItem>Business Number (BN)</ListItem>
            <ListItem>Buyer's name</ListItem>
            <ListItem>Description of goods or services</ListItem>
            <ListItem>Amount before tax</ListItem>
            <ListItem>GST/HST rate and amount</ListItem>
            <ListItem>Total payable amount</ListItem>
          </List>
          <SubHeading>Additional notes:</SubHeading>
          <List>
            <ListItem>Large invoices require more detailed tax breakdowns</ListItem>
            <ListItem>Small-supplier rules may affect tax obligations</ListItem>
            <ListItem>Different provinces apply different tax structures</ListItem>
          </List>
        </ContentSection>

        <ContentSection>
          <SectionHeading>
            <span>🇬🇧</span>
            <span>Invoice Requirements in the United Kingdom</span>
          </SectionHeading>
          <Paragraph>
            The United Kingdom follows VAT rules similar to the EU but with post-Brexit distinctions.
          </Paragraph>
          <SubHeading>UK VAT invoice requirements include:</SubHeading>
          <List>
            <ListItem>Unique invoice number</ListItem>
            <ListItem>Issue date</ListItem>
            <ListItem>Seller's name, address, and VAT number</ListItem>
            <ListItem>Customer's name and address</ListItem>
            <ListItem>Description of goods or services</ListItem>
            <ListItem>VAT rate(s) applied</ListItem>
            <ListItem>Net amount, VAT amount, and total amount</ListItem>
            <ListItem>Time of supply (tax point), if different from invoice date</ListItem>
          </List>
          <Paragraph>
            Simplified VAT invoices may be used for low-value transactions under specific thresholds.
          </Paragraph>
        </ContentSection>

        <ContentSection>
          <SectionHeading>
            <span>🇦🇺</span>
            <span>Invoice Requirements in Australia</span>
          </SectionHeading>
          <Paragraph>
            In Australia, invoices are governed by GST (Goods and Services Tax) rules.
          </Paragraph>
          <SubHeading>Tax invoices over AUD 82.50 must include:</SubHeading>
          <List>
            <ListItem>The words "Tax Invoice"</ListItem>
            <ListItem>Seller's business name and ABN</ListItem>
            <ListItem>Issue date</ListItem>
            <ListItem>Description of goods or services</ListItem>
            <ListItem>GST amount or a statement that GST is included</ListItem>
            <ListItem>Total amount payable</ListItem>
          </List>
          <Paragraph>
            For invoices over AUD 1,000, the buyer's identity must also be shown.
          </Paragraph>
        </ContentSection>

        <ContentSection>
          <SectionHeading>
            <span>🌍</span>
            <span>Key Differences at a Glance</span>
          </SectionHeading>
          <ComparisonTable>
            <TableHeader>
              <tr>
                <TableHeaderCell>Region</TableHeaderCell>
                <TableHeaderCell>VAT / Sales Tax</TableHeaderCell>
                <TableHeaderCell>Buyer Tax ID Required</TableHeaderCell>
                <TableHeaderCell>Special Wording</TableHeaderCell>
              </tr>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>EU</TableCell>
                <TableCell>VAT</TableCell>
                <TableCell>Often</TableCell>
                <TableCell>Reverse charge</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>US</TableCell>
                <TableCell>Sales tax (state)</TableCell>
                <TableCell>Rarely</TableCell>
                <TableCell>Varies</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Canada</TableCell>
                <TableCell>GST/HST/PST</TableCell>
                <TableCell>Sometimes</TableCell>
                <TableCell>Province-based</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>UK</TableCell>
                <TableCell>VAT</TableCell>
                <TableCell>Sometimes</TableCell>
                <TableCell>VAT-specific</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Australia</TableCell>
                <TableCell>GST</TableCell>
                <TableCell>Sometimes</TableCell>
                <TableCell>"Tax Invoice"</TableCell>
              </TableRow>
            </TableBody>
          </ComparisonTable>
        </ContentSection>

        <CTABox>
          <CTATitle>✅ Using InvoiceComposer for International Invoicing</CTATitle>
          <CTAText>
            InvoiceComposer helps you create invoices with or without VAT/GST, use multi-currency formatting, customize invoice fields for different jurisdictions, and generate clean, professional invoices suitable for international clients.
          </CTAText>
          <CTAText>
            Always verify country-specific requirements before issuing invoices, especially for cross-border transactions.
          </CTAText>
          <CTAButton to="/invoice-builder">Create Your Invoice Now</CTAButton>
        </CTABox>

        <FAQSection>
          <SectionHeading>
            <span>❓</span>
            <span>Frequently Asked Questions</span>
          </SectionHeading>

          <FAQItem>
            <FAQQuestion>Do invoice requirements really differ between countries?</FAQQuestion>
            <FAQAnswer>Yes. Required fields (like VAT/GST IDs, wording, or tax breakdowns) vary by jurisdiction, and sometimes by transaction type (B2B vs B2C).</FAQAnswer>
          </FAQItem>

          <FAQItem>
            <FAQQuestion>What are the most common required fields worldwide?</FAQQuestion>
            <FAQAnswer>Most invoices should include: an invoice number, issue date, seller and buyer details, item description, quantities, prices, and the total amount due.</FAQAnswer>
          </FAQItem>

          <FAQItem>
            <FAQQuestion>Is a VAT/GST number always required?</FAQQuestion>
            <FAQAnswer>No. VAT/GST IDs are typically required when the seller is VAT/GST-registered and the invoice is taxable. Rules vary by country and transaction type.</FAQAnswer>
          </FAQItem>

          <FAQItem>
            <FAQQuestion>Do I need to show sales tax on U.S. invoices?</FAQQuestion>
            <FAQAnswer>Only if sales tax applies to your transaction and you have a tax obligation (often tied to state nexus). Many service invoices won't include sales tax.</FAQAnswer>
          </FAQItem>

          <FAQItem>
            <FAQQuestion>Can I use the same invoice template in the EU, UK, Canada, and Australia?</FAQQuestion>
            <FAQAnswer>You can use the same visual template, but you may need to adjust fields and wording (e.g., "Tax Invoice" in Australia, VAT breakdown in EU/UK, GST/HST details in Canada).</FAQAnswer>
          </FAQItem>

          <FAQItem>
            <FAQQuestion>Are digital invoices legally accepted?</FAQQuestion>
            <FAQAnswer>In most cases, yes. Digital invoices are generally accepted as long as they meet local requirements and are stored appropriately for accounting/tax records.</FAQAnswer>
          </FAQItem>

          <FAQItem>
            <FAQQuestion>What is "reverse charge" in the EU/UK, and does it affect invoice wording?</FAQQuestion>
            <FAQAnswer>Reverse charge rules shift VAT accounting to the buyer in certain B2B cross-border cases. When it applies, invoices typically need specific wording indicating VAT is reverse-charged.</FAQAnswer>
          </FAQItem>

          <FAQItem>
            <FAQQuestion>Does InvoiceComposer guarantee compliance for my country?</FAQQuestion>
            <FAQAnswer>No. InvoiceComposer helps you create professional invoices and supports tax modes, but you're responsible for ensuring your invoice meets local legal and tax requirements.</FAQAnswer>
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
