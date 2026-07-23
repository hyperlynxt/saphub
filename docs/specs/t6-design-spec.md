# T6 — Q&A / Double-Click — Design Spec

Sixth file type in Teo's SAP library, sharing the T1-T5 visual foundation. This doc is self-contained (includes the shared tokens) so the skill doesn't depend on the project's `SISTEMA_DISENO_5_TIPOS.md` being loaded.

## 1. Color

New frame color, distinct from all five existing types (green/red/celeste/violet/orange):

```css
--t6:#E3B341;              /* accent — warm gold/amber */
--t6-dark:#8C6D1B;         /* frame — sec-num, theory-box border, bold terms */
--t6-pale:rgba(227,179,65,0.14);
--t6-pale-border:rgba(227,179,65,0.4);

--steel:#5A6B8C;           /* used for the "external knowledge" tag — neutral, deliberately NOT gold */
--steel-pale:rgba(90,107,140,0.10);
```

## 2. Shared foundation (copy as-is from the T1-T5 system)

```css
:root{
  --navy-950:#0A0F1C; --navy-900:#0F1A2E; --navy-800:#16233B;
  --gold:#D4AF37; --pill-secondary:#8AA0C4;
  --ink:#16213A; --muted:#64748B; --bg:#F7F8FA; --border:#E3E7EE;
  --white:#FFFFFF; --body:#3D4A5F;
}
```
Fonts: `Inter` (body), `Syne` (headings/display), `JetBrains Mono` (nav brand, sec-num, mono labels). Same Google Fonts import line as T1-T5.

Reuse verbatim: `.topnav` / `.topnav-brand` / `.hero` (gradient swapped to gold-tinted, see below) / `.pills` / `.hero h1/h2/p.desc` / `.hlbox` / `main` / `.section` / `.sec-head` / `.sec-num` / `.sec-titles` / `.visual-wrap` (only if a section genuinely needs a small diagram — most won't) / `footer`.

Hero gradient for T6 (swap the green wash for gold): `background:linear-gradient(135deg,#0A0F1C 0%, #2A2410 55%, #4A3A0F 100%);`

## 3. `note-box` — recap of Teo's notes (theory-box, re-tinted)

Same component as `.theory-box` in T1-T5, re-tinted to T6:

```css
.note-box{
  background:var(--t6-pale);
  border-left:4px solid var(--t6-dark);
  border-radius:0 10px 10px 0;
  padding:16px 22px;
  margin-bottom:20px;
  font-size:0.94rem;
  line-height:1.7;
  color:var(--ink);
}
.note-box strong{ color:var(--t6-dark); font-weight:700; }
.note-box ul{ margin:8px 0 0; padding-left:20px; }
.note-box li{ margin-bottom:4px; }
```

Purpose: a short, cleaned-up version of what Teo wrote in that block — enough that the section reads standalone without his raw notes open next to it. Keep his voice/phrasing where reasonable; don't turn it into a textbook paragraph.

## 4. `qa-box` — the core new component

```css
.qa-box{
  background:var(--white);
  border:1px solid var(--border);
  border-radius:12px;
  padding:20px 22px;
  margin-bottom:16px;
  box-shadow:0 2px 10px rgba(10,15,28,0.05);
}
.qa-question{
  display:flex; align-items:flex-start; gap:10px;
  font-family:'Syne',sans-serif; font-weight:700; font-size:1.02rem;
  color:var(--ink); margin-bottom:14px;
}
.qa-question .q-icon{ font-size:1.1rem; flex-shrink:0; }
.qa-question .q-text{ font-family:'Inter',sans-serif; font-weight:600; }

.qa-answer{ border-radius:0 8px 8px 0; padding:12px 16px; font-size:0.9rem; line-height:1.65; color:var(--body); }
.qa-answer + .qa-answer{ margin-top:10px; }
.qa-answer p{ margin:8px 0 0; }
.qa-answer p:first-of-type{ margin-top:8px; }

/* doc-sourced — solid gold */
.qa-answer--doc{ background:var(--t6-pale); border-left:4px solid var(--t6-dark); }
.qa-source-tag--doc{
  display:inline-block; font-family:'JetBrains Mono',monospace; font-size:10.5px; font-weight:700;
  letter-spacing:.3px; text-transform:uppercase; color:white; background:var(--t6-dark);
  padding:3px 10px; border-radius:20px;
}

/* external knowledge — dashed steel, deliberately different pattern AND color */
.qa-answer--external{ background:var(--steel-pale); border-left:4px dashed var(--steel); }
.qa-source-tag--external{
  display:inline-block; font-family:'JetBrains Mono',monospace; font-size:10.5px; font-weight:700;
  letter-spacing:.3px; text-transform:uppercase; color:var(--steel); background:white;
  border:1.5px dashed var(--steel); padding:2px 9px; border-radius:20px;
}

/* mixed — both blocks stacked, each keeps its own tag/style */
```

Markup pattern:

```html
<div class="qa-box">
  <div class="qa-question">
    <span class="q-icon">❓</span>
    <span class="q-text">[question, kept close to Teo's original wording/language]</span>
  </div>

  <!-- doc-sourced -->
  <div class="qa-answer qa-answer--doc">
    <span class="qa-source-tag--doc">📘 Del documento del curso</span>
    <p>[answer]</p>
  </div>

  <!-- OR external -->
  <div class="qa-answer qa-answer--external">
    <span class="qa-source-tag--external">🌐 Conocimiento general SAP</span>
    <p>[answer]</p>
  </div>

  <!-- OR mixed: both blocks present, in this order (doc first, then the gap it fills) -->
</div>
```

The visual distinction must survive at a glance (color + border style + pill shape), not rely on reading the icon text — that's why external uses a dashed border and white/outline pill instead of just swapping a color.

## 5. Section structure (flexible, not fixed-10)

```html
<section class="section" id="s1">
  <div class="sec-head">
    <div class="sec-num">01</div>
    <div class="sec-titles">
      <div class="sec-title-row">
        <span class="sec-title-en">[topic, in Teo's own grouping]</span>
      </div>
    </div>
  </div>
  <div class="note-box">...[recap of his notes for this block]...</div>
  <!-- one qa-box per question raised in this block -->
  <div class="qa-box">...</div>
  <div class="qa-box">...</div>
</section>
```

Sections = however many topical blocks emerged from Teo's notes, not a quota. A block with no question still gets a `note-box` alone (rare, but fine). `sec-num` uses `var(--t6-dark)` background instead of the type-specific dark used in T1-T5.

## 6. Hero stats banner (optional nice-to-have)

Inside `.hlbox`, instead of the usual one-liner, a small inline stat: e.g. `14 preguntas resueltas · 9 del documento · 3 mixtas · 2 de conocimiento general`. Skip if it clutters — the qa-box tags already carry this info per-question.

## 7. No glossary, no fixed section count

T6 doesn't carry a glossary (Q&A boxes already surface the vocabulary in context) and doesn't force 10 sections like T1-T4 — length follows how much Teo actually flagged.

## 8. Naming

`t6-[modulo]-[nombretema].html`, same convention as T1-T5 (§16 of `SISTEMA_DISENO_5_TIPOS.md`). Add `-unitN` if the source is one unit of a multi-unit course.
