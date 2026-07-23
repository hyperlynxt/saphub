# PENDIENTES — SAP Hub / Sistema de Tipos T1-T9

> Mega archivo de arranque. Reúne todo lo que quedó abierto, sin definir, o mencionado
> pero no ejecutado, across sesiones. Pensado para subir al Project y arrancar un chat
> nuevo "refrescado" sin perder ningún leftover.
>
> Última consolidación: 22/07/2026.

---

## 0. Cómo leer este archivo

Cada bloque tiene un estado:
- 🔴 **ABIERTO / SIN DEFINIR** — no hay ni siquiera una decisión de base, hay que ramblear/decidir.
- 🟡 **SPEC BORRADOR** — hay un diseño formalizado pero sin piloto real que lo valide.
- 🟢 **EN CURSO** — hay trabajo parcial hecho, falta terminar.
- ⚪ **DOCUMENTACIÓN DESACTUALIZADA** — la práctica ya cambió pero el .md/.txt de referencia no.

---

## 1. Deuda de documentación del sistema base (T1-T6) — ⚪

**Qué pasó:** en algún punto de la producción de Receivables Management confirmaste "hacé las 10
de una" y desde ahí T3/T4 se generan directo en 10 secciones — pero eso solo vive en la práctica
del chat, nunca se escribió en los archivos de referencia.

**Acción pendiente:**
- Actualizar `PROMPT_NUEVOS_CHATS.txt` y `SISTEMA_DISENO_5_TIPOS.md` para que T3 y T4 generen
  como archivo completo de 10 secciones en un solo paso (igual que T1/T2/T5), **eliminando** la
  lógica vieja de tanda 4+6 (4 secciones para validar + 6 para completar).
- Vos mismo pediste dejarlo pendiente hasta terminar los 5 tipos de un curso — ya se cerraron
  varios cursos completos desde entonces (P2P, PS, CO Cost Center Accounting, etc.), así que
  probablemente ya sea buen momento.

---

## 2. "La cosita de un recuadro" — Payables Management — 🔴 SIN DEFINIR

Mencionado **tres veces** en distintos chats (14/7, 15/7, 17/7) y **nunca aclarado**. El mensaje
original se cortó a mitad de frase. Sigue sin resolución.

**Acción pendiente:** preguntarte directamente a qué archivo (T1-T5 de Payables Management) y a
qué recuadro/box te referías, para poder corregirlo.

---

## 3. Tipo 7 — "Controlling Lens" (relación con CO) — 🟡 SPEC BORRADOR

**Qué es:** capa de análisis relacional centrada en CO. No sigue la currícula del módulo — se
organiza por **rama de Controlling**: Overhead Cost Controlling, Product Costing, Margin Analysis.
Muestra cómo un tema/objeto de *cualquier* módulo impacta (o es impactado por) esas tres ramas.

**Identidad visual:**
- Color: **teal** — `--t7-dark` (verde-azulado, distinto de los 7 colores ya usados).
- Sin glosario propio, sin cuota fija de secciones — la cantidad de `relation-entry` por rama
  sigue el contenido real, no un número prefijado.
- Longitud objetivo: **2-3x un archivo típico T1-T6** (sale de la profundidad de cada entrada,
  no de inflar cantidad de secciones — a confirmar en el piloto).
- Se genera **después** de tener T1-T6 (idealmente también T8) completos para ese módulo.
- Naming: `t7-[modulo]-[nombretema].html` (mismo patrón que T1-T6).

**Componente central — `relation-entry` (3 capas de profundidad):**
1. **Capa Meta** — nivel de proceso general.
2. **Capa Objeto** — objeto/transacción específica.
3. **Capa Dato** — campo, código, línea, valor puntual (tipografía JetBrains Mono).

**Metadata en el header de cada entrada:**
- **Badge de impacto, 5 niveles:** Muy Alto / Alto / Medio / Bajo / Muy Bajo — resuelto como
  rampa de saturación de `--t7-dark` (100%→15% opacidad), **no** semáforo rojo/verde.
