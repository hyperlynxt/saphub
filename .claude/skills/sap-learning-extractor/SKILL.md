---
name: sap-learning-extractor
description: Extracts free/public SAP Learning (learning.sap.com) course content into a source .docx, ready to feed into Teo's T1-T5 five-type SAP guide pipeline. Trigger this whenever Teo shares a learning.sap.com URL (a lesson, a unit, or a course) and wants the content saved, downloaded, "bajado", "extraído", or turned into a docx — even if he only pastes a link with no instructions. Also trigger on phrases like "bajame este curso", "extraeme esta unidad", "pasame esto a docx", or when he says he wants to feed a new SAP course into his docx pipeline. This does NOT require login — learning.sap.com course/lesson pages are publicly fetchable. Do not confuse this with the T1-T5 generation pipeline itself (that's PROMPT_NUEVOS_CHATS.txt / SISTEMA_DISENO_5_TIPOS.md) — this skill produces the RAW SOURCE .docx that feeds that pipeline, not a T-type file.
---

# SAP Learning → source .docx extractor

Turns a public `learning.sap.com` course/unit into a single `.docx` with the full text content, ready to be the source document for Teo's T1-T5 pipeline (or the T6 Q&A pipeline).

## Why this exists

`learning.sap.com` lesson pages are publicly fetchable with `web_fetch` — **no login needed**, even though the site sometimes shows "Log in to check access" banners (those gate AI-assistant/subscription extras, not the lesson text itself). Confirmed working: full lesson text, section headings, bullet lists, notes, image URLs (with captions), lesson objectives, and unit summaries all come through in the fetched markdown.

## Step 1 — Get the URL and figure out scope

Teo will usually paste **one** lesson link. You do NOT need him to paste every lesson link — one page's sidebar contains the full list of units/lessons for that course, and often the surrounding courses of the same mega-course/journey too.

- **Default scope: the whole COURSE** the given lesson/unit belongs to — every unit under that course (every bold sidebar group heading that belongs to the same course, not just the one containing the pasted link), including each unit's quiz. Download it without asking — this is Teo's confirmed default.
  - **Why per-course, not per-unit:** the source `.docx` is always one-per-course regardless of how the T1-T5 guides end up being generated from it (Modo Curso = one set of 5 types for the whole course, Modo Unidad = one set per unit) — that split happens later, downstream, in the T1-T5 pipeline, never in the source document. See `SISTEMA_DISENO_5_TIPOS.md` §5.1.
- If the link is to a mega-course/journey landing page spanning **multiple courses**, or it's ambiguous which course he means, ask before downloading everything.
- If Teo explicitly asks for just one unit, or for the whole mega-course/journey (multiple courses), follow that instead.

### Step 1b — Exceptional: splitting the docx for very long courses (6-7h+)

Rare path, not the default — only relevant when a course's **total duration is 6-7 hours or more** (the course landing page shows total duration up front, e.g. "6 hr 40 min • X Units"). This threshold on its own does not trigger anything automatically.

