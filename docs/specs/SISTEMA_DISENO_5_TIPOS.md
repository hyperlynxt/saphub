# Sistema de Diseño — Biblioteca de Guías SAP (5 Tipos de Archivo)

> Documento de especificación / referencia persistente. Este documento es la fuente de verdad del sistema de diseño. El mega-prompt de generación operativo se deriva de acá, no al revés. Cuando algo cambie tras testear un archivo real, se edita este documento — no se vuelve a explicar en el chat.

**Estado:** Los 5 tipos (T1-T5) ya se generaron y ajustaron como piloto real completo, con R2R como curso de prueba — de ahí salieron las reglas de §2 (marco vs. paleta de categorías), §7 (theory-box + versatilidad visual), §11.1 (variedad de formas para posicionamiento en T5), y §15 (excepción de diagonales en hubs, chequeos de ancho/alto, chequeo de `var()` en fill). R2R es el primer curso con el set completo de 5 tipos bajo este sistema. Los HTML previos del proyecto (R2R, AP, AR, AA, GL Master Data, etc. — de ANTES de este sistema de 5 tipos) quedan como referencia visual de lo que gustó/no gustó, pero NO se reconstruyen ni se migran retroactivamente. Todo lo nuevo sigue el criterio de este documento.

---

## 1. Filosofía general

Cada tema/curso de SAP se estudia desde 5 ángulos distintos, cada uno como un archivo HTML independiente:

| # | Tipo | Enfoque | Color |
|---|------|---------|-------|
| T1 | Básico | Teórico, fundamentos | Verde pastel |
| T2 | Profundización | Teórico avanzado + adyacentes | Rojo pastel |
| T3 | Tangibilización Usuario (Fiori) | Práctico, día a día del usuario final | Celeste |
| T4 | Tangibilización Configurador (GUI) | Práctico, tareas de consultor/configurador | Violeta |
| T5 | Holístico / Ecosistema | Posicionamiento dentro de SAP, relaciones entre módulos | Naranja pastel |

Los 5 archivos, leídos juntos, deben dar una comprensión consolidada: qué es (T1), cómo se profundiza (T2), cómo lo vive el usuario (T3), cómo lo configura el consultor (T4), y dónde vive dentro del ecosistema mayor (T5).

**T1–T4 apuntan a la misma longitud aproximada** (10 secciones/diagramas cada uno, ver §5). T5 es más liviano (~8 secciones, sin glosario).

---

## 2. Sistema de color

**Validado contra el piloto T1 (R2R) — distinción clave añadida tras la primera ronda de fixes: color de MARCO vs. paleta de CATEGORÍAS.**

### 2.1 Color de marco (por tipo de archivo)

- Un color fijo por **tipo de archivo**, constante en TODOS los módulos (no cambia según el módulo).
- Paleta pastel.
- Rige el **marco/chrome** del archivo, no el contenido interno de los diagramas: gradiente del hero, borde + fondo tintado del **theory-box** de cada sección (ver §7), el **sec-num** (número cuadrado de cada sección), y la negrita de términos clave dentro del theory-box.
- El módulo SAP (AR, AP, AA, etc.) ya NO se representa con color — se representa con las pills (ver §3).

| Tipo | Color de marco | Hex validado |
|------|-------|-----------------------------------|
| T1 — Básico | Verde pastel | `#7FBF8F` (acento) / `#3D7A52` (marco: sec-num, borde de theory-box, negrita) |
| T2 — Profundización | Rojo pastel | `#E08585` (acento) / `#A94444` (marco) |
| T3 — Usuario/Fiori | Celeste | `#7FC4E0` (acento) / `#2E7096` (marco) |
| T4 — Configurador/GUI | Violeta | `#A78BC9` (acento) / `#6B4C8F` (marco) |
| T5 — Holístico | Naranja pastel | `#E0A56F` (acento) / `#A85F2B` (marco) |

*(Nota: los 5 pares quedaron validados visualmente contra el piloto completo de R2R. Un curso nuevo puede reusar estos mismos hex directamente — no hace falta redefinirlos por módulo.)*

### 2.2 Paleta de categorías (libre dentro de un diagrama puntual)

El color de marco **NO se impone dentro de los diagramas**. Un diagrama que necesita distinguir 3 o más categorías/dominios en paralelo (ej. las 4 entradas de un hub, los niveles de una jerarquía real, un flow de pasos) usa esta paleta fija y reutilizable entre módulos — el resultado se lee mejor y evita "aplanar" todo al mismo color. El marco (theory-box, sec-num) sigue siendo del color del tipo; el diagrama en sí puede ser 100% de esta paleta sin contradicción.

