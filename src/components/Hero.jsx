import React from 'react';

const Hero = () => (
    <section className="pt-20 pb-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
            <div className="bg-yellow-100 rounded-xl p-6 shadow-md flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800">🎉 Descubre Ofertas Exclusivas</h2>
                    <p className="text-gray-600 mt-2">Encuentra los mejores descuentos en locales cerca de ti.</p>
                </div>
                <button className="bg-yellow-500 text-white px-6 py-3 rounded-full shadow-md hover:bg-yellow-600">
                    Ver Ofertas
                </button>
            </div>
        </div>
    </section>
);

export default Hero;
