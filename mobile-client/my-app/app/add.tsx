import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function AddRecipe() {
  const [recipe, setRecipe] = useState({
    name: '',
    ingredients: [],
    instructions: '',
    vegan: false,
    vegetarian: false,
    glutenFree: false,
  });

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(recipe)
      });
      if (response.ok) {
        router.back();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={24} color="#000" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      <View style={styles.form}>
        <Text style={styles.title}>Add Recipe</Text>
        <Text style={styles.label}>Recipe Name:</Text>
        <TextInput
          style={styles.input}
          value={recipe.name}
          onChangeText={(text) => setRecipe({ ...recipe, name: text })}
        />

        <Text style={styles.label}>Ingredients:</Text>
        <View style={styles.ingredientRow}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Add ingredient"
          />
          <TouchableOpacity style={styles.addMoreButton}>
            <Text style={styles.addMoreText}>+ Add More</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Instructions</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          multiline
          numberOfLines={4}
          value={recipe.instructions}
          onChangeText={(text) => setRecipe({ ...recipe, instructions: text })}
        />

        <Text style={styles.label}>Dietary Options</Text>
        <View style={styles.checkboxContainer}>
          <TouchableOpacity 
            style={styles.checkbox}
            onPress={() => setRecipe({ ...recipe, vegan: !recipe.vegan })}
          >
            <Text>Vegan</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.checkbox}
            onPress={() => setRecipe({ ...recipe, vegetarian: !recipe.vegetarian })}
          >
            <Text>Vegetarian</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.checkbox}
            onPress={() => setRecipe({ ...recipe, glutenFree: !recipe.glutenFree })}
          >
            <Text>Gluten-Free</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.printButton}>
            <Text style={styles.printButtonText}>Print</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backText: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 8,
  },
  form: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  ingredientRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  addMoreButton: {
    justifyContent: 'center',
  },
  addMoreText: {
    color: '#4a90e2',
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: 'column',
    gap: 12,
    marginBottom: 24,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#666',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  printButton: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#666',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  printButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
});