| Categoría | Hex | Uso típico |
|---|---|---|
| FI — Financial Accounting | `#1A4B8C` | navy |
| CO — Controlling | `#1A6B99` | teal-azulado |
| Logística / Operaciones | `#00A896` | teal-verde |
| Compras / Purchasing | `#7E4FBF` | violeta |
| Ventas / Sales | `#E07B39` | naranja |
| Legal / Regulatorio / Externo | `#C9932E` | dorado-mostaza |
| Alerta / Compliance | `#C0392B` | rojo |
| Sistema / Core / Plataforma (nodo ancla, ej. "Universal Journal", "S/4HANA Core") | `#0A0F1C` | navy oscuro |
| Neutral / genérico (sin dominio específico, ej. "sistemas externos") | `#5A6B8C` | gris-acero |

- Los boxes de un diagrama van con **fill sólido + texto blanco** (no outline pastel vacío) — más "vivo" visualmente, validado en T1.
- Esta paleta es la misma para los 5 tipos — no varía según el color de marco del tipo.
- No hace falta usar la paleta completa en cada diagrama; se eligen las categorías que el contenido puntual necesite distinguir. Para sets chicos (2-3 ítems que son variaciones de una misma cosa, no dominios distintos — ej. Leading Ledger vs. Parallel Ledger) alcanza con el color de marco del tipo, sin rainbow.

---

## 3. Pills de módulo (etiquetas)

Reemplazan al sistema de color-por-módulo. Van en el header/hero.

- **Forma:** pill outline (borde, NO relleno sólido — transparente por dentro, se entiende el color por el borde).
- **Pill principal (módulo core del archivo):** borde dorado.
- **Pills secundarias (módulos tangenciales/relacionados):** borde de otro color (no dorado), puede haber 2-4.
- **Idioma:** SIEMPRE en inglés. Ej: "Accounts Receivable" (no "Gestión de Cobros"), "Sales Distribution", etc.
- Esto aplica a los 5 tipos por igual.

---

## 4. Header / Hero — estructura

Aplica a los 5 tipos por igual (con el color de accent correspondiente al tipo):

1. Gradiente navy oscuro + accent del color del tipo.
2. Pills de módulo (principal dorada + secundarias), en inglés.
3. **Título grande en inglés** (con la palabra clave del tema coloreada en el accent del tipo, ej. "**Receivable** Management").
4. Debajo del título grande, más chico: el mismo título pero **en español**.
5. Descripción/subtítulo debajo (idioma a definir en piloto, probablemente español ya que es la explicación).
6. Mini-banner/hlbox justo debajo de la descripción: recuadro con línea vertical de color más oscuro/opaco a la izquierda, fondo del mismo color con opacidad baja (pastel), texto NO itálico, con 2-3 palabras clave en negrita del mismo color. Contenido: el nombre del archivo/tipo (ej. "Resumen Visual — Receivable Management") o, en T3/T4, el bloque de protagonista/overview (ver §10).

---

## 5. Longitud

- **T1, T2, T3, T4:** 10 secciones/diagramas cada uno como default.
  - En T3 y T4, cada sección cuenta como 1 aunque tenga 2 sub-partes (ver §10) — la sección es más larga en superficie visual pero sigue contando como una unidad de las 10.
- **T5:** ~8 secciones, sin glosario.
- **Cursos muy largos (8+ horas de contenido):** no se resuelve con un sistema adaptativo de longitud. El usuario divide el documento fuente en partes/documentos separados y cada parte se trata como curso independiente con su propio set de 5 tipos.

---

## 6. Navegación interna (anchors)

- Nav sticky con links a cada sección (ya existente en archivos previos, se mantiene).
- Los títulos de sección, los nombres de los links de navegación, y el pill del banner de navegación van **en inglés**.
- Cada sección tiene además, a la derecha del título en inglés, la traducción al español en gris, más chica (no siempre aplica — solo donde tenga sentido).
- **Fix técnico obligatorio:** el scroll al hacer click en un link de navegación NO debe cortar el título de la sección (usar `scroll-margin-top` en CSS o equivalente). Esto aplica a todos los archivos nuevos desde ahora.

---

## 7. Secciones — estructura interna común

**Validado contra el piloto T1 (R2R).** Cada sección sigue este patrón (ajustado según tipo):