- **Tag de distancia causal, 4 niveles:** Directo / Indirecto (1 paso) / Indirecto (2+ pasos) /
  Lejano.
- **Tag de fuente:** mismo patrón doc/external que T6 (`📘 Del corpus de CO` vs
  `🌐 Conocimiento general SAP`), adaptado con estilo `.qa-answer--doc` / `.qa-answer--external`.

**CSS ya diseñado** (ver `t7-design-spec.md` completo, generado 21/7, para el bloque exacto):
`.relation-entry`, `.relation-header`, `.impact-badge` (+ 5 variantes de opacidad), `.causal-tag`,
`.relation-layer` (+ variantes meta/objeto/dato).

**🔶 Abierto — decisiones que se cierran recién en el piloto:**
1. Los nombres definitivos de las 5 etiquetas de impacto y las 4 de distancia causal son
   propuesta, no cerrado.
2. ¿El pool de documentos/corpus de CO para nutrir T7 **ya existe** (todo lo generado hasta
   ahora en T1-T6 de módulos CO) o **hace falta curarlo aparte**?
3. ¿El eje organizador de T7 debería ser **rama CO** (como está spec-eado ahora) o **currícula
   propia del módulo, con rama CO como tag/filtro**? Esto cambia la estructura de secciones.
4. Sin piloto real generado todavía — cero validación práctica.

---

## 4. Tipo 8 — "In & Out / Flujo Granular" — 🟡 SPEC BORRADOR

**Qué es:** a diferencia de T7 (mirada específica de CO), T8 es **genérico** — aplica a cualquier
módulo. Traza, para los objetos/actividades clave, **qué entra** (de dónde, en qué campo/forma) y
**qué sale** (hacia dónde, en qué forma). Es de linaje de datos a nivel de campo, no relacional.

**Identidad visual:**
- Color: **índigo** — `--t8-dark`, distinto del violeta de T4 y del celeste de T3.
- Componente central: **`io-flow`**, layout de 3 columnas (entrada / objeto-actividad / salida).
- Naming: `t8-[modulo]-[nombretema].html`.

**🔶 Punto crítico sin cerrar — el más importante de los dos specs:**

`SISTEMA_DISENO_5_TIPOS.md` §11 ya define que la mitad de las secciones de T5 cubren "flujo de
entrada/salida con otros módulos: qué recibe, qué envía, desde/hacia qué actividad puntual". Eso
suena muy cerca de T8.

**Hipótesis de trabajo (NO validada):**
- **T5** se queda a nivel de **actividad/módulo** — "esta actividad de AR recibe de esta actividad
  de SD".
- **T8** baja un piso más, a nivel de **campo/valor/dato puntual** — "este campo de este objeto
  alimenta ese campo de aquel objeto" (ejemplo dado: BOM → entra cantidad+precio de materia prima
  → sale hacia el costeo de producto).

Si la distinción es esa, T8 extiende a T5 en granularidad y no lo duplica. Si **no** es esa la
distinción real, hay que redefinirla **antes** de generar el primer piloto T8, para no terminar
con contenido repetido entre los dos tipos.

**🔶 Abierto:**
1. Confirmar o corregir la hipótesis de distinción T5 vs T8 (arriba).
2. Sin piloto real generado todavía.

---

## 5. 🆕 Tipo 9 (a definir) — "Consultor / Traducción a Negocio" — 🔴 SIN DEFINIR (nuevo, pedido hoy)

**Qué es (según lo que planteaste hoy):** un tipo nuevo que **no** es la mirada de usuario (T3) ni
de configurador (T4), sino específicamente la mirada de **consultor SAP**: traducir la temática
técnica del módulo/curso a **terminología de negocio real**. El eje no es "cómo uso la pantalla"
ni "cómo configuro el sistema", sino:

