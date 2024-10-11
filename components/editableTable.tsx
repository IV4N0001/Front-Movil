import React from 'react';
import { View, TextInput, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { DataTable } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';
import { useEntityAPI } from '../hooks/useEntityAPI';
import { useFilteredEntities } from '../hooks/useFilteredEntities';
import { useEntityEditing } from '../hooks/useEntityEditing';
import { EntityBase } from '@/interfaces/entityBase';

interface EditableTableProps {
  columns: Array<{ key: string; title: string }>;
  apiUrls: {
    fetchAll: string;
    fetchById: (id: number) => string;
    create: string;
    update: (id: number) => string;
    delete: (id: number) => string;
  };
  entityName: string;
}

export default function EditableTable({ columns, apiUrls, entityName }: EditableTableProps) {
  const { entities, fetchEntities } = useEntityAPI<EntityBase>({ fetchAll: apiUrls.fetchAll, fetchById: apiUrls.fetchById }, entityName);
  const [searchId, setSearchId] = React.useState<string>('');
  const { filteredEntities } = useFilteredEntities(entities, searchId);

  const { editingEntity, editedFields, startEditing, stopEditing, handleFieldChange, handleSave, handleDelete } = useEntityEditing<EntityBase>(
    { update: apiUrls.update, delete: apiUrls.delete }, 
    entityName, 
    fetchEntities
  );

  React.useEffect(() => {
    fetchEntities();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        placeholder={`Buscar por ID de ${entityName}`}
        value={searchId}
        onChangeText={setSearchId}
        style={styles.searchInput}
        keyboardType="numeric"
      />

      <ScrollView horizontal>
        <View style={styles.tableContainer}>
          <DataTable>
            <DataTable.Header>
              {columns.map((col) => (
                <DataTable.Title key={col.key} style={styles.titleCell}>{col.title}</DataTable.Title>
              ))}
              <DataTable.Title numeric style={styles.titleCell}>Editar</DataTable.Title>
              <DataTable.Title numeric style={styles.titleCell}>Eliminar</DataTable.Title>
              <DataTable.Title numeric style={styles.titleCell}>Guardar</DataTable.Title>
            </DataTable.Header>

            {filteredEntities.map((entity) => (
              <DataTable.Row key={entity.id}>
                {columns.map((col) => (
                  <DataTable.Cell key={`${entity.id}-${col.key}`} style={styles.cell}>
                    <TextInput
                      value={editingEntity === entity.id ? (editedFields[col.key] ?? entity[col.key]) : entity[col.key]}
                      onChangeText={(text) => editingEntity === entity.id && handleFieldChange(col.key, text)}
                      style={styles.input}
                      editable={editingEntity === entity.id}
                    />
                  </DataTable.Cell>
                ))}
                <DataTable.Cell style={styles.cell}>
                  <TouchableOpacity onPress={() => startEditing(entity.id)}>
                    <Feather name="edit" size={24} color="black" />
                  </TouchableOpacity>
                </DataTable.Cell>
                <DataTable.Cell style={styles.cell}>
                  <TouchableOpacity onPress={() => handleDelete(entity.id)}>
                    <Feather name="delete" size={24} color="black" />
                  </TouchableOpacity>
                </DataTable.Cell>
                <DataTable.Cell style={styles.cell}>
                  <TouchableOpacity onPress={() => handleSave(entity.id)} disabled={editingEntity !== entity.id}>
                    <Feather name="save" size={24} color={editingEntity === entity.id ? "black" : "gray"} />
                  </TouchableOpacity>
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  tableContainer: {
    width: '100%',
  },
  cell: {
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleCell: {
    minWidth: 50,
  },
  input: {
    height: 30,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 5,
    width: '90%',
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});