1. **sec-head:** número cuadrado en el **color de marco del tipo** (NO navy fijo — ver §2.1) + título en inglés (Syne) + traducción español en gris a la derecha (donde aplique) + subtítulo/descripción en muted.
2. **Theory-box** (previo al visual): caja con borde izquierdo + fondo tintado en el color de marco del tipo, **ancho completo** — el mismo ancho que el visual de abajo, nunca un párrafo angosto suelto al costado. Es un elemento **distinto y adicional** al hlbox del header (§4.6) — el hlbox del header queda como está (banner chico, una sola línea, nombre del archivo); el theory-box es más grande, uno por sección, y contiene la explicación teórica. Breve: 2-3 oraciones, no un párrafo largo — el detalle extendido vive en el visual (bullets, cards, tabla), no en el texto. Negrita generosa (2-4 términos clave por caja) en el color de marco, idealmente con una frase de apertura corta en negrita ("¿Qué es X?", "Concepto clave:", "La idea central:" — variar según sección, no repetir la misma fórmula en las 10).
3. **Visual apropiado al contenido**, dentro de `.visual-wrap` (fondo blanco, borde, padding 28-32px, sombra sutil). La forma del visual la elige el contenido, no un molde único — ver §7.1.
4. Cards de apoyo si corresponde (`.g2`/`.g3` grids).

### 7.1 Qué visual usar según el contenido (principio de versatilidad)

No todo es un diagrama de cajas y flechas. Elegir según la forma semántica del contenido:

| Forma del contenido | Visual | SVG o HTML |
|---|---|---|
| Secuencia / proceso con etapas | Flow de pasos: color + ícono + bullets por paso | HTML/CSS |
| Muchos-a-uno / uno-a-muchos (varias fuentes → un centro → varias salidas) | Diagrama *hub*: nodo central, spokes de entrada/salida | SVG (única excepción válida a "nunca diagonales", ver §15) |
| Jerarquía / anidamiento real (niveles genuinos, no parejos) | Árbol de niveles reales — nunca aplanar en una sola fila si el contenido tiene niveles | SVG |
| Filas comparables entre sí (mismo set de atributos por ítem) | Tabla HTML | HTML |
| Comparación binaria o de 2-3 variaciones de una misma cosa | 2 cards lado a lado, color de marco (sin rainbow) | HTML |
| 4+ ítems paralelos que son dominios/categorías distintas | Chips/tags con la paleta de categorías (§2.2) | HTML |
| Partes de un mismo objeto/pantalla (no son categorías distintas, son piezas de una sola cosa) | Card row neutral, color de marco (sin paleta de categorías) | HTML |
| Dos valores que deberían coincidir (conciliación, verificación de balance) | "Equation style": 2 cajas + símbolo central (=, ✓) | HTML |

Por default, usar HTML/CSS (más robusto, menos propenso a errores de coordenadas). Reservar SVG para cuando el layout es genuinamente espacial/relacional: el embudo, el hub, y el árbol de niveles reales son los tres casos típicos por archivo — el resto de las 10 secciones normalmente no necesita SVG.

---

## 8. Reglas específicas T1 — Básico

- **Teórico y conceptual.** Es la explicación de fundamentos.
- **Sin nombres propios de personajes** (Linda, José, Kevin) en diagramas ni texto conceptual — usar el **rol** ("el contador de AR", "el configurador", "el cliente"). El ejemplo tangible con nombres propios queda reservado para T3/T4.
- Puede usar ejemplos puntuales con números/casos concretos SOLO cuando es necesario para que la teoría se entienda (ej. explicar payment difference con una cifra concreta), pero el archivo NO se estructura alrededor de un caso narrativo continuo.
- **Fuente:** exclusivamente el documento/.docx del curso. No se autoriza traer conocimiento externo general para T1.
- **Glosario final obligatorio.** Ver §13.
- 10 secciones/diagramas.

---

## 9. Reglas específicas T2 — Profundización

- Mitad del archivo (~5 secciones): **temas adyacentes** — cosas relacionadas que el T1 no tocó, pero conectadas semánticamente y explicadas de forma que se entienda su relación con lo ya visto en T1 (nunca un salto brusco a algo no conectado).
- Otra mitad (~5 secciones): los **mismos temas del T1 pero con más profundidad/detalle interno** (mecanismo, lógica, casos especiales).
- **Fuente:** primero el documento del curso; si el documento no cubre lo necesario para las secciones adyacentes o de mayor detalle, se autoriza traer conocimiento general de SAP validado (no cualquier fuente) — sin marcarlo visualmente como "externo", queda integrado sin distinción.
- Mismo estilo de rol-sin-nombre-propio que T1 — **confirmado en la práctica** al generar el T2 de R2R, sin inconvenientes.
- **Glosario final obligatorio, con términos DISTINTOS al glosario de T1** (no repetir términos básicos ya cubiertos en T1 — el glosario de T2 es de las cosas nuevas que aparecen en T2).
- 10 secciones/diagramas.

