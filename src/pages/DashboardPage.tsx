import { useEffect } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchInvoices } from '../features/invoices/invoicesSlice';
import { Card, CardTitle } from '../components/Card';
import { formatMoney, formatDate } from '../utils/formatters';
import { useNavigate, Link } from 'react-router-dom';
import { HiOutlineCurrencyDollar, HiOutlineCheckCircle, HiOutlineExclamationCircle, HiOutlineDocumentText, HiOutlinePlus } from 'react-icons/hi';
import { AiOutlineFileText } from 'react-icons/ai';
import { Button } from '../components/Button';

const PageHeader = styled.div`
  margin-bottom: 32px;

  @media (max-width: 768px) {
    margin-bottom: 24px;
  }
`;

const PageTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 8px 0;
  letter-spacing: -0.5px;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const PageSubtitle = styled.p`
  font-size: 15px;
  color: var(--text-muted);
  margin: 0;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
    margin-bottom: 24px;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const MetricIcon = styled.div<{ $variant?: 'primary' | 'success' | 'warning' | 'danger' }>`
  width: 56px;
  height: 56px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  background: ${(props) => {
    const colors = {
      primary: 'linear-gradient(135deg, rgba(74, 222, 128, 0.2), rgba(34, 197, 94, 0.1))',
      success: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(5, 150, 105, 0.1))',
      warning: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(217, 119, 6, 0.1))',
      danger: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(220, 38, 38, 0.1))',
    };
    return colors[props.$variant || 'primary'];
  }};
  border: 1.5px solid ${(props) => {
    const colors = {
      primary: 'rgba(74, 222, 128, 0.3)',
      success: 'rgba(16, 185, 129, 0.3)',
      warning: 'rgba(245, 158, 11, 0.3)',
      danger: 'rgba(239, 68, 68, 0.3)',
    };
    return colors[props.$variant || 'primary'];
  }};
  color: ${(props) => {
    const colors = {
      primary: '#4ade80',
      success: '#10b981',
      warning: '#f59e0b',
      danger: '#ef4444',
    };
    return colors[props.$variant || 'primary'];
  }};
  font-size: 28px;
  transition: all 0.3s ease;

  svg {
    width: 28px;
    height: 28px;
  }
`;

const MetricCard = styled.div<{ $variant?: 'primary' | 'success' | 'warning' | 'danger' }>`
  background: var(--panel-bg);
  border-radius: 16px;
  padding: 24px;
  border: 2px solid ${(props) => {
    const colors = {
      primary: 'rgba(74, 222, 128, 0.2)',
      success: 'rgba(16, 185, 129, 0.2)',
      warning: 'rgba(245, 158, 11, 0.2)',
      danger: 'rgba(239, 68, 68, 0.2)',
    };
    return colors[props.$variant || 'primary'];
  }};
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 20px;
    border-radius: 12px;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${(props) => {
      const colors = {
        primary: 'linear-gradient(90deg, #4ade80, #22c55e, #4ade80)',
        success: 'linear-gradient(90deg, #10b981, #059669, #10b981)',
        warning: 'linear-gradient(90deg, #f59e0b, #d97706, #f59e0b)',
        danger: 'linear-gradient(90deg, #ef4444, #dc2626, #ef4444)',
      };
      return colors[props.$variant || 'primary'];
    }};
    background-size: 200% 100%;
    animation: shimmer 3s ease-in-out infinite;
  }

  @keyframes shimmer {
    0%, 100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }

  &::after {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: 16px;
    padding: 2px;
    background: ${(props) => {
      const colors = {
        primary: 'linear-gradient(135deg, rgba(74, 222, 128, 0.3), rgba(34, 197, 94, 0.1))',
        success: 'linear-gradient(135deg, rgba(16, 185, 129, 0.3), rgba(5, 150, 105, 0.1))',
        warning: 'linear-gradient(135deg, rgba(245, 158, 11, 0.3), rgba(217, 119, 6, 0.1))',
        danger: 'linear-gradient(135deg, rgba(239, 68, 68, 0.3), rgba(220, 38, 38, 0.1))',
      };
      return colors[props.$variant || 'primary'];
    }};
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.3);
    border-color: ${(props) => {
      const colors = {
        primary: 'rgba(74, 222, 128, 0.5)',
        success: 'rgba(16, 185, 129, 0.5)',
        warning: 'rgba(245, 158, 11, 0.5)',
        danger: 'rgba(239, 68, 68, 0.5)',
      };
      return colors[props.$variant || 'primary'];
    }};

    &::after {
      opacity: 1;
    }

    ${MetricIcon} {
      transform: scale(1.1) rotate(5deg);
      border-color: ${(props) => {
        const colors = {
          primary: 'rgba(74, 222, 128, 0.6)',
          success: 'rgba(16, 185, 129, 0.6)',
          warning: 'rgba(245, 158, 11, 0.6)',
          danger: 'rgba(239, 68, 68, 0.6)',
        };
        return colors[props.$variant || 'primary'];
      }};
    }
  }
