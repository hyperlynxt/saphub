/* ============================================================
   interlynkx — hub.js
   Lee library.json (o el fallback embebido si falla el fetch,
   por ejemplo al previsualizar el archivo local sin servidor)
   y renderiza las vistas por tipo / por curso + los resultados
   filtrados. No hace falta tocar este archivo al agregar cursos:
   alcanza con sumar entradas a library.json.
   ============================================================ */

const FALLBACK_DATA = [
  { "curso":"Record to Report","cursoSlug":"r2r-recordtoreport","megaCurso":"Outlining the Financial Process","modulo":"R2R","tipo":"T1","volumen":1,"archivo":"courses/r2r-recordtoreport/t1-r2r-recordtoreport.html","fecha":"2026-07-13" },
  { "curso":"Record to Report","cursoSlug":"r2r-recordtoreport","megaCurso":"Outlining the Financial Process","modulo":"R2R","tipo":"T2","volumen":1,"archivo":"courses/r2r-recordtoreport/t2-r2r-recordtoreport.html","fecha":"2026-07-13" },
  { "curso":"Record to Report","cursoSlug":"r2r-recordtoreport","megaCurso":"Outlining the Financial Process","modulo":"R2R","tipo":"T3","volumen":1,"archivo":"courses/r2r-recordtoreport/t3-r2r-recordtoreport.html","fecha":"2026-07-13" },
  { "curso":"Record to Report","cursoSlug":"r2r-recordtoreport","megaCurso":"Outlining the Financial Process","modulo":"R2R","tipo":"T4","volumen":1,"archivo":"courses/r2r-recordtoreport/t4-r2r-recordtoreport.html","fecha":"2026-07-13" },
  { "curso":"Record to Report","cursoSlug":"r2r-recordtoreport","megaCurso":"Outlining the Financial Process","modulo":"R2R","tipo":"T5","volumen":1,"archivo":"courses/r2r-recordtoreport/t5-r2r-recordtoreport.html","fecha":"2026-07-13" },
  { "curso":"Payables Management","cursoSlug":"ap-payablesmanagement","megaCurso":"Outlining the Financial Process","modulo":"AP","tipo":"T1","volumen":1,"archivo":"courses/ap-payablesmanagement/t1-ap-payablesmanagement.html","fecha":"2026-07-14" },
  { "curso":"Payables Management","cursoSlug":"ap-payablesmanagement","megaCurso":"Outlining the Financial Process","modulo":"AP","tipo":"T2","volumen":1,"archivo":"courses/ap-payablesmanagement/t2-ap-payablesmanagement.html","fecha":"2026-07-14" },
  { "curso":"Payables Management","cursoSlug":"ap-payablesmanagement","megaCurso":"Outlining the Financial Process","modulo":"AP","tipo":"T3","volumen":1,"archivo":"courses/ap-payablesmanagement/t3-ap-payablesmanagement.html","fecha":"2026-07-14" },
  { "curso":"Payables Management","cursoSlug":"ap-payablesmanagement","megaCurso":"Outlining the Financial Process","modulo":"AP","tipo":"T4","volumen":1,"archivo":"courses/ap-payablesmanagement/t4-ap-payablesmanagement.html","fecha":"2026-07-14" },
  { "curso":"Receivables Management","cursoSlug":"ar-receivablemanagement","megaCurso":"Outlining the Financial Process","modulo":"AR","tipo":"T1","volumen":1,"archivo":"courses/ar-receivablemanagement/t1-ar-receivablemanagement.html","fecha":"2026-07-15" },
  { "curso":"Receivables Management","cursoSlug":"ar-receivablemanagement","megaCurso":"Outlining the Financial Process","modulo":"AR","tipo":"T2","volumen":1,"archivo":"courses/ar-receivablemanagement/t2-ar-receivablemanagement.html","fecha":"2026-07-15" },
  { "curso":"Receivables Management","cursoSlug":"ar-receivablemanagement","megaCurso":"Outlining the Financial Process","modulo":"AR","tipo":"T3","volumen":1,"archivo":"courses/ar-receivablemanagement/t3-ar-receivablemanagement.html","fecha":"2026-07-15" },
  { "curso":"Receivables Management","cursoSlug":"ar-receivablemanagement","megaCurso":"Outlining the Financial Process","modulo":"AR","tipo":"T4","volumen":1,"archivo":"courses/ar-receivablemanagement/t4-ar-receivablemanagement.html","fecha":"2026-07-15" },
  { "curso":"Receivables Management","cursoSlug":"ar-receivablemanagement","megaCurso":"Outlining the Financial Process","modulo":"AR","tipo":"T5","volumen":1,"archivo":"courses/ar-receivablemanagement/t5-ar-receivablemanagement.html","fecha":"2026-07-15" },
  { "curso":"Asset Accounting","cursoSlug":"aa-assetaccountingprocesses","megaCurso":"Outlining the Financial Process","modulo":"AA","tipo":"T1","volumen":1,"archivo":"courses/aa-assetaccountingprocesses/t1-aa-assetaccountingprocesses.html","fecha":"2026-07-15" },
  { "curso":"Asset Accounting","cursoSlug":"aa-assetaccountingprocesses","megaCurso":"Outlining the Financial Process","modulo":"AA","tipo":"T2","volumen":1,"archivo":"courses/aa-assetaccountingprocesses/t2-aa-assetaccountingprocesses.html","fecha":"2026-07-15" },
  { "curso":"Asset Accounting","cursoSlug":"aa-assetaccountingprocesses","megaCurso":"Outlining the Financial Process","modulo":"AA","tipo":"T3","volumen":1,"archivo":"courses/aa-assetaccountingprocesses/t3-aa-assetaccountingprocesses.html","fecha":"2026-07-15" },
  { "curso":"Asset Accounting","cursoSlug":"aa-assetaccountingprocesses","megaCurso":"Outlining the Financial Process","modulo":"AA","tipo":"T4","volumen":1,"archivo":"courses/aa-assetaccountingprocesses/t4-aa-assetaccountingprocesses.html","fecha":"2026-07-15" },
  { "curso":"Asset Accounting","cursoSlug":"aa-assetaccountingprocesses","megaCurso":"Outlining the Financial Process","modulo":"AA","tipo":"T5","volumen":1,"archivo":"courses/aa-assetaccountingprocesses/t5-aa-assetaccountingprocesses.html","fecha":"2026-07-15" },
  { "curso":"Management Accounting General","cursoSlug":"co-costmanagementprofitabilityanalysis","megaCurso":"Cost Management","modulo":"CO","tipo":"T1","volumen":1,"archivo":"courses/co-costmanagementprofitabilityanalysis/t1-co-costmanagementprofitabilityanalysis.html","fecha":"2026-07-16" },
  { "curso":"Management Accounting General","cursoSlug":"co-costmanagementprofitabilityanalysis","megaCurso":"Cost Management","modulo":"CO","tipo":"T2","volumen":1,"archivo":"courses/co-costmanagementprofitabilityanalysis/t2-co-costmanagementprofitabilityanalysis.html","fecha":"2026-07-16" },
  { "curso":"Management Accounting General","cursoSlug":"co-costmanagementprofitabilityanalysis","megaCurso":"Cost Management","modulo":"CO","tipo":"T3","volumen":1,"archivo":"courses/co-costmanagementprofitabilityanalysis/t3-co-costmanagementprofitabilityanalysis.html","fecha":"2026-07-16" },
  { "curso":"Management Accounting General","cursoSlug":"co-costmanagementprofitabilityanalysis","megaCurso":"Cost Management","modulo":"CO","tipo":"T4","volumen":1,"archivo":"courses/co-costmanagementprofitabilityanalysis/t4-co-costmanagementprofitabilityanalysis.html","fecha":"2026-07-16" },
  { "curso":"Management Accounting General","cursoSlug":"co-costmanagementprofitabilityanalysis","megaCurso":"Cost Management","modulo":"CO","tipo":"T5","volumen":1,"archivo":"courses/co-costmanagementprofitabilityanalysis/t5-co-costmanagementprofitabilityanalysis.html","fecha":"2026-07-16" },
  { "curso":"Processes in Management Accounting","cursoSlug":"co-managementaccountingprocesses","megaCurso":"Cost Management","modulo":"CO","tipo":"T1","volumen":1,"archivo":"courses/co-managementaccountingprocesses/t1-co-managementaccountingprocesses.html","fecha":"2026-07-17" },
  { "curso":"Processes in Management Accounting","cursoSlug":"co-managementaccountingprocesses","megaCurso":"Cost Management","modulo":"CO","tipo":"T2","volumen":1,"archivo":"courses/co-managementaccountingprocesses/t2-co-managementaccountingprocesses.html","fecha":"2026-07-17" },
  { "curso":"Processes in Management Accounting","cursoSlug":"co-managementaccountingprocesses","megaCurso":"Cost Management","modulo":"CO","tipo":"T3","volumen":1,"archivo":"courses/co-managementaccountingprocesses/t3-co-managementaccountingprocesses.html","fecha":"2026-07-17" },
  { "curso":"Processes in Management Accounting","cursoSlug":"co-managementaccountingprocesses","megaCurso":"Cost Management","modulo":"CO","tipo":"T4","volumen":1,"archivo":"courses/co-managementaccountingprocesses/t4-co-managementaccountingprocesses.html","fecha":"2026-07-17" },
  { "curso":"Processes in Management Accounting","cursoSlug":"co-managementaccountingprocesses","megaCurso":"Cost Management","modulo":"CO","tipo":"T5","volumen":1,"archivo":"courses/co-managementaccountingprocesses/t5-co-managementaccountingprocesses.html","fecha":"2026-07-17" },
  { "curso":"GL Financial Posting Documents","cursoSlug":"gl-financialpostingdocuments","megaCurso":"Record to Report","modulo":"GL","tipo":"T1","volumen":1,"archivo":"courses/gl-financialpostingdocuments/t1-gl-financialpostingdocuments.html","fecha":"2026-07-15" },
  { "curso":"GL Financial Posting Documents","cursoSlug":"gl-financialpostingdocuments","megaCurso":"Record to Report","modulo":"GL","tipo":"T2","volumen":1,"archivo":"courses/gl-financialpostingdocuments/t2-gl-financialpostingdocuments.html","fecha":"2026-07-15" },
  { "curso":"GL Financial Posting Documents","cursoSlug":"gl-financialpostingdocuments","megaCurso":"Record to Report","modulo":"GL","tipo":"T3","volumen":1,"archivo":"courses/gl-financialpostingdocuments/t3-gl-financialpostingdocuments.html","fecha":"2026-07-15" },
  { "curso":"GL Financial Posting Documents","cursoSlug":"gl-financialpostingdocuments","megaCurso":"Record to Report","modulo":"GL","tipo":"T4","volumen":1,"archivo":"courses/gl-financialpostingdocuments/t4-gl-financialpostingdocuments.html","fecha":"2026-07-15" },
  { "curso":"GL Financial Posting Documents","cursoSlug":"gl-financialpostingdocuments","megaCurso":"Record to Report","modulo":"GL","tipo":"T5","volumen":1,"archivo":"courses/gl-financialpostingdocuments/t5-gl-financialpostingdocuments.html","fecha":"2026-07-15" },
  { "curso":"Master Data (Org Structure)","cursoSlug":"gl-orgstructuremasterdata","megaCurso":"Record to Report","modulo":"GL","tipo":"T1","volumen":1,"archivo":"courses/gl-orgstructuremasterdata/t1-gl-orgstructuremasterdata.html","fecha":"2026-07-15" },
  { "curso":"Master Data (Org Structure)","cursoSlug":"gl-orgstructuremasterdata","megaCurso":"Record to Report","modulo":"GL","tipo":"T2","volumen":1,"archivo":"courses/gl-orgstructuremasterdata/t2-gl-orgstructuremasterdata.html","fecha":"2026-07-15" },
  { "curso":"Master Data (Org Structure)","cursoSlug":"gl-orgstructuremasterdata","megaCurso":"Record to Report","modulo":"GL","tipo":"T3","volumen":1,"archivo":"courses/gl-orgstructuremasterdata/t3-gl-orgstructuremasterdata.html","fecha":"2026-07-15" },
  { "curso":"Master Data (Org Structure)","cursoSlug":"gl-orgstructuremasterdata","megaCurso":"Record to Report","modulo":"GL","tipo":"T4","volumen":1,"archivo":"courses/gl-orgstructuremasterdata/t4-gl-orgstructuremasterdata.html","fecha":"2026-07-15" },
  { "curso":"Master Data (Org Structure)","cursoSlug":"gl-orgstructuremasterdata","megaCurso":"Record to Report","modulo":"GL","tipo":"T5","volumen":1,"archivo":"courses/gl-orgstructuremasterdata/t5-gl-orgstructuremasterdata.html","fecha":"2026-07-15" },
  { "curso":"Posting Scenarios (Parallel Accounting / Doc Splitting)","cursoSlug":"gl-parallelaccountingdocsplitting","megaCurso":"Record to Report","modulo":"GL","tipo":"T1","volumen":1,"archivo":"courses/gl-parallelaccountingdocsplitting/t1-gl-parallelaccountingdocsplitting.html","fecha":"2026-07-16" },
  { "curso":"Posting Scenarios (Parallel Accounting / Doc Splitting)","cursoSlug":"gl-parallelaccountingdocsplitting","megaCurso":"Record to Report","modulo":"GL","tipo":"T2","volumen":1,"archivo":"courses/gl-parallelaccountingdocsplitting/t2-gl-parallelaccountingdocsplitting.html","fecha":"2026-07-16" },
  { "curso":"Posting Scenarios (Parallel Accounting / Doc Splitting)","cursoSlug":"gl-parallelaccountingdocsplitting","megaCurso":"Record to Report","modulo":"GL","tipo":"T3","volumen":1,"archivo":"courses/gl-parallelaccountingdocsplitting/t3-gl-parallelaccountingdocsplitting.html","fecha":"2026-07-16" },
  { "curso":"Posting Scenarios (Parallel Accounting / Doc Splitting)","cursoSlug":"gl-parallelaccountingdocsplitting","megaCurso":"Record to Report","modulo":"GL","tipo":"T4","volumen":1,"archivo":"courses/gl-parallelaccountingdocsplitting/t4-gl-parallelaccountingdocsplitting.html","fecha":"2026-07-16" },
  { "curso":"Posting Scenarios (Parallel Accounting / Doc Splitting)","cursoSlug":"gl-parallelaccountingdocsplitting","megaCurso":"Record to Report","modulo":"GL","tipo":"T5","volumen":1,"archivo":"courses/gl-parallelaccountingdocsplitting/t5-gl-parallelaccountingdocsplitting.html","fecha":"2026-07-16" }
];