---

## 10. Reglas específicas T3 (Usuario/Fiori) y T4 (Configurador/GUI)

- **T3 = perspectiva del usuario final** operando Fiori en su trabajo diario (imputa, carga, consulta).
- **T4 = perspectiva del consultor/configurador** haciendo customizing en SAP GUI (SPRO, IMG, parametrización).
- **Recorridos independientes:** T3 y T4 NO tienen por qué cubrir el mismo caso de negocio ni ser paralelos sección a sección. El usuario tiene actividades de día a día; el configurador generalmente actúa en otra etapa (antes, configurando reglas/parámetros). Pueden usar ejemplos/protagonistas distintos si conviene a cada uno — no forzar correspondencia 1 a 1.
- **Nombres propios sí aparecen acá** (Linda, José, Kevin, etc., tomados directamente del curso/documento — nunca inventados si el curso ya define quién hace qué rol).
- **Pantallas/mockups:** no son obligatorias en el 100% de las secciones, pero ante la duda de si aplica, SE PONEN. Solo se omiten cuando el tema es un flujo de decisión, comparación conceptual, o algo que no involucra interacción directa con una pantalla.
- **Estructura de doble sub-sección** cuando hay pantalla: cada sección de este tipo, cuando aplica, tiene:
  1. **"Cómo llegaste"** — el recorrido/navegación hasta la pantalla (en T4 esto es idealmente un mini-diagrama fiel a la estructura real de árbol de SPRO: carpetas → subcarpetas → nodo final, con la transacción resaltada en el color violeta del tipo; en T3 puede ser más simple, tipo breadcrumb o navegación de app).
  2. **Pantalla de input/resultado final** — el mockup de la pantalla donde se imputa/ve la información.
  - Estas dos sub-partes cuentan como **1 sola sección** de las 10 (no duplican el conteo), aunque en superficie visual ocupen el doble de espacio que una sección de T1/T2.
- **Fidelidad visual de los mockups:**
  - Fiori (T3): colores reales de SAP (azul SAP, blancos, tiles), estética de tiles/cards redondeadas — dentro del mockup, independientemente de que el resto de la página use el celeste pastel del sistema. Decisiones de forma de bajo costo (ej. tiles verticales vs. horizontales) se resuelven a favor de lo más fiel a Fiori real.
  - GUI (T4): grises reales de SAP GUI clásica, estética de menús/solapas antigua — mismo criterio, dentro del mockup, independiente del violeta pastel del resto de la página.
  - En ambos casos: aproximación reconocible e intuitiva, NO réplica pixel-perfect. El objetivo es dar un panorama general fidedigno, no sustituir ver la pantalla real en SAP.
- **Debe/Haber (Debit/Credit):** cuando una sección involucra un document entry con line items, agregar debajo del diagrama/pantalla una **mini-explicación corta** de por qué cada partida va al debe o al haber. Prioritariamente en T3 (donde más se necesita entender la imputación real), pero aplica también en T4 si el contexto lo amerita.
- **Sin glosario propio** (T3 y T4 no llevan glosario).
- 10 secciones/diagramas cada uno.
- **Protagonista del header (§4.6), validado:** en T3 es un rol/persona con nombre propio del elenco fijo (ej. Kevin, GL & Asset Accounting). En T4 no hay "configurador" con nombre propio en el elenco — usar un framing genérico ("Vos, en el rol de Configurador") con ícono en vez de inicial (ej. 🔧), y una nota que conecte explícitamente con T3 (ej. "esto arma la base que Kevin, José y Linda usan del otro lado, en Fiori").
- **Badge por sección, validado:** en T3, un badge de actor (K/J/L) tiene sentido porque el protagonista cambia sección a sección. En T4 el protagonista es siempre el mismo (el configurador) — ahí un badge de actor repetido no aporta; en su lugar usar un tag del **área de SPRO** de esa sección (ej. "Enterprise Structure", "Controlling", "Materials Management"), que sí varía y da contexto útil.
- **T-codes en pantallas de T4, validado:** solo incluir cuando hay confianza real de que el T-code es correcto (ej. OX02, OKKP, OBYC, FS00 — muy establecidos y estables). Ante la duda, omitir el T-code antes que arriesgar un dato incorrecto en algo que el usuario va a estudiar — no hace falta que cada pantalla lo muestre, el árbol de SPRO ya da suficiente contexto de ubicación.

---

## 11. Reglas específicas T5 — Holístico/Ecosistema

