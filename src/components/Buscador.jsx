export default function Buscador({ texto, onCambiar }) {
  return (
    <div className="buscador">
      <input
        type="text"
        value={texto}
        onChange={(e) => onCambiar(e.target.value)}
        placeholder="Busca una ciudad…"
      />
    </div>
  );
}