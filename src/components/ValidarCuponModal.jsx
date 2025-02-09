import React, { useState } from "react";

const ValidarCuponModal = ({ localId, onClose }) => {
    const [codigo, setCodigo] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [loading, setLoading] = useState(false);
    const API_URL = "https://petoclub.com.ar/wp-json/petoclub/v1";

    const handleValidarCupon = async () => {
        if (!codigo) {
            setMensaje("Por favor, ingrese el código.");
            return;
        }

        setLoading(true);
        setMensaje("");

        try {
            const response = await fetch(`${API_URL}/cupon/validar`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ local_id: localId, codigo }),
            });

            const data = await response.json();
            setMensaje(data.mensaje || "Cupón inválido o ya canjeado.");
        } catch (error) {
            setMensaje("Error al validar el cupón. Inténtelo nuevamente.");
        }

        setLoading(false);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-xl font-bold text-gray-800 text-center">🔑 Validar Cupón</h2>

                <input
                    type="text"
                    placeholder="Ingrese su código"
                    value={codigo}
                    onChange={(e) => setCodigo(e.target.value)}
                    className="w-full mt-4 px-4 py-2 border rounded-lg"
                />

                <button
                    onClick={handleValidarCupon}
                    className="bg-blue-500 text-white w-full py-2 rounded-lg mt-4 hover:bg-blue-600 transition"
                    disabled={loading}
                >
                    {loading ? "Validando..." : "Validar Cupón"}
                </button>

                {mensaje && (
                    <p className={`mt-4 text-center font-semibold ${mensaje.includes("correctamente") ? "text-green-600" : "text-red-600"}`}>
                        {mensaje}
                    </p>
                )}

                <button onClick={onClose} className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-lg w-full">
                    Cerrar
                </button>
            </div>
        </div>
    );
};

export default ValidarCuponModal;
