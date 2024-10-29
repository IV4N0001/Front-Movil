import { useState } from 'react';

export function useEntityCreate<T>(
  apiUrls: { create: string },
  entityName: string,
  fetchEntities: () => Promise<void> // Callback para refrescar la tabla
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
    if (!newEntity || Object.keys(newEntity).length === 0) {
      console.warn("No hay entidad para crear.");
      return;
    }

    setCreating(true);
    setError(null);

    try {
      const response = await fetch(apiUrls.create, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEntity),
      });

      if (!response.ok) {
        throw new Error(`Error creando ${entityName}: ${response.statusText}`);
      }

      // Llama a fetchEntities para refrescar la tabla y espera a que termine antes de cambiar `creating`
      await fetchEntities();
      console.log(`${entityName} creada y fetchEntities ejecutado correctamente.`);
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
    fetchEntities
  };
}