**Validado contra el piloto T5 (R2R).**

- Sin glosario.
- ~8 secciones/diagramas.
- Mitad del contenido enfocado en **posicionamiento**: dónde vive esta sub-sección/tema dentro de capas, ramas o estructuras mayores (ej. esta actividad de AR está dentro de Finance, que está dentro del ecosistema SAP general). Ver §11.1 — "mamushka" es una opción dentro de esta mitad, no el default.
- Otra mitad enfocada en **flujo de entrada/salida con otros módulos**: qué recibe de otros módulos/actividades, qué envía, y desde/hacia qué parte específica (no solo el módulo entero, sino la actividad puntual dentro de ese módulo).
- Vista "de órbita": en qué área conceptual más amplia se ubica el tema (Finance, Controlling, Treasury, etc.) — un tag corto por sección (ej. "🪐 Finance"), no un párrafo.
- No linkea a glosario de T1/T2 ni a ningún otro archivo — cada archivo es autocontenido, sin dependencias de hipervínculo entre archivos del sistema (esto aplica a los 5 tipos, no solo a T5 — ver §12).
- No lleva prerequisites como sección separada — la función de "prerequisito" queda cubierta por las secciones adyacentes de T2.

### 11.1 Posicionamiento — variedad de formas, no default a mamushka

**Aprendizaje clave del piloto T5:** la primera pasada usó círculos/cajas concéntricas (mamushka) para las 4 secciones de posicionamiento por igual, y quedó plano — todo se leía con la misma lógica aunque la relación real entre las cosas no era siempre "esto contiene a esto". Elegir la forma según la relación real:

| Relación real entre las cosas | Forma visual | Ejemplo (R2R) |
|---|---|---|
| Contención pura, una sola cadena, sin hermanos interesantes que mostrar | **Mamushka** — círculos o cajas concéntricas, una adentro de la otra | Universal Journal adentro de FI/CO adentro de S/4HANA Finance adentro de S/4HANA Core |
| El contenedor se abre en 2+ caminos paralelos, y el tema vive específicamente en uno de esos caminos | **Árbol de bifurcación** — un padre, 2+ ramas hermanas, una de las ramas se expande más (la otra queda atenuada/punteada, existe pero no es el foco) | S/4HANA Finance se bifurca en Financial Accounting (atenuada) y Controlling (expandida hacia Profit Center Accounting) |
| Una base/infraestructura compartida que varios elementos usan por igual, en paralelo entre sí | **Fundación + pilares** — una barra ancha abajo (la base), cajas apoyadas encima (los que la usan) | Enterprise Structure como base; Financial Accounting / Controlling / Logistics / Sales como pilares apoyados en ella |
| Una capa técnica o de proceso que se sienta ENTRE otras dos, traduciendo o pasando datos de una a la otra (no "contenida", sino "intermedia") | **Stack de capas horizontales** — bandas apiladas de arriba a abajo, flechas verticales entre ellas, estilo diagrama de arquitectura | Landscape multi-sistema → Central Finance (capa de traducción) → S/4HANA Finance Core |

No hace falta variar las 4 secciones de posicionamiento de un archivo — si 2 temas genuinamente comparten la misma relación (contención pura, por ejemplo), pueden compartir forma. La regla es no *asumir* mamushka por default: mirar primero qué tipo de relación es, después elegir la forma. Misma estética (paleta de categorías, tipografía, colores) en las 4 formas — lo que cambia es la geometría, no el lenguaje visual general del archivo.

**Nota de layout (bug real, piloto T5):** el tag de órbita y el tag de tipo (posicionamiento/flujo) van en su propia fila, debajo del título — NO adentro del mismo contenedor flex que el título. Si comparten fila con un título largo, el `flex-wrap` los manda a una línea nueva por separado y quedan flotando de forma inconsistente entre secciones (según qué tan largo sea cada título). Con fila propia, el layout es idéntico en las 8 secciones sin importar la longitud del título.

---

## 12. Sin links/prerequisitos entre archivos (decisión revertida respecto al brainstorming inicial)

Se descartó la idea original de pills de prerequisito (placeholders punteados linkeando a otros archivos del sistema, ej. "para entender esto necesitás Sales Distribution"). Motivo: complejidad y costo de mantenimiento alto, generación en destiempo. Cada archivo es autocontenido. La función de "qué necesito saber antes" queda parcialmente cubierta dentro de T2 (temas adyacentes) de forma interna al propio archivo, no como link externo.

---

## 13. Glosario (solo T1 y T2)

