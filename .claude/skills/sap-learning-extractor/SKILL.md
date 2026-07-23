---
name: sap-learning-extractor
description: Extracts free/public SAP Learning (learning.sap.com) course content into a source .docx, ready to feed into Teo's T1-T5 five-type SAP guide pipeline. Trigger this whenever Teo shares a learning.sap.com URL (a lesson, a unit, or a course) and wants the content saved, downloaded, "bajado", "extraído", or turned into a docx — even if he only pastes a link with no instructions. Also trigger on phrases like "bajame este curso", "extraeme esta unidad", "pasame esto a docx", or when he says he wants to feed a new SAP course into his docx pipeline. This does NOT require login — learning.sap.com course/lesson pages are publicly fetchable. Do not confuse this with the T1-T5 generation pipeline itself (that's PROMPT_NUEVOS_CHATS.txt / SISTEMA_DISENO_5_TIPOS.md) — this skill produces the RAW SOURCE .docx that feeds that pipeline, not a T-type file.
---

# SAP Learning → source .docx extractor

Turns a public `learning.sap.com` course/unit into a single `.docx` with the full text content, ready to be the source document for Teo's T1-T5 pipeline (or the T6 Q&A pipeline).

## Why this exists

`learning.sap.com` lesson pages are publicly fetchable with `web_fetch` — **no login needed**, even though the site sometimes shows "Log in to check access" banners (those gate AI-assistant/subscription extras, not the lesson text itself). Confirmed working: full lesson text, section headings, bullet lists, notes, image URLs (with captions), lesson objectives, and unit summaries all come through in the fetched markdown.

## Step 1 — Get the URL and figure out scope

Teo will usually paste **one** lesson link. You do NOT need him to paste every lesson link — one page's sidebar contains the full list of lessons for that unit, and often the surrounding units of the same mega-course too.

- **Default scope: the whole unit** the given lesson belongs to (all lessons under the same bold sidebar group heading, e.g. "Describing Management Accounting in SAP S/4HANA"), including its quiz. Download it without asking — this is Teo's confirmed default.
- If the link is to a mega-course landing page (not a specific lesson) spanning multiple units, or it's ambiguous which unit he means, ask before downloading everything.
- If Teo explicitly asks for more than one unit or the whole mega-course, follow that instead.

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

- **Filename = the unit/course's own display title**, slugified to kebab-case, no prefix (e.g. `describing-management-accounting-in-sap-s-4hana.docx`). This is Teo's confirmed convention — it deliberately does NOT use the `t[N]-modulo-tema` naming from the T1-T5 pipeline, since this file is raw source material, not a typed guide.
- Save to `/mnt/user-data/outputs/` and `present_files` it.
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
