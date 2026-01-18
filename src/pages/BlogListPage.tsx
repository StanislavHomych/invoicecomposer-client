import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { HiOutlineArrowRight, HiOutlineCalendar, HiOutlineClock } from 'react-icons/hi';
import SEO from '../components/SEO';
import { generateBreadcrumbs } from '../utils/breadcrumbs';

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
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 32px;
  flex: 1;

  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`;

const PageHeader = styled.header`
  text-align: center;
  margin-bottom: 60px;
`;

const PageTitle = styled.h1`
  font-size: 48px;
  font-weight: 300;
  color: #1f1f1f;
  margin: 0 0 20px 0;
  letter-spacing: -1px;

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const PageSubtitle = styled.p`
  font-size: 18px;
  font-weight: 300;
  color: #6b7280;
  margin: 0;
  line-height: 1.6;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
`;

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 32px;
  margin-bottom: 60px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

const BlogCard = styled(Link)`
  background: #ffffff;
  border-radius: 16px;
  padding: 32px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  text-decoration: none;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    border-color: rgba(70, 200, 97, 0.3);
  }
`;

const BlogCategory = styled.span`
  display: inline-block;
  padding: 6px 12px;
  background: rgba(70, 200, 97, 0.1);
  color: #46c861;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 16px;
  width: fit-content;
`;

const BlogTitle = styled.h2`
  font-size: 24px;
  font-weight: 400;
  color: #1f1f1f;
  margin: 0 0 12px 0;
  line-height: 1.3;
`;

const BlogExcerpt = styled.p`
  font-size: 15px;
  font-weight: 300;
  color: #6b7280;
  line-height: 1.6;
  margin: 0 0 20px 0;
  flex: 1;
`;

const BlogMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  font-size: 13px;
  font-weight: 300;
  color: #9ca3af;
  margin-top: auto;
  padding-top: 20px;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  svg {
    width: 16px;
    height: 16px;
  }
`;

const ReadMore = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #46c861;
  font-size: 14px;
  font-weight: 400;
  margin-top: 16px;

  svg {
    width: 18px;
    height: 18px;
    transition: transform 0.3s ease;
  }

  ${BlogCard}:hover & svg {
    transform: translateX(4px);
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

// Blog articles data
const blogArticles = [
  {
    id: 'simple-invoices-for-small-businesses',
    title: 'How to Create Simple Invoices for Small Businesses',
    excerpt: 'Learn how to create simple invoices for small businesses. See what to include, common mistakes to avoid, and when a basic invoice is enough.',
    category: 'Invoicing Guides',
    date: '2026-01-14',
    readTime: '6 min read',
    path: '/blog/simple-invoices-for-small-businesses'
  },
  {
    id: 'country-specific-invoice-requirements',
    title: 'Country-Specific Invoice Requirements (EU, US, UK, Canada, Australia)',
    excerpt: 'Learn the invoice requirements for the EU, US, UK, Canada, and Australia. Understand VAT, GST, and sales tax rules when issuing invoices internationally.',
    category: 'Invoice Guide',
    date: '2026-01-14',
    readTime: '8 min read',
    path: '/blog/country-specific-invoice-requirements'
  }
];

export default function BlogListPage() {
  const baseUrl = import.meta.env.VITE_BASE_URL || 'https://invoicecomposer.com';
  
  const breadcrumbs = generateBreadcrumbs([
    { name: 'Home', url: baseUrl },
    { name: 'Blog', url: `${baseUrl}/blog` },
  ]);

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Invoice Composer Blog',
    description: 'Articles and guides about invoicing, business tips, and invoice best practices.',
    url: `${baseUrl}/blog`,
    publisher: {
      '@type': 'Organization',
      name: 'Invoice Composer',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
      },
    },
    breadcrumb: breadcrumbs,
  };

  return (
    <PublicLayout>
      <SEO
        title="Blog - Invoice Tips & Business Guides"
        description="Read articles and guides about invoicing, business tips, country-specific invoice requirements, and best practices for creating professional invoices."
        keywords="invoice blog, invoicing tips, business guides, invoice best practices, freelancer tips, small business advice"
        url="/blog"
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
        <PageHeader>
          <PageTitle>Blog</PageTitle>
          <PageSubtitle>
            Learn about invoicing best practices, tax requirements, and tips for creating professional invoices for your business.
          </PageSubtitle>
        </PageHeader>

        <BlogGrid>
          {blogArticles.map((article) => (
            <BlogCard key={article.id} to={article.path}>
              <BlogCategory>{article.category}</BlogCategory>
              <BlogTitle>{article.title}</BlogTitle>
              <BlogExcerpt>{article.excerpt}</BlogExcerpt>
              <BlogMeta>
                <MetaItem>
                  <HiOutlineCalendar />
                  <span>{new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </MetaItem>
                <MetaItem>
                  <HiOutlineClock />
                  <span>{article.readTime}</span>
                </MetaItem>
              </BlogMeta>
              <ReadMore>
                Read more <HiOutlineArrowRight />
              </ReadMore>
            </BlogCard>
          ))}
        </BlogGrid>
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
