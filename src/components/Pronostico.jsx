import { describirClima, nombreDia } from "../clima";

export default function Pronostico({ ciudad, clima }) {
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