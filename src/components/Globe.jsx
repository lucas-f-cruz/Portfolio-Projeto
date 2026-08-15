// ============================================================
//  COMPONENTE: Globe
//  Globo 3D interativo com Three.js — esfera texturizada com um
//  mapa-múndi (public/img/mapa-mundi-noite.png, um asset PRÓPRIO
//  do projeto, carregado do jeito padrão do Three.js).
//
//  Gira sozinho pra sempre (devagar); arrastando com o mouse/
//  dedo, controla a rotação na direção que puxar. Clicar no
//  marcador azul (Brasil) abre um balão com efeito de digitação.
// ============================================================
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const LAT_LNG_BRASIL = { lat: -15.7801, lng: -47.9292 }; // Brasília
const TEXTO_BALAO = "Localization: Brazil";
const RAIO = 1;

function latLngParaVec3(lat, lng, raio) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);
    return new THREE.Vector3(
        -raio * Math.sin(phi) * Math.cos(theta),
        raio * Math.cos(phi),
        raio * Math.sin(phi) * Math.sin(theta),
    );
}

export function Globe({ maxSize = 380 }) {
    const containerRef = useRef(null);
    const marcador2DRef = useRef(null);

    const rotacaoY = useRef(0);
    const arrastando = useRef(false);
    const ultimoX = useRef(0);
    const balaoAbertoRef = useRef(false);

    const [balaoAberto, setBalaoAberto] = useState(false);
    const [textoDigitado, setTextoDigitado] = useState("");
    const [erroTextura, setErroTextura] = useState(null);

    useEffect(() => {
        balaoAbertoRef.current = balaoAberto;
    }, [balaoAberto]);

    useEffect(() => {
        if (!balaoAberto) return;
        let i = 0;
        const id = setInterval(() => {
            i += 1;
            setTextoDigitado(TEXTO_BALAO.slice(0, i));
            if (i >= TEXTO_BALAO.length) clearInterval(id);
        }, 45);
        return () => clearInterval(id);
    }, [balaoAberto]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let frameId;
        let destruido = false;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 10);
        camera.position.z = 3.2;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.domElement.style.width = "100%";
        renderer.domElement.style.height = "100%";
        renderer.domElement.style.display = "block";
        container.appendChild(renderer.domElement);

        const grupo = new THREE.Group();
        scene.add(grupo);

        const geometria = new THREE.SphereGeometry(RAIO, 64, 64);
        const material = new THREE.MeshBasicMaterial({ color: 0x111111 });
        const esfera = new THREE.Mesh(geometria, material);
        grupo.add(esfera);

        let texturaAtual = null;
        const img = new Image();
        img.onload = () => {
            console.log("[Globe] Textura carregada com sucesso:", img.width, "x", img.height);
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");
            ctx.filter = "brightness(1.35) saturate(1.1)";
            ctx.drawImage(img, 0, 0);

            texturaAtual = new THREE.CanvasTexture(canvas);
            texturaAtual.colorSpace = THREE.SRGBColorSpace;
            texturaAtual.anisotropy = renderer.capabilities.getMaxAnisotropy();

            material.color.set(0xffffff);
            material.map = texturaAtual;
            material.needsUpdate = true;
        };
        img.onerror = (erro) => {
            console.error("[Globe] Falha ao carregar a textura:", erro);
            setErroTextura("Não consegui carregar /img/mapa-mundi-noite.png — confira o Console (F12) pra mais detalhes.");
        };
        img.src = "/img/mapa-mundi-noite.png";

        const glowGeometria = new THREE.SphereGeometry(RAIO * 1.04, 64, 64);
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: 0x5599ff, transparent: true, opacity: 0.15, side: THREE.BackSide,
        });
        scene.add(new THREE.Mesh(glowGeometria, glowMaterial));

        const marcadorGeometria = new THREE.SphereGeometry(0.025, 16, 16);
        const marcadorMaterial = new THREE.MeshBasicMaterial({ color: 0x4088ff });
        const marcador = new THREE.Mesh(marcadorGeometria, marcadorMaterial);
        marcador.position.copy(latLngParaVec3(LAT_LNG_BRASIL.lat, LAT_LNG_BRASIL.lng, RAIO * 1.01));
        grupo.add(marcador);

        function ajustarTamanho() {
            const tamanho = container.clientWidth;
            renderer.setSize(tamanho, tamanho, false);
            camera.aspect = 1;
            camera.updateProjectionMatrix();
        }
        ajustarTamanho();
        window.addEventListener("resize", ajustarTamanho);

        function animar() {
            if (destruido) return;
            if (!arrastando.current && !balaoAbertoRef.current) {
                rotacaoY.current += 0.0018;
            }
            grupo.rotation.y = rotacaoY.current;

            const posMundo = marcador.getWorldPosition(new THREE.Vector3());
            const posTela = posMundo.clone().project(camera);
            const normal = posMundo.clone().normalize();
            const paraCamera = camera.position.clone().sub(posMundo).normalize();
            const visivel = normal.dot(paraCamera) > 0;
            const el = marcador2DRef.current;
            if (el) {
                el.style.left = ((posTela.x + 1) / 2) * 100 + "%";
                el.style.top = ((1 - posTela.y) / 2) * 100 + "%";
                el.style.opacity = visivel ? "1" : "0";
                el.style.pointerEvents = visivel ? "auto" : "none";
            }

            renderer.render(scene, camera);
            frameId = requestAnimationFrame(animar);
        }
        animar();

        function onDragStart(clientX) {
            arrastando.current = true;
            ultimoX.current = clientX;
            renderer.domElement.style.cursor = "grabbing";
        }
        function onDragMove(clientX) {
            if (!arrastando.current) return;
            const delta = clientX - ultimoX.current;
            ultimoX.current = clientX;
            rotacaoY.current += delta * 0.006;
        }
        function onDragEnd() {
            arrastando.current = false;
            renderer.domElement.style.cursor = "grab";
        }

        const dom = renderer.domElement;
        dom.style.cursor = "grab";
        dom.addEventListener("pointerdown", (e) => onDragStart(e.clientX));
        window.addEventListener("pointermove", (e) => onDragMove(e.clientX));
        window.addEventListener("pointerup", onDragEnd);
        dom.addEventListener("touchstart", (e) => onDragStart(e.touches[0].clientX), { passive: true });
        dom.addEventListener("touchmove", (e) => onDragMove(e.touches[0].clientX), { passive: true });
        dom.addEventListener("touchend", onDragEnd);

        return () => {
            destruido = true;
            cancelAnimationFrame(frameId);
            window.removeEventListener("resize", ajustarTamanho);
            window.removeEventListener("pointermove", onDragMove);
            window.removeEventListener("pointerup", onDragEnd);
            renderer.dispose();
            geometria.dispose();
            material.dispose();
            glowGeometria.dispose();
            glowMaterial.dispose();
            marcadorGeometria.dispose();
            marcadorMaterial.dispose();
            texturaAtual?.dispose();
            if (container.contains(dom)) container.removeChild(dom);
        };
    }, []);

    return (
        <div style={{ width: "100%", maxWidth: maxSize, aspectRatio: 1, margin: "0 auto", position: "relative" }}>
            <div ref={containerRef} style={{ width: "100%", height: "100%", overflow: "hidden", borderRadius: "50%" }} />

            {erroTextura && (
                <p style={{
                    position: "absolute", top: "100%", left: 0, right: 0, marginTop: 8,
                    fontFamily: "'Fira Code', monospace", fontSize: 11, color: "#ff6b6b",
                    textAlign: "center", lineHeight: 1.4,
                }}>{erroTextura}</p>
            )}

            <button
                ref={marcador2DRef}
                onClick={() => {
                    setBalaoAberto(v => {
                        const abrindo = !v;
                        if (abrindo) setTextoDigitado("");
                        return abrindo;
                    });
                }}
                aria-label="Localização"
                style={{
                    position: "absolute", width: 26, height: 26,
                    transform: "translate(-50%, -50%)",
                    background: "transparent", border: "none", borderRadius: "50%",
                    cursor: "pointer", padding: 0, opacity: 0,
                }}
            >
                {balaoAberto && (
                    <div style={{
                        position: "absolute", bottom: "calc(100% + 10px)", left: "50%",
                        transform: "translateX(-50%)", whiteSpace: "nowrap",
                        background: "#f5f5f7", color: "#0a0a0c",
                        fontFamily: "'Fira Code', monospace", fontSize: 12, fontWeight: 600,
                        padding: "6px 10px", borderRadius: 6,
                        boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
                    }}>
                        {textoDigitado}
                        <span style={{ opacity: textoDigitado.length < TEXTO_BALAO.length ? 1 : 0 }}>|</span>
                        <div style={{
                            position: "absolute", top: "100%", left: "50%",
                            transform: "translateX(-50%)", width: 0, height: 0,
                            borderLeft: "5px solid transparent", borderRight: "5px solid transparent",
                            borderTop: "5px solid #f5f5f7",
                        }} />
                    </div>
                )}
            </button>
        </div>
    );
}