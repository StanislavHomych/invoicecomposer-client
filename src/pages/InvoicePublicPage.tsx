import { useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import SEO from '../components/SEO';
import { 
  HiOutlineChartBar, 
  HiOutlineLockClosed, 
  HiOutlineCheckCircle, 
  HiOutlineGlobeAlt, 
  HiOutlineDocumentText, 
  HiOutlineArrowRight, 
  HiOutlineX,
  HiOutlineCalculator,
  HiOutlineTemplate,
  HiOutlineDownload,
  HiOutlineShieldCheck,
  HiOutlineCurrencyDollar,
  HiOutlineMail
} from 'react-icons/hi';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

const PublicLayout = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%);
  position: relative;
  overflow-x: hidden;

  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 50%, rgba(74, 222, 128, 0.03) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(34, 197, 94, 0.03) 0%, transparent 50%);
    pointer-events: none;
    z-index: 0;
  }
`;

const Header = styled.header`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  padding: 20px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  position: sticky;
  top: 0;
  z-index: 100;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: 16px 20px;
    flex-direction: column;
    gap: 16px;
  }
`;

const Logo = styled.div`
  font-size: 26px;
  font-weight: 600;
  color: #1f1f1f;
  letter-spacing: -0.5px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }

  span {
    background: linear-gradient(135deg, #4ade80, #22c55e, #16a34a);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    background-size: 200% 200%;
    animation: ${shimmer} 3s ease-in-out infinite;
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
  border-radius: 10px;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  color: #475569;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 6px;
    left: 50%;
    transform: translateX(-50%) scaleX(0);
    width: 60%;
    height: 2px;
    background: linear-gradient(90deg, #4ade80, #22c55e);
    border-radius: 2px;
    transition: transform 0.3s ease;
  }

  &:hover {
    background: rgba(74, 222, 128, 0.08);
    color: #22c55e;
    transform: translateY(-1px);

    &::after {
      transform: translateX(-50%) scaleX(1);
    }
  }
`;

const PrimaryLink = styled(Link)`
  padding: 10px 24px;
  border-radius: 10px;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  background: linear-gradient(135deg, #4ade80, #22c55e);
  color: #ffffff;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(74, 222, 128, 0.25);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s ease;
  }

  &:hover {
    background: linear-gradient(135deg, #22c55e, #16a34a);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(74, 222, 128, 0.4);

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0);
  }
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 32px 40px;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    padding: 0 20px 24px;
  }
`;

const SubmitButton = styled(Button)`
  padding: 18px 40px;
  font-size: 17px;
  font-weight: 600;
  background: linear-gradient(135deg, #4ade80, #22c55e) !important;
  color: #ffffff !important;
  border: none !important;
  box-shadow: 0 4px 16px rgba(74, 222, 128, 0.35) !important;
  border-radius: 12px !important;
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.25), transparent);
    transition: left 0.5s ease;
  }

  &:hover {
    background: linear-gradient(135deg, #22c55e, #16a34a) !important;
    box-shadow: 0 8px 24px rgba(74, 222, 128, 0.45) !important;
    transform: translateY(-2px) !important;

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0) !important;
  }
`;

// Landing Page Sections
const HeroSection = styled.section`
  text-align: center;
  padding: 100px 32px 80px;
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  border-radius: 24px;
  margin: 40px 0 80px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
  animation: ${fadeInUp} 0.8s ease-out;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -10%;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(74, 222, 128, 0.1) 0%, transparent 70%);
    border-radius: 50%;
    animation: ${float} 6s ease-in-out infinite;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -30%;
    left: -5%;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(34, 197, 94, 0.08) 0%, transparent 70%);
    border-radius: 50%;
    animation: ${float} 8s ease-in-out infinite reverse;
  }

  @media (max-width: 768px) {
    padding: 60px 24px 40px;
    margin: 24px 0 60px;
    border-radius: 20px;
  }
`;

const HeroTitle = styled.h1`
  font-size: 56px;
  font-weight: 700;
  background: linear-gradient(135deg, #1f1f1f 0%, #475569 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 28px 0;
  letter-spacing: -1.5px;
  line-height: 1.15;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    font-size: 36px;
    letter-spacing: -1px;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 22px;
  font-weight: 400;
  color: #64748b;
  margin: 0 0 48px 0;
  max-width: 720px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.7;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    font-size: 17px;
    margin-bottom: 40px;
  }
`;

const HeroCTAs = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 48px;
`;

const TrustHighlights = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 24px;
  padding-top: 56px;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  margin-top: 0;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
    padding-top: 40px;
  }
