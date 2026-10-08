export default function ListaCiudades({ ciudades, elegida, onElegir }) {
  if (ciudades.length === 0) {
    return <p className="mensaje">Sin resultados</p>;
  }

  return (
    <ul className="ciudades">
      {ciudades.map((c) => (
        <li key={c.id} className={elegida?.id === c.id ? "activa" : ""}>
          <button type="button" onClick={() => onElegir(c)}>
            {[c.name, c.admin1, c.country].filter(Boolean).join(", ")}
          </button>
        </li>
      ))}
    </ul>
  );
}