# SAP Hub — Bootstrap para Claude Code

> Este paquete se generó desde el Project de Claude.ai para migrar el contexto completo
> (skills, specs, prompts, mockups, pendientes) al repo `hyperlynxt/saphub`, de forma que
> Claude Code pueda arrancar a trabajar sin depender del Project de Claude.ai.
>
> Generado: 23/07/2026.

---

## 0. Instrucción rápida para Claude Code

Este zip/carpeta (`saphub-bootstrap/`) se sube a la raíz del repo (o se descomprime ahí)
como carpeta temporal. La tarea es: **mover cada archivo a su destino final dentro del
repo** (crear las carpetas de destino si no existen), y después borrar `saphub-bootstrap/`
una vez confirmado que todo quedó bien ubicado. No pisar archivos existentes en el repo sin
avisar — si `library.json`, `index.html` u otro archivo ya existe en destino, preguntar antes
de sobreescribir.

---

## 1. Mapeo de destino

| Origen (dentro de este paquete) | Destino sugerido en el repo | Notas |
|---|---|---|
| `skills/sap-learning-extractor/` | `.claude/skills/sap-learning-extractor/` (o la carpeta de skills que use Claude Code — típicamente `.claude/skills/`) | Skill completa con `SKILL.md` + `references/`. Mantener la estructura de carpeta intacta. |
| `skills/sap-course-qa-notes/` | `.claude/skills/sap-course-qa-notes/` | Skill T6 (Q&A/repaso). Solo tiene `SKILL.md` por ahora. |
| `specs/SISTEMA_DISENO_5_TIPOS.md` | `docs/specs/SISTEMA_DISENO_5_TIPOS.md` | Spec madre — gobierna T1-T5. Fuente de verdad de estructura, colores, reglas de sección. |
| `specs/PROMPT_NUEVOS_CHATS.txt` | `docs/specs/PROMPT_NUEVOS_CHATS.txt` | Prompt de arranque de pipeline (el que se pega en un chat nuevo para ejecutar T1-T5). |
| `specs/t6-design-spec.md` | `docs/specs/t6-design-spec.md` | Spec de diseño T6 (Q&A/double-click), color gold, componente `qa-box`. |
| `specs/t6-proceso-notas-qa-repaso.md` | `docs/specs/t6-proceso-notas-qa-repaso.md` | Flujo completo de T6: notas → Q&A inicial → repregunta en vivo → integración. Complementa el spec de arriba. |
| `specs/PENDIENTES.md` | `docs/specs/PENDIENTES.md` | Mega archivo de pendientes — incluye **los drafts de T7 y T8** (y el planteo inicial de T9) embebidos adentro, no como archivos aparte (ver §3 abajo). |
| `mockups/t1-r2r-recordtoreport.html` … `t5-r2r-recordtoreport.html` | `docs/mockups/` (o la carpeta de ejemplos que uses, ej. `examples/r2r/`) | Archivos de referencia visual real (curso R2R completo, los 5 tipos). Sirven como "ground truth" de cómo debe verse cada tipo. |
| `mockups/t6-co-costmanagementprofitabilityanalysis.html` | `docs/mockups/` | Mockup real de T6 (CO — Cost Management & Profitability Analysis, unidad 1). |

Si el repo todavía no tiene `.claude/skills/` o `docs/specs/` o `docs/mockups/`, crearlas.

---

## 2. Qué falta en este paquete (no está generado todavía)

- **`t7-design-spec.md` y `t8-design-spec.md` como archivos independientes no existen** —
  el diseño de T7 ("Controlling Lens") y T8 ("In & Out / Flujo Granular") vive **embebido
  dentro de `PENDIENTES.md`** (secciones 3 y 4), incluyendo la lógica de color, componentes
  (`relation-entry`, `io-flow`), naming y las preguntas abiertas sin cerrar. No se separó en
  archivo propio porque ninguno de los dos tiene piloto real generado todavía — están en
  estado "spec borrador" (🟡), no validados.
- **T9 ("Consultor / Traducción a Negocio")** — mencionado en `PENDIENTES.md` §5, es solo una
  idea planteada, sin spec, sin color, sin estructura. No hay nada que migrar todavía más allá
  de ese párrafo.
- **`library.json`, `index.html` del Hub, y el resto del repo ya publicado en GitHub Pages**
  no se incluyen acá — ya están en el repo (`hyperlynxt/saphub`), este paquete es solo el
  contexto de generación que faltaba subir.
- La skill `sap-course-qa-notes` en este paquete solo trae `SKILL.md` (no tiene carpeta
  `references/` propia todavía — el detalle del proceso vive en `t6-proceso-notas-qa-repaso.md`).

---

## 3. Meta dinámica del sistema (para que Claude Code entienda el objetivo, no solo mueva archivos)

**Qué es esto:** Teo (SAP configurator, self-estudiando FI/CO para ser consultor SAP) construye
una biblioteca visual personal de guías HTML de estudio para SAP S/4HANA, organizada en un
sistema de hasta 9 tipos de archivo por curso/unidad (T1-T9, T7-T9 en distintos grados de
madurez). Vive públicamente en GitHub Pages (`hyperlynxt.github.io/saphub`).

**Los 9 tipos (estado actual):**
1. **T1 Básico** (verde) — fundamentos teóricos, 10 secciones, glosario bilingüe. ✅ Estable.
2. **T2 Profundización** (rojo) — 5 profundizaciones + 5 temas adyacentes, glosario propio sin
   overlap con T1. ✅ Estable.
