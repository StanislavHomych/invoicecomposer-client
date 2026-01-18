import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import SEO from '../components/SEO';
import { InvoiceItem, calculateInvoiceTotals } from '../utils/calculations';
import { formatMoney } from '../utils/formatters';
import { HiOutlineX, HiOutlinePlus, HiOutlineCalendar, HiOutlineGlobeAlt } from 'react-icons/hi';
import { getCountryTemplate, getAllCountryTemplates, euCountries, type CountryCode } from '../utils/countryTemplates';

const PublicLayout = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e9ecef 100%);
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
  padding: 40px 32px;

  @media (max-width: 768px) {
    padding: 24px 20px;
  }
`;

const PageTitle = styled.h1`
  font-size: 36px;
  font-weight: 300;
  color: #1f1f1f;
  margin: 0 0 16px 0;
  letter-spacing: -0.5px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 28px;
    margin-bottom: 12px;
  }
`;

const PageSubtitle = styled.p`
  font-size: 18px;
  color: #6b7280;
  margin: 0 0 48px 0;
  font-weight: 300;
  text-align: center;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 40px;
  }
`;

const FormWrapper = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 32px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);

  @media (max-width: 768px) {
    padding: 24px;
  }
`;

const SectionDivider = styled.div`
  height: 1px;
  background: rgba(0, 0, 0, 0.08);
  margin: 40px 0;
`;

const FormSection = styled.div`
  margin-bottom: 32px;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 400;
  color: #1f1f1f;
  margin: 0 0 24px 0;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(70, 200, 97, 0.2);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 24px;
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
`;

const CustomTextarea = styled.textarea`
  width: 100%;
  padding: 14px 18px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  font-size: 15px;
  font-weight: 300;
  color: #1f1f1f;
  background: #ffffff;
  min-height: 120px;
  resize: vertical;
  font-family: inherit;
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
`;

const DatePickerWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const DatePickerIcon = styled.div`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: #6b7280;
  transition: color 0.3s ease;
  z-index: 1;

  svg {
    width: 20px;
    height: 20px;
  }
`;

const CustomDateInput = styled.input`
  width: 100%;
  padding: 14px 48px 14px 18px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  font-size: 15px;
  font-weight: 300;
  color: #1f1f1f;
  background: #ffffff;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-sizing: border-box;
  cursor: pointer;

  &::-webkit-calendar-picker-indicator {
    position: absolute;
    right: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
    z-index: 2;
  }

  &:focus {
    outline: none;
    border-color: #46c861;
    border-width: 2px;
    background: #ffffff;
    box-shadow: 0 0 0 3px rgba(70, 200, 97, 0.1);

    ~ ${DatePickerIcon} {
      color: #46c861;
    }
  }

  &:hover:not(:focus) {
    border-color: rgba(0, 0, 0, 0.25);
    background: #ffffff;

    ~ ${DatePickerIcon} {
      color: #9ca3af;
    }
  }
`;

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ToggleLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
`;

const ToggleInput = styled.input`
  display: none;