const COURSE_META = {
  "r2r-recordtoreport": {
    desc: "The process of closing the books: from journal entries and postings through reconciliation to financial statements — the backbone that ties every other FI module together."
  },
  "ap-payablesmanagement": {
    desc: "How vendor invoices move from receipt to payment: verification, blocking reasons, payment runs, and the accounts payable sub-ledger."
  },
  "ar-receivablemanagement": {
    desc: "How customer invoices move from billing to cash: credit management, dunning, incoming payments, and the accounts receivable sub-ledger."
  },
  "aa-assetaccountingprocesses": {
    desc: "The lifecycle of a fixed asset: acquisition, depreciation, transfers, and retirement — and how it all posts back to the general ledger."
  },
  "co-costmanagementprofitabilityanalysis": {
    desc: "Where costs get tracked, assigned, and analyzed: cost centers, internal orders, and profitability by product, customer, or market segment."
  },
  "co-managementaccountingprocesses": {
    desc: "The day-to-day operational side of Controlling: planning, allocations, settlements, and the period-end processes that feed profitability analysis."
  },
  "gl-financialpostingdocuments": {
    desc: "The anatomy of a financial document: how a business transaction becomes a structured, balanced posting in the General Ledger."
  },
  "gl-orgstructuremasterdata": {
    desc: "The organizational backbone of SAP FI: company codes, chart of accounts, and the master data everything else is built on."
  },
  "gl-parallelaccountingdocsplitting": {
    desc: "How SAP keeps multiple accounting standards in sync at once, and how document splitting breaks one transaction into balanced, dimension-complete postings."
  }
};

