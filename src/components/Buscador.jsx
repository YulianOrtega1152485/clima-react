export default function Buscador({ texto, onCambiar, onLimpiar, entrada }) {
  return (
    <div className="buscador">
      <input
        ref={entrada}
        type="text"
        value={texto}
        onChange={(e) => onCambiar(e.target.value)}
        placeholder="Busca una ciudad…"
      />
      <button type="button" onClick={onLimpiar}>
        Limpiar
      </button>
    </div>
  );
}
