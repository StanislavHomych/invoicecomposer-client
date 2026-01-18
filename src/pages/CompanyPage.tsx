import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button } from '../components/Button';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchCompany, updateCompany } from '../features/company/companySlice';
import { HiOutlineChevronDown } from 'react-icons/hi';

const PageHeader = styled.div`
  margin-bottom: 32px;

  @media (max-width: 768px) {
    margin-bottom: 24px;
  }
`;

const PageTitle = styled.h1`
  font-size: 32px;
  font-weight: 300;
  color: #1f1f1f;
  margin: 0 0 8px 0;
  letter-spacing: -0.5px;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const FormWrapper = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 32px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  max-width: 720px;

  @media (max-width: 768px) {
    padding: 24px 20px;
    border-radius: 12px;
    max-width: 100%;
  }
`;

const Form = styled.form`
  width: 100%;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
    margin-bottom: 20px;
  }
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 300;
  font-size: 14px;
  color: #4b5563;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const CustomInput = styled.input`
  width: 100%;
  padding: 14px 18px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  font-size: 15px;
  font-weight: 300;
  color: #1f1f1f;
  background: #ffffff;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-sizing: border-box;

  &::placeholder {
    color: #9ca3af;
    font-weight: 300;
  }

  &:focus {
    outline: none;
    border-color: #46c861;
    border-width: 2px;
    background: #ffffff;
    box-shadow: 0 0 0 3px rgba(70, 200, 97, 0.1);
  }

  &:hover:not(:focus) {
    border-color: rgba(0, 0, 0, 0.25);
    background: #ffffff;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const CustomSelect = styled.select`
  width: 100%;
  padding: 14px 48px 14px 18px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  font-size: 15px;
  font-weight: 300;
  color: #1f1f1f;
  background: #ffffff;
  appearance: none;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #46c861;
    border-width: 2px;
    background: #ffffff;
    box-shadow: 0 0 0 3px rgba(70, 200, 97, 0.1);
  }

  &:hover:not(:focus) {
    border-color: rgba(0, 0, 0, 0.25);
    background: #ffffff;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  option {
    background: #ffffff;
    color: #1f1f1f;
    padding: 12px;
  }
`;

const SelectIcon = styled.div`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: #6b7280;
  transition: color 0.3s ease;

  ${SelectWrapper}:hover & {
    color: #46c861;
  }

  ${CustomSelect}:focus ~ & {
    color: #46c861;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const SubmitButton = styled(Button)`
  margin-top: 8px;
  padding: 16px 32px;
  font-size: 16px;
  font-weight: 400;
  width: 100%;
  max-width: 300px;
  background: #46c861 !important;
  color: #ffffff !important;
  border: 1px solid #46c861 !important;
  box-shadow: 0 2px 8px rgba(70, 200, 97, 0.2) !important;

  &:hover {
    background: #3db355 !important;
    border-color: #3db355 !important;
    box-shadow: 0 4px 12px rgba(70, 200, 97, 0.3) !important;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const currencies = ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY', 'CHF', 'CNY', 'INR', 'BRL', 'MXN', 'ZAR'];

export default function CompanyPage() {
  const dispatch = useAppDispatch();
  const { company, loading } = useAppSelector((state) => state.company);
  const [formData, setFormData] = useState({
    legalName: '',
    email: '',
    addressLine1: '',
    city: '',
    country: '',
    defaultCurrency: 'USD',
  });

  useEffect(() => {
    dispatch(fetchCompany());
  }, [dispatch]);

  useEffect(() => {
    if (company) {
      setFormData({
        legalName: company.legalName || '',
        email: company.email || '',
        addressLine1: company.addressLine1 || '',
        city: company.city || '',
        country: company.country || '',
        defaultCurrency: company.defaultCurrency || 'USD',
      });
    }
  }, [company]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(updateCompany(formData));
  };

  return (
    <div>
      <PageHeader>
        <PageTitle>Company profile</PageTitle>
      </PageHeader>

      <FormWrapper>
        <Form onSubmit={handleSubmit}>
          <FieldGroup style={{ marginBottom: '24px' }}>
            <Label>Legal name</Label>
            <CustomInput
              value={formData.legalName}
              onChange={(e) => setFormData({ ...formData, legalName: e.target.value })}
              placeholder="Enter legal company name"
              required
            />
          </FieldGroup>

          <Grid>
            <FieldGroup>
              <Label>Email</Label>
              <CustomInput
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="company@example.com"
                required
              />
            </FieldGroup>

            <FieldGroup>
              <Label>Default currency</Label>
              <SelectWrapper>
                <CustomSelect
                  value={formData.defaultCurrency}
                  onChange={(e) => setFormData({ ...formData, defaultCurrency: e.target.value })}
                  required
                  disabled={loading}
                >
                  {currencies.map((currency) => (
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                  ))}
                </CustomSelect>
                <SelectIcon>
                  <HiOutlineChevronDown />
                </SelectIcon>
              </SelectWrapper>
            </FieldGroup>
          </Grid>

          <FieldGroup style={{ marginBottom: '24px' }}>
            <Label>Address line</Label>
            <CustomInput
              value={formData.addressLine1}
              onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
              placeholder="Street address"
              required
            />
          </FieldGroup>

          <Grid>
            <FieldGroup>
              <Label>City</Label>
              <CustomInput
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="City"
                required
              />
            </FieldGroup>

            <FieldGroup>
              <Label>Country</Label>
              <CustomInput
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                placeholder="Country"
                required
              />
            </FieldGroup>
          </Grid>

          <SubmitButton type="submit" $variant="primary" disabled={loading}>
            {loading ? 'Saving...' : 'Save changes'}
          </SubmitButton>
        </Form>
      </FormWrapper>
    </div>
  );
}