`;

const TrustItem = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 15px;
  font-weight: 500;
  color: #475569;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 12px;
  border: 1px solid rgba(74, 222, 128, 0.15);
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(255, 255, 255, 0.9);
    border-color: rgba(74, 222, 128, 0.3);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(74, 222, 128, 0.15);
  }

  svg {
    width: 22px;
    height: 22px;
    color: #22c55e;
    flex-shrink: 0;
    filter: drop-shadow(0 2px 4px rgba(74, 222, 128, 0.2));
  }
`;

const Section = styled.section`
  padding: 80px 0;
  margin-bottom: 0;

  &:last-of-type {
    padding-bottom: 80px;
  }

  @media (max-width: 768px) {
    padding: 60px 0;

    &:last-of-type {
      padding-bottom: 60px;
    }
  }
`;

const SectionHeading = styled.h2`
  font-size: 42px;
  font-weight: 700;
  background: linear-gradient(135deg, #1e293b 0%, #475569 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 24px 0;
  text-align: center;
  letter-spacing: -1px;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 32px;
    margin-bottom: 20px;
  }
`;

const SectionSubheading = styled.p`
  font-size: 19px;
  font-weight: 400;
  color: #64748b;
  margin: 0 0 56px 0;
  text-align: center;
  max-width: 750px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.7;

  @media (max-width: 768px) {
    font-size: 17px;
    margin-bottom: 48px;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 32px;
  margin-top: 48px;

  @media (max-width: 768px) {
    gap: 24px;
    margin-top: 40px;
  }
`;

const FeatureCard = styled.div`
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 16px;
  padding: 40px 32px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #4ade80, #22c55e);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s ease;
  }

  &:hover {
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
    transform: translateY(-4px);
    border-color: rgba(74, 222, 128, 0.3);

    &::before {
      transform: scaleX(1);
    }
  }
`;

const FeatureIcon = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 14px;
  background: linear-gradient(135deg, rgba(74, 222, 128, 0.15), rgba(34, 197, 94, 0.1));
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  border: 1px solid rgba(74, 222, 128, 0.2);
  transition: all 0.3s ease;

  svg {
    width: 28px;
    height: 28px;
    color: #22c55e;
  }

  ${FeatureCard}:hover & {
    transform: scale(1.1) rotate(5deg);
    background: linear-gradient(135deg, rgba(74, 222, 128, 0.25), rgba(34, 197, 94, 0.15));
  }
`;

const FeatureTitle = styled.h3`
  font-size: 22px;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 14px 0;
  line-height: 1.3;
`;

const FeatureDescription = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: #64748b;
  line-height: 1.7;
  margin: 0;
`;

const StepsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 32px;
  margin-top: 48px;

  @media (max-width: 768px) {
    gap: 24px;
    margin-top: 40px;
  }
`;

const StepCard = styled.div`
  text-align: center;
  padding: 40px 32px;
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(74, 222, 128, 0.03), transparent);
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
    border-color: rgba(74, 222, 128, 0.3);

    &::before {
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    padding: 32px 24px;
  }
`;

const StepNumber = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(74, 222, 128, 0.2), rgba(34, 197, 94, 0.1));
  color: #22c55e;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  font-weight: 700;
  margin: 0 auto 24px;
  border: 2px solid rgba(74, 222, 128, 0.3);
  box-shadow: 0 4px 12px rgba(74, 222, 128, 0.2);
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;

  ${StepCard}:hover & {
    transform: scale(1.1) rotate(5deg);
    box-shadow: 0 6px 20px rgba(74, 222, 128, 0.3);
  }
`;

const StepTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 14px 0;
  position: relative;
  z-index: 1;
`;

const StepDescription = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: #64748b;
  line-height: 1.7;
  margin: 0;
  position: relative;
  z-index: 1;
`;

const FAQSection = styled.div`
  max-width: 800px;
  margin: 48px auto 0;

  @media (max-width: 768px) {
    margin-top: 40px;
  }
`;

const FAQItem = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  padding: 28px 0;
  transition: all 0.3s ease;

  &:hover {
    padding-left: 8px;
  }

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  @media (max-width: 768px) {
    padding: 24px 0;
  }
`;

const FAQQuestion = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 10px 0;
`;

const FAQAnswer = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: #64748b;
  line-height: 1.7;
  margin: 0;
`;

const ScrollToFormButton = styled(Link)`
  padding: 18px 36px;
  font-size: 17px;
  font-weight: 600;
  background: #ffffff !important;
  color: #1e293b !important;
  border: 2px solid rgba(0, 0, 0, 0.1) !important;
  border-radius: 12px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  &:hover {
    background: #f8fafc !important;
    border-color: rgba(74, 222, 128, 0.3) !important;
    color: #22c55e !important;
    gap: 14px;
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(74, 222, 128, 0.15);
  }

  svg {
    width: 20px;
    height: 20px;
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: translateX(4px);
  }