When you hit that threshold while scoping Step 1: **ask Teo** whether he wants the usual single course-wide `.docx`, or one `.docx` per unit instead (or per logical group of units, if he'd rather group 2-3 short units together and split off only the heavy one) — do not assume either way, and do not split silently. If he doesn't answer or says nothing about it, default to the normal single course-wide `.docx`.

If he confirms the split:
- Extract and build content per unit exactly as Steps 2-4 already describe, just scoped to one unit's lessons (+ its quiz) instead of the whole course's.
- **Filename per unit:** the course's slugified title with a `-u[X]` suffix, matching the same unit-numbering convention already used for T1-T5 files in Modo Unidad (see `SISTEMA_DISENO_5_TIPOS.md` §5.1) — e.g. `describing-management-accounting-in-sap-s-4hana-u1.docx`, `-u2.docx`. This keeps the course grouping visible in the filename itself even though the docx isn't one file.
- Everything else (repo copy to `docs/sap-source/`, commit message, delivery) applies per resulting file, same as Step 5.

## Step 2 — Fetch and traverse

1. `web_fetch` the given URL.
2. Read the sidebar markdown that comes back — it lists every lesson in the unit (and neighboring units) as `[Lesson Title](full-url)` links, grouped under bold unit headings. Use this to build the list of lessons to pull for the target unit, plus its `Quiz` link.
3. `web_fetch` each remaining lesson URL in turn.
   - **Known quirk:** occasionally a URL that only appeared inside previously-fetched page content (not user-provided, not from a search result) gets rejected with a `PERMISSIONS_ERROR`. If that happens, do one `web_search` for the lesson title + course slug, grab the matching URL from the results, then `web_fetch` it — it will go through after that. Don't stop the extraction over this, just route around it per-lesson.
   - Every lesson page also has a "Next lesson" link at the bottom — useful as a backup traversal path if the sidebar is ever incomplete.
4. Fetch the quiz page too (last link in the unit's sidebar group) — include its questions and options as a final section. Quiz pages don't expose correct answers, don't invent them.

## Step 3 — Extract content per lesson

From each fetched page, pull, in order:
- Lesson title (H1) and its **Objective** line.
- Every heading (`##`, `###`) and its body text, preserving hierarchy.
- Bullet lists as actual lists, not run-on paragraphs.
- Boxed "Note" callouts as callouts, not inline text.
- Image references: capture the image URL **and** its caption/alt text. **Default: do not download or embed the image.** Render it as the caption text followed by a clickable hyperlink reading "🔗 Ver figura" (the link target is the real image URL — pandoc/AI extraction still recovers the URL from the hyperlink, only the *visible* text is friendlier than a raw pasted URL). See `references/docx_template.js` for the exact `imageRef()` helper. Only embed a real image (see `references/future_add_on_embedded_images.md`) if Teo asks for that explicitly on a given run — never change the default without him asking.
- The lesson's closing "Summary" bullet list.

Never paraphrase or shorten — this is meant to be the same source content Teo would otherwise copy by hand. Preserve SAP's exact wording.

## Step 4 — Build the .docx

Read `/mnt/skills/public/docx/SKILL.md` first (the general docx-creation gotchas apply here too — A4 vs Letter, ImageRun `type:`, no literal bullets, etc.).

Use the layout pattern in `references/docx_template.js` as your starting script — it already implements: cover block, numbered lesson sections (H1 per lesson), lesson metadata line, objective box, H2/H3 body headings, bullets, note callouts, image-reference lines (caption + hyperlink), divider between lessons, and a quiz section at the end. Adapt it to the actual fetched content rather than rewriting the helpers from scratch.

**Visual identity (confirmed with Teo, previously Times New Roman + navy blue — felt "abrasive" to read):** font is **Bahnschrift** throughout (body and headings), headings/subtítulos and the objective-box border are the **T1 marco green** (`#3D7A52`), and the objective-box background is a pastel tint of the T1 green (`#EAF5EC`) — same visual logic as the theory-box in the T1-T5 HTML system (darker green for readable text, pastel for the tinted background). Everything else in the template (note-box in yellow, image-ref styling, layout structure) stays as-is.

Always verify the render before delivering: convert to PDF and view a couple of pages (see the docx skill's "Verify the output" section).

## Step 5 — Naming and delivery

- **Filename = the course's own display title** (or the unit's, on the rare run where scope was explicitly just one unit), slugified to kebab-case, no prefix (e.g. `describing-management-accounting-in-sap-s-4hana.docx`). This is Teo's confirmed convention — it deliberately does NOT use the `t[N]-modulo-tema` naming from the T1-T5 pipeline, since this file is raw source material, not a typed guide.
- Save to `/mnt/user-data/outputs/` and `present_files` it (or `SendUserFile` in Claude Code).
- **Also copy the same file into `docs/sap-source/` in the repo**, `git add`/`commit`/`push` it there (commit message `"Agrego fuente SAP: {título del curso}"`). This is Teo's persistent knowledge base of source docs — it must not depend on him downloading the chat attachment or staying on his notebook. Do this even if he didn't ask this specific time; it's now the default for every run of this skill.
- Mention briefly that it's ready to drop into the T1-T5 pipeline (`PROMPT_NUEVOS_CHATS.txt`) as the source `.docx` whenever he wants to start generating guides from it — don't start that pipeline unprompted.

## Future add-ons (not implemented — do not do these unless asked)

- **Real embedded images instead of link-only.** Documented in
  `references/future_add_on_embedded_images.md` — requires `claude-in-chrome`
  instead of plain `web_fetch`, since image asset URLs can't be fetched directly
  (confirmed: they fail `PERMISSIONS_ERROR` even when they appeared inside an
  already-fetched page). Only do this on explicit request for a given run.

## Notes / non-goals

- This skill does not generate T1-T5 files. It only produces the raw source `.docx`.
- This skill does not require any browser session, login, or MCP connector — plain `web_fetch`/`web_search` is enough.
- If a course turns out to require login for the lesson text itself (not just AI extras), say so plainly and stop — don't guess at content.

## Fallback when the `WebFetch`/`web_fetch` tool itself is blocked (Claude Code environments)

In a Claude Code remote sandbox, outbound network access is gated by the environment's own network policy (separate from anything SAP does). Even after `learning.sap.com` is allow-listed there, the `WebFetch` tool can still return a bare `403` on this domain — it appears to run through its own path, not the sandbox's egress. If that happens:

1. Confirm the sandbox itself can reach the domain: `curl -sS -o /dev/null -w "%{http_code}" https://learning.sap.com/...`. If that returns `200` but `WebFetch` still 403s, it's the tool, not the network — proceed with curl instead of retrying `WebFetch`.
2. `curl` the page HTML directly (with a normal browser `User-Agent` string) and extract the `<script id="__NEXT_DATA__">...</script>` JSON blob. It contains fully structured, server-rendered data — no need to scrape rendered markdown:
   - Course/unit landing pages: `props.pageProps.standaloneCourse.courses[0].children` (units) → each unit's `children` (lessons), each with a `slug` — build every lesson URL from `{course-url}/{slug}` directly instead of relying on sidebar HTML links.
   - Lesson pages: `props.pageProps.lesson.topics[]`, each with `title` and `textContent` (raw HTML: headings, `<p>`, `<ul>/<li>`, `<table>`, `<img>` with `src`/`alt`, `.note`/`.noteBody` callouts). This is more reliable than markdown extraction and already preserves table structure.
   - Quiz pages: `pageProps.pageType === "quiz"`, and questions live in `pageProps.dehydratedState.queries[0].state.data.questions[]` (`questionText`, `questionType`, `options[].responseText`). No correct-answer field is exposed — nothing to accidentally leak.
3. Parse the extracted HTML with `cheerio` (Node) and feed it straight into the `docx` builder — see `references/docx_template.js`. Handle `<table>` explicitly (dual `columnWidths`/cell `width` in DXA, per the general docx skill's gotchas) — falling through to a generic `.text()` on a table flattens all cells into one unreadable run-on string.
4. `docx`, `cheerio`, `pandoc`, and `poppler-utils` (`pdftoppm`) may not be preinstalled in a given sandbox — `npm install docx cheerio` locally and `apt-get install -y pandoc poppler-utils libreoffice-writer` if `soffice --convert-to pdf` fails with "source file could not be loaded" (that error means the Writer component isn't installed, not that the file is broken).
