import { API_URL } from '@/constants/config';
import EditableTable from '../../components/editableTable';

const columns = [
  { key: 'id', title: 'ID' },
  { key: 'nombre', title: 'Nombre' },
  { key: 'id_linea', title: 'ID Línea' }
];

const apiUrls = {
  fetchAll: `${API_URL}/sublineas/getSublineas`,
  fetchById: (id: number) => `${API_URL}/sublineas/getSublineasByID/${id}`,
  create: `${API_URL}/sublineas/registrarSublinea`,
  update: (id: number) => `${API_URL}/sublineas/actualizarSublinea/${id}`,
  delete: (id: number) => `${API_URL}/sublineas/eliminarSublinea/${id}`,
};

export default function EditableTableSublineas() {
  return <EditableTable columns={columns} apiUrls={apiUrls} entityName="Sublinea" />;
}