`;

const ComparisonSection = styled.section`
  padding: 100px 0;
  background: linear-gradient(135deg, rgba(74, 222, 128, 0.08) 0%, rgba(34, 197, 94, 0.04) 50%, rgba(74, 222, 128, 0.06) 100%);
  margin: 0;
  border-radius: 24px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -10%;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(74, 222, 128, 0.1) 0%, transparent 70%);
    border-radius: 50%;
    animation: ${float} 10s ease-in-out infinite;
  }

  @media (max-width: 768px) {
    padding: 60px 0;
    border-radius: 20px;
  }
`;

const ComparisonGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  margin-top: 48px;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 24px;
    margin-top: 40px;
  }
`;

const ComparisonCard = styled.div<{ $highlight?: boolean }>`
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  border-radius: 20px;
  padding: 48px 40px;
  border: 2px solid ${(props) => (props.$highlight ? 'rgba(74, 222, 128, 0.4)' : 'rgba(0, 0, 0, 0.08)')};
  box-shadow: ${(props) => (props.$highlight ? '0 12px 40px rgba(74, 222, 128, 0.2)' : '0 8px 24px rgba(0, 0, 0, 0.08)')};
  position: relative;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: visible;

  ${(props) =>
    props.$highlight &&
    css`
    &::before {
      content: 'RECOMMENDED';
      position: absolute;
      top: -16px;
      left: 50%;
      transform: translateX(-50%);
      background: linear-gradient(135deg, #4ade80, #22c55e);
      color: #ffffff;
      padding: 10px 28px;
      border-radius: 24px;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 1px;
      text-transform: uppercase;
      box-shadow: 0 4px 12px rgba(74, 222, 128, 0.4);
      z-index: 10;
      white-space: nowrap;
      line-height: 1;
    }

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 6px;
      background: linear-gradient(90deg, #4ade80, #22c55e, #4ade80);
      background-size: 200% 100%;
      animation: ${shimmer} 3s ease-in-out infinite;
    }
  `}

  &:hover {
    transform: translateY(-6px);
    box-shadow: ${(props) => (props.$highlight ? '0 16px 48px rgba(74, 222, 128, 0.3)' : '0 12px 32px rgba(0, 0, 0, 0.12)')};
    border-color: ${(props) => (props.$highlight ? 'rgba(74, 222, 128, 0.5)' : 'rgba(0, 0, 0, 0.15)')};
  }

  @media (max-width: 768px) {
    padding: 36px 28px;
  }
`;

const ComparisonTitle = styled.h3`
  font-size: 28px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 12px 0;
  text-align: center;
  letter-spacing: -0.5px;
`;

const ComparisonPrice = styled.div`
  font-size: 42px;
  font-weight: 700;
  background: linear-gradient(135deg, #22c55e, #16a34a);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-align: center;
  margin: 0 0 32px 0;
  line-height: 1.2;

  span {
    font-size: 18px;
    color: #64748b;
    font-weight: 500;
  }
`;

const ComparisonList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 32px 0;
`;

const ComparisonListItem = styled.li<{ $available?: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 0;
  font-size: 15px;
  font-weight: 300;
  color: #4b5563;
  line-height: 1.6;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);

  &:last-child {
    border-bottom: none;
  }

  svg {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    margin-top: 2px;
    color: ${(props) => (props.$available ? '#46c861' : '#9ca3af')};
  }
`;

const CTASection = styled.section`
  padding: 100px 0;
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 50%, #15803d 100%);
  margin: 0;
  text-align: center;
  position: relative;
  overflow: hidden;
  border-radius: 24px;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -10%;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
    border-radius: 50%;
    animation: ${float} 8s ease-in-out infinite;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -30%;
    left: -5%;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 70%);
    border-radius: 50%;
    animation: ${float} 10s ease-in-out infinite reverse;
  }

  @media (max-width: 768px) {
    padding: 60px 0;
    border-radius: 20px;
  }
`;

const CTAContent = styled.div`
  max-width: 750px;
  margin: 0 auto;
  color: #ffffff;
  position: relative;
  z-index: 1;
`;

const CTATitle = styled.h2`
  font-size: 48px;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 24px 0;
  letter-spacing: -1px;
  line-height: 1.2;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const CTADescription = styled.p`
  font-size: 22px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.95);
  margin: 0 0 48px 0;
  line-height: 1.7;

  @media (max-width: 768px) {
    font-size: 18px;
    margin-bottom: 40px;
  }
