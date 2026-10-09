import { useState, useEffect, useRef } from "react";
import { useFetch } from "./hooks/useFetch";
import { useDebounce } from "./hooks/useDebounce";
import Buscador from "./components/Buscador";
import ListaCiudades from "./components/ListaCiudades";
import Pronostico from "./components/Pronostico";
import "./App.css";

export default function App() {
  const [texto, setTexto] = useState("");
  const [ciudad, setCiudad] = useState(null);
  const entrada = useRef(null);
  const textoBusqueda = useDebounce(texto, 400);

  useEffect(() => {
    entrada.current.focus();
  }, []);

  function limpiar() {
    setTexto("");
    setCiudad(null);
    entrada.current.focus();
  }

  const activa = texto.length >= 3;
  const esperando = texto !== textoBusqueda;
  const urlCiudades =
    activa && textoBusqueda.length >= 3
      ? `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(textoBusqueda)}&count=5&language=es`
      : null;
  const urlClima = ciudad
    ? `https://api.open-meteo.com/v1/forecast?latitude=${ciudad.latitude}&longitude=${ciudad.longitude}&current=temperature_2m,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto`
    : null;

  const ciudades = useFetch(urlCiudades);
  const clima = useFetch(urlClima);
  const lista = ciudades.datos?.results ?? [];
  const buscando = esperando || ciudades.cargando;

  return (
    <div className="app">
      <h1>Clima</h1>
      <Buscador
        texto={texto}
        onCambiar={setTexto}
        onLimpiar={limpiar}
        entrada={entrada}
      />

      {activa && buscando && <p className="mensaje">Buscando…</p>}
      {activa && !buscando && ciudades.error && (
        <p className="mensaje error">Error: {ciudades.error}</p>
      )}
      {activa && !buscando && !ciudades.error && ciudades.datos && (
        <ListaCiudades ciudades={lista} elegida={ciudad} onElegir={setCiudad} />
      )}

      {ciudad && <Pronostico ciudad={ciudad} clima={clima} />}
    </div>
  );
}