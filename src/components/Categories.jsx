import React from 'react';

const Categories = ({ onSelectCategory, selectedCategory }) => {
    const categories = ["Todos", "Gastronomía", "Moda", "Salud y Belleza", "Accesorios"];

    return (
        <section className="mb-8">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-xl font-bold mb-4">🔍 Explora por Categorías</h2>
                <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => onSelectCategory(category)}
                            className={`px-6 py-3 text-sm font-medium rounded-full transition 
                                        ${selectedCategory === category ? "bg-yellow-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}>
                            {category}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Categories;
