import { useMemo } from "react";
import { describirClima, nombreDia } from "../clima";
import Resumen from "./Resumen";

export default function Pronostico({ ciudad, clima }) {
    // Los hooks van SIEMPRE antes de cualquier return condicional
    const resumen = useMemo(() => {
        if (!clima.datos) return null;
        console.log("calculando resumen");

        const { time, temperature_2m_max: max, temperature_2m_min: min } =
            clima.datos.daily;
        const maxima = Math.max(...max);

        return {
            maxima,
            minima: Math.min(...min),
            diaCaluroso: time[max.indexOf(maxima)],
        };
    }, [clima.datos]);

    if (clima.cargando) return <p className="mensaje">Cargando pronóstico…</p>;
    if (clima.error) return <p className="mensaje error">Error: {clima.error}</p>;
    if (!clima.datos) return null;

    const { current, daily } = clima.datos;

    return (
        <section className="pronostico">
            <h2>{ciudad.name}</h2>

            <p className="actual">
                <span className="temperatura">{current.temperature_2m} °C</span>
                <span>
                    {" "}· {describirClima(current.weather_code)} · viento{" "}
                    {current.wind_speed_10m} km/h
                </span>
            </p>

            <Resumen resumen={resumen} />

            <div className="dias">
                {daily.time.map((fecha, i) => {
                    const descripcion = describirClima(daily.weather_code[i]);
                    return (
                        <div className="dia" key={fecha} title={descripcion}>
                            <span>{nombreDia(fecha)}</span>
                            <span>{descripcion.split(" ")[0]}</span>
                            <span>
                                {Math.round(daily.temperature_2m_min[i])}–
                                {Math.round(daily.temperature_2m_max[i])}
                            </span>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}