- Formato: grid de tarjetas (cards) oscuras sobre fondo navy — igual a como ya se veía en archivos previos que gustaron.
- Orden dentro de cada card: **nombre en inglés primero** (destacado), **nombre en español segundo** (como ya se hacía a la derecha en gris/secundario), luego mini-definición corta.
- Cantidad: 8 a 14 términos aproximadamente (ideal ~12, en grid de 3-4 columnas). Cursos con pocos términos técnicos: completar con términos básicos de contabilidad/finanzas relevantes al tema. Cursos con muchos términos específicos de SAP/industria: acercarse al máximo (14).
- **Términos de T1 y T2 NO se repiten entre sí** — el glosario de T2 cubre únicamente vocabulario nuevo introducido en T2 (de las secciones adyacentes o de mayor detalle), no vuelve a listar lo que ya estaba en el glosario de T1.

---

## 14. Running example (elenco fijo — se mantiene igual)

- **Empresa:** Bike Company
- **Sociedad DE01:** Bike GmbH (Alemania, EUR)
- **Sociedad US01:** Bike Inc (EE.UU., USD)
- **Área de Controlling:** A000 / BIKE-CO
- **Kevin** → GL Master Data / Asset Accounting
- **José** → Accounts Payable (proveedor: Tireless Tires)
- **Linda** → Accounts Receivable (cliente: Velotics)
- **Activo fijo:** Excavadora XL-3000 (€120.000, 10 años, lineal)
- **Plan de cuentas:** BIKE

Los roles/protagonistas específicos de cada curso nuevo (más allá de Kevin/José/Linda) se toman directamente del documento fuente cuando el curso los define (los cursos de SAP suelen indicar explícitamente quién hace qué tarea).

**Cuando el documento fuente usa códigos técnicos distintos al elenco fijo (aprendizaje real, piloto T2):** el curso de R2R definía sus propios Company Codes técnicos (1010 para Alemania, 1710 para EE.UU.) en vez de DE01/US01. Se mantuvo DE01/US01 como *label* narrativo por consistencia con el resto de la serie de archivos — el elenco fijo es lo que se mantiene igual entre T1-T5 de un mismo curso, no necesariamente lo que dice el documento al pie de la letra. En cambio, los datos técnicos puntuales de un ejemplo concreto (números de cuenta, códigos de segmento, montos) sí se toman exactos del documento fuente, sin sustituir. Es decir: el *elenco* (nombres, sociedades) se mantiene fijo; los *datos de un ejemplo puntual* dentro de ese elenco vienen del documento.

---

## 15. Reglas SVG (heredadas, siguen aplicando)

