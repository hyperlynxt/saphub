---
name: sap-course-qa-notes
description: Turns Teo's personal study notes on an SAP course (which mix short summary bullets with inline "Q&A ->" markers flagging things he didn't fully get) into a polished HTML review file that answers every flagged question, grounded primarily in the course source document (.docx/.md/.txt), falling back to general validated SAP knowledge only when the source doesn't cover it — and always visually tagging which is which. Use this whenever Teo uploads a notes file with "Q&A" markers alongside (or referencing) an SAP course document, asks to "answer my Q&A notes", "resolve my dudas", "make a review file", or similar — even if he doesn't use the words "skill" or "T6". This is a companion to (not a replacement for) his existing T1-T5 five-type library system — trigger this one specifically for the Q&A/double-click review layer, not for building T1-T5 files from scratch.
---

# SAP Course Q&A Notes → T6 Review File

Teo is self-studying SAP FI/CO to become a consultant. While reading an official course document, he takes his own running notes and drops `Q&A ->` (or `Q&A:`, or `*Q&A ...*`) markers inline wherever something didn't click. This skill turns that raw, messy note-taking into a clean, visually organized HTML review file ("T6") that answers each flagged question — sourced from the course document first, general SAP knowledge only as a clearly-marked fallback.

This is a sixth file type alongside his existing T1–T5 library (`SISTEMA_DISENO_5_TIPOS.md` / `PROMPT_NUEVOS_CHATS.txt`), sharing its visual language (fonts, navy hero, sticky nav, sec-head/theory-box pattern) but with its own color and its own purpose: **double-clicking on confusion, not teaching from zero.**

## When this triggers

