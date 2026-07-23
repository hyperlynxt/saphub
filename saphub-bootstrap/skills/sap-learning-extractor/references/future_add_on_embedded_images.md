# Future add-on: Opción B — imágenes reales embebidas

> Estado: NO implementado. Queda documentado acá para cuando se quiera activar.
> Default actual de la skill: Opción A (link clickeable "🔗 Ver figura", sin
> embeber la imagen).

## Por qué no se hizo por default

Se probó bajar una imagen de `learning.sap.com` directo con `web_fetch` para
embeberla como `ImageRun` real en el docx, y falló: el fetch rechazó la URL de la
imagen con `PERMISSIONS_ERROR` aunque esa misma URL ya había aparecido dentro del
markdown de una página de lección fetch-eada antes. Conclusión: las URLs de imagen
incrustadas como `![...](url)` dentro de una página no cuentan como "URL ya vista"
para el permiso de `web_fetch` — solo cuentan links que aparecieron como resultado
de un `web_search` o como link clickeable. Esto bloquea la descarga directa de
imágenes vía fetch plano.

## Cómo implementarlo cuando se quiera

Usar `claude-in-chrome` (navegador real) en vez de `web_fetch` para esa parte
puntual del proceso:

1. Con `claude-in-chrome:navigate`, abrir cada lección de la unidad (no hace falta
   estar logueado, las páginas son públicas).
2. Localizar cada imagen en la página (`claude-in-chrome:find` o `read_page`).
3. Capturar/guardar la imagen real desde el navegador (screenshot del elemento o
   herramienta de captura equivalente) a un archivo local.
4. En el script docx-js, reemplazar `imageRef(url, caption)` por un bloque con
   `ImageRun` (requiere `type: "png"` y las dimensiones reales o escaladas) **más**
   el link de la URL original como caption debajo, chiquito — para no perder la
   trazabilidad a la fuente.

## Costo esperado

Más lento que el flujo actual: en vez de un `web_fetch` de texto por lección, hay
que navegar página por página con el browser y capturar imagen por imagen. Para una
unidad de 6 lecciones con ~10 imágenes, estimar bastante más tiempo/tool-calls que
el flujo de solo-texto. Por eso quedó como opcional, no default.

## Cuándo activarla

Teo la pide explícitamente para una corrida puntual ("esta vez embebé las imágenes
de verdad") — no cambiar el default de la skill sin que lo pida.
