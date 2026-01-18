import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button } from '../components/Button';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchClients } from '../features/clients/clientsSlice';
import { createInvoice } from '../features/invoices/invoicesSlice';
import { fetchCompany } from '../features/company/companySlice';
import { InvoiceItem, calculateInvoiceTotals } from '../utils/calculations';
import { formatMoney } from '../utils/formatters';
import { useNavigate } from 'react-router-dom';
import { HiOutlineChevronDown, HiOutlineX, HiOutlinePlus, HiOutlineCalendar, HiOutlineGlobeAlt } from 'react-icons/hi';
import { getCountryTemplate, getAllCountryTemplates, type CountryCode } from '../utils/countryTemplates';

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

  @media (max-width: 768px) {
    padding: 24px 20px;
    border-radius: 12px;
  }
`;

const SectionDivider = styled.div`
  height: 1px;
  background: rgba(0, 0, 0, 0.08);
  margin: 40px 0;

  @media (max-width: 768px) {
    margin: 32px 0;
  }
`;

const FormSection = styled.div`
  margin-bottom: 32px;

  @media (max-width: 768px) {
    margin-bottom: 24px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 400;
  color: #1f1f1f;
  margin: 0 0 24px 0;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(70, 200, 97, 0.2);

  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 20px;
  }
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
    display: none;
  }

  @media (max-width: 768px) {
    display: none;
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
    padding: 20px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    margin-bottom: 12px;
    background: #f9fafb;
  }

  @media (max-width: 768px) {
    padding: 16px;
    gap: 10px;
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

  @media (max-width: 768px) {
    max-width: 100%;
    margin-left: 0;
    padding: 20px;
  }
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

const SubmitButton = styled(Button)`
  margin-top: 32px;
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

export default function InvoiceNewPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { clients } = useAppSelector((state) => state.clients);
  const { company } = useAppSelector((state: any) => state.company || { company: null });

  const [selectedCountry, setSelectedCountry] = useState<CountryCode>('US');
  const countryTemplate = getCountryTemplate(selectedCountry);

  const [formData, setFormData] = useState({
    clientId: '',
    issueDate: new Date().toISOString().split('T')[0],
    dueDate: '',
    currency: countryTemplate.currency,
    taxInclusive: false,
    shippingAmount: '',
    invoiceDiscountPercent: '',
    paymentTerms: 'NET_30',
    taxSystem: 'GST_HST',
    reverseCharge: false,
    poNumber: '',
    notes: '',
  });

  // Update currency and reset reverse charge when country changes
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      currency: countryTemplate.currency,
      reverseCharge: false,
    }));
    // Reset VAT on items when country changes
    setItems((prevItems) => prevItems.map(item => ({ ...item, tax: undefined })));
  }, [selectedCountry, countryTemplate.currency]);

  const [shipToInfo, setShipToInfo] = useState({
    name: '',
    addressLine1: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
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

  const [items, setItems] = useState<InvoiceItem[]>([
    { title: '', description: '', quantity: 1, unit: 'pcs', unitPrice: 0 },
  ]);

  useEffect(() => {
    dispatch(fetchClients());
    dispatch(fetchCompany());
  }, [dispatch]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!company?.id) {
      alert('Please set up your company information first');
      navigate('/company');
      return;
    }
    
    const invoiceData: any = {
      companyId: company.id,
      clientId: formData.clientId,
      issueDate: formData.issueDate,
      dueDate: formData.dueDate || undefined,
      currency: formData.currency,
      paymentTerms: formData.paymentTerms,
      poNumber: formData.poNumber || undefined,
      items: items.map(item => ({
        title: item.title,
        description: item.description || undefined,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        taxPercent: item.tax?.rate || 0,
        discountPercent: item.discount?.value || 0,
      })),
      status: 'DRAFT',
      taxMode: countryTemplate.taxMode,
      taxScope: 'LINE_ITEM',
      invoiceTaxPercent: 0,
      shippingAmount: formData.shippingAmount ? Number(formData.shippingAmount) : 0,
      notes: formData.notes || undefined,
    };

    const result = await dispatch(createInvoice(invoiceData)).unwrap();
    navigate(`/invoices/${result.id}`);
  };

  return (
    <div>
      <PageHeader>
        <PageTitle>New invoice</PageTitle>
      </PageHeader>

      <form onSubmit={handleSubmit}>
        <FormWrapper>
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

          <FormSection>
          <SectionTitle>Invoice Details</SectionTitle>
          <Grid>
            <FieldGroup>
              <Label>Client</Label>
              <SelectWrapper>
                <CustomSelect
                  value={formData.clientId}
                  onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}
                  required
                >
                  <option value="">Select client</option>
                  {clients.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.name}
                    </option>
                  ))}
                </CustomSelect>
                <SelectIcon>
                  <HiOutlineChevronDown />
                </SelectIcon>
              </SelectWrapper>
            </FieldGroup>

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

            <FieldGroup>
              <Label>Tax Inclusive</Label>
              <ToggleWrapper>
                <ToggleLabel>
                  <ToggleInput
                    type="checkbox"
                    checked={formData.taxInclusive}
                    onChange={(e) => setFormData({ ...formData, taxInclusive: e.target.checked })}
                  />
                  <ToggleSwitch $active={formData.taxInclusive} />
                  <ToggleText>{formData.taxInclusive ? 'Yes' : 'No'}</ToggleText>
                </ToggleLabel>
              </ToggleWrapper>
            </FieldGroup>

            <FieldGroup>
              <Label>Payment Terms</Label>
              <SelectWrapper>
                <CustomSelect
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
                </CustomSelect>
                <SelectIcon>
                  <HiOutlineChevronDown />
                </SelectIcon>
              </SelectWrapper>
            </FieldGroup>

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
          </Grid>

          {selectedCountry === 'CA' && (
            <Grid>
              <FieldGroup>
                <Label>Tax System</Label>
                <SelectWrapper>
                  <CustomSelect
                    value={formData.taxSystem}
                    onChange={(e) => setFormData({ ...formData, taxSystem: e.target.value })}
                  >
                    <option value="GST_HST">GST/HST</option>
                    <option value="GST_ONLY">GST Only</option>
                    <option value="HST">HST (Harmonized Sales Tax)</option>
                    <option value="GST_PST">GST + PST</option>
                    <option value="GST_QST">GST + QST</option>
                  </CustomSelect>
                  <SelectIcon>
                    <HiOutlineChevronDown />
                  </SelectIcon>
                </SelectWrapper>
              </FieldGroup>
            </Grid>
          )}

          {selectedCountry === 'EU' && (
            <Grid>
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
                          setItems((prevItems) => prevItems.map(item => ({ ...item, tax: undefined })));
                        }
                      }}
                    />
                    <ToggleSwitch $active={formData.reverseCharge} />
                    <ToggleText>Reverse charge – VAT to be accounted for by the recipient</ToggleText>
                  </ToggleLabel>
                </ToggleWrapper>
              </FieldGroup>
            </Grid>
          )}

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
          <ItemsTable>
            <ItemsHeader>
              <div>Title</div>
              <div>Description</div>
              <div>Qty</div>
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
              <span>{formatMoney(formData.currency, 0)}</span>
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

        <SubmitButton type="submit" $variant="primary">
          Create Invoice
        </SubmitButton>
      </form>
    </div>
  );
}
