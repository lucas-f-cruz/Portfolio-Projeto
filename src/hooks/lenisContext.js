// ============================================================
//  Contexto do Lenis, separado do provider (SmoothScroll.jsx)
//  porque o Fast Refresh exige que arquivos .jsx exportem
//  só componentes — funções/contexto ficam aqui.
// ============================================================
import { createContext, useContext } from "react";

export const LenisContext = createContext(null);

// Hook para outros componentes pedirem "rola até aqui" (ex: Navbar)
export function useLenis() {
    return useContext(LenisContext);
}