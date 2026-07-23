# T6 — Proceso completo: Notas + Q&A + Repaso en vivo

> Documento de especificación / referencia persistente, compañero de `t6-design-spec.md` (que define los componentes visuales) y del skill `sap-course-qa-notes` (que define el armado inicial). Este documento describe el **flujo completo de principio a fin**, incluyendo la fase que todavía no estaba documentada: la ronda de repreguntas en vivo dentro del chat y su integración posterior al HTML. Si algo de acá cambia tras un curso real, se edita este documento — no se re-explica en el chat.

---

## 1. Las tres fases

```
Fase 1               Fase 2                    Fase 3
Insumos      →       T6 inicial          →     Ronda de repreguntas      →    Fase 4
(notas +             (notas Q&A                en vivo, en el chat            Integración
doc fuente)          resueltas,                (dudas de seguimiento,         visual al
                      grounded en doc)          sin archivo por pregunta)     HTML existente
```

El T6 no se arma en una sola pasada. Se arma inicial (Fase 2), después se usa como base de estudio y ahí surgen dudas nuevas que el archivo original no cubría (Fase 3), y recién al final esas dudas se bajan al HTML (Fase 4). Las fases 3 y 4 pueden repetirse varias veces sobre el mismo archivo — no generan volúmenes nuevos (T6 no tiene Vol. 2, ver `t6-design-spec.md` §7).

---

## 2. Fase 1 — Insumos

1. **Documento fuente** del curso (`.docx` o `.md` ya extraído) — la fuente de verdad.
2. **Notas de Teo** con marcadores `Q&A ->` / `Q&A:` / `*Q&A ...*` inline — su recorrido real de estudio, sin reordenar.

Si falta uno de los dos, preguntar cuál falta antes de arrancar.

---

## 3. Fase 2 — Generación inicial del T6

Sigue el flujo ya definido en el skill `sap-course-qa-notes` (no se repite acá completo):

1. Extraer el `.docx` con pandoc + revisar imágenes embebidas (`unzip -j ... word/media/*`).
2. Parsear las notas preservando el orden y agrupación de Teo — su flujo de estudio es la estructura del archivo.
3. Responder cada `Q&A` marcado: doc-sourced primero, external solo si el documento no alcanza, mixed si combina ambos. Nunca inventar una cita del documento.
4. Armar el HTML siguiendo `t6-design-spec.md` (color gold `--t6`, `note-box`, `qa-box` con sus variantes `--doc` / `--external`, hero con stats, sin glosario, longitud flexible).
5. Guardar en `/mnt/user-data/outputs/`, presentar, Teo revisa manualmente antes de ir al repo.

Esta fase entrega un T6 que responde **solo lo que ya estaba marcado como duda en las notas originales**.

---

## 4. Fase 3 — Ronda de repreguntas en vivo

Esto arranca después de que Teo ya tiene el T6 (o lo está leyendo) y le quedan dudas nuevas que no estaban en sus notas originales — surgen de releer, de una respuesta anterior que abrió otra pregunta, o de querer profundizar un punto puntual.

**Cómo se comporta el asistente en esta fase:**

- Responde **en el chat, conversacionalmente** — nunca genera un archivo nuevo por cada pregunta. El HTML no se toca todavía.
- Cada respuesta sigue el mismo criterio de fuente que en la Fase 2: doc primero, general knowledge como fallback, marcando cuál es cuál si hace falta (acá alcanza con decirlo en prosa, no hace falta el componente `qa-box` — eso es solo para el archivo final).
- Si una pregunta anterior quedó mal resuelta, corregirla directamente cuando surja el follow-up — no defender la respuesta vieja.
- Si Teo mezcla varias preguntas en un mensaje o encadena dudas relacionadas, contestar todas, pero sin alargar de más — el criterio del skill original ("doble-click, no re-enseñar el tema entero") aplica también acá.
- Diagramas o tablas dentro del chat (vía la herramienta de visualización) son opcionales y sirven para que la explicación se entienda mejor en el momento — **no reemplazan** el diagrama que después va a vivir en el HTML; ese se rediseña con el estilo del sistema T1-T6 en la Fase 4, no se copia tal cual.
- No hay que preguntar "¿querés que actualice el HTML ya?" en cada turno — se sigue respondiendo hasta que Teo lo pida explícitamente.

