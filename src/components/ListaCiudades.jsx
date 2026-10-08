export default function ListaCiudades({ ciudades }) {
  if (ciudades.length === 0) {
    return <p className="mensaje">Sin resultados</p>;
  }

  return (
    <ul className="ciudades">
      {ciudades.map((c) => (
        <li key={c.id}>
          {[c.name, c.admin1, c.country].filter(Boolean).join(", ")}
        </li>
      ))}
    </ul>
  );
}