- Teo uploads a notes file (`.txt`/`.md`, sometimes pasted inline) containing `Q&A` markers, alongside or referencing a course `.docx`.
- He asks to "answer my Q&A", "resolve these dudas", "make the review file for [course]", "T6 de [tema]", or similar.
- Do NOT trigger this for building fresh T1-T5 files (that's the existing pipeline in `PROMPT_NUEVOS_CHATS.txt`) — this skill is specifically the Q&A/review layer, usually run on a course he's already partway through or has finished a first pass of.

## Inputs required

1. **Source document** — the official SAP course material (`.docx` most common; sometimes already-extracted `.md`/`.txt`). This is the primary source of truth.
2. **Notes-with-Q&A file** — Teo's own working notes, plain text/markdown, informal, mixing Spanish and English freely, with `Q&A` markers of varying exact syntax (`Q&A ->`, `Q&A:`, `*Q&A ...*`, sometimes just embedded mid-paragraph). Treat any of these as equivalent.

If only one of the two is present, ask which is missing rather than guessing — a Q&A file needs the source to ground answers, and a bare source with no notes has nothing to answer.

## Workflow

### 1. Extract the source document

- `.docx` → `pandoc -t markdown file.docx`
- **Also extract and look at embedded images** (`unzip -j file.docx "word/media/*" -d out/`) before finalizing any answer that touches an architecture/relationship diagram. The plain-text extraction misses screenshots and image-based diagrams that often carry the exact detail a question is about (this bit Teo's T2 pilot on the main system — same risk applies here).

### 2. Parse the notes file

- Preserve Teo's own topical groupings/order — don't reorganize into a different structure. His note flow IS the study flow; the output should read like an annotated version of his own notes, not a fresh outline.
- Within each topical block, separate:
  - **Note prose** — his summary bullets/arrows (concise, sometimes just fragments — clean up grammar lightly for readability but don't rewrite his voice into something formal).
  - **Q&A markers** — his questions or "repasar bien X" / "full-on help with X" flags. Treat "repasar bien X" and "full-on help with X" as real questions too (an open request to explain X properly), not just literal question marks.
- Keep questions in whatever language/mix Teo wrote them in when quoting them back — don't translate his question.

**Location-reference convention (confirmed with Teo):** he marks *where* a question comes from using a lightweight header tag right in his notes, e.g.:

```
## T1
D01
Q&A -> no me quedó claro este diagrama...
D04
Q&A -> ...

## Course
Q&A -> ...
```

- `## T1` / `## T2` / etc. = the question(s) below it refer to that T-type file of the same course. `## Course` (or equivalent wording) = refers to the course source document/text itself, not a T-type diagram.
- `D01`, `D02`... = the diagram/section number within that T-type file the question is about (his own numbering — treat it as "the Nth diagram/section in that file," matching the sec-head numbering in the HTML).
- Number of `#` he uses may vary (`##` or `####`) — treat any heading-style marker followed by a T-type or "Course" label as this same convention, don't require exact syntax.
- **When this tag is present, the T6 must pull the actual referenced content** (the real diagram/SVG or the real doc excerpt from that section) and place it above his question, before the answer — not just answer in text. This is a step beyond the base Q&A flow: locate the section by number in the referenced T-file (or the passage in the source doc for `## Course`), reproduce it, then his question, then the answer with its doc/external source tag. See `t6-proceso-notas-qa-repaso.md` for how this fits into the overall phase flow.

### 3. Answer each question

- Search the source document first. If it answers the question (even partially, even by connecting two separate parts of the document), ground the answer there and tag it **doc-sourced**.
- If the document is silent or only partially covers it, supplement with validated general SAP FI/CO knowledge — but only well-established, stable facts (standard module relationships, standard terminology), never speculative or version-specific details you're not confident about. Tag as **external** (if the doc had nothing) or **mixed** (if the doc got you partway).
- Never fabricate a document citation. If genuinely unsure and general knowledge doesn't resolve it either, say so plainly in the answer rather than inventing confidence — this is a study tool, a wrong confident answer is worse than an honest gap.
- Keep answers tight — a few sentences per question, not an essay. This is a double-click, not a re-teach of the whole topic.

### 4. Build the HTML file

Follow `references/t6-design-spec.md` for the full visual spec (colors, components, hero, qa-box variants, naming). Key points to not miss:
- Reuses the shared design foundation from the T1-T5 system (Inter/Syne/JetBrains Mono, navy palette, sticky nav, hero pattern, sec-head, theory-box-style component) so it visually belongs to the same library.
- New color token: T6 gold/amber (`--t6:#E3B341` / `--t6-dark:#8C6D1B`) — distinct from all five existing type colors.
- New `qa-box` component with a **source tag that's unmistakable at a glance**, not just a small icon: solid gold pill + gold left-border for doc-sourced; dashed steel-gray pill + dashed steel-gray left-border for external; both stacked for mixed. This is a hard requirement Teo asked for explicitly — the distinction must be visually obvious, not just mentioned in text.
- Sections follow Teo's own note groupings, flexible length (not the fixed 10-section quota T1-T4 use) — some sections might be just a recap + one Q&A, others might have three.
- A short recap of his notes (reuse the `theory-box` pattern, re-tinted to T6 gold) precedes the Q&A box(es) in each section, so the file reads standalone without needing his raw notes open alongside it.
- Optional small stats banner in the hero (e.g. "14 preguntas resueltas — 9 del documento, 3 mixtas, 2 de conocimiento general") — a nice touch, not mandatory if it complicates the header.

### 5. Naming and output

- Filename: `t6-[modulo]-[nombretema].html`, same lowercase-hyphen convention as T1-T5 (module code + concatenated topic name). Add a unit/part indicator if the source is one unit of a larger course (e.g. `t6-co-costmanagementprofitabilityanalysis-unit1.html`).
- Save to `/mnt/user-data/outputs/` and present it — Teo reviews manually before anything goes to his repo, same as the rest of the library. This skill never pushes to git itself.

## What this skill does NOT do

- Does not touch or regenerate T1-T5 files.
- Does not invent Q&A questions Teo didn't ask — only answers what's actually flagged in his notes.
- Does not silently blend doc and external knowledge without marking which is which — that marking is the entire point of this skill.
