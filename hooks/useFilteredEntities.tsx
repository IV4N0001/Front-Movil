import { EntityBase } from '@/interfaces/entityBase';
import { useState, useEffect } from 'react';

export function useFilteredEntities<T extends EntityBase>(entities: T[], searchId: string) {
const [filteredEntities, setFilteredEntities] = useState<T[]>([]);

useEffect(() => {
    if (searchId) {
    const foundEntity = entities.filter((entity) => entity.id === parseInt(searchId));
    setFilteredEntities(foundEntity);
    } else {
    setFilteredEntities(entities);
    }
}, [searchId, entities]);

return { filteredEntities };
}

