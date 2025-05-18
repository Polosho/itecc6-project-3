const db = require('../config/db');

const Recipe = {
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM recipes', (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  },

  getById: (id) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM recipes WHERE id = ?', [id], (err, results) => {
        if (err) reject(err);
        resolve(results[0]);
      });
    });
  },

  create: (recipe) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO recipes SET ?', recipe, (err, result) => {
        if (err) reject(err);
        resolve(result.insertId);
      });
    });
  },

  update: (id, recipe) => {
    return new Promise((resolve, reject) => {
      db.query('UPDATE recipes SET ? WHERE id = ?', [recipe, id], (err, result) => {
        if (err) reject(err);
        resolve(result.affectedRows > 0);
      });
    });
  },

  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM recipes WHERE id = ?', [id], (err, result) => {
        if (err) reject(err);
        resolve(result.affectedRows > 0);
      });
    });
  }
};

module.exports = Recipe;