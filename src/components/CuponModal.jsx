import React, { useState, useEffect, useRef } from "react";

const CuponModal = ({ local, onClose }) => {
    const [codigo, setCodigo] = useState(""); // ✅ Guardar código del cupón
    const [qrLocal, setQrLocal] = useState(""); // ✅ Guardar URL del QR
    const [mensaje, setMensaje] = useState("");
    const [loading, setLoading] = useState(false);
    const [escaneando, setEscaneando] = useState(false);
    const videoRef = useRef(null);

    const API_URL = "https://petoclub.com.ar/wp-json/petoclub/v1";

    const handleGenerarCupon = async () => {
        setLoading(true);
        setMensaje("");

        try {
            const response = await fetch(`${API_URL}/cupon/generar`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ local_id: local.id, user_id: 1 }) // Cambiar user_id dinámicamente
            });

            const data = await response.json();
            if (data.codigo) {
                setCodigo(data.codigo);  // ✅ Guardar código en el estado
                setQrLocal(data.qr_local); // ✅ Guardar QR del local
                setMensaje("📌 Escanea el QR del local para validarlo.");
            } else {
                setMensaje(data.mensaje || "Error generando el cupón.");
            }
        } catch (error) {
            setMensaje("Error de conexión con la API.");
        }

        setLoading(false);
    };

    useEffect(() => {
        if (escaneando) {
            navigator.mediaDevices.enumerateDevices()
                .then(devices => {
                    const videoDevices = devices.filter(device => device.kind === "videoinput");
                    const backCamera = videoDevices.find(device => device.label.toLowerCase().includes("back"));

                    if (backCamera) {
                        navigator.mediaDevices.getUserMedia({
                            video: { deviceId: { exact: backCamera.deviceId } }
                        }).then((stream) => {
                            if (videoRef.current) {
                                videoRef.current.srcObject = stream;
                            }
                        }).catch((error) => {
                            console.error("❌ Error abriendo la cámara trasera", error);
                            setMensaje("⚠ No se pudo acceder a la cámara.");
                        });
                    } else {
                        setMensaje("⚠ No se encontró cámara trasera.");
                    }
                })
                .catch(error => {
                    console.error("❌ Error obteniendo dispositivos", error);
                });
        } else {
            if (videoRef.current && videoRef.current.srcObject) {
                videoRef.current.srcObject.getTracks().forEach(track => track.stop());
            }
        }
    }, [escaneando]);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
                <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-red-500">
                    ✖
                </button>

                <h2 className="text-xl font-bold text-gray-800 text-center">🎟 Generar Cupón</h2>

                {!codigo ? (
                    <button 
                        onClick={handleGenerarCupon} 
                        className="bg-yellow-500 text-white px-6 py-3 rounded-lg mt-4 w-full"
                        disabled={loading}
                    >
                        {loading ? "Generando..." : "Generar Cupón"}
                    </button>
                ) : (
                    <div className="mt-4 text-center">
                        <p className="font-bold text-gray-700">Tu código:</p>
                        <p className="text-2xl font-bold text-blue-600">{codigo}</p> {/* ✅ Muestra el código generado */}
                        <p className="text-gray-600 text-sm mt-2">
                            📌 Escanea el QR del local para validarlo automáticamente.
                        </p>
                        <button 
                            onClick={() => setEscaneando(true)} 
                            className="bg-green-500 text-white px-6 py-3 rounded-lg mt-4 w-full"
                        >
                            📷 Abrir Cámara (Trasera)
                        </button>
                    </div>
                )}

                {mensaje && <p className="text-red-600 mt-2 text-center">{mensaje}</p>}

                {escaneando && (
                    <div className="mt-4">
                        <p className="text-center font-semibold text-gray-700">📷 Escaneando QR</p>
                        <video ref={videoRef} autoPlay playsInline className="w-full"></video>
                        <button 
                            onClick={() => setEscaneando(false)} 
                            className="bg-gray-500 text-white px-4 py-2 rounded-lg mt-4 w-full"
                        >
                            Cerrar Cámara
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CuponModal;
