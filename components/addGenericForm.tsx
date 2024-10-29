//addGenericForm.tsx

import React from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';
import { useEntityCreate } from '../hooks/useEntityCreate';

interface GenericFormProps {
  onAdd: () => Promise<void>;
  onCancel: () => void;
  apiUrls: {
    create: string;
  };
  entityName: string;
}

interface Entity {
  nombre: string;
}

const AddGenericForm: React.FC<GenericFormProps> = ({
  onAdd,
  onCancel,
  apiUrls,
  entityName,
}) => {
  const { newEntity, handleFieldChange, handleCreate, creating } = useEntityCreate<Entity>(
    { create: apiUrls.create },
    entityName,
    onAdd
  );

  return (
    <View style={styles.formContainer}>
      <TextInput
        placeholder="Nombre"
        value={newEntity?.nombre ?? ''}
        onChangeText={(text) => handleFieldChange('nombre', text)}
        style={styles.input}
      />
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={handleCreate} disabled={creating}>
          <Text style={styles.buttonText}>{creating ? 'Agregando...' : 'Agregar'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: 'red' }]} onPress={onCancel}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    position: 'absolute',
    bottom: 150,
    right: 20,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 5,
    elevation: 5,
    width: '80%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: '#6200ee',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AddGenericForm;
