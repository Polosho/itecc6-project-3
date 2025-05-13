import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MenuBook } from '@mui/icons-material';

function Home() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('');
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const savedRecipes = JSON.parse(localStorage.getItem('recipes') || '[]');
    setRecipes(savedRecipes);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      const updatedRecipes = recipes.filter(recipe => recipe.id !== id);
      localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
      setRecipes(updatedRecipes);
    }
  };

  const filteredRecipes = recipes
    .filter(recipe => recipe.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(recipe => {
      if (!filter) return true;
      switch (filter) {
        case 'vegetarian':
          return recipe.vegetarian;
        case 'vegan':
          return recipe.vegan;
        case 'gluten-free':
          return recipe.glutenFree;
        default:
          return true;
      }
    });

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <MenuBook />
          <h1 className="text-xl font-bold">Recipe Box</h1>
        </div>
        <input
          type="search"
          placeholder="Search..."
          className="border rounded px-3 py-1"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => navigate('/add')}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add New Recipe
        </button>
        <div className="flex items-center gap-2">
          <span>Filter By:</span>
          <select 
            className="border rounded px-3 py-1"
            value={filter}
            onChange={handleFilter}
          >
            <option value="">Dietary Preferences</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="gluten-free">Gluten-Free</option>
          </select>
        </div>
      </div>

      <h2 className="text-lg font-semibold mb-4">Recipe List</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRecipes.map((recipe) => (
          <div key={recipe.id} className="border rounded p-4">
            <div className="bg-gray-100 h-40 mb-3 rounded flex items-center justify-center text-gray-400">
              Recipe Image
            </div>
            <h3 className="font-medium mb-3">{recipe.name}</h3>
            <div className="space-y-2">
              <button 
                className="w-full border rounded py-1 hover:bg-gray-50"
                onClick={() => navigate(`/edit/${recipe.id}`)}
              >
                Edit
              </button>
              <button 
                className="w-full border rounded py-1 hover:bg-gray-50 text-red-600"
                onClick={() => handleDelete(recipe.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;