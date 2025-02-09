import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getLocales } from '../services/api';

const LocalDetail = () => {
    const { id } = useParams();
    const [local, setLocal] = useState(null);

    useEffect(() => {
        const fetchLocal = async () => {
            const data = await getLocales();
            const foundLocal = data.find((item) => item.id === parseInt(id));
            setLocal(foundLocal);
        };
        fetchLocal();
    }, [id]);

    if (!local) return <p className="text-center text-gray-600 mt-10">Cargando...</p>;

    return (
        <div className="max-w-4xl mx-auto px-6 py-10">
            <Link to="/" className="text-yellow-500 hover:underline">⬅ Volver a Locales</Link>
            <div className="bg-white rounded-lg shadow-lg p-6 mt-4">
                <img src={local.image || "https://via.placeholder.com/600x300"} alt={local.title} className="w-full h-64 object-cover rounded-lg" />
                <h1 className="text-3xl font-bold mt-4">{local.title}</h1>
                <p className="text-gray-600 mt-2">{local.description}</p>

                <div className="mt-4">
                    <p><strong>Días Disponible:</strong> {local.dias_desc}</p>
                    <p><strong>Forma de Pago:</strong> {local.pago}</p>
                    <p><strong>Rubro:</strong> {local.rubro}</p>
                    <p><strong>Ubicación:</strong> {local.ubicacion}</p>
                    <p><strong>Redes Sociales:</strong> {local.redes}</p>
                    <p><strong>Observaciones:</strong> {local.observacion}</p>
                </div>

                <div className="mt-6">
                    <a href={`https://www.google.com/maps/search/${encodeURIComponent(local.ubicacion)}`} target="_blank" rel="noopener noreferrer" className="bg-blue-500 text-white px-6 py-3 rounded-full">
                        📍 Ver en Google Maps
                    </a>
                </div>
            </div>
        </div>
    );
};

export default LocalDetail;
