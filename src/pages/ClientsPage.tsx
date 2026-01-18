import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import styled from 'styled-components';
import {
  fetchClients,
  createClient,
  updateClient,
  deleteClient,
} from '../features/clients/clientsSlice';
import { Button } from '../components/Button';
import { Client } from '../features/clients/clientsSlice';
import { HiOutlineX, HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi';

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
  margin: 0;
  letter-spacing: -0.5px;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const AddButton = styled(Button)`
  padding: 14px 24px;
  font-size: 15px;
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

const TableCard = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 0;
  border: 1px solid rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const TableHeader = styled.thead`
  background: rgba(70, 200, 97, 0.08);
  border-bottom: 1px solid rgba(70, 200, 97, 0.2);

  @media (max-width: 768px) {
    display: none;
  }
`;

const TableRow = styled.tr`
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  transition: background 0.2s ease;

  @media (max-width: 768px) {
    display: block;
    margin-bottom: 16px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    padding: 16px;
    background: #ffffff;
  }

  &:hover {
    background: rgba(70, 200, 97, 0.04);

    @media (max-width: 768px) {
      background: rgba(70, 200, 97, 0.02);
    }
  }

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
  }
`;

const TableCell = styled.td`
  padding: 16px 20px;
  font-size: 15px;
  font-weight: 300;
  color: #1f1f1f;

  @media (max-width: 768px) {
    padding: 8px 0;
    display: block;
    border-bottom: none;
    font-size: 14px;

    &:before {
      content: attr(data-label);
      font-weight: 600;
      text-transform: uppercase;
      font-size: 11px;
      color: #4b5563;
      display: block;
      margin-bottom: 4px;
      letter-spacing: 0.5px;
    }

    &:last-child {
      padding-bottom: 0;
    }
  }
`;

const TableHeaderCell = styled.th`
  padding: 18px 20px;
  text-align: left;
  font-size: 12px;
  font-weight: 400;
  color: #4b5563;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-start;
  }
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 300;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid transparent;

  svg {
    width: 16px;
    height: 16px;
  }
`;

const EditButton = styled(ActionButton)`
  background: rgba(70, 200, 97, 0.1);
  color: #46c861;
  border-color: rgba(70, 200, 97, 0.2);

  &:hover {
    background: rgba(70, 200, 97, 0.15);
    border-color: rgba(70, 200, 97, 0.3);
  }
`;

const DeleteButton = styled(ActionButton)`
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  border-color: rgba(239, 68, 68, 0.2);

  &:hover {
    background: rgba(239, 68, 68, 0.15);
    border-color: rgba(239, 68, 68, 0.3);
  }
`;

const EmptyState = styled.div`
  padding: 60px 24px;
  text-align: center;
  color: #6b7280;
`;

const EmptyText = styled.div`
  font-size: 16px;
  margin-bottom: 8px;
  color: #1f1f1f;
  font-weight: 400;
`;

const EmptySubtext = styled.div`
  font-size: 14px;
  color: #9ca3af;