1. Dibujar primero líneas/flechas, después los boxes encima.
2. Calcular ancho total de elementos antes de colocarlos — N boxes × width + (N−1) × gap ≤ viewBox width. Incluir también la ALTURA total en el mismo chequeo — verificar que ningún box exceda el height del viewBox (bug real detectado en el piloto T1: un box terminaba más abajo que el viewBox y se cortaba).
3. Jerarquías: estructura de árbol (vertical + horizontal), nunca diagonales. **Excepción validada:** diagramas tipo *hub* (nodo central con entradas/salidas radiales, ver §7.1) sí pueden usar diagonales con flecha — es el idioma natural de ese patrón y se ve muy bien (validado en T1, sección Diario Universal). La regla de "nunca diagonales" queda acotada a jerarquías/árboles, no a hubs.
4. Diagramas radiales: centro del círculo suficientemente abajo, gap visible arriba.
5. Labels solo en espacios abiertos, nunca dentro del rango de un box que se dibuja encima.
6. Font size mínimo en boxes: 10-12px.
7. Solo líneas rectas, no curvas bezier.
8. Verificar que los endpoints de flechas caen dentro del box destino. En diagramas hub (diagonales), esto es más propenso a error que en conectores rectos — requiere validación visual extra antes de darlo por bueno.
9. `fill` en hex, nunca `var()`. Validar `xmlns`. **Recaída real en el piloto T5:** `fill="var(--t5-dark)"` se coló en 7 boxes del mismo archivo y rindió distinto según el navegador/contexto (en algunos se veía bien, en otros el box perdía el color) — exactamente el motivo por el que esta regla ya existía. Antes de dar un archivo por terminado, correr un chequeo de texto simple (`grep 'fill="var('`) sobre el HTML — es más confiable que confiar en que "esta vez no va a pasar".
10. Árbol de SPRO (T4): fiel a la jerarquía real de carpetas/subcarpetas de SPRO. **Resuelto en el piloto T4:** construirlo en HTML/CSS (listas `<ul>` anidadas + `border-left` punteado para las líneas de conexión), no en SVG — elimina por completo el riesgo de solapamiento que esta regla advertía, porque no hay coordenadas que calcular. Validado hasta 5 niveles de profundidad sin errores. Reservar SVG para el árbol de jerarquía REAL de contenido (ej. Enterprise Structure, Profit Center) cuando ese sí necesite boxes con múltiples líneas de texto y color por categoría. **Ojo si en la misma sección aparecen los dos** (el árbol de navegación "Cómo llegaste" Y una jerarquía de contenido real dentro de la pantalla, ej. T4 §5 Profit Center): usar la MISMA técnica de listas anidadas para ambos está bien, pero con estilos visualmente distintos (fuente, color) para que no se confundan — el de navegación en el color de marco del tipo, el de contenido en la paleta neutra/técnica del mockup (Courier New, negro/azul, sin relación con el marco pastel).
11. **Ancho de box vs. ancho de texto (bug real, piloto T1):** antes de fijar el ancho de un box con texto centrado, estimar el ancho real del texto — Syne (display, bold) es notablemente más ancho que Inter al mismo tamaño. Ante la duda, dar más margen de ancho al box en vez de ajustar al píxel; un label largo en Syne bold necesita más aire del que parece.
12. **Conectores entre cards HTML (no-SVG) de un flow de pasos:** anclar cada conector con `position:absolute` a un punto fijo dentro de su propia card (ej. `top` alineado a la altura del header), nunca como ítem flex separado centrado dentro de un contenedor con `align-items:stretch`. Si las cards hermanas tienen distinta cantidad de contenido (bullets), su altura estirada varía y un conector "centrado" queda mal alineado o invisible entre unas y otras (bug real, piloto T1 — sección R2R Process). El patrón que funciona: badge circular con `position:absolute` sobre cada card, mismo `top` fijo en todas.
13. **Recalcular centros al reusar un patrón de coordenadas, no asumir (bug real, piloto T2):** al copiar un layout ya usado (ej. un embudo 2→1) para una sección nueva, recalcular el centro de cada box desde sus propios `x`/`width` (`center = x + width/2`), no reutilizar un valor de centro que "sonaba bien" de otra sección. Un error de cálculo en la planificación se copia fiel a cada instancia que reusa el patrón — pasó dos veces en el mismo archivo (T2 §5 "Cost Center" y T2 §7 "Company Code US01"), ambas con el mismo centro mal calculado (x=670 en vez de x=630), porque la segunda se copió de la primera sin re-verificar.
14. **Evitar colisión de nombres de clase entre componentes distintos del mismo archivo (bug real, piloto T5):** un nombre de clase "obvio" (ej. `.nest` para algo relacionado con anidamiento) puede ya estar en uso para OTRO componente del mismo archivo con un significado visual distinto (ej. `.nest` ya definido como los anillos concéntricos de un diagrama mamushka). CSS no distingue la intención — ambas reglas se aplican a cualquier elemento con esa clase, sin importar cuál se quiso usar. Antes de nombrar una clase nueva, buscar (`grep`) si el nombre ya existe en el archivo con otro propósito.

---

## 16. Naming de archivos

Formato: `t[N]-[modulo]-[nombretema].html`

- Todo en **minúsculas**, separado por **guiones medios** (no guion bajo, no espacios).
- `[N]` = 1 a 5 (tipo de archivo).
- `[modulo]` = código corto del módulo (ar, ap, aa, gl, mm, sd, etc.) — puede omitirse en cursos que ya son de un módulo general amplio, pero se mantiene por ahora.
- `[nombretema]` = nombre del tema/curso, sin espacios, palabras pegadas.
- **Volumen 2** (cuando aplica): el indicador de volumen va pegado al número de tipo → `t1v2-ar-receivablemanagement.html`.
- Fixes/correcciones a un archivo (ej. arreglar un diagrama roto) NO generan un nuevo volumen ni cambian el nombre — sigue siendo el mismo archivo Volumen 1.

**Ejemplos:**
- `t1-ar-receivablemanagement.html`
- `t2-ar-receivablemanagement.html`
- `t3-ar-receivablemanagement.html`
- `t4-ar-receivablemanagement.html`
- `t5-ar-receivablemanagement.html`
- `t1v2-ar-receivablemanagement.html` (si se genera un volumen 2 del tipo 1)

---

## 17. Volumen 2 — cuándo y cómo

