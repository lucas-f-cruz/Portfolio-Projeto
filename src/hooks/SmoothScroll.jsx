// ============================================================
//  SMOOTH SCROLL — provider Lenis + sincronização com GSAP
//
//  Envolve a aplicação e substitui o scroll nativo por um
//  scroll com inércia/easing. Também sincroniza o Lenis com o
//  ScrollTrigger do GSAP: sem isso, as duas libs calculam a
//  posição do scroll de formas diferentes e as animações que
//  dependem de scroll ficam dessincronizadas/tremidas.
//
//  Expõe a instância do Lenis via contexto (useLenis, em
//  lenisContext.js) para quem precisar rolar até uma seção
//  programaticamente (ex: cliques do menu).
// ============================================================
import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LenisContext } from "./lenisContext";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll({ children }) {
    const lenisRef = useRef(null);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,   // "peso" do scroll — maior = mais lento/suave
            smoothWheel: true,
        });
        lenisRef.current = lenis;

        // Toda vez que o Lenis rola, avisa o ScrollTrigger pra recalcular
        lenis.on("scroll", ScrollTrigger.update);

        // Usa o "relógio" do próprio GSAP em vez de um requestAnimationFrame
        // separado — uma única fonte de tempo, sem duas dessincronizando.
        const update = (time) => lenis.raf(time * 1000);
        gsap.ticker.add(update);
        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove(update);
            lenis.destroy();
            lenisRef.current = null;
        };
    }, []);

    return (
        <LenisContext.Provider value={lenisRef}>
            {children}
        </LenisContext.Provider>
    );
}