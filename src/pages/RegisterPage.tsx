import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { register } from '../features/auth/authSlice';
import { Button } from '../components/Button';
import { Label } from '../components/Input';
import { useAppDispatch, useAppSelector } from '../app/hooks';

const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
`;

const gradient = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const Shell = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: minmax(320px, 480px) 1fr;
  background: linear-gradient(135deg, #0a1929 0%, #132017 100%);

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Promo = styled.div`
  background: linear-gradient(135deg, #0a1929 0%, #132017 50%, #1a3528 100%);
  background-size: 200% 200%;
  animation: ${gradient} 15s ease infinite;
  color: #f6f7f5;
  padding: 64px 56px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  justify-content: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -20%;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(70, 200, 97, 0.15) 0%, transparent 70%);
    border-radius: 50%;
    animation: ${float} 20s ease-in-out infinite;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -30%;
    left: -10%;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(70, 200, 97, 0.1) 0%, transparent 70%);
    border-radius: 50%;
    animation: ${float} 25s ease-in-out infinite reverse;
  }
`;

const PromoTitle = styled.h1`
  font-size: 42px;
  font-weight: 300;
  line-height: 1.2;
  letter-spacing: -1px;
  position: relative;
  z-index: 1;
  margin: 0;

  span {
    background: linear-gradient(135deg, #46c861, #4ade80);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-weight: 500;
  }
`;

const PromoText = styled.p`
  color: #b8c5b3;
  line-height: 1.8;
  font-size: 16px;
  font-weight: 300;
  position: relative;
  z-index: 1;
  max-width: 380px;
  margin: 0;
`;

const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 0;
  position: relative;
  z-index: 1;
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: #cfd6cc;
  font-size: 15px;
  font-weight: 300;

  &::before {
    content: '✓';
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: rgba(70, 200, 97, 0.2);
    border: 1px solid rgba(70, 200, 97, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #46c861;
    font-weight: 600;
    flex-shrink: 0;
  }
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 32px;
  background: #ffffff;
  position: relative;
`;

const RegisterCard = styled.div`
  width: 100%;
  max-width: 440px;
  background: #ffffff;
  border-radius: 24px;
  padding: 40px 32px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.05);
`;

const Title = styled.h2`
  font-size: 32px;
  font-weight: 300;
  color: #1f1f1f;
  margin: 0 0 8px 0;
  letter-spacing: -0.5px;
`;

const Subtitle = styled.p`
  font-size: 15px;
  color: #6b7280;
  font-weight: 300;
  margin: 0 0 32px 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 0;
  width: 100%;
  min-width: 0;
`;

const CustomLabel = styled(Label)`
  color: #4b5563;
  font-weight: 400;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0;
`;

const CustomInput = styled.input`
  width: 100%;
  padding: 14px 18px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 12px;
  font-size: 15px;
  font-weight: 300;
  color: #1f1f1f;
  background: #ffffff;
  transition: all 0.3s ease;
  box-sizing: border-box;
  margin: 0;

  &:focus {
    outline: none;
    border-color: #46c861;
    border-width: 2px;
    box-shadow: 0 0 0 3px rgba(70, 200, 97, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const SubmitButton = styled(Button)`
  padding: 16px 24px;
  font-size: 16px;
  font-weight: 400;
  width: 100%;
  background: #46c861 !important;
  color: #ffffff !important;
  border: 1px solid #46c861 !important;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(70, 200, 97, 0.25);
  transition: all 0.3s ease;

  &:hover {
    background: #3db355 !important;
    border-color: #3db355 !important;
    box-shadow: 0 6px 16px rgba(70, 200, 97, 0.35);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const ErrorMessage = styled.div`
  color: #ef4444;
  margin-bottom: 0;
  font-size: 14px;
  font-weight: 300;
  padding: 12px 16px;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 10px;
`;

const LinkText = styled(Link)`
  color: #46c861;
  text-decoration: none;
  display: block;
  text-align: center;
  margin-top: 32px;
  font-size: 15px;
  font-weight: 300;
  transition: all 0.2s ease;

  &:hover {
    color: #3db355;
    text-decoration: underline;
  }
`;

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state) => state.auth);

  const validateForm = (): boolean => {
    const errors: {
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};

    // Email validation
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    // Confirm password validation
    if (!confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await dispatch(register({ email, password })).unwrap();
      navigate('/dashboard');
    } catch (err) {
      // Error handled by Redux
    }
  };

  return (
    <Shell>
      <Promo>
        <PromoTitle>
          Start your <span>invoice journey</span>
        </PromoTitle>
        <PromoText>
          Join thousands of businesses managing invoices efficiently. Get started in seconds and create your first invoice today.
        </PromoText>
        <FeatureList>
          <FeatureItem>Simple and intuitive interface</FeatureItem>
          <FeatureItem>Real-time invoice tracking</FeatureItem>
          <FeatureItem>Client management built-in</FeatureItem>
          <FeatureItem>Export to PDF instantly</FeatureItem>
        </FeatureList>
      </Promo>
      <Content>
        <RegisterCard>
          <Title>Create account</Title>
          <Subtitle>Get started with your free account today.</Subtitle>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Form onSubmit={handleSubmit}>
            <InputWrapper>
              <CustomLabel>Email</CustomLabel>
              <CustomInput
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (validationErrors.email) {
                    setValidationErrors({ ...validationErrors, email: undefined });
                  }
                }}
                placeholder="your@email.com"
                required
              />
              {validationErrors.email && (
                <ErrorMessage style={{ marginTop: '8px', marginBottom: 0 }}>
                  {validationErrors.email}
                </ErrorMessage>
              )}
            </InputWrapper>
            <InputWrapper>
              <CustomLabel>Password</CustomLabel>
              <CustomInput
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (validationErrors.password) {
                    setValidationErrors({ ...validationErrors, password: undefined });
                  }
                  if (validationErrors.confirmPassword && confirmPassword) {
                    setValidationErrors({ ...validationErrors, confirmPassword: undefined });
                  }
                }}
                placeholder="At least 6 characters"
                required
                minLength={6}
              />
              {validationErrors.password && (
                <ErrorMessage style={{ marginTop: '8px', marginBottom: 0 }}>
                  {validationErrors.password}
                </ErrorMessage>
              )}
            </InputWrapper>
            <InputWrapper>
              <CustomLabel>Confirm Password</CustomLabel>
              <CustomInput
                type="password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (validationErrors.confirmPassword) {
                    setValidationErrors({ ...validationErrors, confirmPassword: undefined });
                  }
                }}
                placeholder="Re-enter your password"
                required
              />
              {validationErrors.confirmPassword && (
                <ErrorMessage style={{ marginTop: '8px', marginBottom: 0 }}>
                  {validationErrors.confirmPassword}
                </ErrorMessage>
              )}
            </InputWrapper>
            <SubmitButton type="submit" $variant="primary" disabled={loading}>
              {loading ? 'Creating...' : 'Create account'}
            </SubmitButton>
          </Form>
          <LinkText to="/login">Already have an account? Sign in</LinkText>
        </RegisterCard>
      </Content>
    </Shell>
  );
}