`;

const MetricLabel = styled.div`
  color: var(--text-muted);
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const MetricValue = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.2;
  margin-bottom: 8px;
  letter-spacing: -0.5px;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const MetricFooter = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--text-faint);
  margin-top: 12px;
`;

const TableCard = styled(Card)`
  padding: 0;
  overflow: hidden;
  border: 2px solid rgba(34, 197, 94, 0.3);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
  background: linear-gradient(135deg, var(--panel-bg) 0%, rgba(34, 197, 94, 0.05) 100%);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: 0 4px 20px rgba(34, 197, 94, 0.15);
    border-color: rgba(34, 197, 94, 0.4);
  }
`;

const TableHeader = styled.div`
  padding: 24px;
  border-bottom: 2px solid rgba(34, 197, 94, 0.2);
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(34, 197, 94, 0.05));
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;

  @media (max-width: 768px) {
    padding: 16px;
    flex-direction: column;
    align-items: flex-start;
  }
`;

const TableTitle = styled(CardTitle)`
  margin: 0;
  font-size: 20px;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const EmptyState = styled.div`
  padding: 60px 24px;
  text-align: center;
  color: var(--text-muted);
`;

const EmptyIcon = styled.div`
  font-size: 64px;
  margin-bottom: 16px;
  opacity: 0.4;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  margin: 0 auto 24px;
  border-radius: 50%;
  background: rgba(74, 222, 128, 0.08);
  border: 2px dashed rgba(74, 222, 128, 0.3);

  svg {
    width: 48px;
    height: 48px;
    color: var(--text-muted);
  }
`;

const EmptyText = styled.div`
  font-size: 16px;
  margin-bottom: 8px;
  color: var(--text-primary);
  font-weight: 500;
`;

const EmptySubtext = styled.div`
  font-size: 14px;
  color: var(--text-muted);
`;

const NewInvoiceButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 500;
`;

const EmptyLink = styled(Link)`
  display: inline-block;
  margin-top: 16px;
  padding: 12px 24px;
  background: var(--evernote-green);
  color: #fff;
  text-decoration: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background: var(--evernote-green-dark);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  display: table;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const TableHead = styled.thead`
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(34, 197, 94, 0.08));
  border-bottom: 2px solid rgba(34, 197, 94, 0.2);
  display: table-header-group;
  width: 100%;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Th = styled.th`
  padding: 16px 24px;
  text-align: left;
  font-size: 12px;
  color: var(--text-muted);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  @media (max-width: 768px) {
    padding: 12px 16px;
    font-size: 11px;
  }
`;

const Tbody = styled.tbody``;

const Tr = styled.tr`
  transition: all 0.2s ease;
  border-bottom: 1px solid rgba(58, 58, 58, 0.5);
  cursor: pointer;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background: linear-gradient(180deg, rgba(74, 222, 128, 0), rgba(74, 222, 128, 0.6));
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  &:hover {
    background: rgba(74, 222, 128, 0.04);
    
    &::before {
      opacity: 1;
    }
  }

  &:last-child {
    border-bottom: none;
  }
`;

const Td = styled.td`
  padding: 18px 24px;
  font-size: 14px;
  color: var(--text-primary);

  @media (max-width: 768px) {
    padding: 12px 16px;
    font-size: 13px;
    display: block;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    
    &:before {
      content: attr(data-label);
      font-weight: 600;
      text-transform: uppercase;
      font-size: 11px;
      color: var(--text-muted);
      display: block;
      margin-bottom: 4px;
    }

    &:last-child {
      border-bottom: none;
    }
  }
`;

const InvoiceNumber = styled.div`
  font-weight: 600;
  color: var(--text-primary);
`;

const ClientName = styled.div`
  color: var(--text-primary);
`;

const DateCell = styled.div`
  color: var(--text-muted);
  font-size: 13px;
`;

const AmountCell = styled.div`
  font-weight: 600;
  color: var(--text-primary);
  font-size: 15px;
`;

const StatusPill = styled.span<{ $status: string }>`
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  text-transform: capitalize;
  background: ${(props) => {
    const colors: Record<string, string> = {
      DRAFT: 'rgba(149, 165, 166, 0.2)',
      SENT: 'rgba(52, 152, 219, 0.2)',
      PAID: 'rgba(46, 204, 113, 0.2)',
      OVERDUE: 'rgba(231, 76, 60, 0.2)',
      CANCELLED: 'rgba(127, 140, 141, 0.2)',
    };
    return colors[props.$status] || 'rgba(149, 165, 166, 0.2)';
  }};
  color: ${(props) => {
    const colors: Record<string, string> = {
      DRAFT: '#95a5a6',
      SENT: '#3498db',
      PAID: '#2ecc71',
      OVERDUE: '#e74c3c',
      CANCELLED: '#7f8c8d',
    };
    return colors[props.$status] || '#95a5a6';
  }};
  border: 1px solid ${(props) => {
    const colors: Record<string, string> = {
      DRAFT: 'rgba(149, 165, 166, 0.3)',
      SENT: 'rgba(52, 152, 219, 0.3)',
      PAID: 'rgba(46, 204, 113, 0.3)',
      OVERDUE: 'rgba(231, 76, 60, 0.3)',
      CANCELLED: 'rgba(127, 140, 141, 0.3)',
    };
    return colors[props.$status] || 'rgba(149, 165, 166, 0.3)';
  }};