**Señal de cierre de esta fase:** un mensaje tipo "ya terminé", "dale, ahora sí armá el HTML", "integrá todo esto" — ahí se pasa a la Fase 4.

---

## 5. Fase 4 — Integración visual al HTML

Regla dura, explícita: **todo lo acumulado en la Fase 3 entra al HTML de forma visual — nunca como bloque de texto pegado**. Un párrafo largo dentro de un `qa-answer` está bien para una respuesta corta y puntual, pero cuando la respuesta tiene una comparación, una secuencia, una jerarquía o una tabla de roles, usa el componente que corresponda (ver §6).

**Dónde va cada cosa:**

- Si la repregunta profundiza una sección que ya existe → se agrega **dentro de esa sección**, como `qa-box` nuevo o ampliando el existente. No se crea una sección aparte solo porque la pregunta llegó después.
- Si la repregunta abre un tema que no tenía sección propia (ej. Material Ledger cuando el documento fuente solo mencionaba Material Master de pasada) → se crea una **sección nueva al final**, numerada en secuencia, con su propio `note-box` de encuadre.
- Actualizar el **nav** (`.topnav`) si se agregó una sección nueva.
- Actualizar el **hero stats banner** (`.hlbox`) para reflejar que hubo una ronda de repreguntas en vivo además de las preguntas originales del documento — no hace falta contarlas una por una, alcanza con nombrar los temas cubiertos.

**Antes de dar el archivo por terminado:**

- `grep 'fill="var('` — no debe aparecer ninguno en los SVGs nuevos.
- Contar `<svg>` vs `</svg>`, `<section>` vs `</section>`, `<div>` vs `</div>` — deben coincidir.
- Revisar que cada SVG tenga su viewBox calculado (no copiado de otro diagrama) y que ningún texto quede montado sobre otro elemento.

---

## 6. Componentes reutilizables para la Fase 4

Estos componentes no estaban en `t6-design-spec.md` original — se sumaron durante la primera ronda de integración y quedan disponibles para las próximas. Van tintados en gold/steel (los mismos tokens `--t6-dark` / `--steel` de T6), y los diagramas SVG usan la paleta de categorías de `SISTEMA_DISENO_5_TIPOS.md` §2.2 (fill sólido + texto blanco, nunca `var()` en el atributo `fill`).

| Situación de contenido | Componente | Notas |
|---|---|---|
| Filas comparables (ej. PP vs. MM vs. CO, Cost Center vs. Internal Order vs. Project) | `.data-table` | Tabla HTML simple, header en mayúsculas pequeñas |
| Comparación binaria (ej. MTS vs. MTO, Material Master vs. Material Ledger) | `.compare-grid` + `.compare-card` (`.alt` para el segundo) | Dos cards lado a lado, borde superior de color |
| Enumerables paralelos, sin orden ni jerarquía (ej. los 4 destinos de un ingreso) | `.chip-grid` + `.chip` (`.fallback` para el caso "cuando no hay nada más específico") | Chips sueltos, no tabla |
| Secuencia con pasos/dependencias (ej. actividades de un Network, Goods Issue → COGS → CO-PA) | `.step-flow` + `.step-card` (`.step-num.ext` para actividades externas) | Línea vertical conectando los pasos |
| Relación estructural real: contención, jerarquía, hub de muchos-a-uno | `.diagram-wrap` con SVG a mano | Seguir las reglas de §15 de `SISTEMA_DISENO_5_TIPOS.md` (fill hex, viewBox que contenga todo, texto antes que las formas, sin diagonales salvo en hubs) |

No hace falta inventar un componente nuevo para cada pregunta — si el contenido no encaja claramente en ninguno de estos, un párrafo bien escrito en `qa-answer` sigue siendo válido. El objetivo es evitar el bloque de texto largo cuando la información tiene una forma visual más clara, no visualizar todo a la fuerza.

