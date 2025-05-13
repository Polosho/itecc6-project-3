import React from 'react';

export function PrintRecipe({ recipe }) {
  const handlePrint = () => {
    const printContent = `
      <div style="padding: 20px; font-family: Arial;">
        <h1 style="margin-bottom: 20px;">${recipe.name}</h1>
        
        <h2>Ingredients:</h2>
        <div style="margin-bottom: 20px; white-space: pre-line;">
          ${recipe.ingredients}
        </div>
        
        <h2>Instructions:</h2>
        <div style="margin-bottom: 20px; white-space: pre-line;">
          ${recipe.instructions}
        </div>
        
        <div style="margin-bottom: 20px;">
          <strong>Preparation Time:</strong> ${recipe.prep_time} minutes<br>
          <strong>Difficulty:</strong> ${recipe.difficulty}
        </div>
        
        <div>
          <strong>Dietary Information:</strong><br>
          ${recipe.vegetarian ? '✓ Vegetarian<br>' : ''}
          ${recipe.vegan ? '✓ Vegan<br>' : ''}
          ${recipe.glutenFree ? '✓ Gluten-Free' : ''}
        </div>
      </div>
    `;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <button
      type="button"
      onClick={handlePrint}
      className="border px-6 py-2 rounded-md hover:bg-gray-50"
    >
      Print
    </button>
  );
}