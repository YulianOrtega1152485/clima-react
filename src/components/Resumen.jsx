export default function Resumen({ resumen }) {
  return (
    <p className="resumen">
      Esta semana: máxima {resumen.maxima} °C, mínima {resumen.minima} °C. El día
      más caluroso es el {resumen.diaCaluroso}.
    </p>
  );
}