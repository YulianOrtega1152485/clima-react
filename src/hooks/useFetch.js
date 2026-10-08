import { useState, useEffect } from "react";

export function useFetch(url) {
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;

    const control = new AbortController();

    async function pedir() {
      setCargando(true);
      setError(null);
      try {
        const r = await fetch(url, { signal: control.signal });
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        setDatos(await r.json());
      } catch (e) {
        if (e.name !== "AbortError") setError(e.message);
      } finally {
        if (!control.signal.aborted) setCargando(false);
      }
    }

    pedir();
    return () => control.abort();
  }, [url]);

  return { datos, cargando, error };
}