---

## 6.1 Marcar el origen: original vs. repregunta en vivo

Regla dura, agregada tras la primera ronda de integración: **todo lo que se suma en la Fase 4 tiene que quedar visualmente identificable como agregado**, sin que Teo tenga que comparar contra una versión vieja para notar la diferencia.

**Convención:**

- **Sin marca** = pregunta y respuesta original — venía marcada en las notas de Teo y se resolvió en la Fase 2.
- **Con tag azul `💬 Repregunta — repaso en chat`** = agregado en la Fase 3/4, no estaba en las notas originales.

**Cómo se aplica según el caso:**

| Caso | Tratamiento |
|---|---|
| `qa-box` enteramente nuevo (pregunta que no existía en las notas) | Clase `qa-box qa-box--followup` + el tag `<span class="round-tag round-tag--followup">💬 Repregunta — repaso en chat</span>` como primer hijo del box, antes de `qa-question` |
| Contenido agregado **dentro** de un `qa-box` que ya existía (se amplía una respuesta original con más detalle, una tabla, un diagrama) | Insertar `<div class="followup-divider"><span class="round-tag round-tag--followup">💬 Repregunta — repaso en chat</span></div>` justo antes del bloque nuevo, como separador visual dentro del mismo box |
| Sección entera nueva (un tema que no tenía sección propia en el T6 original) | Agregar el tag también junto al título de la sección (`.sec-title-row`), además de marcar cada `qa-box` de adentro |

**Legend obligatoria:** el hero del archivo lleva un párrafo corto explicando la convención ("sin marca = original, con tag azul = repregunta en vivo") — así el criterio no depende de que Teo lo recuerde de una sesión a otra.

**CSS de referencia** (agregar al bloque de estilos del T6 si no está):

```css
.round-tag{ display:inline-block; font-family:'JetBrains Mono',monospace; font-size:10px; font-weight:700;
  letter-spacing:.3px; text-transform:uppercase; padding:3px 11px; border-radius:20px; white-space:nowrap; }
.round-tag--followup{ background:#E6F1FB; color:#0C447C; border:1.5px solid #85B7EB; }
.qa-box--followup{ border-left:3px solid #85B7EB; padding-left:19px; }
.followup-divider{ display:flex; align-items:center; gap:10px; margin:20px 0 14px; }
.followup-divider::before{ content:""; flex:0 0 14px; height:1px; background:#85B7EB; }
.followup-divider::after{ content:""; flex:1 1 auto; height:1px; background:#85B7EB; }
```

El azul (`#85B7EB` / `#0C447C`, del color de categoría FI/informacional de `SISTEMA_DISENO_5_TIPOS.md` §2.2) se eligió deliberadamente distinto del gold/steel que ya usa T6 para doc-sourced/external — es un tercer eje (origen de la pregunta), no debe confundirse con el eje de fuente del conocimiento (doc vs. general).

---

## 7. Frases disparadoras

- Fase 3 arranca sola, con cualquier pregunta de seguimiento sobre un T6 ya generado o sobre un tema que se está por incluir en uno — no hace falta que Teo diga "arrancá la ronda de repreguntas".
- Fase 4 se dispara con: "ya terminé", "armá/actualizá el HTML", "integrá todo esto", "metelo en el archivo", o equivalentes — nunca antes, salvo pedido explícito de Teo de ir actualizando sobre la marcha.

---

## 8. Qué NO cambia de las reglas ya existentes

- T6 sigue sin volúmenes (Vol. 2) — la iteración es sobre el mismo archivo.
- El criterio de fuente (doc primero, general knowledge marcado aparte) aplica igual en la Fase 3 que en la Fase 2.
- Teo revisa manualmente antes de ir al repo — esto no cambia en ninguna fase.
- Este documento no reemplaza a `t6-design-spec.md` (que sigue siendo la fuente de los tokens de color y los componentes base `note-box`/`qa-box`) ni al skill `sap-course-qa-notes` (que sigue siendo el punto de entrada de la Fase 2).
