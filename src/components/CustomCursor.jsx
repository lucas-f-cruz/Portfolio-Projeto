// ============================================================
//  COMPONENTE: CustomCursor
//  Ponto que segue o mouse com leve atraso (inércia), e cresce
//  ao passar sobre elementos clicáveis (a, button, [role=button]).
//  Ativo só em telas com mouse de verdade (evita mobile/touch).
// ============================================================
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { TEMA } from "../styles/tema";

export function CustomCursor() {
    const dotRef = useRef(null);

    useEffect(() => {
        // Não ativa em dispositivos touch (não faz sentido lá)
        const isTouch = window.matchMedia("(pointer: coarse)").matches;
        if (isTouch) return;

        const dot = dotRef.current;
        if (!dot) return;

        const moveX = gsap.quickTo(dot, "x", { duration: 0.35, ease: "power3.out" });
        const moveY = gsap.quickTo(dot, "y", { duration: 0.35, ease: "power3.out" });

        const onMove = (e) => {
            moveX(e.clientX);
            moveY(e.clientY);
        };

        const onOver = (e) => {
            if (e.target.closest("a, button, [role='button']")) {
                gsap.to(dot, { scale: 2.4, duration: 0.25, ease: "power2.out" });
            }
        };
        const onOut = (e) => {
            if (e.target.closest("a, button, [role='button']")) {
                gsap.to(dot, { scale: 1, duration: 0.25, ease: "power2.out" });
            }
        };

        window.addEventListener("mousemove", onMove);
        document.addEventListener("mouseover", onOver);
        document.addEventListener("mouseout", onOut);

        return () => {
            window.removeEventListener("mousemove", onMove);
            document.removeEventListener("mouseover", onOver);
            document.removeEventListener("mouseout", onOut);
        };
    }, []);

    return (
        <div
            ref={dotRef}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: 10,
                height: 10,
                marginLeft: -5,
                marginTop: -5,
                borderRadius: "50%",
                background: TEMA.verde,
                pointerEvents: "none",
                zIndex: 9999,
                mixBlendMode: "difference",
            }}
        />
    );
}