export function describirClima(codigo) {
    if (codigo === 0) return "☀️ Despejado";
    if (codigo <= 3) return "⛅ Parcialmente nublado";
    if (codigo <= 48) return "🌫️ Niebla";
    if (codigo <= 57) return "🌦️ Llovizna";
    if (codigo <= 67) return "🌧️ Lluvia";
    if (codigo <= 77) return "❄️ Nieve";
    if (codigo <= 82) return "🌧️ Chubascos";
    return "⛈️ Tormenta";
}

export function nombreDia(fecha) {
    const d = new Date(`${ fecha }T00:00:00`);
    const n = d.toLocaleDateString("es-CO", { weekday: "short" }).replace(".", "");
    return n.charAt(0).toUpperCase() + n.slice(1);
}