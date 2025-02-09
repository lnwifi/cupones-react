import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ValidarCupon = ({ apiUrl }) => {
    const { local_id } = useParams(); // Obtiene el ID del local desde la URL
    const [codigo, setCodigo] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!local_id) {
            setMensaje("Error: No se encontró el local.");
        }
    }, [local_id]);

    const handleValidarCupon = async () => {
        if (!codigo) {
            setMensaje("Por favor, ingrese el código del cupón.");
            return;
        }

        setLoading(true);
        setMensaje("");

        try {
            const response = await fetch(`${apiUrl}/cupon/validar`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ local_id, codigo }),
            });

            const data = await response.json();
            setMensaje(data.mensaje || "Cupón inválido o ya canjeado.");
        } catch (error) {
            setMensaje("Error al validar el cupón. Inténtelo nuevamente.");
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-xl font-bold text-gray-800 text-center">🔑 Validar Cupón</h2>

                {local_id ? (
                    <>
                        <p className="text-gray-600 text-center mt-2">
                            Ingrese el código de su cupón para validarlo en este local.
                        </p>

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
                    </>
                ) : (
                    <p className="text-red-600 text-center mt-4">No se encontró el local.</p>
                )}
            </div>
        </div>
    );
};

export default ValidarCupon;
