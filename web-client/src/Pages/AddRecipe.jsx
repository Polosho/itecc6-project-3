import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddRecipe() {
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({
    name: '',
    ingredients: '',
    instructions: '',
    prep_time: '',
    difficulty: 'Medium',
    vegetarian: false,
    vegan: false,
    glutenFree: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newRecipe = {
      ...recipe,
      id: Date.now(),
      prep_time: parseInt(recipe.prep_time) || 0
    };

    const existingRecipes = JSON.parse(localStorage.getItem('recipes') || '[]');
    existingRecipes.push(newRecipe);
    localStorage.setItem('recipes', JSON.stringify(existingRecipes));

    navigate('/');
  };

  return (
    <div className="p-8 max-w-2xl mx-auto bg-white min-h-screen">
      <div className="flex items-center gap-2 mb-6">
        <button 
          onClick={() => navigate(-1)}
          className="text-gray-600 hover:text-gray-800"
        >
          ← Back
        </button>
        <h1 className="text-2xl font-bold">Add New Recipe</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-medium mb-2">Recipe Name:</label>
          <input
            type="text"
            name="name"
            value={recipe.name}
            onChange={handleChange}
            className="w-full border rounded-md px-4 py-2"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-2">Ingredients:</label>
          <textarea
            name="ingredients"
            value={recipe.ingredients}
            onChange={handleChange}
            className="w-full border rounded-md px-4 py-2"
            rows="4"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-2">Instructions:</label>
          <textarea
            name="instructions"
            value={recipe.instructions}
            onChange={handleChange}
            className="w-full border rounded-md px-4 py-2"
            rows="4"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-2">Preparation Time (minutes):</label>
          <input
            type="number"
            name="prep_time"
            value={recipe.prep_time}
            onChange={handleChange}
            className="w-full border rounded-md px-4 py-2 [&::-webkit-inner-spin-button]:text-black [&::-webkit-outer-spin-button]:text-black"
            min="0"
            required
            style={{
              WebkitAppearance: 'inner-spin-button',
              MozAppearance: 'spinner-button'
            }}
          />
        </div>

        <div>
          <label className="block font-medium mb-2">Difficulty:</label>
          <select
            name="difficulty"
            value={recipe.difficulty}
            onChange={handleChange}
            className="w-full border rounded-md px-4 py-2"
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-2">Dietary Preferences:</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="vegetarian"
                checked={recipe.vegetarian}
                onChange={(e) => setRecipe(prev => ({
                  ...prev,
                  vegetarian: e.target.checked
                }))}
              />
              <span>Vegetarian</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="vegan"
                checked={recipe.vegan}
                onChange={(e) => setRecipe(prev => ({
                  ...prev,
                  vegan: e.target.checked
                }))}
              />
              <span>Vegan</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="glutenFree"
                checked={recipe.glutenFree}
                onChange={(e) => setRecipe(prev => ({
                  ...prev,
                  glutenFree: e.target.checked
                }))}
              />
              <span>Gluten-Free</span>
            </label>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Save Recipe
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="border px-6 py-2 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddRecipe;