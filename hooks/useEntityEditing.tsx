import { useState } from 'react';

export function useEntityEditing<T>(
  apiUrls: {
    update: (id: number) => string;
    delete: (id: number) => string;
  },
  entityName: string,
  fetchEntities: () => Promise<void>
) {
  const [editingEntity, setEditingEntity] = useState<number | null>(null);
  const [editedFields, setEditedFields] = useState<{ [key: string]: any }>({});

  const startEditing = (id: number) => setEditingEntity(id);
  const stopEditing = () => setEditingEntity(null);

  const handleFieldChange = (field: string, value: any) => {
    setEditedFields((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (id: number) => {
    const updatedEntity = { ...editedFields };
    try {
      await fetch(apiUrls.update(id), { // Usa `apiUrls.update`
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedEntity),
      });
      stopEditing();
      await fetchEntities();
    } catch (error) {
      console.error(`Error updating ${entityName.toLowerCase()}:`, error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(apiUrls.delete(id), { // Usa `apiUrls.delete`
        method: 'DELETE',
      });
      await fetchEntities();
    } catch (error) {
      console.error(`Error deleting ${entityName.toLowerCase()}:`, error);
    }
  };

  return {
    editingEntity,
    editedFields,
    startEditing,
    stopEditing,
    handleFieldChange,
    handleSave,
    handleDelete,
  };
}