`;

const Modal = styled.div<{ $show: boolean }>`
  display: ${(props) => (props.$show ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  overflow-y: auto;
  align-items: flex-start;
  justify-content: center;
  padding: 40px 20px;

  @media (max-width: 768px) {
    padding: 20px 16px;
    align-items: center;
  }
`;

const ModalContent = styled.div`
  background: #ffffff;
  margin: 0 auto;
  padding: 32px;
  border-radius: 16px;
  max-width: 720px;
  width: 100%;
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    padding: 24px 20px;
    border-radius: 12px;
    max-width: 100%;
    margin: 0;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(70, 200, 97, 0.2);
`;

const ModalTitle = styled.h2`
  font-size: 24px;
  font-weight: 400;
  color: #1f1f1f;
  margin: 0;
`;

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  color: #1f1f1f;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
    border-color: rgba(0, 0, 0, 0.2);
  }

  svg {
    width: 20px;
    height: 20px;
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
  margin-bottom: 24px;
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

const CustomTextarea = styled.textarea`
  width: 100%;
  padding: 14px 18px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  font-size: 15px;
  font-weight: 300;
  color: #1f1f1f;
  background: #ffffff;
  min-height: 100px;
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

const ModalButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 32px;
`;

const SubmitButton = styled(Button)`
  padding: 14px 28px;
  font-size: 15px;
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

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const CancelButton = styled(Button)`
  padding: 14px 28px;
  font-size: 15px;
  font-weight: 400;
  background: #ffffff !important;
  color: #1f1f1f !important;
  border: 1px solid rgba(0, 0, 0, 0.2) !important;

  &:hover {
    background: #f5f5f5 !important;
    border-color: rgba(0, 0, 0, 0.3) !important;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export default function ClientsPage() {
  const dispatch = useAppDispatch();
  const { clients, loading, error } = useAppSelector((state) => state.clients);
  const [showModal, setShowModal] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    billingLine1: '',
    billingCity: '',
    billingCountry: '',
    taxIdValue: '',
    notes: '',
  });

  useEffect(() => {
    dispatch(fetchClients());
  }, [dispatch]);

  const handleOpenModal = (client?: Client) => {
    if (client) {
      setEditingClient(client);
      setFormData({
        name: client.name || '',
        email: client.email || '',
        billingLine1: client.billingAddress?.line1 || '',
        billingCity: client.billingAddress?.city || '',
        billingCountry: client.billingAddress?.country || '',
        taxIdValue: client.taxId?.value || '',
        notes: client.notes || '',
      });
    } else {
      setEditingClient(null);
      setFormData({
        name: '',
        email: '',
        billingLine1: '',
        billingCity: '',
        billingCountry: '',
        taxIdValue: '',
        notes: '',
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingClient(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Basic validation
    if (!formData.name.trim()) {
      setFormError('Client name is required');
      return;
    }

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim() || undefined,
      billingAddress: {
        line1: formData.billingLine1.trim() || '',
        city: formData.billingCity.trim() || '',
        country: formData.billingCountry.trim() || '',
      },
      taxId: formData.taxIdValue.trim() ? { type: 'Other' as const, value: formData.taxIdValue.trim() } : undefined,
      notes: formData.notes.trim() || undefined,
    };

    try {
      if (editingClient) {
        await dispatch(updateClient({ id: editingClient.id, data: payload })).unwrap();
      } else {
        await dispatch(createClient(payload)).unwrap();
      }
      handleCloseModal();
      dispatch(fetchClients());
    } catch (err: any) {
      setFormError(err.message || 'Failed to save client. Please try again.');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      try {
        await dispatch(deleteClient(id)).unwrap();
        dispatch(fetchClients());
      } catch (err: any) {
        alert(err.message || 'Failed to delete client. Please try again.');
      }
    }
  };

  return (
    <div>
      <PageHeader>
        <PageTitle>Clients</PageTitle>
        <AddButton $variant="primary" onClick={() => handleOpenModal()}>
          Add Client
        </AddButton>
      </PageHeader>

      <TableCard>
        {loading ? (
          <div style={{ padding: '60px 24px', textAlign: 'center', color: '#6b7280' }}>
            Loading...
          </div>
        ) : clients.length === 0 ? (
          <EmptyState>
            <EmptyText>No clients found</EmptyText>
            <EmptySubtext>Create your first client to get started</EmptySubtext>
          </EmptyState>
        ) : (
          <Table>
            <TableHeader>
              <tr>
                <TableHeaderCell>Name</TableHeaderCell>
                <TableHeaderCell>Email</TableHeaderCell>
                <TableHeaderCell>Address</TableHeaderCell>
                <TableHeaderCell>Tax ID</TableHeaderCell>
                <TableHeaderCell>Actions</TableHeaderCell>
              </tr>
            </TableHeader>
            <tbody>
              {clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell data-label="Name">{client.name}</TableCell>
                  <TableCell data-label="Email">{client.email || '-'}</TableCell>
                  <TableCell data-label="Address">
                    {client.billingAddress?.line1 || '-'}
                    {client.billingAddress?.city ? `, ${client.billingAddress.city}` : ''}
                  </TableCell>
                  <TableCell data-label="Tax ID">{client.taxId?.value || '-'}</TableCell>
                  <TableCell data-label="Actions">
                    <ButtonGroup>
                      <EditButton onClick={() => handleOpenModal(client)}>
                        <HiOutlinePencil />
                        <span>Edit</span>
                      </EditButton>
                      <DeleteButton onClick={() => handleDelete(client.id)}>
                        <HiOutlineTrash />
                        <span>Delete</span>
                      </DeleteButton>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        )}
      </TableCard>

      <Modal $show={showModal} onClick={(e) => e.target === e.currentTarget && handleCloseModal()}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <ModalHeader>
            <ModalTitle>{editingClient ? 'Edit Client' : 'New Client'}</ModalTitle>
            <CloseButton onClick={handleCloseModal}>
              <HiOutlineX />
            </CloseButton>
          </ModalHeader>
          <Form onSubmit={handleSubmit}>
            {formError && (
              <div style={{
                padding: '12px 16px',
                marginBottom: '24px',
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                borderRadius: '10px',
                color: '#ef4444',
                fontSize: '14px',
              }}>
                {formError}
              </div>
            )}
            {error && !formError && (
              <div style={{
                padding: '12px 16px',
                marginBottom: '24px',
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                borderRadius: '10px',
                color: '#ef4444',
                fontSize: '14px',
              }}>
                {error}
              </div>
            )}
            <FieldGroup>
              <Label>Name *</Label>
              <CustomInput
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  setFormError(null);
                }}
                placeholder="Client name"
                required
              />
            </FieldGroup>

            <FieldGroup>
              <Label>Email</Label>
              <CustomInput
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="client@example.com"
              />
            </FieldGroup>

            <FieldGroup>
              <Label>Billing Address *</Label>
              <CustomTextarea
                value={formData.billingLine1}
                onChange={(e) => setFormData({ ...formData, billingLine1: e.target.value })}
                placeholder="Street address"
                required
              />
            </FieldGroup>

            <Grid>
              <FieldGroup style={{ marginBottom: 0 }}>
                <Label>City *</Label>
                <CustomInput
                  value={formData.billingCity}
                  onChange={(e) => setFormData({ ...formData, billingCity: e.target.value })}
                  placeholder="City"
                  required
                />
              </FieldGroup>
              <FieldGroup style={{ marginBottom: 0 }}>
                <Label>Country *</Label>
                <CustomInput
                  value={formData.billingCountry}
                  onChange={(e) => setFormData({ ...formData, billingCountry: e.target.value })}
                  placeholder="Country"
                  required
                />
              </FieldGroup>
            </Grid>

            <FieldGroup>
              <Label>Tax ID</Label>
              <CustomInput
                value={formData.taxIdValue}
                onChange={(e) => setFormData({ ...formData, taxIdValue: e.target.value })}
                placeholder="Tax identification number"
              />
            </FieldGroup>

            <FieldGroup>
              <Label>Notes</Label>
              <CustomTextarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Additional notes about the client"
              />
            </FieldGroup>

            <ModalButtonGroup>
              <SubmitButton type="submit" $variant="primary" disabled={loading}>
                {editingClient ? 'Update Client' : 'Create Client'}
              </SubmitButton>
              <CancelButton type="button" $variant="secondary" onClick={handleCloseModal}>
                Cancel
              </CancelButton>
            </ModalButtonGroup>
          </Form>
        </ModalContent>
      </Modal>
    </div>
  );
}
