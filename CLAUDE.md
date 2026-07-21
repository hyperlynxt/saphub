# interlynkx — Visual SAP Learning Hub

Hub estático (HTML/CSS/JS plano, sin build step) que indexa una biblioteca personal de
guías SAP FI/CO. Cada curso tiene 5 archivos HTML autocontenidos (T1–T5), generados en
un chat de Proyecto aparte con un sistema de diseño ya validado — **este repo NO genera
ni edita el contenido interno de esos HTML**, solo los indexa y los sirve.

## Qué hace cada archivo

- `index.html` — landing page del hub (estructura fija, no se edita para agregar cursos)
- `assets/hub.css` / `assets/hub.js` — lógica del hub (tampoco se tocan para agregar cursos)
- `library.json` — **única fuente de verdad**. Agregar un curso = agregar entradas acá.
- `courses/{slug}/t1..t5-{slug}.html` — los archivos de contenido en sí

## Tarea típica: "agregar un curso nuevo"

Cuando te paso 4 o 5 archivos `.html` nuevos y te digo que sumes un curso, hacé esto:

1. **Determiná el slug** del curso: `{modulo}-{nombretema}` en minúsculas, separado por
   guiones medios, sin espacios (ej. `ar-receivablemanagement`). Si el nombre de archivo
   que te paso ya viene así, reusalo tal cual.
2. **Creá la carpeta** `courses/{slug}/` si no existe.
3. **Movés/renombrás los archivos** a `courses/{slug}/t{N}-{slug}.html` (N = 1 a 5). Si
   me pasaste archivos con sufijos `_1`, `_2` de Windows (duplicados de descarga), sacalos
   del nombre final — no son número de volumen.
4. **Agregás entradas a `library.json`** — una por cada tipo que exista (puede haber menos
   de 5 si todavía no generé todos). Esquema exacto de cada entrada:

```json
{
  "curso": "Nombre legible del curso",
  "cursoSlug": "modulo-nombretema",
  "megaCurso": "Uno de los mega cursos existentes (ver abajo) o uno nuevo si te digo",
  "modulo": "CÓDIGO CORTO (R2R, AP, AR, AA, CO, GL, etc.)",
  "tipo": "T1" | "T2" | "T3" | "T4" | "T5",
  "volumen": 1,
  "archivo": "courses/{slug}/t{N}-{slug}.html",
  "fecha": "YYYY-MM-DD"
}
```

   Mega cursos existentes (agregar entradas nuevas debajo del mismo nombre, no crear
   variantes con mayúsculas/espacios distintos):
   - `Outlining the Financial Process`
   - `Cost Management`
   - `Record to Report`

5. **Agregás una entrada a `COURSE_META`** en `assets/hub.js` (el objeto que alimenta el
   popup de curso), con el `cursoSlug` como key y una descripción de 1-2 oraciones en
   inglés, mismo tono que las existentes (sobrio, explica qué cubre el curso sin vender
   humo). No toques nada más de `hub.js`.
6. **Volumen 2:** si te paso un set adicional de T1-T4 marcado como Vol. 2 de un curso que
   ya existe, el `cursoSlug` y `archivo` base son los mismos, pero el nombre de archivo
   lleva el volumen pegado al tipo (`t1v2-{slug}.html`) y `"volumen": 2` en la entrada.
7. **Nunca edites** el contenido HTML de los archivos T1-T5 en sí — llegan ya terminados
   del chat de generación. Tu trabajo acá es solo de indexación/organización de archivos.

## Después de cada cambio

```
git add .
git commit -m "Agrego curso: {nombre del curso}"
git push
```

Mensaje de commit siempre en español, formato `Agrego curso: X` para altas, `Fix: X` para
correcciones puntuales (ej. un link roto en library.json).

## Cosas que NO tenés que hacer nunca acá

- No inventes contenido de curso ni generes HTML nuevo de T1-T5 — eso pasa en otro chat.
- No cambies el sistema de colores por tipo (T1 verde, T2 rojo, T3 celeste, T4 violeta,
  T5 naranja) ni la paleta de marca del hub (verde pastel + violeta) sin que te lo pida
  explícitamente.
- No reestructures `index.html`/`hub.css`/`hub.js` para "mejorarlos" por iniciativa propia.