`;

const CTAButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 14px;
  padding: 20px 48px;
  font-size: 19px;
  font-weight: 700;
  background: #ffffff;
  color: #22c55e;
  border-radius: 14px;
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(34, 197, 94, 0.1), transparent);
    transition: left 0.5s ease;
  }

  &:hover {
    background: #f8fafc;
    transform: translateY(-3px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
    gap: 18px;

    &::before {
      left: 100%;
    }
  }

  svg {
    width: 24px;
    height: 24px;
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: translateX(4px);
  }

  @media (max-width: 768px) {
    padding: 18px 36px;
    font-size: 17px;
  }
`;

const Footer = styled.footer`
  background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%);
  border-top: 1px solid rgba(74, 222, 128, 0.2);
  padding: 80px 32px 32px;
  margin-top: 100px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(74, 222, 128, 0.5), transparent);
  }

  &::after {
    content: '';
    position: absolute;
    top: -50%;
    right: -10%;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(74, 222, 128, 0.05) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
  }

  @media (max-width: 768px) {
    padding: 60px 20px 24px;
    margin-top: 80px;
  }
`;

const FooterContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 48px;
  margin-bottom: 48px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 32px;
    margin-bottom: 40px;
  }
`;

const FooterBrand = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FooterLogo = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: -0.5px;
  margin-bottom: 8px;

  span {
    background: linear-gradient(135deg, #4ade80, #22c55e);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const FooterDescription = styled.p`
  font-size: 15px;
  font-weight: 400;
  color: #94a3b8;
  line-height: 1.7;
  margin: 0;
  max-width: 320px;
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FooterSectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
  letter-spacing: 0.3px;
  text-transform: uppercase;
  font-size: 13px;
  letter-spacing: 1px;
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const FooterLink = styled(Link)`
  font-size: 15px;
  font-weight: 400;
  color: #94a3b8;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: inline-flex;
  align-items: center;
  gap: 8px;
  width: fit-content;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: -12px;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #4ade80, #22c55e);
    transition: width 0.3s ease;
    border-radius: 2px;
  }

  &:hover {
    color: #4ade80;
    padding-left: 8px;
    transform: translateX(4px);

    &::before {
      width: 4px;
    }
  }
`;

const FooterContact = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FooterContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: #94a3b8;
  transition: color 0.3s ease;

  svg {
    width: 18px;
    height: 18px;
    color: #4ade80;
    flex-shrink: 0;
  }

  &:hover {
    color: #ffffff;
  }
`;

const FooterBottom = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding-top: 32px;
  border-top: 1px solid rgba(148, 163, 184, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 20px;
  }
`;

const FooterText = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: #64748b;
  margin: 0;
`;

const FooterDisclaimer = styled.p`
  font-size: 13px;
  font-weight: 400;
  color: #64748b;
  margin: 0;
  line-height: 1.6;
  max-width: 600px;
  text-align: right;

  @media (max-width: 768px) {
    text-align: center;
    max-width: 100%;
  }
`;

const FooterBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(74, 222, 128, 0.1);
  border: 1px solid rgba(74, 222, 128, 0.2);
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  color: #4ade80;
  margin-top: 8px;
  width: fit-content;

  svg {
    width: 16px;
    height: 16px;
  }
`;

