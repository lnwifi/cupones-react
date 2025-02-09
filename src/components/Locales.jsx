import React, { useState } from 'react';
import { FaBuilding } from "react-icons/fa";
import LocalDetailModal from './LocalDetailModal';

const Locales = ({ locales }) => {
    const [selectedLocal, setSelectedLocal] = useState(null);

    return (
        <section className="mb-10">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-2xl font-bold mb-4">📍 Todos los Locales</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {locales.length > 0 ? locales.map((local) => (
                        <div 
                            key={local.id} 
                            onClick={() => setSelectedLocal(local)}
                            className="cursor-pointer bg-white rounded-lg shadow-md hover:shadow-xl transition-transform transform hover:scale-105"
                        >
                            <img src={local.image || "https://via.placeholder.com/300x200"} alt={local.title} className="w-full h-40 object-cover rounded-t-lg" />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold">{local.title}</h3>
                                <p className="text-sm text-gray-600 flex items-center"><FaBuilding className="mr-2 text-gray-500"/> {local.category}</p>
                                <div className="mt-2 bg-yellow-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                                    {local.discount}
                                </div>
                            </div>
                        </div>
                    )) : <p className="text-center text-gray-600">No hay locales disponibles.</p>}
                </div>
            </div>

            {/* Modal */}
            {selectedLocal && <LocalDetailModal local={selectedLocal} onClose={() => setSelectedLocal(null)} />}
        </section>
    );
};

export default Locales;
