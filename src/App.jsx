import { useState } from "react";
import { useFetch } from "./hooks/useFetch";
import Buscador from "./components/Buscador";
import ListaCiudades from "./components/ListaCiudades";
import "./App.css";

export default function App() {
  const [texto, setTexto] = useState("");

  const activa = texto.length >= 3;
  const urlCiudades = activa
    ? `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(texto)}&count=5&language=es`
    : null;

  const ciudades = useFetch(urlCiudades);
  const lista = ciudades.datos?.results ?? [];

  return (
    <div className="app">
      <h1>Clima</h1>
      <Buscador texto={texto} onCambiar={setTexto} />

      {activa && ciudades.cargando && <p className="mensaje">Buscando…</p>}
      {activa && ciudades.error && (
        <p className="mensaje error">Error: {ciudades.error}</p>
      )}
      {activa && !ciudades.cargando && !ciudades.error && ciudades.datos && (
        <ListaCiudades ciudades={lista} />
      )}
    </div>
  );
}