export default function InvoicePublicPage() {
  // Add JSON-LD structured data for Organization, WebApplication, and FAQ
  useEffect(() => {
    const organizationStructuredData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "InvoiceComposer",
      "url": "https://invoicecomposer.com/",
      "logo": "https://invoicecomposer.com/logo.png",
      "description": "InvoiceComposer is a free online invoice generator that helps users create, customize, and download professional invoices as PDF.",
      "sameAs": [],
      "contactPoint": []
    };

    const webApplicationStructuredData = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "InvoiceComposer",
      "url": "https://invoicecomposer.com/",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "browserRequirements": "Requires a modern web browser",
      "description": "Free online invoice generator to create professional invoices with templates, taxes, and multi-currency support, then download as PDF.",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "category": "Free"
      },
      "featureList": [
        "Create invoices online without registration",
        "Professional invoice templates",
        "VAT/GST and tax support",
        "Multi-currency formatting",
        "PDF download and print-ready output",
        "Local draft saving in the browser"
      ],
      "creator": {
        "@type": "Organization",
        "name": "InvoiceComposer",
        "url": "https://invoicecomposer.com/"
      }
    };

    const faqStructuredData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Is InvoiceComposer really free?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. InvoiceComposer is free to use and does not require registration."
          }
        },
        {
          "@type": "Question",
          "name": "Do I need to create an account?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. You can create, preview, and download invoices without signing up."
          }
        },
        {
          "@type": "Question",
          "name": "Is my data stored on your servers?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. Invoice data is processed locally in your browser and is not stored on our servers by default."
          }
        },
        {
          "@type": "Question",
          "name": "Can I add VAT or tax to my invoices?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. InvoiceComposer supports invoices with VAT, GST, or no tax depending on your requirements."
          }
        },
        {
          "@type": "Question",
          "name": "Are the invoices legally valid?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "InvoiceComposer provides invoice templates. Users are responsible for ensuring compliance with local legal and tax regulations."
          }
        },
        {
          "@type": "Question",
          "name": "Can I download invoices as PDF?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. You can instantly download print-ready PDF invoices."
          }
        },
        {
          "@type": "Question",
          "name": "Does InvoiceComposer work internationally?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. InvoiceComposer supports multiple currencies and can be used for international invoicing."
          }
        }
      ]
    };

    const organizationScript = document.createElement('script');
    organizationScript.type = 'application/ld+json';
    organizationScript.text = JSON.stringify(organizationStructuredData);
    document.head.appendChild(organizationScript);

    const webApplicationScript = document.createElement('script');
    webApplicationScript.type = 'application/ld+json';
    webApplicationScript.text = JSON.stringify(webApplicationStructuredData);
    document.head.appendChild(webApplicationScript);

    const faqScript = document.createElement('script');
    faqScript.type = 'application/ld+json';
    faqScript.text = JSON.stringify(faqStructuredData);
    document.head.appendChild(faqScript);

    return () => {
      // Cleanup: remove scripts when component unmounts
      if (document.head.contains(organizationScript)) {
        document.head.removeChild(organizationScript);
      }
      if (document.head.contains(webApplicationScript)) {
        document.head.removeChild(webApplicationScript);
      }
      if (document.head.contains(faqScript)) {
        document.head.removeChild(faqScript);
      }
    };
  }, []);

  const baseUrl = import.meta.env.VITE_BASE_URL || 'https://invoicecomposer.com';

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "InvoiceComposer",
      "url": baseUrl,
      "logo": `${baseUrl}/logo.png`,
      "description": "InvoiceComposer is a free online invoice generator that helps users create, customize, and download professional invoices as PDF.",
      "sameAs": [],
      "contactPoint": []
    },
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "InvoiceComposer",
      "url": baseUrl,
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "browserRequirements": "Requires a modern web browser",
      "description": "Free online invoice generator to create professional invoices with templates, taxes, and multi-currency support, then download as PDF.",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "category": "Free"
      },
      "featureList": [
        "Create invoices online without registration",
        "Professional invoice templates",
        "VAT/GST and tax support",
        "Multi-currency formatting",
        "PDF download and print-ready output",
        "Local draft saving in the browser"
      ],
      "creator": {
        "@type": "Organization",
        "name": "InvoiceComposer",
        "url": baseUrl
      }
    }
  ];

  return (
    <PublicLayout>
      <SEO
        title="Free Online Invoice Generator - Create Professional Invoices"
        description="Create professional invoices online for free. Generate PDF invoices for any country with automatic tax calculations, multiple currencies, and beautiful templates. No registration required."
        keywords="free invoice generator, online invoice maker, PDF invoice creator, invoice template, professional invoice, invoice software, invoice app, create invoice online"
        url="/"
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
        <HeroSection>
          <HeroTitle>InvoiceComposer - Free Online Invoice Generator</HeroTitle>
          <HeroSubtitle>
            Create professional invoices in minutes. Customize templates, calculate totals automatically, and download invoices as PDF — no signup required.
          </HeroSubtitle>
          <HeroCTAs>
            <SubmitButton as={Link} to="/invoice-builder">
              Create Invoice Now
            </SubmitButton>
            <ScrollToFormButton to="/invoice-builder">
              View Invoice Templates <HiOutlineArrowRight />
            </ScrollToFormButton>
          </HeroCTAs>
          <TrustHighlights>
            <TrustItem>
              <HiOutlineCheckCircle />
              <span>No registration required</span>
            </TrustItem>
            <TrustItem>
              <HiOutlineLockClosed />
              <span>Data stays in your browser</span>
            </TrustItem>
            <TrustItem>
              <HiOutlineGlobeAlt />
              <span>Multi-currency & VAT-ready</span>
            </TrustItem>
            <TrustItem>
              <HiOutlineDocumentText />
              <span>Clean, professional invoice templates</span>
            </TrustItem>
          </TrustHighlights>
        </HeroSection>

        <Section>
          <SectionHeading>Everything you need to create professional invoices</SectionHeading>
          <FeaturesGrid>
            <FeatureCard>
              <FeatureIcon>
                <HiOutlineTemplate />
              </FeatureIcon>
              <FeatureTitle>Professional Invoice Templates</FeatureTitle>
              <FeatureDescription>
                Choose from clean, business-ready templates suitable for freelancers, small businesses, and contractors.
              </FeatureDescription>
            </FeatureCard>
            <FeatureCard>
              <FeatureIcon>
                <HiOutlineCalculator />
              </FeatureIcon>
              <FeatureTitle>Automatic Calculations</FeatureTitle>
              <FeatureDescription>
                Totals, taxes, discounts, and subtotals are calculated instantly to reduce errors.
              </FeatureDescription>
            </FeatureCard>
            <FeatureCard>
              <FeatureIcon>
                <HiOutlineChartBar />
              </FeatureIcon>
              <FeatureTitle>VAT & Tax Support</FeatureTitle>
              <FeatureDescription>
                Create invoices with VAT, GST, or no tax depending on your needs and country.
              </FeatureDescription>
            </FeatureCard>
            <FeatureCard>
              <FeatureIcon>
                <HiOutlineCurrencyDollar />
              </FeatureIcon>
              <FeatureTitle>Multi-Currency Support</FeatureTitle>
              <FeatureDescription>
                Issue invoices in different currencies with correct formatting.
              </FeatureDescription>
            </FeatureCard>
            <FeatureCard>
              <FeatureIcon>
                <HiOutlineDownload />
              </FeatureIcon>
              <FeatureTitle>PDF Download & Print</FeatureTitle>
              <FeatureDescription>
                Download invoices as print-ready PDF files or print them directly from your browser.
              </FeatureDescription>
            </FeatureCard>
            <FeatureCard>
              <FeatureIcon>
                <HiOutlineShieldCheck />
              </FeatureIcon>
              <FeatureTitle>Privacy-Friendly</FeatureTitle>
              <FeatureDescription>
                Your invoice data is processed locally. No accounts, no cloud storage required.
              </FeatureDescription>
            </FeatureCard>
          </FeaturesGrid>
        </Section>

        <Section style={{ background: 'linear-gradient(135deg, rgba(70, 200, 97, 0.08) 0%, rgba(70, 200, 97, 0.03) 100%)', borderRadius: '16px', padding: '60px 32px' }}>
          <SectionHeading style={{ marginBottom: '16px' }}>Want to save and manage all your invoices?</SectionHeading>
          <SectionSubheading style={{ marginBottom: '32px' }}>
            Create a free account to save invoices permanently, access your dashboard, manage clients, and track your business analytics.
          </SectionSubheading>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <SubmitButton as={Link} to="/register">
              Create Free Account
            </SubmitButton>
            <ScrollToFormButton to="/invoice-builder" style={{ background: '#ffffff', color: '#1f1f1f' }}>
              Continue Without Account
            </ScrollToFormButton>
          </div>
        </Section>

        <Section>
          <SectionHeading>Create an invoice in 3 simple steps</SectionHeading>
          <StepsGrid>
            <StepCard>
              <StepNumber>1</StepNumber>
              <StepTitle>Enter your details</StepTitle>
              <StepDescription>
                Add seller and client information, invoice number, and dates.
              </StepDescription>
            </StepCard>
            <StepCard>
              <StepNumber>2</StepNumber>
              <StepTitle>Add items and taxes</StepTitle>
              <StepDescription>
                List products or services, quantities, prices, discounts, and tax rates.
              </StepDescription>
            </StepCard>
            <StepCard>
              <StepNumber>3</StepNumber>
              <StepTitle>Download your invoice</StepTitle>
              <StepDescription>
                Preview instantly and download a professional PDF invoice.
              </StepDescription>
            </StepCard>
          </StepsGrid>
        </Section>

        <Section>
          <SectionHeading>Flexible invoice templates for any business</SectionHeading>
          <SectionSubheading>
            Customize invoice layout and design, company logo and accent color, currency and language, tax display (VAT inclusive or exclusive).
          </SectionSubheading>
          <SectionSubheading style={{ marginTop: '-24px' }}>
            InvoiceComposer templates are optimized for clarity, printing, and real-world business use.
          </SectionSubheading>
        </Section>

        <Section>
          <SectionHeading>Designed for real-world business needs</SectionHeading>
          <SectionSubheading>
            Whether you send one invoice per month or dozens, InvoiceComposer helps you stay efficient.
          </SectionSubheading>
          <FeaturesGrid style={{ marginTop: '32px' }}>
            <FeatureCard>
              <FeatureTitle>Freelancers & consultants</FeatureTitle>
            </FeatureCard>
            <FeatureCard>
              <FeatureTitle>Small business owners</FeatureTitle>
            </FeatureCard>
            <FeatureCard>
              <FeatureTitle>Contractors & service providers</FeatureTitle>
            </FeatureCard>
            <FeatureCard>
              <FeatureTitle>Agencies & remote professionals</FeatureTitle>
            </FeatureCard>
            <FeatureCard>
              <FeatureTitle>Anyone who needs a fast, reliable invoice</FeatureTitle>
            </FeatureCard>
          </FeaturesGrid>
        </Section>

        <Section>
          <SectionHeading>Create invoices for different countries and industries</SectionHeading>
          <SectionSubheading>
            InvoiceComposer supports invoicing across multiple regions and business types, including VAT-ready invoices for European countries and flexible templates for various industries.
          </SectionSubheading>
        </Section>

        <ComparisonSection>
          <SectionHeading>Unlock More Features with a Free Account</SectionHeading>
          <SectionSubheading>
            Get the most out of InvoiceComposer by creating a free account. Save time, stay organized, and grow your business.
          </SectionSubheading>
          <ComparisonGrid>
            <ComparisonCard>
              <ComparisonTitle>Free Usage</ComparisonTitle>
              <ComparisonPrice>
                $0<span>/forever</span>
              </ComparisonPrice>
              <ComparisonList>
                <ComparisonListItem $available={true}>
                  <HiOutlineCheckCircle />
                  <span>Create invoices instantly</span>
                </ComparisonListItem>
                <ComparisonListItem $available={true}>
                  <HiOutlineCheckCircle />
                  <span>Download PDF invoices</span>
                </ComparisonListItem>
                <ComparisonListItem $available={true}>
                  <HiOutlineCheckCircle />
                  <span>Multi-currency support</span>
                </ComparisonListItem>
                <ComparisonListItem $available={true}>
                  <HiOutlineCheckCircle />
                  <span>VAT & tax calculations</span>
                </ComparisonListItem>
                <ComparisonListItem $available={false}>
                  <HiOutlineX />
                  <span>Save invoices permanently</span>
                </ComparisonListItem>
                <ComparisonListItem $available={false}>
                  <HiOutlineX />
                  <span>Dashboard with analytics</span>
                </ComparisonListItem>
                <ComparisonListItem $available={false}>
                  <HiOutlineX />
                  <span>Client management</span>
                </ComparisonListItem>
                <ComparisonListItem $available={false}>
                  <HiOutlineX />
                  <span>Company profile</span>
                </ComparisonListItem>
                <ComparisonListItem $available={false}>
                  <HiOutlineX />
                  <span>Invoice history</span>
                </ComparisonListItem>
              </ComparisonList>
            </ComparisonCard>
            <ComparisonCard $highlight={true}>
              <ComparisonTitle>With Free Account</ComparisonTitle>
              <ComparisonPrice>
                $0<span>/forever</span>
              </ComparisonPrice>
              <ComparisonList>
                <ComparisonListItem $available={true}>
                  <HiOutlineCheckCircle />
                  <span>Create invoices instantly</span>
                </ComparisonListItem>
                <ComparisonListItem $available={true}>
                  <HiOutlineCheckCircle />
                  <span>Download PDF invoices</span>
                </ComparisonListItem>
                <ComparisonListItem $available={true}>
                  <HiOutlineCheckCircle />
                  <span>Multi-currency support</span>
                </ComparisonListItem>
                <ComparisonListItem $available={true}>
                  <HiOutlineCheckCircle />
                  <span>VAT & tax calculations</span>
                </ComparisonListItem>
                <ComparisonListItem $available={true}>
                  <HiOutlineCheckCircle />
                  <span>Save invoices permanently</span>
                </ComparisonListItem>
                <ComparisonListItem $available={true}>
                  <HiOutlineCheckCircle />
                  <span>Dashboard with analytics</span>
                </ComparisonListItem>
                <ComparisonListItem $available={true}>
                  <HiOutlineCheckCircle />
                  <span>Client management</span>
                </ComparisonListItem>
                <ComparisonListItem $available={true}>
                  <HiOutlineCheckCircle />
                  <span>Company profile</span>
                </ComparisonListItem>
                <ComparisonListItem $available={true}>
                  <HiOutlineCheckCircle />
                  <span>Invoice history</span>
                </ComparisonListItem>
              </ComparisonList>
              <CTAButton to="/register">
                Create Free Account <HiOutlineArrowRight />
              </CTAButton>
            </ComparisonCard>
          </ComparisonGrid>
        </ComparisonSection>

        <CTASection>
          <CTAContent>
            <CTATitle>Ready to streamline your invoicing?</CTATitle>
            <CTADescription>
              Join thousands of businesses using InvoiceComposer to manage their invoices efficiently. Create your free account today and unlock all features.
            </CTADescription>
            <CTAButton to="/register">
              Get Started Free <HiOutlineArrowRight />
            </CTAButton>
          </CTAContent>
        </CTASection>

        <Section>
          <SectionHeading>Frequently Asked Questions</SectionHeading>
          <FAQSection>
            <FAQItem>
              <FAQQuestion>Is InvoiceComposer really free?</FAQQuestion>
              <FAQAnswer>Yes. InvoiceComposer is free to use and does not require registration.</FAQAnswer>
            </FAQItem>
            <FAQItem>
              <FAQQuestion>Do I need to create an account?</FAQQuestion>
              <FAQAnswer>No. You can create, preview, and download invoices without signing up.</FAQAnswer>
            </FAQItem>
            <FAQItem>
              <FAQQuestion>Is my data stored on your servers?</FAQQuestion>
              <FAQAnswer>No. Invoice data is processed locally in your browser and is not stored on our servers by default.</FAQAnswer>
            </FAQItem>
            <FAQItem>
              <FAQQuestion>Can I add VAT or tax to my invoices?</FAQQuestion>
              <FAQAnswer>Yes. You can create invoices with VAT, GST, or no tax depending on your needs.</FAQAnswer>
            </FAQItem>
            <FAQItem>
              <FAQQuestion>Are the invoices legally valid?</FAQQuestion>
              <FAQAnswer>InvoiceComposer provides invoice templates. You are responsible for ensuring compliance with local legal and tax regulations.</FAQAnswer>
            </FAQItem>
            <FAQItem>
              <FAQQuestion>Can I download invoices as PDF?</FAQQuestion>
              <FAQAnswer>Yes. You can download print-ready PDF invoices instantly.</FAQAnswer>
            </FAQItem>
            <FAQItem>
              <FAQQuestion>Does InvoiceComposer work internationally?</FAQQuestion>
              <FAQAnswer>Yes. You can create invoices for different countries and currencies.</FAQAnswer>
            </FAQItem>
          </FAQSection>
        </Section>

      </Container>

      <Footer>
        <FooterContent>
          <FooterBrand>
            <FooterLogo>
              Invoice<span>Composer</span>
            </FooterLogo>
            <FooterDescription>
              Create professional invoices in minutes. Free, secure, and no registration required. Perfect for freelancers and small businesses.
            </FooterDescription>
            <FooterBadge>
              <HiOutlineShieldCheck />
              <span>100% Free & Secure</span>
            </FooterBadge>
          </FooterBrand>

          <FooterSection>
            <FooterSectionTitle>Product</FooterSectionTitle>
            <FooterLinks>
              <FooterLink to="/invoice-builder">
                <HiOutlineDocumentText />
                Create Invoice
              </FooterLink>
              <FooterLink to="/blog">
                <HiOutlineDocumentText />
                Blog
              </FooterLink>
              <FooterLink to="/about">
                <HiOutlineDocumentText />
                About Us
              </FooterLink>
            </FooterLinks>
          </FooterSection>

          <FooterSection>
            <FooterSectionTitle>Legal</FooterSectionTitle>
            <FooterLinks>
              <FooterLink to="/privacy">
                <HiOutlineLockClosed />
                Privacy Policy
              </FooterLink>
              <FooterLink to="/terms">
                <HiOutlineDocumentText />
                Terms of Service
              </FooterLink>
            </FooterLinks>
          </FooterSection>

          <FooterSection>
            <FooterSectionTitle>Support</FooterSectionTitle>
            <FooterContact>
              <FooterContactItem>
                <HiOutlineMail />
                <span>affsquad@gmail.com</span>
              </FooterContactItem>
              <FooterContactItem>
                <HiOutlineGlobeAlt />
                <span>Available Worldwide</span>
              </FooterContactItem>
              <FooterContactItem>
                <HiOutlineCheckCircle />
                <span>Free Forever</span>
              </FooterContactItem>
            </FooterContact>
          </FooterSection>
        </FooterContent>

        <FooterBottom>
          <FooterText>© {new Date().getFullYear()} InvoiceComposer. All rights reserved.</FooterText>
          <FooterDisclaimer>
            InvoiceComposer is a free invoice generator. No legal or tax advice is provided. Users are responsible for compliance with local laws and regulations.
          </FooterDisclaimer>
        </FooterBottom>
      </Footer>
    </PublicLayout>
  );
}