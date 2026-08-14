// ============================================================
//  COMPONENTE: Globe
//  Globo 3D interativo com Three.js — esfera texturizada com um
//  mapa-múndi (public/img/mapa-mundi.png, um asset PRÓPRIO do
//  projeto, carregado do jeito padrão do Three.js, sem depender
//  de nenhum truque de carregamento assíncrono escondido).
//
//  Gira sozinho pra sempre (devagar); arrastando com o mouse/
//  dedo, controla a rotação na direção que puxar. Clicar no
//  marcador azul (Brasil) abre um balão com efeito de digitação.
//
//  Trocamos de "cobe" pra Three.js porque a cobe carrega sua
//  textura via uma Image() com data-URI embutida, e esse
//  carregamento estava falhando silenciosamente no navegador
//  (sem erro no console) — resultado: globo sem os continentes.
//  Usando nossa própria imagem com TextureLoader do Three.js,
//  o carregamento é o caminho padrão/testado da biblioteca.
// ============================================================
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const LAT_LNG_BRASIL = { lat: -15.7801, lng: -47.9292 }; // Brasília
const TEXTO_BALAO = "Localization: Brazil";
const RAIO = 1;

// Converte lat/lng (graus) pra posição 3D na superfície da esfera,
// usando a mesma convenção de UV de uma SphereGeometry padrão do
// Three.js (longitude 0 no "meridiano" da textura equiretangular).
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
    const marcador2DRef = useRef(null); // posição HTML do botão clicável (segue o marcador 3D)

    const rotacaoY = useRef(0);
    const arrastando = useRef(false);
    const ultimoX = useRef(0);
    const balaoAbertoRef = useRef(false);

    const [balaoAberto, setBalaoAberto] = useState(false);
    const [textoDigitado, setTextoDigitado] = useState("");

    useEffect(() => {
        balaoAbertoRef.current = balaoAberto;
    }, [balaoAberto]);

    // Efeito de "digitação" do texto do balão
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
        camera.position.z = 2.6;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // Grupo que gira (facilita separar rotação automática de drag)
        const grupo = new THREE.Group();
        scene.add(grupo);

        // Esfera com a textura do mapa-múndi
        const loader = new THREE.TextureLoader();
        const textura = loader.load("/img/mapa-mundi-noite.png");
        textura.colorSpace = THREE.SRGBColorSpace;
        textura.anisotropy = renderer.capabilities.getMaxAnisotropy();

        const geometria = new THREE.SphereGeometry(RAIO, 64, 64);
        const material = new THREE.MeshBasicMaterial({ map: textura });
        const esfera = new THREE.Mesh(geometria, material);
        grupo.add(esfera);

        // Brilho sutil ao redor (esfera levemente maior, de trás pra frente,
        // só a borda visível — imita o "glow" atmosférico)
        const glowGeometria = new THREE.SphereGeometry(RAIO * 1.04, 64, 64);
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: 0x5599ff, transparent: true, opacity: 0.15, side: THREE.BackSide,
        });
        scene.add(new THREE.Mesh(glowGeometria, glowMaterial));

        // Marcador (ponto azul) na posição de Brasília
        const marcadorGeometria = new THREE.SphereGeometry(0.025, 16, 16);
        const marcadorMaterial = new THREE.MeshBasicMaterial({ color: 0x4088ff });
        const marcador = new THREE.Mesh(marcadorGeometria, marcadorMaterial);
        marcador.position.copy(latLngParaVec3(LAT_LNG_BRASIL.lat, LAT_LNG_BRASIL.lng, RAIO * 1.01));
        grupo.add(marcador);

        function ajustarTamanho() {
            const tamanho = container.clientWidth;
            renderer.setSize(tamanho, tamanho);
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

            // Atualiza a posição 2D do botão clicável, seguindo o marcador 3D
            const posMundo = marcador.getWorldPosition(new THREE.Vector3());
            const posTela = posMundo.clone().project(camera);
            const normal = posMundo.clone().normalize(); // esfera centrada na origem
            const paraCamera = camera.position.clone().sub(posMundo).normalize();
            const visivel = normal.dot(paraCamera) > 0; // > 0 = lado voltado pra câmera
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

        // --- Drag (mouse e touch) ---
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
            textura.dispose();
            if (container.contains(dom)) container.removeChild(dom);
        };
    }, []);

    return (
        <div style={{ width: "100%", maxWidth: maxSize, aspectRatio: 1, margin: "0 auto", position: "relative" }}>
            <div ref={containerRef} style={{ width: "100%", height: "100%" }} />

            {/* Botão invisível posicionado em cima do marcador 3D — só
          existe pra capturar o clique e ancorar o balão */}
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