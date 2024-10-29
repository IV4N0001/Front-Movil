//useEntityAPI.tsx

import { useState } from 'react';

export function useEntityAPI<T>(apiUrls: { fetchAll: string; fetchById: (id: number) => string }, entityName: string) {
  const [entities, setEntities] = useState<T[]>([]);

  const fetchEntities = async () => {
    try {
      const response = await fetch(apiUrls.fetchAll); // Usa `apiUrls.fetchAll` en lugar de una sola cadena
      const data = await response.json();
      setEntities(data);
    } catch (error) {
      console.error(`Error fetching ${entityName.toLowerCase()}s:`, error);
    }
  };

  const fetchEntityById = async (id: string) => {
    try {
      const response = await fetch(apiUrls.fetchById(Number(id))); // Usa `apiUrls.fetchById`
      return await response.json();
    } catch (error) {
      console.error(`Error fetching ${entityName.toLowerCase()} by ID:`, error);
    }
  };

  return {
    entities,
    fetchEntities,
    fetchEntityById,
  };
}
