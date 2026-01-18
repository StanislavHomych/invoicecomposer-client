import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import {
  fetchInvoice,
  updateInvoice,
  updateInvoiceStatus,
  generatePdf,
  recordPayment,
  Invoice,
} from '../features/invoices/invoicesSlice';
import { fetchClients } from '../features/clients/clientsSlice';
import { Button } from '../components/Button';
import { InvoiceItem, calculateInvoiceTotals } from '../utils/calculations';
import { formatMoney } from '../utils/formatters';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { HiOutlineChevronDown, HiOutlineX, HiOutlinePlus } from 'react-icons/hi';

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  flex-wrap: wrap;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 24px;
  }
`;

const PageTitle = styled.h1`
  font-size: 32px;
  font-weight: 300;
  color: #1f1f1f;
  margin: 0 0 8px 0;
  letter-spacing: -0.5px;
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-start;
  }
`;

const FormWrapper = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 32px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;

  @media (max-width: 768px) {
    padding: 24px 20px;
    border-radius: 12px;
    margin-bottom: 20px;
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
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-sizing: border-box;
  appearance: none;
  cursor: pointer;

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

const SelectIcon = styled.div`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: #4b5563;

  svg {
    width: 20px;
    height: 20px;
  }
`;

const ItemsSection = styled.div`
  margin-top: 32px;

  @media (max-width: 768px) {
    margin-top: 24px;
  }
`;

const ItemsHeader = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 2fr 1fr 1fr 1fr 1fr 1fr auto;
  gap: 12px;
  padding: 12px 14px;
  background: rgba(70, 200, 97, 0.05);
  border-radius: 10px;
  margin-bottom: 12px;
  font-weight: 400;
  font-size: 13px;
  color: #4b5563;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  @media (max-width: 960px) {
    display: none;
  }
`;

const ItemRow = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 2fr 1fr 1fr 1fr 1fr 1fr auto;
  gap: 12px;
  padding: 16px;
  border-radius: 12px;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 12px;
  align-items: center;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    gap: 12px;
    padding: 16px;
    border: 1px solid rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    padding: 12px;
  }
`;

const ItemFieldLabel = styled.label`
  display: block;
  margin-bottom: 6px;
  font-weight: 300;
  font-size: 12px;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  @media (min-width: 961px) {
    display: none;
  }
`;

const Totals = styled.div`
  margin-top: 32px;
  margin-left: auto;
  max-width: 400px;
  padding: 24px;
  border-radius: 12px;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    max-width: 100%;
    margin-left: 0;
    padding: 20px;
  }
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 15px;
  font-weight: 300;
  color: #4b5563;

  @media (max-width: 768px) {
    font-size: 14px;
    margin-bottom: 10px;
  }
`;

const TotalFinal = styled(TotalRow)`
  font-weight: 600;
  font-size: 18px;
  color: #1f1f1f;
  padding-top: 12px;
  border-top: 2px solid rgba(70, 200, 97, 0.2);
  margin-top: 8px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const StatusPill = styled.span`
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 500;
  background: rgba(70, 200, 97, 0.15);
  color: #16a34a;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  @media (max-width: 768px) {
    padding: 4px 10px;
    font-size: 11px;
  }
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

  span {
    display: none;
  }

  @media (max-width: 960px) {
    width: 100%;
    height: auto;
    padding: 10px 16px;
    gap: 6px;

    span {
      display: inline;
      font-size: 13px;
      font-weight: 300;
    }
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

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const SecondaryButton = styled(Button)`
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 300;
  background: rgba(0, 0, 0, 0.05) !important;
  color: #1f1f1f !important;
  border: 1px solid rgba(0, 0, 0, 0.15) !important;

  &:hover {
    background: rgba(0, 0, 0, 0.08) !important;
    border-color: rgba(0, 0, 0, 0.2) !important;
  }