`;

const ToggleSwitch = styled.div<{ $active: boolean }>`
  width: 52px;
  height: 28px;
  border-radius: 14px;
  background: ${(props) => (props.$active ? '#46c861' : 'rgba(58, 58, 58, 0.5)')};
  position: relative;
  transition: all 0.3s ease;
  border: 1px solid ${(props) => (props.$active ? '#46c861' : 'transparent')};

  &::after {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #ffffff;
    top: 2px;
    left: ${(props) => (props.$active ? '24px' : '2px')};
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

const ToggleText = styled.span`
  font-size: 15px;
  font-weight: 300;
  color: #1f1f1f;
  margin-left: 8px;
`;

const ItemsSection = styled.div`
  margin-top: 32px;
`;

const ItemsTable = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 12px;
  overflow: hidden;
  background: #ffffff;
`;

const ItemsHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 1fr 1fr 1.5fr 1fr 1fr auto;
  gap: 12px;
  padding: 18px 16px;
  background: rgba(70, 200, 97, 0.08);
  border-bottom: 1px solid rgba(70, 200, 97, 0.2);
  font-weight: 400;
  font-size: 12px;
  color: #4b5563;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  align-items: center;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    gap: 8px;
  }

  > * {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const ItemRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 1fr 1fr 1.5fr 1fr 1fr auto;
  gap: 12px;
  padding: 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  align-items: center;
  background: #ffffff;

  &:hover {
    background: rgba(70, 200, 97, 0.04);
    border-bottom-color: rgba(70, 200, 97, 0.15);
  }

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  > * {
    min-width: 0;
  }
`;

const ItemInput = styled(CustomInput)`
  margin-bottom: 0;
  padding: 12px 14px;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;
  min-width: 0;
`;

const RemoveButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: 2px solid rgba(239, 68, 68, 0.3);
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;

  &:hover {
    background: rgba(239, 68, 68, 0.2);
    border-color: rgba(239, 68, 68, 0.5);
    transform: scale(1.05);
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

const AddItemButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 20px;
  margin-top: 16px;
  border-radius: 10px;
  border: 1px dashed rgba(70, 200, 97, 0.4);
  background: rgba(70, 200, 97, 0.05);
  color: #46c861;
  font-size: 14px;
  font-weight: 300;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(70, 200, 97, 0.1);
    border-color: rgba(70, 200, 97, 0.6);
    border-style: solid;
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

const TotalsSection = styled.div`
  margin-top: 32px;
  padding: 24px;
  border-radius: 12px;
  background: #ffffff;
  border: 1px solid rgba(70, 200, 97, 0.3);
  max-width: 400px;
  margin-left: auto;
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  font-size: 15px;
  font-weight: 300;
  color: #1f1f1f;
  border-bottom: 1px solid rgba(70, 200, 97, 0.1);

  &:last-child {
    border-bottom: none;
  }
`;

const TotalFinal = styled(TotalRow)`
  font-weight: 400;
  font-size: 20px;
  padding-top: 16px;
  margin-top: 8px;
  border-top: 1px solid rgba(70, 200, 97, 0.3);
  color: #46c861;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 32px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SubmitButton = styled(Button)`
  padding: 16px 32px;
  font-size: 16px;
  font-weight: 400;
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
`;

const SecondaryButton = styled(Button)`
  padding: 16px 32px;
  font-size: 16px;
  font-weight: 400;
  background: #ffffff !important;
  color: #1f1f1f !important;
  border: 1px solid rgba(0, 0, 0, 0.15) !important;

  &:hover {
    background: #f9fafb !important;
    border-color: rgba(0, 0, 0, 0.25) !important;
  }
`;

const CountrySelectorWrapper = styled.div`
  background: linear-gradient(135deg, rgba(70, 200, 97, 0.08) 0%, rgba(70, 200, 97, 0.04) 100%);
  border: 1px solid rgba(70, 200, 97, 0.2);
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 32px;
`;

const CountrySelectorLabel = styled.label`
  display: block;
  margin-bottom: 12px;
  font-weight: 400;
  font-size: 14px;
  color: #4b5563;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const CountrySelect = styled.select`
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
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%231f1f1f' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 18px center;
  padding-right: 48px;

  &:focus {
    outline: none;
    border-color: #46c861;
    border-width: 2px;
    box-shadow: 0 0 0 3px rgba(70, 200, 97, 0.1);
  }

  &:hover {
    border-color: rgba(0, 0, 0, 0.25);
  }
`;

const CountryInfo = styled.div`
  margin-top: 12px;
  padding: 12px;
  background: #ffffff;
  border-radius: 8px;
  font-size: 13px;
  color: #6b7280;
  line-height: 1.6;
`;

const CountryBadge = styled.span`
  display: inline-block;
  padding: 4px 8px;
  background: rgba(70, 200, 97, 0.1);
  color: #46c861;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 400;
  margin-right: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Footer = styled.footer`
  background: #ffffff;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding: 32px;
  margin-top: 60px;
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

export default function InvoiceBuilderPage() {
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>('US');
  const countryTemplate = getCountryTemplate(selectedCountry);

  // Generate invoice number on mount and when country changes
  const generateInvoiceNumber = () => {
    const prefix = countryTemplate.invoiceNumberPrefix || 'INV';
    const randomNum = Math.floor(Math.random() * 999999) + 1;
    return `${prefix}-${randomNum.toString().padStart(6, '0')}`;
  };

  const [companyInfo, setCompanyInfo] = useState({
    name: '',
    email: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    province: '',
    postalCode: '',
    country: '',
    taxIdValue: '',
    companyRegNumber: '',
  });

  const [clientInfo, setClientInfo] = useState({
    name: '',
    email: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    province: '',
    postalCode: '',
    country: '',
    taxIdValue: '',
  });

  const [shipToInfo, setShipToInfo] = useState({
    name: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  });

  const [formData, setFormData] = useState({
    invoiceNumber: generateInvoiceNumber(),
    issueDate: new Date().toISOString().split('T')[0],
    dueDate: '',
    currency: countryTemplate.currency,
    taxInclusive: false,
    shippingAmount: '',
    invoiceDiscountPercent: '',
    paymentTerms: 'NET_30',
    taxSystem: 'GST_HST',
    poNumber: '',
    notes: '',
    showTaxId: true,
    reverseCharge: false,
  });

  const [paymentDetails, setPaymentDetails] = useState({
    bankName: '',
    achRouting: '',
    achAccount: '',
    wireSwift: '',
    paypalEmail: '',
    stripeLink: '',
    zellePhone: '',
    checkPayableTo: '',
    bsb: '',
    accountNumber: '',
    accountName: '',
    sortCode: '',
    iban: '',
  });

  useEffect(() => {
    // Apply country-specific defaults when country changes
    setFormData((prev) => ({
      ...prev,
      currency: countryTemplate.currency,
      invoiceNumber: generateInvoiceNumber(),
    }));
    setCompanyInfo((prev) => ({
      ...prev,
      country: countryTemplate.name,
    }));
  }, [selectedCountry]);

  const [items, setItems] = useState<InvoiceItem[]>([
    { title: '', description: '', quantity: 1, unit: 'pcs', unitPrice: 0 },
  ]);

  const handleItemChange = (index: number, field: keyof InvoiceItem | 'discountPercent' | 'taxPercent', value: string) => {
    const updated = [...items];
    const current = { ...updated[index] };

    if (field === 'discountPercent') {
      const numeric = Number(value);
      current.discount = numeric > 0 ? { type: 'percent', value: numeric } : undefined;
    } else if (field === 'taxPercent') {
      const numeric = Number(value);
      current.tax = numeric > 0 ? { name: 'Tax', rate: numeric } : undefined;
    } else if (field === 'quantity' || field === 'unitPrice') {
      current[field] = Number(value) as never;
    } else {
      current[field] = value as never;
    }

    updated[index] = current;
    setItems(updated);
  };

  const handleAddItem = () => {
    setItems([...items, { title: '', description: '', quantity: 1, unit: 'pcs', unitPrice: 0 }]);
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  // If reverse charge is enabled, set all item taxes to 0
  const itemsForCalculation = formData.reverseCharge
    ? items.map(item => ({ ...item, tax: undefined }))
    : items;

  const totals = calculateInvoiceTotals(itemsForCalculation, {
    taxInclusive: formData.taxInclusive,
    invoiceLevelDiscount:
      formData.invoiceDiscountPercent !== ''
        ? { type: 'percent', value: Number(formData.invoiceDiscountPercent) }
        : undefined,
    shippingAmount: formData.shippingAmount ? Number(formData.shippingAmount) : 0,
  });

  const generatePDF = () => {
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Invoice - ${formData.issueDate}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Helvetica Neue', Arial, sans-serif;
      font-size: 12px;
      line-height: 1.6;
      color: #333;
      padding: 40px;
      background: #fff;
    }
    .header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 32px;
      padding-bottom: 16px;
      border-bottom: 2px solid #333;
    }
    .company-info h1 {
      font-size: 22px;
      margin-bottom: 8px;
      color: #1f1f1f;
    }
    .invoice-info {
      text-align: right;
    }
    .invoice-info h2 {
      font-size: 26px;
      margin-bottom: 8px;
      color: #2c3e50;
    }
    .details {
      display: flex;
      justify-content: space-between;
      gap: 40px;
      margin-bottom: 32px;
    }
    .detail-section h3 {
      font-size: 13px;
      margin-bottom: 12px;
      color: #555;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .detail-section p {
      margin: 4px 0;
      color: #333;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 24px;
    }
    th {
      background-color: #2c3e50;
      color: white;
      padding: 12px;
      text-align: left;
      font-weight: 600;
      border: 1px solid #e5e7eb;
    }
    td {
      padding: 10px 12px;
      border: 1px solid #e5e7eb;
    }
    tr:nth-child(even) {
      background-color: #f9fafb;
    }
    .text-right {
      text-align: right;
    }
    .totals {
      margin-left: auto;
      width: 350px;
      margin-top: 24px;
    }
    .totals-row {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      border-bottom: 1px solid #e5e7eb;
    }
    .totals-row.total-final {
      border-top: 2px solid #333;
      border-bottom: none;
      font-size: 16px;
      font-weight: 700;
      padding-top: 12px;
      margin-top: 8px;
      color: #46c861;
    }
    .notes {
      margin-top: 24px;
      padding: 16px;
      background-color: #f5f5f5;
      border-radius: 6px;
    }
    .notes h3 {
      margin-bottom: 8px;
      color: #555;
    }
    @media print {
      body { padding: 20px; }
      .no-print { display: none; }
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="company-info">
      <h1>${companyInfo.name || 'Your Company'}</h1>
      ${companyInfo.addressLine1 ? `<p>${companyInfo.addressLine1}</p>` : ''}
      ${companyInfo.city ? `<p>${companyInfo.city}${selectedCountry === 'US' && companyInfo.state ? ', ' + companyInfo.state : ''}${selectedCountry === 'CA' && companyInfo.province ? ', ' + companyInfo.province : ''}${selectedCountry === 'AU' && companyInfo.state ? ', ' + companyInfo.state : ''} ${companyInfo.postalCode || ''}</p>` : ''}
      ${companyInfo.country ? `<p>${companyInfo.country}</p>` : ''}
      ${companyInfo.email ? `<p>Email: ${companyInfo.email}</p>` : ''}
      ${((selectedCountry === 'US' && formData.showTaxId) || selectedCountry === 'CA' || selectedCountry === 'AU' || selectedCountry === 'GB' || selectedCountry === 'EU') && companyInfo.taxIdValue ? `<p>${countryTemplate.taxIdLabel}: ${companyInfo.taxIdValue}</p>` : ''}
      ${selectedCountry === 'GB' && companyInfo.companyRegNumber ? `<p>Company Registration Number: ${companyInfo.companyRegNumber}</p>` : ''}
    </div>
    <div class="invoice-info">
      <h2>INVOICE</h2>
      ${(selectedCountry === 'US' || selectedCountry === 'CA' || selectedCountry === 'AU' || selectedCountry === 'GB' || selectedCountry === 'EU') && formData.invoiceNumber ? `<p><strong>Invoice #:</strong> ${formData.invoiceNumber}</p>` : ''}
      <p><strong>Issue Date:</strong> ${formData.issueDate}</p>
      ${formData.dueDate ? `<p><strong>Due Date:</strong> ${formData.dueDate}</p>` : ''}
      ${(selectedCountry === 'US' || selectedCountry === 'CA' || selectedCountry === 'AU' || selectedCountry === 'GB' || selectedCountry === 'EU') && formData.paymentTerms ? `<p><strong>Payment Terms:</strong> ${formData.paymentTerms.replace(/_/g, ' ')}</p>` : ''}
      ${(selectedCountry === 'US' || selectedCountry === 'CA') && formData.poNumber ? `<p><strong>PO #:</strong> ${formData.poNumber}</p>` : ''}
      ${selectedCountry === 'CA' && formData.taxSystem ? `<p><strong>Tax System:</strong> ${formData.taxSystem.replace(/_/g, ' ')}</p>` : ''}
      <p><strong>Currency:</strong> ${formData.currency}</p>
    </div>
  </div>

  <div class="details">
    <div class="detail-section">
      <h3>Bill To:</h3>
      <p><strong>${clientInfo.name || 'Client Name'}</strong></p>
      ${clientInfo.addressLine1 ? `<p>${clientInfo.addressLine1}</p>` : ''}
      ${clientInfo.city ? `<p>${clientInfo.city}${selectedCountry === 'US' && clientInfo.state ? ', ' + clientInfo.state : ''}${selectedCountry === 'CA' && clientInfo.province ? ', ' + clientInfo.province : ''}${selectedCountry === 'AU' && clientInfo.state ? ', ' + clientInfo.state : ''} ${clientInfo.postalCode || ''}</p>` : ''}
      ${clientInfo.country ? `<p>${clientInfo.country}</p>` : ''}
      ${clientInfo.email ? `<p>Email: ${clientInfo.email}</p>` : ''}
      ${(selectedCountry === 'US' || selectedCountry === 'CA' || selectedCountry === 'GB' || selectedCountry === 'EU') && clientInfo.taxIdValue ? `<p>Tax ID: ${clientInfo.taxIdValue}</p>` : ''}
    </div>
    ${selectedCountry === 'US' && shipToInfo.name ? `
    <div class="detail-section">
      <h3>Ship To:</h3>
      <p><strong>${shipToInfo.name}</strong></p>
      ${shipToInfo.addressLine1 ? `<p>${shipToInfo.addressLine1}</p>` : ''}
      ${shipToInfo.city ? `<p>${shipToInfo.city}${shipToInfo.state ? ', ' + shipToInfo.state : ''} ${shipToInfo.postalCode || ''}</p>` : ''}
      ${shipToInfo.country ? `<p>${shipToInfo.country}</p>` : ''}
    </div>
    ` : ''}
  </div>

  <table>
    <thead>
      <tr>
        <th>Title</th>
        <th>Description</th>
        <th>Qty</th>
        <th>Unit</th>
        <th class="text-right">Unit Price</th>
        <th class="text-right">Total</th>
      </tr>
    </thead>
    <tbody>
      ${items
        .filter((item) => item.title)
        .map((item) => {
          const lineTotal = item.quantity * item.unitPrice;
          return `
        <tr>
          <td>${item.title}</td>
          <td>${item.description || ''}</td>
          <td>${item.quantity}</td>
          <td>${item.unit}</td>
          <td class="text-right">${formatMoney(formData.currency, item.unitPrice)}</td>
          <td class="text-right">${formatMoney(formData.currency, lineTotal)}</td>
        </tr>
      `;
        })
        .join('')}
    </tbody>
  </table>

  <div class="totals">
    <div class="totals-row">
      <span>${selectedCountry === 'GB' && totals.taxTotal > 0 ? 'Subtotal (ex VAT)' : selectedCountry === 'EU' && totals.taxTotal > 0 ? 'Subtotal (net)' : 'Subtotal'}:</span>
      <span>${formatMoney(formData.currency, totals.subtotal)}</span>
    </div>
    ${totals.discountTotal > 0 ? `
    <div class="totals-row">
      <span>Discount:</span>
      <span>-${formatMoney(formData.currency, totals.discountTotal)}</span>
    </div>
    ` : ''}
    ${formData.reverseCharge ? `
    <div class="totals-row">
      <span>VAT (Reverse Charge):</span>
      <span>€0.00</span>
    </div>
    ` : totals.taxTotal > 0 ? `
    <div class="totals-row">
      <span>${countryTemplate.taxLabel}:</span>
      <span>${formatMoney(formData.currency, totals.taxTotal)}</span>
    </div>
    ` : ''}
    ${totals.shippingTotal > 0 ? `
    <div class="totals-row">
      <span>Shipping:</span>
      <span>${formatMoney(formData.currency, totals.shippingTotal)}</span>
    </div>
    ` : ''}
    <div class="totals-row total-final">
      <span>${selectedCountry === 'EU' && totals.taxTotal > 0 ? 'Total (gross)' : selectedCountry === 'AU' && totals.taxTotal > 0 ? 'Total incl GST' : selectedCountry === 'GB' && totals.taxTotal > 0 ? 'Total (inc VAT)' : 'Total'}:</span>
      <span>${formatMoney(formData.currency, totals.grandTotal)}</span>
    </div>
  </div>

  ${selectedCountry === 'US' && (paymentDetails.bankName || paymentDetails.achRouting || paymentDetails.achAccount || paymentDetails.paypalEmail || paymentDetails.stripeLink || paymentDetails.zellePhone || paymentDetails.checkPayableTo) ? `
  <div class="payments">
    <h3>Payment Instructions:</h3>
    ${paymentDetails.bankName ? `<p><strong>Bank:</strong> ${paymentDetails.bankName}</p>` : ''}
    ${paymentDetails.achRouting && paymentDetails.achAccount ? `<p><strong>ACH / Wire Transfer:</strong> Routing ${paymentDetails.achRouting}, Account ${paymentDetails.achAccount}</p>` : ''}
    ${paymentDetails.wireSwift ? `<p><strong>SWIFT:</strong> ${paymentDetails.wireSwift}</p>` : ''}
    ${paymentDetails.paypalEmail ? `<p><strong>PayPal:</strong> ${paymentDetails.paypalEmail}</p>` : ''}
    ${paymentDetails.stripeLink ? `<p><strong>Pay Online:</strong> <a href="${paymentDetails.stripeLink}">${paymentDetails.stripeLink}</a></p>` : ''}
    ${paymentDetails.zellePhone ? `<p><strong>Zelle:</strong> ${paymentDetails.zellePhone}</p>` : ''}
    ${paymentDetails.checkPayableTo ? `<p><strong>Checks payable to:</strong> ${paymentDetails.checkPayableTo}</p>` : ''}
  </div>
  ` : ''}

  ${selectedCountry === 'AU' && (paymentDetails.bsb || paymentDetails.accountNumber || paymentDetails.accountName) ? `
  <div class="payments">
    <h3>Bank Details:</h3>
    ${paymentDetails.bsb ? `<p><strong>BSB:</strong> ${paymentDetails.bsb}</p>` : ''}
    ${paymentDetails.accountNumber ? `<p><strong>Account Number:</strong> ${paymentDetails.accountNumber}</p>` : ''}
    ${paymentDetails.accountName ? `<p><strong>Account Name:</strong> ${paymentDetails.accountName}</p>` : ''}
  </div>
  ` : ''}

  ${selectedCountry === 'GB' && (paymentDetails.accountName || paymentDetails.sortCode || paymentDetails.accountNumber || paymentDetails.iban || paymentDetails.wireSwift) ? `
  <div class="payments">
    <h3>Bank Details:</h3>
    ${paymentDetails.accountName ? `<p><strong>Account Name:</strong> ${paymentDetails.accountName}</p>` : ''}
    ${paymentDetails.sortCode ? `<p><strong>Sort Code:</strong> ${paymentDetails.sortCode}</p>` : ''}
    ${paymentDetails.accountNumber ? `<p><strong>Account Number:</strong> ${paymentDetails.accountNumber}</p>` : ''}
    ${paymentDetails.iban ? `<p><strong>IBAN:</strong> ${paymentDetails.iban}</p>` : ''}
    ${paymentDetails.wireSwift ? `<p><strong>SWIFT/BIC:</strong> ${paymentDetails.wireSwift}</p>` : ''}
  </div>
  ` : ''}

  ${selectedCountry === 'EU' && (paymentDetails.accountName || paymentDetails.iban || paymentDetails.wireSwift || paymentDetails.bankName) ? `
  <div class="payments">
    <h3>Bank Details:</h3>
    ${paymentDetails.accountName ? `<p><strong>Account Holder Name:</strong> ${paymentDetails.accountName}</p>` : ''}
    ${paymentDetails.iban ? `<p><strong>IBAN:</strong> ${paymentDetails.iban}</p>` : ''}
    ${paymentDetails.wireSwift ? `<p><strong>BIC/SWIFT:</strong> ${paymentDetails.wireSwift}</p>` : ''}
    ${paymentDetails.bankName ? `<p><strong>Bank Name:</strong> ${paymentDetails.bankName}</p>` : ''}
  </div>
  ` : ''}

  ${formData.reverseCharge ? `
  <div class="notes" style="margin-top: 24px; padding: 16px; background-color: #fff3cd; border-left: 4px solid #ffc107;">
    <p><strong>Reverse charge – VAT to be accounted for by the recipient.</strong></p>
  </div>
  ` : ''}

  ${formData.notes ? `
  <div class="notes">
    <h3>Notes:</h3>
    <p>${formData.notes.replace(/\n/g, '<br>')}</p>
  </div>
  ` : ''}
</body>
</html>
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
      }, 250);
    }
  };

  const handleSaveToLocalStorage = () => {
    const invoiceData = {
      companyInfo,
      clientInfo,
      formData,
      items,
      totals,
      createdAt: new Date().toISOString(),
    };
    const existing = JSON.parse(localStorage.getItem('publicInvoices') || '[]');
    existing.push(invoiceData);
    localStorage.setItem('publicInvoices', JSON.stringify(existing));
    alert('Invoice saved to local storage! Register to save permanently in your dashboard.');
  };

  const baseUrl = import.meta.env.VITE_BASE_URL || 'https://invoicecomposer.com';
  
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Invoice Builder - Invoice Composer',
    description: 'Free online invoice builder. Create professional invoices with automatic tax calculations, multiple currencies, and country-specific templates.',
    url: `${baseUrl}/invoice-builder`,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'Free invoice generation',
      'PDF export',
      'Multiple currencies',
      'Country-specific tax calculations',
      'Professional templates',
      'No registration required',
    ],
  };

  return (
    <PublicLayout>
      <SEO
        title="Free Invoice Builder - Create Professional Invoices Online"
        description="Build professional invoices online for free. Our invoice builder supports multiple countries, currencies, and automatic tax calculations. No registration required."
        keywords="invoice builder, free invoice maker, online invoice creator, invoice generator, create invoice, invoice template builder"
        url="/invoice-builder"
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
        <PageTitle>Create Invoice</PageTitle>
        <PageSubtitle>Fill out the form below to create your invoice</PageSubtitle>

        <CountrySelectorWrapper>
          <CountrySelectorLabel>
            <HiOutlineGlobeAlt style={{ display: 'inline', marginRight: '8px', verticalAlign: 'middle' }} />
            Select Country/Region Template
          </CountrySelectorLabel>
          <CountrySelect
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value as CountryCode)}
          >
            {getAllCountryTemplates().map((template) => (
              <option key={template.code} value={template.code}>
                {template.name} ({template.region}) - {template.currency}
              </option>
            ))}
          </CountrySelect>
          <CountryInfo>
            <CountryBadge>{countryTemplate.code}</CountryBadge>
            <strong>Currency:</strong> {countryTemplate.currency} | 
            <strong> Tax Label:</strong> {countryTemplate.taxLabel} | 
            <strong> Tax ID:</strong> {countryTemplate.taxIdLabel}
          </CountryInfo>
        </CountrySelectorWrapper>

        <form onSubmit={(e) => { e.preventDefault(); }}>
          <FormWrapper>
            <FormSection>
              <SectionTitle>Company Information</SectionTitle>
              <Grid>
                <FieldGroup>
                  <Label>Company Name</Label>
                  <CustomInput
                    value={companyInfo.name}
                    onChange={(e) => setCompanyInfo({ ...companyInfo, name: e.target.value })}
                    placeholder="Your company name"
                  />
                </FieldGroup>
                <FieldGroup>
                  <Label>Email</Label>
                  <CustomInput
                    type="email"
                    value={companyInfo.email}
                    onChange={(e) => setCompanyInfo({ ...companyInfo, email: e.target.value })}
                    placeholder="email@example.com"
                  />
                </FieldGroup>
                <FieldGroup>
                  <Label>Address</Label>
                  <CustomInput
                    value={companyInfo.addressLine1}
                    onChange={(e) => setCompanyInfo({ ...companyInfo, addressLine1: e.target.value })}
                    placeholder="Street address"
                  />
                </FieldGroup>
                <FieldGroup>
                  <Label>City</Label>
                  <CustomInput
                    value={companyInfo.city}
                    onChange={(e) => setCompanyInfo({ ...companyInfo, city: e.target.value })}
                    placeholder="City"
                  />
                </FieldGroup>
                {selectedCountry === 'US' && (
                  <FieldGroup>
                    <Label>State</Label>
                    <CustomInput
                      value={companyInfo.state}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, state: e.target.value.toUpperCase() })}
                      placeholder="CA, NY, TX"
                      maxLength={2}
                      style={{ textTransform: 'uppercase' }}
                    />
                  </FieldGroup>
                )}
                {selectedCountry === 'CA' && (
                  <FieldGroup>
                    <Label>Province</Label>
                    <CustomInput
                      value={companyInfo.province}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, province: e.target.value.toUpperCase() })}
                      placeholder="ON, BC, QC, AB"
                      maxLength={2}
                      style={{ textTransform: 'uppercase' }}
                    />
                  </FieldGroup>
                )}
                {selectedCountry === 'AU' && (
                  <FieldGroup>
                    <Label>State/Territory</Label>
                    <CustomInput
                      value={companyInfo.state}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, state: e.target.value.toUpperCase() })}
                      placeholder="NSW, VIC, QLD, WA, SA, TAS, ACT, NT"
                      maxLength={3}
                      style={{ textTransform: 'uppercase' }}
                    />
                  </FieldGroup>
                )}
                <FieldGroup>
                  <Label>Postal Code</Label>
                  <CustomInput
                    value={companyInfo.postalCode}
                    onChange={(e) => {
                      let value = e.target.value.toUpperCase();
                      // Format Canadian postal code: A1A 1A1
                      if (selectedCountry === 'CA' && value.length > 3 && !value.includes(' ')) {
                        value = value.slice(0, 3) + ' ' + value.slice(3);
                      }
                      setCompanyInfo({ ...companyInfo, postalCode: value });
                    }}
                    placeholder={selectedCountry === 'US' ? 'ZIP Code (12345)' : selectedCountry === 'CA' ? 'A1A 1A1' : 'Postal Code'}
                    maxLength={selectedCountry === 'CA' ? 7 : undefined}
                    style={selectedCountry === 'CA' ? { textTransform: 'uppercase' } : {}}
                  />
                </FieldGroup>
                <FieldGroup>
                  <Label>Country</Label>
                  {selectedCountry === 'EU' ? (
                    <CountrySelect
                      value={companyInfo.country}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, country: e.target.value })}
                    >
                      <option value="">Select EU Country</option>
                      {euCountries.map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </CountrySelect>
                  ) : (
                    <CustomInput
                      value={companyInfo.country}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, country: e.target.value })}
                      placeholder="Country"
                    />
                  )}
                </FieldGroup>
                <FieldGroup>
                  <Label>{countryTemplate.taxIdLabel}</Label>
                  <CustomInput
                    value={companyInfo.taxIdValue}
                    onChange={(e) => setCompanyInfo({ ...companyInfo, taxIdValue: e.target.value })}
                    placeholder={`Enter ${countryTemplate.taxIdLabel}`}
                  />
                </FieldGroup>
                {selectedCountry === 'GB' && (
                  <FieldGroup>
                    <Label>Company Registration Number (optional)</Label>
                    <CustomInput
                      value={companyInfo.companyRegNumber}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, companyRegNumber: e.target.value })}
                      placeholder="e.g., 12345678"
                    />
                  </FieldGroup>
                )}
                {selectedCountry === 'US' && (
                  <FieldGroup>
                    <Label>Show {countryTemplate.taxIdLabel} on Invoice</Label>
                    <ToggleWrapper>
                      <ToggleLabel>
                        <ToggleInput
                          type="checkbox"
                          checked={formData.showTaxId}
                          onChange={(e) => setFormData({ ...formData, showTaxId: e.target.checked })}
                        />
                        <ToggleSwitch $active={formData.showTaxId} />
                        <ToggleText>{formData.showTaxId ? 'Show on invoice' : 'Hidden'}</ToggleText>
                      </ToggleLabel>
                    </ToggleWrapper>
                  </FieldGroup>
                )}
              </Grid>
            </FormSection>
          </FormWrapper>

          <SectionDivider />

          <FormWrapper>
            <FormSection>
              <SectionTitle>Client Information</SectionTitle>
              <Grid>
                <FieldGroup>
                  <Label>Client Name</Label>
                  <CustomInput
                    value={clientInfo.name}
                    onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })}
                    placeholder="Client name or company"
                    required
                  />
                </FieldGroup>
                <FieldGroup>
                  <Label>Client Email</Label>
                  <CustomInput
                    type="email"
                    value={clientInfo.email}
                    onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
                    placeholder="email@example.com"
                  />
                </FieldGroup>
                <FieldGroup>
                  <Label>Client Address</Label>
                  <CustomInput
                    value={clientInfo.addressLine1}
                    onChange={(e) => setClientInfo({ ...clientInfo, addressLine1: e.target.value })}
                    placeholder="Street address"
                  />
                </FieldGroup>
                <FieldGroup>
                  <Label>City</Label>
                  <CustomInput
                    value={clientInfo.city}
                    onChange={(e) => setClientInfo({ ...clientInfo, city: e.target.value })}
                    placeholder="City"
                  />
                </FieldGroup>
                {selectedCountry === 'US' && (
                  <FieldGroup>
                    <Label>State</Label>
                    <CustomInput
                      value={clientInfo.state}
                      onChange={(e) => setClientInfo({ ...clientInfo, state: e.target.value.toUpperCase() })}
                      placeholder="CA, NY, TX"
                      maxLength={2}
                      style={{ textTransform: 'uppercase' }}
                    />
                  </FieldGroup>
                )}
                {selectedCountry === 'CA' && (
                  <FieldGroup>
                    <Label>Province</Label>
                    <CustomInput
                      value={clientInfo.province}
                      onChange={(e) => setClientInfo({ ...clientInfo, province: e.target.value.toUpperCase() })}
                      placeholder="ON, BC, QC, AB"
                      maxLength={2}
                      style={{ textTransform: 'uppercase' }}
                    />
                  </FieldGroup>
                )}
                {selectedCountry === 'AU' && (
                  <FieldGroup>
                    <Label>State/Territory</Label>
                    <CustomInput
                      value={clientInfo.state}
                      onChange={(e) => setClientInfo({ ...clientInfo, state: e.target.value.toUpperCase() })}
                      placeholder="NSW, VIC, QLD, WA, SA, TAS, ACT, NT"
                      maxLength={3}
                      style={{ textTransform: 'uppercase' }}
                    />
                  </FieldGroup>
                )}
                <FieldGroup>
                  <Label>Postal Code</Label>
                  <CustomInput
                    value={clientInfo.postalCode}
                    onChange={(e) => {
                      let value = e.target.value.toUpperCase();
                      // Format Canadian postal code: A1A 1A1
                      if (selectedCountry === 'CA' && value.length > 3 && !value.includes(' ')) {
                        value = value.slice(0, 3) + ' ' + value.slice(3);
                      }
                      setClientInfo({ ...clientInfo, postalCode: value });
                    }}
                    placeholder={selectedCountry === 'US' ? 'ZIP Code (12345)' : selectedCountry === 'CA' ? 'A1A 1A1' : 'Postal Code'}
                    maxLength={selectedCountry === 'CA' ? 7 : undefined}
                    style={selectedCountry === 'CA' ? { textTransform: 'uppercase' } : {}}
                  />
                </FieldGroup>
                <FieldGroup>
                  <Label>Country</Label>
                  {selectedCountry === 'EU' ? (
                    <CountrySelect
                      value={clientInfo.country}
                      onChange={(e) => setClientInfo({ ...clientInfo, country: e.target.value })}
                    >
                      <option value="">Select EU Country</option>
                      {euCountries.map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </CountrySelect>
                  ) : (
                    <CustomInput
                      value={clientInfo.country}
                      onChange={(e) => setClientInfo({ ...clientInfo, country: e.target.value })}
                      placeholder="Country"
                    />
                  )}
                </FieldGroup>
                <FieldGroup>
                  <Label>{countryTemplate.taxIdLabel} (Client)</Label>
                  <CustomInput
                    value={clientInfo.taxIdValue}
                    onChange={(e) => setClientInfo({ ...clientInfo, taxIdValue: e.target.value })}
                    placeholder={`Enter client ${countryTemplate.taxIdLabel}`}
                  />
                </FieldGroup>
              </Grid>
            </FormSection>
          </FormWrapper>

          {selectedCountry === 'US' && (
            <>
              <SectionDivider />
              <FormWrapper>
                <FormSection>
                  <SectionTitle>Ship To (if different from Bill To)</SectionTitle>
                  <Grid>
                    <FieldGroup>
                      <Label>Name / Company</Label>
                      <CustomInput
                        value={shipToInfo.name}
                        onChange={(e) => setShipToInfo({ ...shipToInfo, name: e.target.value })}
                        placeholder="Ship to name or company"
                      />
                    </FieldGroup>
                    <FieldGroup>
                      <Label>Address</Label>
                      <CustomInput
                        value={shipToInfo.addressLine1}
                        onChange={(e) => setShipToInfo({ ...shipToInfo, addressLine1: e.target.value })}
                        placeholder="Street address"
                      />
                    </FieldGroup>
                    <FieldGroup>
                      <Label>City</Label>
                      <CustomInput
                        value={shipToInfo.city}
                        onChange={(e) => setShipToInfo({ ...shipToInfo, city: e.target.value })}
                        placeholder="City"
                      />
                    </FieldGroup>
                    <FieldGroup>
                      <Label>State</Label>
                      <CustomInput
                        value={shipToInfo.state}
                        onChange={(e) => setShipToInfo({ ...shipToInfo, state: e.target.value.toUpperCase() })}
                        placeholder="CA, NY, TX"
                        maxLength={2}
                        style={{ textTransform: 'uppercase' }}
                      />
                    </FieldGroup>
                    <FieldGroup>
                      <Label>ZIP Code</Label>
                      <CustomInput
                        value={shipToInfo.postalCode}
                        onChange={(e) => setShipToInfo({ ...shipToInfo, postalCode: e.target.value })}
                        placeholder="12345"
                      />
                    </FieldGroup>
                    <FieldGroup>
                      <Label>Country</Label>
                      <CustomInput
                        value={shipToInfo.country}
                        onChange={(e) => setShipToInfo({ ...shipToInfo, country: e.target.value })}
                        placeholder="Country"
                      />
                    </FieldGroup>
                  </Grid>
                </FormSection>
              </FormWrapper>
            </>
          )}

          <SectionDivider />

          <FormWrapper>
            <FormSection>
              <SectionTitle>Invoice Details</SectionTitle>
              <Grid>
                {(selectedCountry === 'US' || selectedCountry === 'CA' || selectedCountry === 'AU' || selectedCountry === 'GB' || selectedCountry === 'EU') && (
                  <FieldGroup>
                    <Label>Invoice Number <span style={{ color: '#ef4444' }}>*</span></Label>
                    <CustomInput
                      value={formData.invoiceNumber}
                      onChange={(e) => setFormData({ ...formData, invoiceNumber: e.target.value })}
                      placeholder={selectedCountry === 'GB' || selectedCountry === 'EU' ? '2026-0012' : 'INV-000123'}
                      required
                      style={{ fontFamily: 'monospace' }}
                    />
                  </FieldGroup>
                )}
                <FieldGroup>
                  <Label>Issue Date</Label>
                  <DatePickerWrapper>
                    <CustomDateInput
                      type="date"
                      value={formData.issueDate}
                      onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                      required
                    />
                    <DatePickerIcon>
                      <HiOutlineCalendar />
                    </DatePickerIcon>
                  </DatePickerWrapper>
                </FieldGroup>

                <FieldGroup>
                  <Label>Due Date</Label>
                  <DatePickerWrapper>
                    <CustomDateInput
                      type="date"
                      value={formData.dueDate}
                      onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    />
                    <DatePickerIcon>
                      <HiOutlineCalendar />
                    </DatePickerIcon>
                  </DatePickerWrapper>
                </FieldGroup>

                <FieldGroup>
                  <Label>Currency</Label>
                  <CustomInput
                    value={formData.currency}
                    onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                    placeholder="USD"
                    required
                  />
                </FieldGroup>
                {(selectedCountry === 'US' || selectedCountry === 'CA' || selectedCountry === 'AU' || selectedCountry === 'GB' || selectedCountry === 'EU') && (
                  <>
                    {(selectedCountry === 'US' || selectedCountry === 'CA') && (
                      <FieldGroup>
                        <Label>PO Number</Label>
                        <CustomInput
                          value={formData.poNumber}
                          onChange={(e) => setFormData({ ...formData, poNumber: e.target.value })}
                          placeholder="Purchase Order #"
                        />
                      </FieldGroup>
                    )}
                    <FieldGroup>
                      <Label>Payment Terms</Label>
                      <CountrySelect
                        value={formData.paymentTerms}
                        onChange={(e) => setFormData({ ...formData, paymentTerms: e.target.value })}
                      >
                        <option value="NET_7">Net 7</option>
                        {selectedCountry === 'AU' && <option value="NET_14">Net 14</option>}
                        {selectedCountry === 'GB' && <option value="WITHIN_14_DAYS">Payment due within 14 days</option>}
                        {selectedCountry === 'EU' && <option value="WITHIN_14_DAYS">Due in 14 days</option>}
                        <option value="NET_15">Net 15</option>
                        <option value="NET_30">Net 30</option>
                        <option value="NET_60">Net 60</option>
                        <option value="DUE_ON_RECEIPT">Due on Receipt</option>
                      </CountrySelect>
                    </FieldGroup>
                  </>
                )}
                {selectedCountry === 'CA' && (
                  <FieldGroup>
                    <Label>Tax System</Label>
                    <CountrySelect
                      value={formData.taxSystem}
                      onChange={(e) => setFormData({ ...formData, taxSystem: e.target.value })}
                    >
                      <option value="GST_HST">GST/HST</option>
                      <option value="GST_ONLY">GST Only</option>
                      <option value="HST">HST (Harmonized Sales Tax)</option>
                      <option value="GST_PST">GST + PST</option>
                      <option value="GST_QST">GST + QST</option>
                    </CountrySelect>
                  </FieldGroup>
                )}
              </Grid>

              <Grid>
                <FieldGroup>
                  <Label>Shipping Amount</Label>
                  <CustomInput
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.shippingAmount}
                    onChange={(e) => setFormData({ ...formData, shippingAmount: e.target.value })}
                    placeholder="0.00"
                  />
                </FieldGroup>

                <FieldGroup>
                  <Label>Invoice Discount (%)</Label>
                  <CustomInput
                    type="number"
                    min="0"
                    max="100"
                    step="0.01"
                    value={formData.invoiceDiscountPercent}
                    onChange={(e) => setFormData({ ...formData, invoiceDiscountPercent: e.target.value })}
                    placeholder="0"
                  />
                </FieldGroup>

                {countryTemplate.taxMode !== 'NONE' && (
                  <FieldGroup>
                    <Label>{countryTemplate.taxLabel} Inclusive</Label>
                    <ToggleWrapper>
                      <ToggleLabel>
                        <ToggleInput
                          type="checkbox"
                          checked={formData.taxInclusive}
                          onChange={(e) => setFormData({ ...formData, taxInclusive: e.target.checked })}
                        />
                        <ToggleSwitch $active={formData.taxInclusive} />
                        <ToggleText>Prices include {countryTemplate.taxLabel.toLowerCase()}</ToggleText>
                      </ToggleLabel>
                    </ToggleWrapper>
                  </FieldGroup>
                )}
                {selectedCountry === 'EU' && (
                  <FieldGroup>
                    <Label>Reverse Charge (0% VAT)</Label>
                    <ToggleWrapper>
                      <ToggleLabel>
                        <ToggleInput
                          type="checkbox"
                          checked={formData.reverseCharge}
                          onChange={(e) => {
                            setFormData({ ...formData, reverseCharge: e.target.checked });
                            // Reset VAT on items when reverse charge is enabled
                            if (e.target.checked) {
                              setItems(items.map(item => ({ ...item, tax: undefined })));
                            }
                          }}
                        />
                        <ToggleSwitch $active={formData.reverseCharge} />
                        <ToggleText>Reverse charge – VAT to be accounted for by the recipient</ToggleText>
                      </ToggleLabel>
                    </ToggleWrapper>
                  </FieldGroup>
                )}
              </Grid>

              <FieldGroup style={{ marginTop: '24px' }}>
                <Label>Notes</Label>
                <CustomTextarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Add any additional notes or terms..."
                />
              </FieldGroup>
            </FormSection>
          </FormWrapper>

          {selectedCountry === 'US' && (
            <>
              <SectionDivider />
              <FormWrapper>
                <FormSection>
                  <SectionTitle>Payment Details</SectionTitle>
                  <Grid>
                    <FieldGroup>
                      <Label>Bank Name</Label>
                      <CustomInput
                        value={paymentDetails.bankName}
                        onChange={(e) => setPaymentDetails({ ...paymentDetails, bankName: e.target.value })}
                        placeholder="Bank name"
                      />
                    </FieldGroup>
                    <FieldGroup>
                      <Label>ACH Routing Number</Label>
                      <CustomInput
                        value={paymentDetails.achRouting}
                        onChange={(e) => setPaymentDetails({ ...paymentDetails, achRouting: e.target.value })}
                        placeholder="9-digit routing number"
                      />
                    </FieldGroup>
                    <FieldGroup>
                      <Label>ACH Account Number</Label>
                      <CustomInput
                        value={paymentDetails.achAccount}
                        onChange={(e) => setPaymentDetails({ ...paymentDetails, achAccount: e.target.value })}
                        placeholder="Account number"
                      />
                    </FieldGroup>
                    <FieldGroup>
                      <Label>SWIFT / BIC Code</Label>
                      <CustomInput
                        value={paymentDetails.wireSwift}
                        onChange={(e) => setPaymentDetails({ ...paymentDetails, wireSwift: e.target.value })}
                        placeholder="For wire transfers"
                      />
                    </FieldGroup>
                    <FieldGroup>
                      <Label>PayPal Email</Label>
                      <CustomInput
                        type="email"
                        value={paymentDetails.paypalEmail}
                        onChange={(e) => setPaymentDetails({ ...paymentDetails, paypalEmail: e.target.value })}
                        placeholder="payments@example.com"
                      />
                    </FieldGroup>
                    <FieldGroup>
                      <Label>Stripe Payment Link</Label>
                      <CustomInput
                        type="url"
                        value={paymentDetails.stripeLink}
                        onChange={(e) => setPaymentDetails({ ...paymentDetails, stripeLink: e.target.value })}
                        placeholder="https://pay.stripe.com/..."
                      />
                    </FieldGroup>
                    <FieldGroup>
                      <Label>Zelle Phone / Email</Label>
                      <CustomInput
                        value={paymentDetails.zellePhone}
                        onChange={(e) => setPaymentDetails({ ...paymentDetails, zellePhone: e.target.value })}
                        placeholder="Phone or email for Zelle"
                      />
                    </FieldGroup>
                    <FieldGroup>
                      <Label>Checks Payable To</Label>
                      <CustomInput
                        value={paymentDetails.checkPayableTo}
                        onChange={(e) => setPaymentDetails({ ...paymentDetails, checkPayableTo: e.target.value })}
                        placeholder="Name on checks"
                      />
                    </FieldGroup>
                  </Grid>
                </FormSection>
              </FormWrapper>
            </>
          )}

          {selectedCountry === 'AU' && (
            <>
              <SectionDivider />
              <FormWrapper>
                <FormSection>
                  <SectionTitle>Bank Details</SectionTitle>
                  <Grid>
                    <FieldGroup>
                      <Label>BSB</Label>
                      <CustomInput
                        value={paymentDetails.bsb}
                        onChange={(e) => setPaymentDetails({ ...paymentDetails, bsb: e.target.value })}
                        placeholder="123-456"
                        maxLength={7}
                      />
                    </FieldGroup>
                    <FieldGroup>
                      <Label>Account Number</Label>
                      <CustomInput
                        value={paymentDetails.accountNumber}
                        onChange={(e) => setPaymentDetails({ ...paymentDetails, accountNumber: e.target.value })}
                        placeholder="Account number"
                      />
                    </FieldGroup>
                    <FieldGroup>
                      <Label>Account Name</Label>
                      <CustomInput
                        value={paymentDetails.accountName}
                        onChange={(e) => setPaymentDetails({ ...paymentDetails, accountName: e.target.value })}
                        placeholder="Account holder name"
                      />
                    </FieldGroup>
                  </Grid>
                </FormSection>
              </FormWrapper>
            </>
          )}

          {selectedCountry === 'GB' && (
            <>
              <SectionDivider />
              <FormWrapper>
                <FormSection>
                  <SectionTitle>Bank Details</SectionTitle>
                  <Grid>
                    <FieldGroup>
                      <Label>Account Name</Label>
                      <CustomInput
                        value={paymentDetails.accountName}
                        onChange={(e) => setPaymentDetails({ ...paymentDetails, accountName: e.target.value })}
                        placeholder="Account holder name"
                      />
                    </FieldGroup>
                    <FieldGroup>
                      <Label>Sort Code</Label>
                      <CustomInput
                        value={paymentDetails.sortCode}
                        onChange={(e) => setPaymentDetails({ ...paymentDetails, sortCode: e.target.value })}
                        placeholder="12-34-56"
                        maxLength={8}
                      />
                    </FieldGroup>
                    <FieldGroup>
                      <Label>Account Number</Label>
                      <CustomInput
                        value={paymentDetails.accountNumber}
                        onChange={(e) => setPaymentDetails({ ...paymentDetails, accountNumber: e.target.value })}
                        placeholder="Account number"
                      />
                    </FieldGroup>
                    <FieldGroup>
                      <Label>IBAN (optional)</Label>
                      <CustomInput
                        value={paymentDetails.iban}
                        onChange={(e) => setPaymentDetails({ ...paymentDetails, iban: e.target.value.toUpperCase() })}
                        placeholder="GB82 WEST 1234 5698 7654 32"
                        style={{ textTransform: 'uppercase' }}
                      />
                    </FieldGroup>
                    <FieldGroup>
                      <Label>SWIFT/BIC Code (optional)</Label>
                      <CustomInput
                        value={paymentDetails.wireSwift}
                        onChange={(e) => setPaymentDetails({ ...paymentDetails, wireSwift: e.target.value.toUpperCase() })}
                        placeholder="For international transfers"
                        style={{ textTransform: 'uppercase' }}
                      />
                    </FieldGroup>
                  </Grid>
                </FormSection>
              </FormWrapper>
            </>
          )}

          {selectedCountry === 'EU' && (
            <>
              <SectionDivider />
              <FormWrapper>
                <FormSection>
                  <SectionTitle>Bank Details</SectionTitle>
                  <Grid>
                    <FieldGroup>
                      <Label>Account Holder Name</Label>
                      <CustomInput
                        value={paymentDetails.accountName}
                        onChange={(e) => setPaymentDetails({ ...paymentDetails, accountName: e.target.value })}
                        placeholder="Account holder name"
                      />
                    </FieldGroup>
                    <FieldGroup>
                      <Label>IBAN</Label>
                      <CustomInput
                        value={paymentDetails.iban}
                        onChange={(e) => setPaymentDetails({ ...paymentDetails, iban: e.target.value.toUpperCase() })}
                        placeholder="DE89 3704 0044 0532 0130 00"
                        style={{ textTransform: 'uppercase' }}
                      />
                    </FieldGroup>
                    <FieldGroup>
                      <Label>BIC/SWIFT Code</Label>
                      <CustomInput
                        value={paymentDetails.wireSwift}
                        onChange={(e) => setPaymentDetails({ ...paymentDetails, wireSwift: e.target.value.toUpperCase() })}
                        placeholder="COBADEFFXXX"
                        style={{ textTransform: 'uppercase' }}
                      />
                    </FieldGroup>
                    <FieldGroup>
                      <Label>Bank Name (optional)</Label>
                      <CustomInput
                        value={paymentDetails.bankName}
                        onChange={(e) => setPaymentDetails({ ...paymentDetails, bankName: e.target.value })}
                        placeholder="Bank name"
                      />
                    </FieldGroup>
                  </Grid>
                </FormSection>
              </FormWrapper>
            </>
          )}

          <SectionDivider />

          <ItemsSection>
            <SectionTitle>Line Items</SectionTitle>
            <FormWrapper>
              <ItemsTable>
                <ItemsHeader>
                  <div>Title</div>
                  <div>Description</div>
                  <div>Quantity</div>
                  <div>Unit</div>
                  <div>Unit Price</div>
                  <div>Discount %</div>
                  <div>{selectedCountry === 'CA' && formData.taxSystem ? formData.taxSystem.replace(/_/g, ' ') + ' %' : countryTemplate.taxLabel + ' %'}</div>
                  <div></div>
                </ItemsHeader>
                {items.map((item, index) => (
                  <ItemRow key={index}>
                    <ItemInput
                      placeholder="Item title"
                      value={item.title}
                      onChange={(e) => handleItemChange(index, 'title', e.target.value)}
                      required
                    />
                    <ItemInput
                      placeholder="Description"
                      value={item.description || ''}
                      onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                    />
                    <ItemInput
                      placeholder="1"
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                    />
                    <ItemInput
                      placeholder="pcs"
                      value={item.unit}
                      onChange={(e) => handleItemChange(index, 'unit', e.target.value)}
                    />
                    <ItemInput
                      placeholder="0.00"
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.unitPrice}
                      onChange={(e) => handleItemChange(index, 'unitPrice', e.target.value)}
                    />
                    <ItemInput
                      placeholder="0"
                      type="number"
                      min="0"
                      max="100"
                      step="0.01"
                      value={item.discount?.value || ''}
                      onChange={(e) => handleItemChange(index, 'discountPercent', e.target.value)}
                    />
                    <ItemInput
                      placeholder="0"
                      type="number"
                      min="0"
                      max="100"
                      step="0.01"
                      value={item.tax?.rate || ''}
                      onChange={(e) => handleItemChange(index, 'taxPercent', e.target.value)}
                    />
                    <RemoveButton type="button" onClick={() => handleRemoveItem(index)}>
                      <HiOutlineX />
                    </RemoveButton>
                  </ItemRow>
                ))}
              </ItemsTable>
              <AddItemButton type="button" onClick={handleAddItem}>
                <HiOutlinePlus />
                <span>Add Item</span>
              </AddItemButton>
            </FormWrapper>
          </ItemsSection>

          <TotalsSection>
            <TotalRow>
              <span>
                {selectedCountry === 'GB' && totals.taxTotal > 0
                  ? 'Subtotal (ex VAT)'
                  : selectedCountry === 'EU' && totals.taxTotal > 0
                  ? 'Subtotal (net)'
                  : 'Subtotal'}
              </span>
              <span>{formatMoney(formData.currency, totals.subtotal)}</span>
            </TotalRow>
            {totals.discountTotal > 0 && (
              <TotalRow>
                <span>Discount</span>
                <span>-{formatMoney(formData.currency, totals.discountTotal)}</span>
              </TotalRow>
            )}
            {formData.reverseCharge ? (
              <TotalRow>
                <span>VAT (Reverse Charge)</span>
                <span>€0.00</span>
              </TotalRow>
            ) : totals.taxTotal > 0 && (
              <TotalRow>
                <span>{selectedCountry === 'CA' && formData.taxSystem ? formData.taxSystem.replace(/_/g, ' ') : countryTemplate.taxLabel}</span>
                <span>{formatMoney(formData.currency, totals.taxTotal)}</span>
              </TotalRow>
            )}
            {totals.shippingTotal > 0 && (
              <TotalRow>
                <span>Shipping</span>
                <span>{formatMoney(formData.currency, totals.shippingTotal)}</span>
              </TotalRow>
            )}
            <TotalFinal>
              <span>{selectedCountry === 'EU' && totals.taxTotal > 0 ? 'Total (gross)' : selectedCountry === 'AU' && totals.taxTotal > 0 ? 'Total incl GST' : selectedCountry === 'GB' && totals.taxTotal > 0 ? 'Total (inc VAT)' : 'Total'}</span>
              <span>{formatMoney(formData.currency, totals.grandTotal)}</span>
            </TotalFinal>
          </TotalsSection>

          <ActionButtons>
            <SubmitButton type="button" onClick={generatePDF}>
              Generate PDF
            </SubmitButton>
            <SecondaryButton type="button" onClick={handleSaveToLocalStorage}>
              Save Locally
            </SecondaryButton>
          </ActionButtons>
        </form>
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