3. **T3 Usuario/Fiori** (celeste) — recorrido de pantallas Fiori con protagonistas nombrados,
   sin glosario. ✅ Estable.
4. **T4 Configurador/GUI** (violeta) — pantallas SPRO/customizing estilo SAP GUI clásico, sin
   SVG, sin glosario, protagonista genérico "Configurador". ✅ Estable.
5. **T5 Holístico/Ecosistema** (naranja) — 8 secciones: 4 geometrías de posicionamiento + 4
   diagramas de flujo, sin glosario. ✅ Estable.
6. **T6** (gold) — capa de repaso Q&A: convierte notas personales de Teo (con marcadores de
   pregunta inline) en HTML estructurado, con tag visual de fuente (documento vs. conocimiento
   externo). Tiene proceso de 3-4 fases incluyendo repregunta en vivo en el chat. ✅ Estable.
7. **T7 "Controlling Lens"** (teal) — 🟡 spec borrador, sin piloto. Capa relacional centrada en
   CO: organiza por rama de Controlling (Overhead Cost Controlling, Product Costing, Margin
   Analysis) en vez de por currícula del módulo. Se genera después de tener T1-T6 de un módulo.
8. **T8 "In & Out / Flujo Granular"** (índigo) — 🟡 spec borrador, sin piloto. Traza linaje de
   datos a nivel de campo (qué entra, qué sale) para objetos/actividades clave. Punto crítico
   sin cerrar: posible solapamiento con las secciones de flujo I/O de T5 — hipótesis de trabajo
   es que T5 queda a nivel actividad/módulo y T8 baja a nivel campo/valor, pero no está validado.
9. **T9 "Consultor / Traducción a Negocio"** (sin color/spec) — 🔴 sin definir, planteado recién.
   Mirada de consultor SAP: traducir el tema técnico a términos de negocio, áreas relacionadas,
   preguntas típicas de discovery.

**Caso de negocio canónico usado en todos los ejemplos:** Bike GmbH (DE01, EUR) / Bike Inc
(US01, USD), Área de Controlling A000 (BIKE-CO), Plan de cuentas BIKE. Cast fijo de
protagonistas: Kevin (GL/Activos/Controlling), José (Cuentas a Pagar), Linda (Cuentas a Cobrar),
Priya (Controlling/CO).

**Pipeline de contenido:** se scrapea una unidad/curso de SAP Learning (`learning.sap.com`) →
se compila a un `.docx` fuente (skill `sap-learning-extractor`) → ese `.docx` alimenta la
generación T1-T8 siguiendo `SISTEMA_DISENO_5_TIPOS.md` + `PROMPT_NUEVOS_CHATS.txt`. Aparte,
existe un pipeline paralelo (skill `sap-course-qa-notes` + specs T6) que toma notas de estudio
personales de Teo con marcadores de duda y genera el T6 correspondiente.

**Módulos SAP ya cubiertos (con distinto nivel de completitud T1-T5):** R2R, AP, AR, AA, GL
(varias unidades), CO (varias unidades — Cost Management & Profitability Analysis, Overhead
Cost Controlling Basics, Processes in Management Accounting, Cost Center Accounting, Project
Controlling), O2C, P2P, PP, PS (Project Systems).

**Reglas de diseño no negociables (ver spec completo para el resto):**
- SVG nunca usa `fill="var(--variable)"` — siempre hex hardcodeado (las CSS custom properties
  no funcionan en atributos `fill` de SVG crudo, falla silenciosamente).
- T5: 4 geometrías distintas por archivo, ninguna repetida más de 2 veces.
- Glosarios de T1 y T2 no pueden compartir términos.
- T3 usa protagonistas nombrados; T4 siempre usa el configurador genérico, nunca un personaje.
- T6: toda respuesta debe tener distinción visual inequívoca doc-sourced (pill/borde gold)
  vs. external-knowledge (pill/borde gris punteado).

**Pendientes explícitos a no perder de vista (detalle completo en `PENDIENTES.md`):**
- Actualizar `PROMPT_NUEVOS_CHATS.txt` y `SISTEMA_DISENO_5_TIPOS.md` para que T3/T4 generen
  en un solo paso de 10 secciones (eliminar lógica vieja de tanda 4+6).
- "La cosita de un recuadro" en un archivo de Payables Management — mencionado 3 veces, nunca
  aclarado. Preguntarle a Teo directamente a qué archivo/recuadro se refería.
- Resolver el solapamiento T5/T8 antes de generar el primer piloto T8.
- Definir si T7 se organiza por rama CO o por currícula de módulo con rama CO como tag.
- Sesión de definición para T9 (nombre final, número en la secuencia, color, estructura).
- Migración completa del flujo a Claude Code: decidir mecanismo de sync notebook↔repo (este
  mismo paquete es un primer paso manual hacia eso).

---

## 4. Convención de nombres (para que Claude Code la respete al generar archivos nuevos)

`t[N]-[modulo]-[nombretema].html`, todo en minúsculas, kebab-case. Códigos de módulo en uso:
`gl`, `ap`, `ar`, `aa`, `r2r`, `co`, `o2c`, `p2p`, `pp`, `ps`. Volumen 2 (reinterpretación visual
del mismo contenido, no un addendum): `t1v2-[modulo]-[tema].html`. Los archivos que salen del
extractor de SAP Learning (fuente `.docx`) usan el título de la unidad/curso en kebab-case, sin
prefijo `t[N]`.