- **Disparo:** siempre manual, a pedido explícito del usuario. El sistema no lo sugiere ni lo genera automáticamente.
- **Naturaleza:** NO es una expansión/agregado del Vol. 1. Es un **reentendimiento visual del mismo contenido fuente** (el documento del curso, no el HTML del Vol. 1) con:
  - Diagramas/tipos de visualización DISTINTOS a los usados en el Vol. 1 (si el Vol. 1 usó jerarquías y flowcharts, el Vol. 2 prueba con otro enfoque visual para los mismos temas que no terminaron de cerrar).
  - Cobertura de gaps: temas del documento fuente que faltaron en el Vol. 1.
- Aplica potencialmente a los 4 primeros tipos (T1-T4). No aplica a T5.
- Longitud: apunta a la misma cantidad de secciones que el Vol. 1 del mismo tipo (10), pero puede variar según cuánto contenido faltó cubrir.
- Explícitamente NO incluye una dinámica de "preguntas y respuestas" — eso se descartó, se resuelve directamente preguntando en el chat sin necesidad de generar un archivo.
- En la futura página/hub: el Vol. 2 de un tipo se ubica en una segunda fila, debajo del Vol. 1 correspondiente, dentro de la misma columna de tipo.

---

## 18. Flujo de generación (chat de Proyecto)

- Se trabaja en un chat dentro del Proyecto (no Cowork), con este documento de especificación + un HTML de cada tipo como maqueta subidos como archivos de referencia.
- **No se generan los 5 tipos en la misma tanda/mensaje** — son demasiado largos, sobre todo T3/T4 con su doble sub-sección.
- Orden por default: T1 → T2 → T3 → T4 → T5. El usuario dice "seguí" para avanzar al siguiente tipo tras revisar el anterior.
- El usuario puede pedir explícitamente saltar a un tipo puntual fuera de orden (ej. "hacé directamente el T5") — esto es la excepción, no la norma.
- Correcciones de diagramas puntuales se piden con bajo uso de tokens (pedir el fix específico, no "revisá todo de nuevo").
- Modelo: Sonnet, esfuerzo alto para los primeros archivos de un tipo nuevo (donde se define/valida el criterio), esfuerzo medio una vez el patrón está probado y se está replicando en módulos siguientes.
- **T3 y T4 se generan de una sola vez (aprendizaje actualizado, curso AR):** el lote intermedio de
  4+6 secciones que se usó en el piloto de R2R (para validar el enfoque visual antes de comprometerse
  a las 10) quedó descartado. En el curso de Receivables Management, ambos tipos se generaron con
  las **10 secciones completas en una sola entrega** — igual que T1, T2 y T5 — sin cortes ni bugs.
  Ya no hace falta la validación intermedia.
- **Revisar imágenes embebidas del .docx, no solo el texto extraído (aprendizaje real, piloto T2):** el extractor de texto plano no captura tablas-imagen ni capturas de pantalla incluidas en el documento del curso. Antes de dar por completo el relevamiento de una fuente nueva, extraer y revisar las imágenes embebidas (`python-docx` + `zipfile`, ver qué imagen cae cerca de qué párrafo) — pueden tener datos concretos (números de cuenta, valores de un ejemplo, capturas de pantallas reales de Fiori/GUI) que el texto solo menciona de pasada o ni menciona.

---

## 19. Pendiente / fuera de alcance por ahora

- Página hub (Sublearning o nombre similar con S.A.P.) — postergada hasta tener los 5 tipos completamente validados con al menos los cursos ya hechos.
- Responsive mobile — se diseña desktop-first por ahora; mobile se resuelve cuando se aborde el hub.
- Gap analysis de módulos SAP faltantes en el corpus — después de tener la biblioteca construida bajo este sistema.
- Cursos largos (8+ horas) — se resuelven dividiendo el documento fuente en partes/cursos independientes, no con un sistema de longitud adaptativa.
- Hex de color definitivos — **los 5 tipos validados** (ver tabla de §2.1), más la paleta de categorías de §2.2, común a los 5 tipos. Un curso nuevo reusa estos mismos valores sin redefinir.
- Confirmado en la práctica: T2 mantiene el mismo criterio "rol sin nombre propio" que T1 (se aplicó sin inconvenientes al generar T2 de R2R).

---

## 20. Próximo paso

R2R corrió como piloto real de punta a punta — los 5 tipos generados, revisados visualmente y ajustados. De ahí salieron las reglas de §2, §7, §11.1 y §15. Con el sistema compartido validado contra un curso completo, las opciones por default son: (a) arrancar un curso nuevo desde T1 aplicando todo lo aprendido, (b) una pasada de gap-analysis sobre los 5 archivos de R2R, o (c) empezar a diseñar el hub — a definir con el usuario en cada caso, no hay un default automático más allá de este punto.