`;

const getMetricIcon = (type: string) => {
  const icons = {
    outstanding: <HiOutlineCurrencyDollar />,
    paid: <HiOutlineCheckCircle />,
    overdue: <HiOutlineExclamationCircle />,
    draft: <HiOutlineDocumentText />,
  };
  return icons[type as keyof typeof icons] || <HiOutlineCurrencyDollar />;
};

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { invoices, summary } = useAppSelector((state) => state.invoices);

  useEffect(() => {
    dispatch(fetchInvoices());
  }, [dispatch]);

  const handleInvoiceClick = (id: string) => {
    navigate(`/invoices/${id}`);
  };

  return (
    <div>
      <PageHeader>
        <PageTitle>Dashboard</PageTitle>
        <PageSubtitle>Overview of your invoicing activity</PageSubtitle>
      </PageHeader>

      <MetricsGrid>
        <MetricCard $variant="primary">
          <MetricIcon $variant="primary">{getMetricIcon('outstanding')}</MetricIcon>
          <MetricLabel>Total Outstanding</MetricLabel>
          <MetricValue>{formatMoney('USD', summary.totalOutstanding)}</MetricValue>
          <MetricFooter>Awaiting payment</MetricFooter>
        </MetricCard>

        <MetricCard $variant="success">
          <MetricIcon $variant="success">{getMetricIcon('paid')}</MetricIcon>
          <MetricLabel>Paid Last 30 Days</MetricLabel>
          <MetricValue>{formatMoney('USD', summary.paidLast30Days)}</MetricValue>
          <MetricFooter>Last month revenue</MetricFooter>
        </MetricCard>

        <MetricCard $variant="warning">
          <MetricIcon $variant="warning">{getMetricIcon('overdue')}</MetricIcon>
          <MetricLabel>Overdue Invoices</MetricLabel>
          <MetricValue>{summary.overdueCount}</MetricValue>
          <MetricFooter>Require attention</MetricFooter>
        </MetricCard>

        <MetricCard $variant="danger">
          <MetricIcon $variant="danger">{getMetricIcon('draft')}</MetricIcon>
          <MetricLabel>Draft Invoices</MetricLabel>
          <MetricValue>{summary.draftCount}</MetricValue>
          <MetricFooter>In progress</MetricFooter>
        </MetricCard>
      </MetricsGrid>

      <TableCard>
        <TableHeader>
          <TableTitle>Recent Invoices</TableTitle>
          <NewInvoiceButton $variant="primary" onClick={() => navigate('/invoices/new')}>
            <HiOutlinePlus />
            <span>New Invoice</span>
          </NewInvoiceButton>
        </TableHeader>
        {invoices.length === 0 ? (
          <EmptyState>
            <EmptyIcon>
              <AiOutlineFileText />
            </EmptyIcon>
            <EmptyText>No invoices yet</EmptyText>
            <EmptySubtext>Create your first invoice to get started</EmptySubtext>
            <EmptyLink to="/invoices/new">
              <HiOutlinePlus style={{ display: 'inline', marginRight: '8px', verticalAlign: 'middle' }} />
              Create New Invoice
            </EmptyLink>
          </EmptyState>
        ) : (
          <div style={{ width: '100%', overflowX: 'auto' }}>
            <Table>
              <TableHead>
                <tr>
                  <Th>Invoice</Th>
                  <Th>Client</Th>
                  <Th>Date</Th>
                  <Th>Total</Th>
                  <Th>Status</Th>
                  <Th></Th>
                </tr>
              </TableHead>
            <Tbody>
              {invoices.slice(0, 6).map((invoice) => (
                <Tr key={invoice.id} onClick={() => handleInvoiceClick(invoice.id)}>
                  <Td data-label="Invoice">
                    <InvoiceNumber>{invoice.invoiceNumber}</InvoiceNumber>
                  </Td>
                  <Td data-label="Client">
                    <ClientName>{invoice.client?.name || '—'}</ClientName>
                  </Td>
                  <Td data-label="Date">
                    <DateCell>{formatDate(invoice.issueDate)}</DateCell>
                  </Td>
                  <Td data-label="Total">
                    <AmountCell>
                      {formatMoney(invoice.currency, invoice.totals?.grandTotal || 0)}
                    </AmountCell>
                  </Td>
                  <Td data-label="Status">
                    <StatusPill $status={invoice.status}>{invoice.status}</StatusPill>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          </div>
        )}
      </TableCard>
    </div>
  );
}
