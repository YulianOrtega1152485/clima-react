import { useState, useEffect } from "react";

export function useDebounce(valor, ms) {
  const [valorEstable, setValorEstable] = useState(valor);

  useEffect(() => {
    const id = setTimeout(() => setValorEstable(valor), ms);
    return () => clearTimeout(id);
  }, [valor, ms]);

  return valorEstable;
}
