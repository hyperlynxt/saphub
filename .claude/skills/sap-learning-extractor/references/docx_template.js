/*
 * Plantilla probada para armar el .docx fuente de una unidad de SAP Learning.
 * Adaptar el contenido (títulos, textos, bullets, imágenes) al curso real
 * fetch-eado — NO reescribir los helpers, ya están validados visualmente
 * (ver /mnt/skills/public/docx/SKILL.md → "Verify the output").
 *
 * Uso: llenar `children` lesson por lesson con estos helpers, después
 * armar el Document al final del archivo.
 */

const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  BorderStyle, ExternalHyperlink, LevelFormat, convertInchesToTwip
} = require("docx");

const NAVY = "1F3864";
const GRAY = "666666";

// ---------- helpers (no tocar) ----------
function h1(text) {
  return new Paragraph({ text, heading: HeadingLevel.HEADING_1, spacing: { before: 400, after: 200 } });
}
function h2(text) {
  return new Paragraph({ text, heading: HeadingLevel.HEADING_2, spacing: { before: 300, after: 150 } });
}
function h3(text) {
  return new Paragraph({ text, heading: HeadingLevel.HEADING_3, spacing: { before: 250, after: 120 } });
}
function p(text, opts = {}) {
  return new Paragraph({
    children: [new TextRun({ text, ...opts })],
    spacing: { after: 160 },
  });
}
function bullet(text) {
  return new Paragraph({
    text,
    numbering: { reference: "bullets", level: 0 },
    spacing: { after: 80 },
  });
}
function objectiveBox(text) {
  return new Paragraph({
    children: [
      new TextRun({ text: "Objective: ", bold: true }),
      new TextRun({ text }),
    ],
    border: { left: { style: BorderStyle.SINGLE, size: 18, color: NAVY, space: 8 } },
    shading: { fill: "F2F5FA" },
    spacing: { before: 200, after: 300 },
    indent: { left: 200 },
  });
}
// Referencia de imagen SIN descargar/embeber — caption + link clickeable
// legible ("🔗 Ver figura"), no el URL pelado. El URL real queda como target
// del hyperlink (pandoc / extracción por IA lo sigue recuperando ahí).
// Opción A, default de Teo. Opción B (imagen real embebida) documentada en
// references/future_add_on_embedded_images.md — solo si la pide explícito.
function imageRef(url, caption) {
  return new Paragraph({
    children: [
      new TextRun({ text: `${caption} `, italics: true, color: GRAY, size: 20 }),
      new ExternalHyperlink({
        link: url,
        children: [new TextRun({ text: "🔗 Ver figura", style: "Hyperlink", bold: true, size: 20 })],
      }),
    ],
    spacing: { after: 200 },
  });
}
function noteBox(text) {
  return new Paragraph({
    children: [new TextRun({ text: "Note: ", bold: true, italics: true }), new TextRun({ text, italics: true })],
    shading: { fill: "FFF6E0" },
    spacing: { before: 120, after: 200 },
    indent: { left: 200 },
  });
}
function lessonMeta(unitLabel, minutes) {
  return new Paragraph({
    children: [new TextRun({ text: `${unitLabel} · ${minutes} min read`, color: GRAY, size: 20, italics: true })],
    spacing: { after: 100 },
  });
}
function divider() {
  return new Paragraph({
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: "CCCCCC", space: 1 } },
    spacing: { after: 400 },
  });
}
function quizQ(children, n, text, note) {
  children.push(h3(`${n}. ${text}`));
  if (note) children.push(p(note, { italics: true, color: GRAY, size: 20 }));
}
function quizOptions(children, list) {
  list.forEach(o => children.push(bullet(o)));
}

// ---------- armado ----------
const children = [];

// Cover — reemplazar con el título/fuente real
children.push(
  new Paragraph({ children: [new TextRun({ text: "SAP Learning — Source Content", bold: true, color: GRAY, size: 22 })], spacing: { after: 100 } }),
  new Paragraph({ children: [new TextRun({ text: "<TÍTULO DE LA UNIDAD>", bold: true, size: 40 })], spacing: { after: 100 } }),
  new Paragraph({ children: [new TextRun({ text: "<Curso/mega-course de origen>", size: 24, color: GRAY })], spacing: { after: 40 } }),
  new Paragraph({ children: [new TextRun({ text: "Source: <url base del curso>", size: 20, color: GRAY, italics: true })], spacing: { after: 500 } }),
  divider()
);

// Por cada lección: h1(título) -> lessonMeta -> objectiveBox -> h2/h3 + p/bullet/imageRef/noteBox -> Summary bullets -> divider()
// Al final: h1("N. Knowledge Quiz") + quizQ/quizOptions por cada pregunta.

// ---------- ensamblado del Document ----------
const doc = new Document({
  numbering: {
    config: [
      {
        reference: "bullets",
        levels: [
          { level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: convertInchesToTwip(0.35), hanging: convertInchesToTwip(0.2) } } } },
        ],
      },
    ],
  },
  sections: [
    {
      properties: {
        page: { size: { width: 12240, height: 15840 }, margin: { top: 1080, bottom: 1080, left: 1080, right: 1080 } },
      },
      children,
    },
  ],
});

Packer.toBuffer(doc).then(buf => {
  // Nombre = slug del título de la unidad, sin prefijo (ver SKILL.md §5)
  require("fs").writeFileSync("/mnt/user-data/outputs/<slug-de-la-unidad>.docx", buf);
  console.log("done");
});
