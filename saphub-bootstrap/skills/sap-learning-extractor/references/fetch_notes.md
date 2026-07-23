# Particularidades de fetch en learning.sap.com

Confirmado en la práctica (unidad "Describing Management Accounting in SAP S/4HANA", julio 2026):

- Todas las páginas de lección son públicas — el fetch trae el texto completo, headings,
  bullets, notas, y las URLs+captions de las imágenes, sin login.
- El sidebar que viene en cada fetch lista TODAS las lecciones de la unidad actual
  (agrupadas bajo el heading en negrita) más, generalmente, las unidades vecinas del
  mismo mega-course. No hace falta que Teo pase más de un link.
- Cada página de lección también trae un link "Next lesson" al pie — sirve como
  traversal alternativo si el sidebar viniera incompleto.
- La página de Quiz al final de cada unidad es una lección más en el sidebar — fetch-earla
  igual, trae las preguntas y opciones (sin respuesta correcta marcada).

## El error de permisos intermitente

A veces `web_fetch` rechaza una URL con `PERMISSIONS_ERROR: This URL was not in any
prior search or fetch result` — incluso si esa URL apareció textualmente dentro del
markdown de un fetch anterior (ej. en el sidebar). No es consistente: en la misma
sesión, la primera vez falló y la segunda vez (con la URL idéntica) funcionó directo.

**Qué hacer si pasa:** no reintentar el fetch en loop. Hacer un `web_search` corto con
el título de la lección + el slug del curso, agarrar la URL que devuelva el buscador
(debería ser la misma), y recién ahí `web_fetch`-earla — a partir de eso ya queda
"habilitada" para fetches posteriores. Es un paso extra ocasional, no bloquea el
proceso.