- Qué significa este módulo/tema **en términos de negocio** (no SAP-speak).
- Con qué **áreas del negocio** se relaciona ese módulo/curso específico (Finanzas, Compras,
  Ventas, Operaciones, Legal, Tesorería, etc. — dependiendo del tema).
- Qué **preguntas de negocio** típicamente hace o recibe un consultor sobre este tema (ej.
  "¿cómo querés que se reconozca el ingreso?", "¿tenés varias entidades legales?", "¿cuál es tu
  política de cierre?").
- El trabajo real de consultoría alrededor de ese tema: discovery, workshops, decisiones de
  diseño que hay que tomar con el cliente, trade-offs de negocio (no solo técnicos).

**Estado real:** esto es una idea recién planteada, **sin ningún trabajo previo** — a diferencia
de T7/T8 que ya tienen brainstorming + spec borrador, T9 (nombre provisorio, a definir número real
— podría terminar siendo T7 y correr T7/T8 actuales a T8/T9, a decidir) todavía no tiene:
- Nombre de tipo definitivo ni número definitivo en la secuencia.
- Color asignado.
- Estructura de secciones.
- Componentes visuales propios.
- Ningún piloto.

**Acción pendiente:** sesión de rambling dedicada (como se hizo para T6 y para T7/T8) para
formalizar esto en un spec borrador. Preguntas para esa sesión:
1. ¿Va con protagonista (como T3/T4) o es más neutro/analítico (como T7)?
2. ¿Se apoya en un componente tipo "business-question-card" + "área de negocio relacionada" +
   "traducción técnico→negocio"?
3. ¿Se genera con el mismo corpus que T1-T6 o necesita input adicional (casos reales de
   consultoría, ejemplos de discovery)?
4. ¿Dónde entra en el orden de generación — antes o después de T7/T8?

---

## 6. Sección de Industrias en la página — 🔴 ABIERTO

Existe únicamente como **workstream #2** dentro del plan de acción rankeado (sesión 21/7):
"Industry Overlays" — cost drivers específicos por industria (aerolíneas, manufactura, servicios,
etc.) aplicados sobre los módulos ya cubiertos.

**Estado real:** cero contenido generado, cero sección armada en el Hub. Prioridad #2 de 4
workstreams, después de "Fundamentos" (Product Costing, Controlling, SAP Ecosystem).

**Acción pendiente:** definir qué industrias cubrir primero, si es contenido nuevo tipo T1-T9
aplicado con lente de industria, o una capa distinta (overlay/filtro sobre contenido existente),
y cómo se refleja en el Hub (¿sección nueva? ¿filtro adicional en `library.json`?).

---

## 7. Migración a Claude Code / flujo seamless — 🔴 ABIERTO (parcialmente en curso)

**Lo que ya existe:**
- Las skills `sap-learning-extractor` (extracción de cursos SAP Learning → .docx) y
  `sap-course-qa-notes` (T6) ya están armadas en formato correcto: `SKILL.md` + carpeta
  `references/`, subidas vía Upload Skill **en Claude Chat / Project**.
- Empezaste a explorar la pestaña Code de Claude Desktop (17/7), conectándola a tu repo local —
  quedó ahí, sin continuar.

**Lo que falta:**
- Las skills **todavía no existen en formato Claude Code** — dijiste explícitamente "todavía no
  creé archivos en Claude Code, quiero formato skill y archivos no zip ni folders" (sesión 22/7),
  lo cual se resolvió para Claude Chat pero no se replicó en Code.
- Sin decisión tomada sobre el mecanismo de sincronización entre notebook (Claude.ai) y desktop
  (Claude Code) para que el flujo sea fluido. Opciones que quedaron sobre la mesa sin elegir:
  1. Claude Code en modo remoto/SSH (el desktop maneja todo, sin paso de transferencia).
  2. Carpeta cloud-sync (Google Drive/Dropbox/OneDrive) como intermediaria.
  3. Workflow de git que ya usás — push desde notebook, pull en desktop antes de que Code arranque.
  4. Conector de GitHub que ya tenés configurado — push automático a repo, pull automático del
     lado desktop.
- Objetivo final planteado por vos: que **todo el proceso T1-T9 + hub + skills** corra desde
  Claude Code de forma "seamless y flow-like", sin tener que copiar/pegar entre plataformas.

**Acción pendiente:** decidir el mecanismo de sync (probablemente git + GitHub connector, ya que
es lo que menos fricción nueva agrega) y portar las skills a formato Claude Code.

---

## 8. Diferencia entre cursos de 1hr vs 4hr (longitud adaptativa) — 🔴 ABIERTO

**Lo único resuelto:** cursos de **8+ horas** de contenido → NO longitud adaptativa, se avisa
dividir el .docx fuente en partes/cursos independientes, cada uno con su propio set de tipos.
Eso está en `SISTEMA_DISENO_5_TIPOS.md` §7.

**Lo que sigue sin definir:** la franja intermedia — un curso de 1-2hs vs uno de 4hs, **ambos
por debajo del umbral de 8hs**, actualmente reciben la misma cantidad fija de secciones (10 para
T1-T4, ~8 para T5). Tu preocupación original (sesión 13/7, nunca cerrada):
- Un curso corto con la misma cantidad de diagramas que uno largo puede quedar "estirado" o con
  contenido de relleno.
- Un curso largo con la misma cantidad fija puede quedar comprimido/superficial.
- Pediste explícitamente **no** que sea hiperdependiente de una fórmula compleja — la idea era
  2-3 longitudes predeterminadas (corta/default/larga) en vez de un cálculo por página/palabra.

**Acción pendiente:** cerrar una regla simple — ej. "curso ≤2hs → longitud corta (X secciones);
curso 2-6hs → default (10); curso 6-8hs → default extendido; 8+hs → dividir en partes" — o el
criterio que prefieras, pero **cerrarlo**, porque quedó abierto desde la sesión fundacional.

---

## 9. Profesionalizar y diseñar la página SAP Hub — 🟢 EN CURSO

**Lo que ya existe:**
- `index.html` vivo en GitHub Pages, dirigido por `library.json`.
- Cards de curso con **modal popup** (ya no scrollea a un panel inferior) — implementado 17/7,
  vanilla JS, sin dependencias nuevas. Muestra pill de módulo, título, mini-descripción
  (`COURSE_META`), y botones por tipo coloreados con su color de marco; tipos no generados
  aparecen atenuados con "Coming soon".
- Mega-agrupaciones ya definidas: Outlining the Financial Process, Cost Management, Record to
  Report.
- Pediste blend-in del header/top banner con la sección de arriba y sacar los contadores ("1
  courses, 1 files", etc.) — **no quedó registrado si se terminó** en esa sesión (17/7).

**Lo que quedó sin decidir:**
- Sesión completa (17/7, "Rutas de acción para página HTML") presentando **3 arquitecturas**
  para escalar el hub — sin elegir ninguna:
  1. **Astro** — generación estática, build-time sobre `library.json`.
  2. **Eleventy (11ty)** — templating más liviano (Nunjucks/Liquid), `library.json` como data
     file nativo.
  3. **Sin generador** — JS vanilla client-side + GitHub Actions automatizando validación y
     actualización de `library.json` en cada push (sin paso de build local).
  - Tradeoff señalado: Astro/Eleventy necesitan paso de build con Node; la opción sin generador
    mantiene el workflow manual actual pero escala peor para filtrado complejo.
- Fase 2 (automatización vía GitHub API, mencionada en visión de largo plazo) — no iniciada.
- "Profesionalizar el diseño" en sí (más allá de arquitectura técnica) — sin sesión dedicada
  todavía a nivel visual/UX puro (tipografía, jerarquía, landing hero, etc. del propio hub, no de
  los archivos T1-T9).

**Acción pendiente:** elegir ruta de arquitectura (probablemente la opción 3, sin generador, dado
tu preferencia ya declarada por HTML/CSS/JS plano y mínimas dependencias) y, en paralelo, una
sesión de rediseño visual dedicada al hub en sí.

---

## 10. Secciones de los HTML como popup en vez de top banner — 🔴 A CONFIRMAR ALCANCE

**Lo que ya se hizo (posiblemente esto es a lo que te referís):** en el **Hub** (landing page),
las course cards pasaron de expandir un panel abajo a abrir un **modal popup** (17/7).

**Lo que NO encontré:** ningún pedido de convertir la **navegación interna** de los archivos
individuales T1-T9 (el nav sticky con links a cada sección, que hoy vive fijo arriba de cada
archivo) en un popup/modal en vez de estar siempre visible como top banner.

**Acción pendiente:** confirmar el alcance real —
- (a) si ya está resuelto (era el cambio del Hub) → cerrar este ítem, o
- (b) si es un pedido nuevo: cambiar en masa el nav sticky de **todos** los archivos T1-T9 ya
  generados (más de 15 cursos completos entre R2R, AP, AR, AA, GL, CO, O2C, P2P, PP) de banner
  fijo arriba a un ícono/botón que abre un popup de navegación. Esto sería un cambio retroactivo
  grande — conviene decidir el patrón de diseño primero en un archivo piloto antes del rollout
  masivo, como se hizo con T1-T5 en su momento.

---

## 11. Sección de Treasury y sección de CO en la página — 🔴 ABIERTO

**Treasury:** solo aparece mencionado como **ejemplo de área conceptual** dentro de la
descripción de la vista "de órbita" de T5 (`Finance, Controlling, Treasury, etc.`). **Nunca se
trabajó como módulo propio** — no hay ningún curso/contenido T1-T9 de Treasury generado todavía.

**CO:** al contrario, tiene **bastante contenido ya generado** (Cost Management & Profitability
Analysis, Overhead Cost Controlling Basics, Processes in Management Accounting, Cost Center
Accounting, Project Controlling) — pero **no existe una página/sección temática dedicada a CO**
en el Hub, más allá de las cards individuales agrupadas genéricamente. No hay mega-course
grouping tipo "Cost Management" consolidando todo el material CO de forma curada (a diferencia de
R2R que sí tiene su propio grouping).

**Acción pendiente:**
1. Para CO: armar una sección/mega-course landing dedicada, dado que ya hay masa crítica de
   contenido.
2. Para Treasury: decidir si es contenido nuevo a generar desde cero (necesita curso fuente de
   SAP Learning) o si por ahora solo se deja el placeholder en el Hub para cuando haya contenido.

---

## 12. Resumen ejecutivo — próximos pasos sugeridos (para decidir orden)

1. Aclarar **"la cosita del recuadro"** (§2) — es rápido y lleva 3 sesiones dando vueltas.
2. Cerrar la **actualización de docs T3/T4** (§1) — también rápido, es solo reflejar la práctica.
3. Decidir alcance real de **popup vs banner en HTML individuales** (§10) — antes de comprometerse
   a un rollout masivo.
4. Sesión de rambling para **Tipo 9 / Consultor** (§5) — nuevo, alto valor declarado hoy.
5. Elegir piloto real para **T7 o T8** — resolver primero la superposición T5/T8 (§4) antes de
   generar el primer archivo.
6. Cerrar regla de **longitud 1hr vs 4hr** (§8) — bloquea calidad de contenido futuro si no se
   define.
7. Elegir arquitectura del **Hub** (§9) y decidir mecanismo de sync para **Claude Code** (§7).
8. **Industrias** (§6) y **Treasury/CO landing** (§11) — más largo plazo, dependen de tener el
   resto del sistema estabilizado.
