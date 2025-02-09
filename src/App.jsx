import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Hero from './components/Hero';
import Categories from './components/Categories';
import Locales from './components/Locales';
import ValidarCupon from './pages/ValidarCupon'; // Página de validación de cupones
import { getLocales } from './services/api';

// URL de la API en WordPress
const API_URL = "https://petoclub.com.ar/wp-json/petoclub/v1";

function App() {
    const [locales, setLocales] = useState([]);
    const [filteredLocales, setFilteredLocales] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("Todos");
    const [userLocation, setUserLocation] = useState(null);

    useEffect(() => {
        const fetchLocales = async () => {
            try {
                const response = await fetch(`${API_URL}/locales`);
                const data = await response.json();
                setLocales(data);
                setFilteredLocales(data);
            } catch (error) {
                console.error("Error cargando locales:", error);
            }
        };
        fetchLocales();

        // Obtener ubicación del usuario
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                        lat: position.coords.latitude,
                        lon: position.coords.longitude
                    });
                },
                (error) => console.error("Error obteniendo ubicación:", error)
            );
        }
    }, []);

    // Función para calcular distancia entre dos coordenadas (Haversine Formula)
    const getDistance = (lat1, lon1, lat2, lon2) => {
        if (!lat1 || !lon1 || !lat2 || !lon2) return Infinity;
        const R = 6371; // Radio de la Tierra en km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                  Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                  Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Distancia en km
    };

    useEffect(() => {
        if (userLocation) {
            const sortedLocales = [...locales].sort((a, b) => {
                return getDistance(userLocation.lat, userLocation.lon, a.latitud, a.longitud) -
                       getDistance(userLocation.lat, userLocation.lon, b.latitud, b.longitud);
            });
            setFilteredLocales(sortedLocales);
        }
    }, [userLocation, locales]);

    return (
        <Router>
            <div className="bg-gray-100">
                <Hero />
                <Categories onSelectCategory={setSelectedCategory} selectedCategory={selectedCategory} />
                <Locales locales={filteredLocales} />
            </div>

            {/* Rutas de la Aplicación */}
            <Routes>
                <Route path="/" element={<Hero />} />
                <Route path="/validar-cupon/:local_id" element={<ValidarCupon apiUrl={API_URL} />} /> {/* Ruta dinámica corregida */}
            </Routes>
        </Router>
    );
}

export default App;
