import { API_URL } from '@/constants/config';
import EditableTable from '../../components/editableTable';

const columns = [
  { key: 'id', title: 'ID' },
  { key: 'nombre', title: 'Nombre' },
];

const apiUrls = {
  fetchAll: `${API_URL}/marcas/getMarcas`,
  fetchById: (id: number) => `${API_URL}/Marcas/getMarcasByID/${id}`,
  create: `${API_URL}/marcas/registrarMarca`,
  update: (id: number) => `${API_URL}/marcas/actualizarMarca/${id}`,
  delete: (id: number) => `${API_URL}/marcas/eliminarMarca/${id}`,
};

export default function EditableTableMarcas() {
  return <EditableTable columns={columns} apiUrls={apiUrls} entityName="Marca" />;
}
