const Recipe = require('../models/recipe');

const recipeController = {
  getAllRecipes: async (req, res) => {
    try {
      const recipes = await Recipe.getAll();
      res.json(recipes);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getRecipeById: async (req, res) => {
    try {
      const recipe = await Recipe.getById(req.params.id);
      if (!recipe) {
        return res.status(404).json({ message: 'Recipe not found' });
      }
      res.json(recipe);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  createRecipe: async (req, res) => {
    try {
      const id = await Recipe.create(req.body);
      res.status(201).json({ id, ...req.body });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  updateRecipe: async (req, res) => {
    try {
      const success = await Recipe.update(req.params.id, req.body);
      if (!success) {
        return res.status(404).json({ message: 'Recipe not found' });
      }
      res.json({ id: req.params.id, ...req.body });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  deleteRecipe: async (req, res) => {
    try {
      const success = await Recipe.delete(req.params.id);
      if (!success) {
        return res.status(404).json({ message: 'Recipe not found' });
      }
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = recipeController;