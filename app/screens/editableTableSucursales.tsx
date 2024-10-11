import { API_URL } from '@/constants/config';
import EditableTable from '../../components/editableTable';

const columns = [
  { key: 'id', title: 'ID' },
  { key: 'nombre', title: 'Nombre' }
];

const apiUrls = {
  fetchAll: `${API_URL}/sucursales/getSucursales`,
  fetchById: (id: number) => `${API_URL}/sucursales/getSucursalesByID/${id}`,
  create: `${API_URL}/sucursales/registrarSucursal`,
  update: (id: number) => `${API_URL}/sucursales/actualizarSucursal/${id}`,
  delete: (id: number) => `${API_URL}/sucursales/eliminarSucursal/${id}`,
};

export default function EditableTableLineas() {
  return <EditableTable columns={columns} apiUrls={apiUrls} entityName="Sucursal" />;
}
