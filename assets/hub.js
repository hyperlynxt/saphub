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
  "co-costestimateoptions": {
    desc: "How SAP S/4HANA estimates a product's standard cost from material master data, BOM, and routing — and how that result updates the standard price."
  },
  "gl-financialpostingdocuments": {
    desc: "The anatomy of a financial document: how a business transaction becomes a structured, balanced posting in the General Ledger."
  },
  "gl-orgstructuremasterdata": {
    desc: "The organizational backbone of SAP FI: company codes, chart of accounts, and the master data everything else is built on."
  },
  "gl-parallelaccountingdocsplitting": {
    desc: "How SAP keeps multiple accounting standards in sync at once, and how document splitting breaks one transaction into balanced, dimension-complete postings."
  },
  "o2c-ordertocash": {
    desc: "The end-to-end sales process: from customer inquiry and sales order through delivery and billing to the incoming payment."
  },
  "p2p-procuretopay": {
    desc: "The end-to-end purchasing process: from purchase requisition and purchase order through goods receipt and invoice verification to vendor payment."
  },
  "pp-plantoproduce": {
    desc: "The end-to-end manufacturing process: from demand and production planning through order execution and confirmation to goods receipt of the finished product."
  },
  "ar-cashreconciliation": {
    desc: "How incoming payments get matched to open receivables: cash application, bank statement reconciliation, and where SAP Business AI speeds up the matching process."
  },
  "ar-cashreconciliationai": {
    desc: "A closer look at the AI-assisted side of cash reconciliation: automated matching proposals, dispute handling, and how SAP Business AI changes the analyst's day-to-day workflow."
  },
  "tr-treasurymanagement": {
    desc: "The core building blocks of SAP Treasury & Risk Management: cash and liquidity management, multi-bank connectivity, and where SAP Business AI fits into treasury operations."
  },
  "tr-cashmanagementbenefits": {
    desc: "The business case for SAP Cash Management: how visibility into liquidity, multi-bank connectivity, and working capital translate into measurable value for the organization."
  },
  "tr-advancedpaymentmanagement": {
    desc: "The business case for Advanced Payment Management: streamlining outgoing payments, improving payment status visibility, and reducing manual effort in treasury operations."
  },
  "tr-treasuryriskmanagement": {
    desc: "Where Treasury & Risk Management earns its keep: exposure visibility, risk mitigation, and how it ties financial instruments back to the treasury's day-to-day decisions."
  },
  "tr-processimprovements": {
    desc: "What actually gets better moving to SAP S/4HANA for treasury: process simplification, automation gains, and where the new architecture removes old workarounds."
  },
  "ar-rulebasedclearing": {
    desc: "How SAP automates payment matching with configurable clearing rules, reducing the manual effort behind reconciling incoming payments against open items."
  },
  "ar-manualclearingfunctionality": {
    desc: "What happens when automated matching isn't enough: the manual clearing tools analysts use to resolve exceptions and close out open items by hand."
  },
  "ar-bankstatementuploadoptions": {
    desc: "The different ways bank statement data gets into SAP — formats, upload methods, and the tradeoffs between them for keeping cash positions current."
  },
  "ar-cashreconciliationfunctionality": {
    desc: "The mechanics of SAP's cash reconciliation engine: how it matches bank statement lines to postings and where it flags items for review."
  },
  "ap-balanceconfirmations": {
    desc: "How and why AP teams confirm open balances with suppliers: the process, the documentation, and its role in period-end closing."
  },
  "ap-closingactivities": {
    desc: "The checklist behind closing the books in Accounts Payable: what needs to happen, in what order, before the period can be locked."
  },
  "ap-foreigncurrencyvaluation": {
    desc: "How SAP revalues open foreign-currency items at period-end, and why getting this step right matters for accurate financial statements."
  },
  "ap-grirreconciliation": {
    desc: "Reconciling the Goods Receipt / Invoice Receipt account: why mismatches happen between procurement and invoicing, and how AP clears them."
  },
  "ap-holdpark": {
    desc: "The difference between holding and parking a supplier invoice, and when each one is the right move before an invoice is ready to post."
  },
  "ap-kpis": {
    desc: "The metrics that tell you whether Accounts Payable is healthy: what they measure, why they matter, and where to find them in SAP."
  },
  "ap-manageitems": {
    desc: "Day-to-day management of open supplier items: reviewing, adjusting, and clearing the line items that make up the AP sub-ledger."
  },
  "ap-postinglogic": {
    desc: "How a supplier transaction actually becomes a balanced posting in Accounts Payable — the accounts, document types, and logic behind it."
  },
  "ap-procuretopay": {
    desc: "The Payables side of the procure-to-pay chain: how a purchase order and goods receipt flow into an invoice and, eventually, a payment."
  },
  "ap-regrouping": {
    desc: "Why AP balances sometimes need to be regrouped at period-end for reporting purposes, and how SAP handles the reclassification."
  },
  "ap-streamlining": {
    desc: "Where supplier invoice processing tends to slow down, and the tools SAP offers to cut manual touchpoints out of the workflow."
  },
  "ap-supplierkeyelements": {
    desc: "The building blocks of supplier master data: what fields matter, why they exist, and how they drive downstream AP processing."
  },
  "ap-suppliermasterdata": {
    desc: "How supplier master data actually gets created and maintained in SAP, and the methods available for keeping it accurate over time."
  },
  "ap-manualpaymentsprocessing": {
    desc: "How outgoing supplier payments get processed manually: when it's necessary, how it works, and how it differs from the automated payment run."
  },
  "ap-supplierpaymentsmonitoring": {
    desc: "The tools SAP provides to track supplier payments after they're issued — status visibility, monitoring mechanisms, and catching issues early."
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

/* Learning paths shown on the homepage. Each key maps to a <div id="section-{key}">
   in index.html. To add a course to a section, just add its cursoSlug to the array —
   no other changes needed. */
const SECTION_COURSES = {
  "newjoiner": ["r2r-recordtoreport","ap-payablesmanagement","ar-receivablemanagement","aa-assetaccountingprocesses"],
  "mgmtacct": ["co-costmanagementprofitabilityanalysis","co-managementaccountingprocesses","co-costestimateoptions"],
  "treasury": ["ar-cashreconciliation","ar-cashreconciliationai"]
};

let DATA = [];

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

function render(){
  renderStats();
  renderTypeGrid();
  renderMegaSections();
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
    return `
      <div class="type-tile" style="--tint-dark:${m.dark}">
        <div class="icon">${m.icon}</div>
        <div class="tt-code">${code}</div>
        <h3>${m.en}</h3>
        <span class="tt-es">${m.es}</span>
        <div class="tt-count">${count} file${count===1?"":"s"}</div>
      </div>`;
  }).join("");
}

function courseCardHTML(c){
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
}

function renderMegaSections(){
  const courses = uniqueCourses();
  Object.entries(SECTION_COURSES).forEach(([key, slugs])=>{
    const container = document.getElementById(`section-${key}`);
    if(!container) return;
    const list = slugs.map(slug=>courses.find(c=>c.cursoSlug===slug)).filter(Boolean);
    if(list.length===0){
      container.innerHTML = `<div class="empty-state"><div class="big">Todavía no hay cursos en esta sección</div>Sumalos en SECTION_COURSES, en hub.js.</div>`;
      return;
    }
    const mega = list[0].megaCurso;
    container.innerHTML = `
      <div class="mega-label">${mega}</div>
      <div class="course-subgrid">${list.map(courseCardHTML).join("")}</div>`;
    container.querySelectorAll(".course-card").forEach(el=>{
      el.addEventListener("click", ()=> openCourseModal(el.dataset.slug));
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

loadLibrary();

document.getElementById("modal-overlay").addEventListener("click", (e)=>{
  if(e.target.id === "modal-overlay") closeCourseModal();
});
document.getElementById("modal-close").addEventListener("click", closeCourseModal);
document.addEventListener("keydown", (e)=>{
  if(e.key === "Escape") closeCourseModal();
});