`;

export default function InvoiceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { currentInvoice, loading } = useAppSelector((state) => state.invoices);
  const { clients } = useAppSelector((state) => state.clients);

  const [formData, setFormData] = useState({
    clientId: '',
    issueDate: '',
    dueDate: '',
    currency: 'USD',
    status: 'DRAFT' as Invoice['status'],
    taxInclusive: false,
    shippingAmount: '',
    invoiceDiscountPercent: '',
    notes: '',
  });

  const [items, setItems] = useState<InvoiceItem[]>([]);
  const [paymentData, setPaymentData] = useState({
    amount: '',
    method: 'Bank transfer',
    date: new Date().toISOString().split('T')[0],
    note: '',
  });

  useEffect(() => {
    if (id) {
      dispatch(fetchInvoice(id));
    }
    dispatch(fetchClients());
  }, [dispatch, id]);

  const toDateInput = (value?: string) => (value ? value.split('T')[0] : '');

  useEffect(() => {
    if (currentInvoice) {
      setFormData({
        clientId: currentInvoice.clientId,
        issueDate: toDateInput(currentInvoice.issueDate),
        dueDate: toDateInput(currentInvoice.dueDate),
        currency: currentInvoice.currency,
        status: currentInvoice.status,
        taxInclusive: currentInvoice.taxInclusive ?? false,
        shippingAmount: currentInvoice.shippingAmount ? String(currentInvoice.shippingAmount) : '',
        invoiceDiscountPercent: currentInvoice.invoiceLevelDiscount?.value
          ? String(currentInvoice.invoiceLevelDiscount.value)
          : '',
        notes: currentInvoice.notes || '',
      });
      setItems(currentInvoice.items || []);
    }
  }, [currentInvoice]);

  const totals = calculateInvoiceTotals(items, {
    taxInclusive: formData.taxInclusive,
    invoiceLevelDiscount:
      formData.invoiceDiscountPercent !== ''
        ? { type: 'percent', value: Number(formData.invoiceDiscountPercent) }
        : undefined,
    shippingAmount: formData.shippingAmount ? Number(formData.shippingAmount) : 0,
  });

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

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    const payload: Partial<Invoice> = {
      clientId: formData.clientId,
      issueDate: formData.issueDate,
      dueDate: formData.dueDate || undefined,
      currency: formData.currency,
      status: formData.status,
      taxInclusive: formData.taxInclusive,
      shippingAmount: formData.shippingAmount ? Number(formData.shippingAmount) : undefined,
      invoiceLevelDiscount:
        formData.invoiceDiscountPercent !== ''
          ? { type: 'percent', value: Number(formData.invoiceDiscountPercent) }
          : undefined,
      notes: formData.notes || undefined,
      items,
    };

    await dispatch(updateInvoice({ id, data: payload }));
  };

  const handleStatusChange = async (status: Invoice['status']) => {
    if (!id) return;
    await dispatch(updateInvoiceStatus({ id, status }));
  };

  const handleGeneratePdf = async () => {
    if (!id) return;
    await dispatch(generatePdf(id));
  };

  const handleRecordPayment = async () => {
    if (!id || paymentData.amount === '') return;
    await dispatch(
      recordPayment({
        id,
        data: {
          amount: Number(paymentData.amount),
          date: paymentData.date,
          method: paymentData.method,
          note: paymentData.note || undefined,
        },
      })
    );
  };

  return (
    <div>
      <PageHeader>
        <div>
          <PageTitle>
            Invoice
            <StatusPill>{formData.status}</StatusPill>
          </PageTitle>
        </div>
        <ButtonGroup>
          <SecondaryButton type="button" onClick={() => handleStatusChange('SENT')} disabled={loading}>
            Mark as sent
          </SecondaryButton>
          <SecondaryButton type="button" onClick={handleGeneratePdf} disabled={loading}>
            Generate PDF
          </SecondaryButton>
          {currentInvoice?.latestPdfUrl && (
            <SecondaryButton type="button" onClick={() => window.open(currentInvoice.latestPdfUrl!, '_blank')}>
              Open PDF
            </SecondaryButton>
          )}
        </ButtonGroup>
      </PageHeader>

      <FormWrapper>
        <form onSubmit={handleSave}>
          <FormSection>
            <SectionTitle>Basic Information</SectionTitle>
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
                <Label>Currency</Label>
                <CustomInput
                  value={formData.currency}
                  onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                  required
                />
              </FieldGroup>
              <FieldGroup>
                <Label>Issue date</Label>
                <CustomInput
                  type="date"
                  value={formData.issueDate}
                  onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                  required
                />
              </FieldGroup>
              <FieldGroup>
                <Label>Due date</Label>
                <CustomInput
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                />
              </FieldGroup>
            </Grid>
          </FormSection>

          <SectionDivider />

          <FormSection>
            <SectionTitle>Pricing & Discounts</SectionTitle>
            <Grid>
              <FieldGroup>
                <Label>Shipping amount</Label>
                <CustomInput
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.shippingAmount}
                  onChange={(e) => setFormData({ ...formData, shippingAmount: e.target.value })}
                />
              </FieldGroup>
              <FieldGroup>
                <Label>Invoice discount (%)</Label>
                <CustomInput
                  type="number"
                  min="0"
                  max="100"
                  value={formData.invoiceDiscountPercent}
                  onChange={(e) => setFormData({ ...formData, invoiceDiscountPercent: e.target.value })}
                />
              </FieldGroup>
              <FieldGroup>
                <Label>Tax inclusive</Label>
                <SelectWrapper>
                  <CustomSelect
                    value={formData.taxInclusive ? 'yes' : 'no'}
                    onChange={(e) => setFormData({ ...formData, taxInclusive: e.target.value === 'yes' })}
                  >
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </CustomSelect>
                  <SelectIcon>
                    <HiOutlineChevronDown />
                  </SelectIcon>
                </SelectWrapper>
              </FieldGroup>
              <FieldGroup>
                <Label>Status</Label>
                <SelectWrapper>
                  <CustomSelect
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as Invoice['status'] })}
                  >
                    <option value="DRAFT">Draft</option>
                    <option value="SENT">Sent</option>
                    <option value="PAID">Paid</option>
                    <option value="OVERDUE">Overdue</option>
                    <option value="CANCELLED">Cancelled</option>
                  </CustomSelect>
                  <SelectIcon>
                    <HiOutlineChevronDown />
                  </SelectIcon>
                </SelectWrapper>
              </FieldGroup>
            </Grid>
          </FormSection>

          <SectionDivider />

          <FormSection>
            <Label>Notes</Label>
            <CustomTextarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Additional notes or comments..."
            />
          </FormSection>

          <SectionDivider />

          <ItemsSection>
            <SectionTitle>Line Items</SectionTitle>
            <ItemsHeader>
              <div>Title</div>
              <div>Description</div>
              <div>Qty</div>
              <div>Unit</div>
              <div>Unit Price</div>
              <div>Discount %</div>
              <div>Tax %</div>
              <div></div>
            </ItemsHeader>
            {items.map((item, index) => (
              <ItemRow key={index}>
                <FieldGroup>
                  <ItemFieldLabel>Title</ItemFieldLabel>
                  <CustomInput
                    placeholder="Item title"
                    value={item.title}
                    onChange={(e) => handleItemChange(index, 'title', e.target.value)}
                    required
                  />
                </FieldGroup>
                <FieldGroup>
                  <ItemFieldLabel>Description</ItemFieldLabel>
                  <CustomInput
                    placeholder="Item description"
                    value={item.description || ''}
                    onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                  />
                </FieldGroup>
                <FieldGroup>
                  <ItemFieldLabel>Quantity</ItemFieldLabel>
                  <CustomInput
                    placeholder="1"
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                  />
                </FieldGroup>
                <FieldGroup>
                  <ItemFieldLabel>Unit</ItemFieldLabel>
                  <CustomInput
                    placeholder="pcs"
                    value={item.unit}
                    onChange={(e) => handleItemChange(index, 'unit', e.target.value)}
                  />
                </FieldGroup>
                <FieldGroup>
                  <ItemFieldLabel>Unit Price</ItemFieldLabel>
                  <CustomInput
                    placeholder="0.00"
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.unitPrice}
                    onChange={(e) => handleItemChange(index, 'unitPrice', e.target.value)}
                  />
                </FieldGroup>
                <FieldGroup>
                  <ItemFieldLabel>Discount %</ItemFieldLabel>
                  <CustomInput
                    placeholder="0"
                    type="number"
                    min="0"
                    max="100"
                    value={item.discount?.value || ''}
                    onChange={(e) => handleItemChange(index, 'discountPercent', e.target.value)}
                  />
                </FieldGroup>
                <FieldGroup>
                  <ItemFieldLabel>Tax %</ItemFieldLabel>
                  <CustomInput
                    placeholder="0"
                    type="number"
                    min="0"
                    max="100"
                    value={item.tax?.rate || ''}
                    onChange={(e) => handleItemChange(index, 'taxPercent', e.target.value)}
                  />
                </FieldGroup>
                <RemoveButton type="button" onClick={() => handleRemoveItem(index)}>
                  <HiOutlineX />
                  <span>Remove</span>
                </RemoveButton>
              </ItemRow>
            ))}
            <AddItemButton type="button" onClick={handleAddItem}>
              <HiOutlinePlus />
              <span>Add Item</span>
            </AddItemButton>
          </ItemsSection>

          <Totals>
            <TotalRow>
              <span>Subtotal</span>
              <span>{formatMoney(formData.currency, totals.subtotal)}</span>
            </TotalRow>
            {totals.discountTotal > 0 && (
              <TotalRow>
                <span>Discount</span>
                <span>-{formatMoney(formData.currency, totals.discountTotal)}</span>
              </TotalRow>
            )}
            {totals.taxTotal > 0 && (
              <TotalRow>
                <span>Tax</span>
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
              <span>Total</span>
              <span>{formatMoney(formData.currency, totals.grandTotal)}</span>
            </TotalFinal>
          </Totals>

          <SubmitButton type="submit" disabled={loading}>
            Save Invoice
          </SubmitButton>
        </form>
      </FormWrapper>

      <FormWrapper>
        <SectionTitle>Record Payment</SectionTitle>
        <Grid>
          <FieldGroup>
            <Label>Amount</Label>
            <CustomInput
              type="number"
              min="0"
              step="0.01"
              value={paymentData.amount}
              onChange={(e) => setPaymentData({ ...paymentData, amount: e.target.value })}
              placeholder="0.00"
            />
          </FieldGroup>
          <FieldGroup>
            <Label>Method</Label>
            <CustomInput
              value={paymentData.method}
              onChange={(e) => setPaymentData({ ...paymentData, method: e.target.value })}
              placeholder="Bank transfer"
            />
          </FieldGroup>
          <FieldGroup>
            <Label>Date</Label>
            <CustomInput
              type="date"
              value={paymentData.date}
              onChange={(e) => setPaymentData({ ...paymentData, date: e.target.value })}
            />
          </FieldGroup>
        </Grid>
        <Label style={{ marginTop: '24px' }}>Note</Label>
        <CustomTextarea
          value={paymentData.note}
          onChange={(e) => setPaymentData({ ...paymentData, note: e.target.value })}
          placeholder="Payment notes..."
        />
        <SubmitButton type="button" onClick={handleRecordPayment} disabled={loading}>
          Record Payment
        </SubmitButton>
      </FormWrapper>
    </div>
  );
}
