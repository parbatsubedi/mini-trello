

import { Building2, Edit2, Search, Trash2, UserPlus, X, Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";
import { useClient, useCreateClientMutation, useUpdateClientMutation, useDeleteClientMutation } from "../../../hooks/useClient"
import { AlertOverlay } from "../../../components/alert/Alert";
import Modal from "../../../components/ui/Modal";
import { useFormState } from "../../../hooks/form/useFormState";
import type { Client, ClientPayload } from "../../../types/types";

type ClientFormData = ClientPayload & {
  id: number;
}

const makeEmpty = (): ClientFormData => ({
  id: 0,
  name: '',
  email: '',
  phone: '',
  company_name: '',
  address: '',
})

const inputCls = `
  w-full px-3 py-2 rounded-md text-sm
  bg-[var(--input-bg)]
  border border-transparent
  text-[var(--text)] placeholder:text-[var(--text-secondary)]
  focus:outline-none focus:ring-1 focus:ring-[var(--primary)] focus:border-[var(--primary)]
  transition-all duration-150
`

export default function ClientsPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedClient, setSelectedClient] = useState<Client | null>(null)
    const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null)

    const createMutation = useCreateClientMutation()
    const updateMutation = useUpdateClientMutation()
    const deleteMutation = useDeleteClientMutation()

    const { formData, set, setFormData, reset } = useFormState(makeEmpty())

    const { data: clients = [], isLoading, isError, error } = useClient()

    console.log('Clients data:', clients)

    // Filter clients based on search
    const filteredClients = clients.filter(client => {
        const search = searchQuery.toLowerCase()
        return (
            client.name.toLowerCase().includes(search) ||
            client.email.toLowerCase().includes(search) ||
            client.company_name?.toLowerCase().includes(search) ||
            client.phone?.toLowerCase().includes(search)
        )
    })

    const handleOpenCreate = () => {
        setSelectedClient(null)
        reset()
        setIsModalOpen(true)
    }

    const handleOpenEdit = (client: Client) => {
        setSelectedClient(client)
        setFormData({
            id: client.id,
            name: client.name,
            email: client.email,
            phone: client.phone || '',
            company_name: client.company_name || '',
            address: client.address || '',
        })
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setSelectedClient(null)
        reset()
    }

    const handleSubmit = async (keepOpen = false) => {
        try {
            const payload: ClientPayload = {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                company_name: formData.company_name,
                address: formData.address,
            }

            if (selectedClient) {
                await updateMutation.mutateAsync({
                    id: selectedClient.id,
                    payload,
                })
            } else {
                await createMutation.mutateAsync(payload)
            }

            if (!keepOpen) {
                handleCloseModal()
            } else {
                reset()
            }
        } catch (err: any) {
            console.error('Error saving client:', err)
        }
    }

    const handleDelete = async (id: number) => {
        try {
            await deleteMutation.mutateAsync(id)
            setDeleteConfirm(null)
        } catch (err: any) {
            console.error('Error deleting client:', err)
        }
    }

    if (isLoading) {
        return <AlertOverlay type="loading" message="Loading clients..." />
    }

    if (isError) {
        return (
            <AlertOverlay
                type="error"
                message={error instanceof Error ? error.message : 'Something went wrong while fetching clients'}
            />
        )
    }

    return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text)]">Clients</h1>
          <p className="text-[var(--text-secondary)]">Manage your client contacts and their information</p>
        </div>
        <button 
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[var(--primary)] text-white font-medium rounded-lg hover:opacity-90 transition-all"
        >
          <UserPlus className="w-5 h-5" />
          Add Client
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex items-center gap-2 px-3 py-2 bg-[var(--card)] border border-[var(--border)] rounded-lg flex-1 max-w-md">
          <Search className="w-5 h-5 text-[var(--text-muted)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search clients..."
            className="bg-transparent border-none outline-none text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] flex-1"
          />
        </div>
      </div>

      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th className="text-left px-5 py-3 text-sm font-medium text-[var(--text-secondary)]">Name</th>
                <th className="text-left px-5 py-3 text-sm font-medium text-[var(--text-secondary)]">Contact</th>
                <th className="text-left px-5 py-3 text-sm font-medium text-[var(--text-secondary)]">Company</th>
                <th className="text-left px-5 py-3 text-sm font-medium text-[var(--text-secondary)]">Address</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>

            <tbody>
                {filteredClients.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-5 py-8 text-center text-[var(--text-secondary)]">
                      {searchQuery 
                        ? 'No clients match your search'
                        : 'No clients found. Add one to get started.'}
                    </td>
                  </tr>
                ) : (
                  filteredClients.map((client) => (
                    <tr key={client.id} className="border-b border-[var(--border)]">
                      <td className="px-5 py-4">
                        <div className="font-medium text-[var(--text)]">{client.name}</div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                            <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                            <span>{client.email}</span>
                          </div>
                          {client.phone && (
                            <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                              <Phone className="w-3.5 h-3.5 flex-shrink-0" />
                              <span>{client.phone}</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                          <Building2 className="w-4 h-4 flex-shrink-0" />
                          <span>{client.company_name || '-'}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-start gap-2 text-sm text-[var(--text-secondary)] max-w-xs">
                          <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                          <span className="line-clamp-2">{client.address || '-'}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1">
                          <button 
                            onClick={() => handleOpenEdit(client)}
                            className="p-1.5 rounded-lg hover:bg-[var(--border)] transition-colors"
                          >
                            <Edit2 className="w-4 h-4 text-[var(--text-secondary)]" />
                          </button>
                          <button 
                            onClick={() => setDeleteConfirm(client.id)}
                            className="p-1.5 rounded-lg hover:bg-[var(--border)] transition-colors"
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={selectedClient ? 'Edit Client' : 'Create Client'}
        size="md"
      >
        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-[var(--text)] mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => set('name', e.target.value)}
              placeholder="Client name"
              className={inputCls}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-[var(--text)] mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => set('email', e.target.value)}
              placeholder="client@example.com"
              className={inputCls}
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-[var(--text)] mb-1">Phone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => set('phone', e.target.value)}
              placeholder="+1 (555) 123-4567"
              className={inputCls}
            />
          </div>

          {/* Company */}
          <div>
            <label className="block text-sm font-medium text-[var(--text)] mb-1">Company</label>
            <input
              type="text"
              value={formData.company_name}
              onChange={(e) => set('company_name', e.target.value)}
              placeholder="Company name"
              className={inputCls}
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-[var(--text)] mb-1">Address</label>
            <textarea
              value={formData.address}
              onChange={(e) => set('address', e.target.value)}
              placeholder="Full address"
              rows={3}
              className={`${inputCls} resize-none`}
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 pt-4 border-t border-[var(--border)]">
            <button
              type="button"
              onClick={handleCloseModal}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium
                text-[var(--text-secondary)] hover:text-[var(--text)]
                border border-[var(--border)]
                bg-transparent hover:bg-[var(--card)]
                transition-all duration-150"
            >
              <X size={14} />
              Close
            </button>

            {!selectedClient && (
              <button
                type="button"
                onClick={() => handleSubmit(true)}
                disabled={createMutation.isPending || updateMutation.isPending}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium
                  text-[var(--primary)] border border-[var(--primary)]
                  bg-transparent hover:bg-[var(--primary)] hover:text-white
                  disabled:opacity-50 disabled:cursor-not-allowed
                  transition-all duration-150"
              >
                Save & continue
              </button>
            )}

            <button
              type="button"
              onClick={() => handleSubmit(false)}
              disabled={createMutation.isPending || updateMutation.isPending}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium
                text-white bg-[var(--primary)] hover:opacity-90
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-all duration-150"
            >
              {selectedClient ? 'Update' : 'Create'}
            </button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteConfirm !== null}
        onClose={() => setDeleteConfirm(null)}
        title="Delete Client"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-[var(--text-secondary)]">
            Are you sure you want to delete this client? This action cannot be undone.
          </p>
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={() => setDeleteConfirm(null)}
              className="px-4 py-2 rounded-md text-sm font-medium
                text-[var(--text-secondary)] hover:text-[var(--text)]
                border border-[var(--border)]
                bg-transparent hover:bg-[var(--card)]
                transition-all duration-150"
            >
              Cancel
            </button>
            <button
              onClick={() => deleteConfirm && handleDelete(deleteConfirm)}
              disabled={deleteMutation.isPending}
              className="px-4 py-2 rounded-md text-sm font-medium
                text-white bg-red-500 hover:bg-red-600
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-all duration-150"
            >
              {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      </Modal>

      {/* Loading Overlay */}
      {(createMutation.isPending || updateMutation.isPending || deleteMutation.isPending) && (
        <AlertOverlay type="loading" message="Saving client..." />
      )}
    </div>
    )
}