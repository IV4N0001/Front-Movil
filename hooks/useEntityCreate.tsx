//useEntityCreate.tsx

import { useState } from 'react';

export function useEntityCreate<T>(
  apiUrls: {
    create: string; // URL para crear la entidad
    fetchAll: string
  },
  entityName: string,
) {
  const [newEntity, setNewEntity] = useState<Partial<T>>({});
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFieldChange = (field: keyof T, value: any) => {
    setNewEntity((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCreate = async () => {
    if (!newEntity) return;

    setCreating(true);
    setError(null);

    try {
      const response = await fetch(apiUrls.create, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEntity),
      });

      if (!response.ok) {
        throw new Error(`Error creating ${entityName}: ${response.statusText}`);
      }

      // Si la creación fue exitosa, intenta hacer el fetch de las entidades actualizadas
      console.log(`${entityName} creada exitosamente`);
      setNewEntity({}); // Resetea el estado de nueva entidad
      await fetch(apiUrls.fetchAll)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      console.error(`Error creando ${entityName.toLowerCase()}:`, err);
    } finally {
      setCreating(false);
    }
  };

  return {
    newEntity,
    creating,
    error,
    handleFieldChange,
    handleCreate,
  };
}