const TYPE_META = {
  T1:{ code:"T1", en:"Basic Diagrams",     es:"Fundamentos teóricos",      color:"var(--t1)", dark:"var(--t1-dark)",
       icon:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="15" width="18" height="5" rx="1.2"/><rect x="3" y="9" width="18" height="5" rx="1.2"/><rect x="3" y="3" width="18" height="5" rx="1.2"/></svg>` },
  T2:{ code:"T2", en:"Deep Dive",          es:"Profundización + adyacentes", color:"var(--t2)", dark:"var(--t2-dark)",
       icon:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="10.5" cy="10.5" r="6.5"/><circle cx="10.5" cy="10.5" r="3"/><line x1="15.2" y1="15.2" x2="21" y2="21"/></svg>` },
  T3:{ code:"T3", en:"User View",          es:"Perspectiva del usuario (Fiori)", color:"var(--t3)", dark:"var(--t3-dark)",
       icon:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="7" height="7" rx="1.4"/><rect x="14" y="3" width="7" height="7" rx="1.4"/><rect x="3" y="14" width="7" height="7" rx="1.4"/><rect x="14" y="14" width="7" height="7" rx="1.4"/></svg>` },
  T4:{ code:"T4", en:"Configurator View",  es:"Perspectiva del consultor (GUI)", color:"var(--t4)", dark:"var(--t4-dark)",
       icon:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14.7 6.3a4 4 0 0 1-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 0 1 5.4-5.4z"/></svg>` },
  T5:{ code:"T5", en:"Ecosystem",          es:"Holístico / posicionamiento", color:"var(--t5)", dark:"var(--t5-dark)",
       icon:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="2.2"/><circle cx="12" cy="4" r="1.6"/><circle cx="19.5" cy="16" r="1.6"/><circle cx="4.5" cy="16" r="1.6"/><line x1="12" y1="6" x2="12" y2="9.8"/><line x1="17.9" y1="15" x2="13.7" y2="13"/><line x1="6.1" y1="15" x2="10.3" y2="13"/></svg>` }
};
const TYPE_ORDER = ["T1","T2","T3","T4","T5"];

let DATA = [];
let filter = { type:null, courseSlug:null };

async function loadLibrary(){
  try{
    const res = await fetch("library.json", { cache:"no-store" });
    if(!res.ok) throw new Error("no library.json");
    DATA = await res.json();
  }catch(e){
    DATA = FALLBACK_DATA;
  }
  render();
}

function uniqueCourses(){
  const map = new Map();
  DATA.forEach(d=>{
    if(!map.has(d.cursoSlug)) map.set(d.cursoSlug, { curso:d.curso, cursoSlug:d.cursoSlug, megaCurso:d.megaCurso || "Otros", modulo:d.modulo, entries:[] });
    map.get(d.cursoSlug).entries.push(d);
  });
  return [...map.values()];
}

function groupByMega(courses){
  const map = new Map();
  courses.forEach(c=>{
    if(!map.has(c.megaCurso)) map.set(c.megaCurso, []);
    map.get(c.megaCurso).push(c);
  });
  return [...map.entries()];
}

function render(){
  renderStats();
  renderTypeGrid();
  renderCourseGrid();
  renderResults();
}

function renderStats(){
  const courses = uniqueCourses().length;
  const files = DATA.length;
  document.getElementById("stat-courses").textContent = courses;
  document.getElementById("stat-files").textContent = files;
}

function renderTypeGrid(){
  const grid = document.getElementById("type-grid");
  grid.innerHTML = TYPE_ORDER.map(code=>{
    const m = TYPE_META[code];
    const count = DATA.filter(d=>d.tipo===code).length;
    const active = filter.type===code ? "active" : "";
    return `
      <div class="type-tile ${active}" style="--tint-dark:${m.dark}" data-type="${code}">
        <div class="icon">${m.icon}</div>
        <div class="tt-code">${code}</div>
        <h3>${m.en}</h3>
        <span class="tt-es">${m.es}</span>
        <div class="tt-count">${count} file${count===1?"":"s"}</div>
      </div>`;
  }).join("");
  grid.querySelectorAll(".type-tile").forEach(el=>{
    el.addEventListener("click", ()=>{
      const t = el.dataset.type;
      filter.type = (filter.type===t) ? null : t;
      render();
      document.getElementById("results-anchor").scrollIntoView({behavior:"smooth", block:"start"});
    });
  });
}

function renderCourseGrid(){
  const grid = document.getElementById("course-grid");
  const courses = uniqueCourses();
  if(courses.length===0){
    grid.innerHTML = `<div class="empty-state"><div class="big">Todavía no hay cursos cargados</div>Agregá entradas a library.json para que aparezcan acá.</div>`;
    return;
  }
  const groups = groupByMega(courses);
  grid.innerHTML = groups.map(([mega, list])=>{
    const cards = list.map(c=>{
      const bar = TYPE_ORDER.map(code=>{
        const has = c.entries.some(e=>e.tipo===code);
        const dark = TYPE_META[code].dark;
        return `<span class="${has?"on":""}" style="--dot-color:${dark}" title="${code}"></span>`;
      }).join("");
      return `
        <div class="course-card" data-slug="${c.cursoSlug}">
          <span class="course-pill">${c.modulo}</span>
          <h3>${c.curso}</h3>
          <div class="course-typebar">${bar}</div>
          <div class="course-meta">${c.entries.length} / 5 tipos</div>
        </div>`;
    }).join("");
    return `
      <div class="mega-group">
        <div class="mega-label">${mega}</div>
        <div class="course-subgrid">${cards}</div>
      </div>`;
  }).join("");
  grid.querySelectorAll(".course-card").forEach(el=>{
    el.addEventListener("click", ()=>{
      openCourseModal(el.dataset.slug);
    });
  });
}

function openCourseModal(slug){
  const course = uniqueCourses().find(c=>c.cursoSlug===slug);
  if(!course) return;
  const desc = COURSE_META[slug]?.desc || "";

  const tiles = TYPE_ORDER.map(code=>{
    const m = TYPE_META[code];
    const entry = course.entries.find(e=>e.tipo===code);
    if(entry){
      return `
        <a class="modal-type-tile" style="--tint-dark:${m.dark}; --tint:${m.color}" href="${entry.archivo}" target="_blank" rel="noopener">
          <div class="icon">${m.icon}</div>
          <div class="mt-code">${code}</div>
          <div class="mt-label">${m.en}</div>
        </a>`;
    }
    return `
      <div class="modal-type-tile disabled" title="Todavía no existe este tipo para este curso">
        <div class="icon">${m.icon}</div>
        <div class="mt-code">${code}</div>
        <div class="mt-label">${m.en}</div>
        <div class="mt-soon">Coming soon</div>
      </div>`;
  }).join("");

  document.getElementById("modal-pill").textContent = course.modulo;
  document.getElementById("modal-title").textContent = course.curso;
  document.getElementById("modal-desc").textContent = desc;
  document.getElementById("modal-types").innerHTML = tiles;

  const overlay = document.getElementById("modal-overlay");
  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeCourseModal(){
  document.getElementById("modal-overlay").classList.remove("open");
  document.body.style.overflow = "";
}

function renderResults(){
  const panel = document.getElementById("results");
  let list = DATA;
  if(filter.type) list = list.filter(d=>d.tipo===filter.type);
  if(filter.courseSlug) list = list.filter(d=>d.cursoSlug===filter.courseSlug);

  let label = "Todos los archivos";
  if(filter.type && filter.courseSlug){
    label = `${TYPE_META[filter.type].en} · ${list[0]?.curso ?? ""}`;
  }else if(filter.type){
    label = `${TYPE_META[filter.type].en}`;
  }else if(filter.courseSlug){
    label = `${list[0]?.curso ?? ""}`;
  }

  const showClear = filter.type || filter.courseSlug;

  const cards = list
    .sort((a,b)=> a.tipo.localeCompare(b.tipo) || (a.volumen-b.volumen))
    .map(d=>{
      const m = TYPE_META[d.tipo];
      const vol = d.volumen>1 ? ` · Vol.${d.volumen}` : "";
      return `
        <a class="file-card" style="--card-dark:${m.dark}" href="${d.archivo}" target="_blank" rel="noopener">
          <div class="fc-type">${d.tipo} · ${m.en}</div>
          <h4>${d.curso}</h4>
          <div class="fc-sub">${d.modulo}${vol}</div>
          <div class="fc-open">Open ↗</div>
        </a>`;
    }).join("");

  panel.innerHTML = `
    <div class="results-head">
      <div class="results-title">${label} <span class="tag">${list.length} file${list.length===1?"":"s"}</span></div>
      ${showClear ? `<button class="clear-btn" id="clear-filter">Clear filter ×</button>` : ""}
    </div>
    <div class="file-grid">
      ${cards || `<div class="empty-state"><div class="big">Sin resultados</div>No hay archivos que combinen ese tipo y curso todavía.</div>`}
    </div>
  `;
  const clearBtn = document.getElementById("clear-filter");
  if(clearBtn) clearBtn.addEventListener("click", ()=>{
    filter = { type:null, courseSlug:null };
    render();
  });
}

loadLibrary();

document.getElementById("modal-overlay").addEventListener("click", (e)=>{
  if(e.target.id === "modal-overlay") closeCourseModal();
});
document.getElementById("modal-close").addEventListener("click", closeCourseModal);
document.addEventListener("keydown", (e)=>{
  if(e.key === "Escape") closeCourseModal();
});
