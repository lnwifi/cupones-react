import React, { useState } from 'react';
import { FaTimes, FaMapMarkerAlt, FaCalendarAlt, FaMoneyBillWave, FaBuilding, FaFacebook, FaInstagram, FaExclamationCircle, FaQrcode } from "react-icons/fa";
import CuponModal from './CuponModal'; // Modal para generar el código del cupón

const LocalDetailModal = ({ local, onClose }) => {
    const [showCuponModal, setShowCuponModal] = useState(false);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
            <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-lg relative">
                
                {/* Botón de cierre */}
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition">
                    <FaTimes size={24} />
                </button>

                {/* Imagen del Local */}
                <div className="overflow-hidden rounded-lg">
                    <img src={local.image || "https://via.placeholder.com/600x300"} alt={local.title} className="w-full h-48 object-cover rounded-lg" />
                </div>

                {/* Título */}
                <h1 className="text-2xl font-bold text-gray-800 mt-4 text-center">{local.nombre}</h1>
                <p className="text-gray-600 text-center">{local.descripcion || "No hay descripción disponible."}</p>

                {/* Detalles del Local */}
                <div className="mt-6 space-y-4">
                    {local.dias_disponibles && (
                        <p className="flex items-center text-gray-700">
                            <FaCalendarAlt className="mr-3 text-yellow-500" size={20} /> 
                            <strong>Días Disponible:</strong> {local.dias_disponibles}
                        </p>
                    )}
                    {local.formas_pago && (
                        <p className="flex items-center text-gray-700">
                            <FaMoneyBillWave className="mr-3 text-green-500" size={20} /> 
                            <strong>Forma de Pago:</strong> {local.formas_pago}
                        </p>
                    )}
                    {local.categoria && (
                        <p className="flex items-center text-gray-700">
                            <FaBuilding className="mr-3 text-blue-500" size={20} /> 
                            <strong>Categoría:</strong> {local.categoria}
                        </p>
                    )}
                    {local.ubicacion && (
                        <p className="flex items-center text-gray-700">
                            <FaMapMarkerAlt className="mr-3 text-red-500" size={20} /> 
                            <strong>Ubicación:</strong> {local.ubicacion}
                        </p>
                    )}
                    {local.redes_sociales && (
                        <div className="flex items-center mt-2 space-x-4">
                            {local.redes_sociales.facebook && (
                                <a href={local.redes_sociales.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition">
                                    <FaFacebook size={24} />
                                </a>
                            )}
                            {local.redes_sociales.instagram && (
                                <a href={local.redes_sociales.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800 transition">
                                    <FaInstagram size={24} />
                                </a>
                            )}
                        </div>
                    )}
                    {local.observacion && (
                        <p className="flex items-center text-gray-700">
                            <FaExclamationCircle className="mr-3 text-orange-500" size={20} /> 
                            <strong>Observaciones:</strong> {local.observacion}
                        </p>
                    )}
                </div>

                {/* Botón para Generar Código del Cupón */}
                <div className="mt-6 flex justify-center">
                    <button 
                        onClick={() => setShowCuponModal(true)} 
                        className="bg-yellow-500 text-white px-6 py-3 rounded-full shadow-md hover:bg-yellow-600 transition flex items-center justify-center"
                    >
                        <FaQrcode className="mr-2" /> Canjear Código
                    </button>
                </div>

                {/* Modal de Canje de Código */}
                {showCuponModal && <CuponModal local={local} onClose={() => setShowCuponModal(false)} />}
            </div>
        </div>
    );
};

export default LocalDetailModal;
