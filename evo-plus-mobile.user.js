// ==UserScript==
// @name          Evo Mobile Plus
// @namespace     https://unibo.it/
// @version       0.2
// @description   Suite completa per il portale presenze Unibo (Evo). Include calcolo uscita, layout responsive, e bottoni rapidi.
// @author        Stefano
// @match         https://personale-unibo.hrgpi.it/*
// @icon          https://www.unibo.it/favicon.ico
// @grant         GM_setValue
// @grant         GM_getValue
// @grant         GM_deleteValue
// ==/UserScript==

(function () {
    'use strict';
    console.log("--- Evo Mobile Plus v3.1 Inizializzato ---");

    // --- CONFIGURAZIONE ---
    const CONFIG = {
        COLOR_PRIMARY: "#bb2e29",
        COLOR_BG: "#ffffff",
        COLOR_TEXT: "#333333",
        COLOR_COMPACT_BOX_BACKGROUND: "#DDD8D8"
    };

    // --- UTILS ---
    function timeToMinutes(t) {
        if (!t) return 0;
        const [h, m] = t.split(':').map(Number);
        return h * 60 + m;
    }

    function minutesToTime(mins) {
        const h = String(Math.floor(mins / 60)).padStart(2, '0');
        const m = String(mins % 60).padStart(2, '0');
        return `${h}:${m}`;
    }

    // --- MODULO 1: Calcolatore Orario Uscita (HOME) ---
    (function () {
        const FASCE_ORARIE = {
            '07:30 - 08:30': '07:30',
            '08:00 - 09:00': '08:00',
            '08:30 - 09:30': '08:30'
        };
        const STORAGE_KEY_FASCIA = 'evoExitTime_selectedFascia_home';

        function injectCSS() {
            if (document.getElementById('evo-calc-css')) return;
            const style = document.createElement('style');
            style.id = 'evo-calc-css';
            style.innerHTML = `
                @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap');
                #evoCalculatorContainerHome {
                    background-color: #fff; border-radius: 0.25rem; box-shadow: 0 0.125rem 0.25rem rgba(0,0,0,0.075);
                    padding: 1.25rem; margin-bottom: 1.5rem; font-family: 'Open Sans', sans-serif !important;
                }
                #evoCalculatorContainerHome h4 { font-size: 1.5rem; margin-bottom: 0.75rem; color: #212529; font-weight: 500; display: flex; align-items: center; gap: 8px; }
                .evo-content-wrapper-home { display: flex; align-items: flex-start; gap: 15px; flex-wrap: wrap; }
                .evo-label-home { font-size: 13px; font-weight: 600; color: #555; margin-bottom: 5px; }
                #fasciaOrariaSelectorHome { padding: 8px; border-radius: 5px; border: 1px solid #ccc; font-size: 14px; background: white; width: 130px; height: 38px; }
                #compactExitTimeBoxHome {
                    background-color: ${CONFIG.COLOR_COMPACT_BOX_BACKGROUND}; color: #333; width: 120px; height: 38px;
                    padding: 8px 12px; border-radius: 5px; border: 1px solid #ccc; font-weight: bold;
                    display: flex; align-items: center; justify-content: center; gap: 5px; font-size: 14px;
                }
                #compactExitTimeBoxHome .value { color: ${CONFIG.COLOR_PRIMARY}; font-size: 16px; }
            `;
            document.head.appendChild(style);
        }

        function estraiTimbrature() {
            const badgeList = [];
            const table = document.querySelector('table.clockings-table');
            if (!table) return badgeList;
            const rows = table.querySelectorAll('tbody tr');
            rows.forEach((row, index) => {
                const cells = row.querySelectorAll('td');
                if (cells.length >= 2) {
                    const tipo1 = cells[0].textContent.trim();
                    const orario1 = cells[1].textContent.trim();
                    if (tipo1.includes('Entrata') && /^\d{2}:\d{2}$/.test(orario1)) badgeList.push({ tipo: 'E', orario: orario1 });
                    else if (tipo1.includes('Uscita') && /^\d{2}:\d{2}$/.test(orario1)) badgeList.push({ tipo: 'U', orario: orario1 });
                }
                if (cells.length >= 4) {
                    const tipo2 = cells[2].textContent.trim();
                    const orario2 = cells[3].textContent.trim();
                    if (tipo2.includes('Entrata') && /^\d{2}:\d{2}$/.test(orario2)) badgeList.push({ tipo: 'E', orario: orario2 });
                    else if (tipo2.includes('Uscita') && /^\d{2}:\d{2}$/.test(orario2)) badgeList.push({ tipo: 'U', orario: orario2 });
                }
            });
            return badgeList;
        }

        function recalc() {
            const fasciaKey = document.getElementById('fasciaOrariaSelectorHome')?.value || '07:30 - 08:30';
            const box = document.getElementById('compactExitTimeBoxHome');
            if (!box) return;

            const badgeList = estraiTimbrature();
            badgeList.sort((a, b) => timeToMinutes(a.orario) - timeToMinutes(b.orario));

            if (badgeList.length === 0) { box.innerHTML = 'N/A'; return; }

            const entrataObj = badgeList.find(b => b.tipo === "E");
            if (!entrataObj) { box.innerHTML = 'N/A'; return; }

            const limiteMinuti = timeToMinutes(FASCE_ORARIE[fasciaKey]);
            let minutiEntrata = timeToMinutes(entrataObj.orario);
            if (minutiEntrata < limiteMinuti) minutiEntrata = limiteMinuti;

            // Calcolo pausa (min 10m)
            let pausaMinuti = 10;
            for (let i = 0; i < badgeList.length - 1; i++) {
                if (badgeList[i].tipo === "U" && badgeList[i + 1].tipo === "E") {
                    const diff = timeToMinutes(badgeList[i + 1].orario) - timeToMinutes(badgeList[i].orario);
                    if (diff > 0 && diff < 180) pausaMinuti = Math.max(10, diff);
                    break;
                }
            }

            // Default 7:12 (432m)
            const uscita = minutesToTime(minutiEntrata + 432 + pausaMinuti);
            box.innerHTML = `<span class="exit-label">Uscita:</span> <span class="value">${uscita}</span>`;
        }

        function init() {
            const table = document.querySelector('table.clockings-table');
            if (!table || document.getElementById('evoCalculatorContainerHome')) return;

            injectCSS();
            const container = document.createElement('div');
            container.id = 'evoCalculatorContainerHome';
            container.innerHTML = `
                <h4><i class="material-symbols-outlined">schedule</i> Previsione Uscita</h4>
                <div class="evo-content-wrapper-home">
                    <div class="evo-group-wrapper-home">
                        <div class="evo-label-home">Fascia Oraria</div>
                        <select id="fasciaOrariaSelectorHome">
                            ${Object.keys(FASCE_ORARIE).map(f => `<option value="${f}">${f}</option>`).join('')}
                        </select>
                    </div>
                    <div class="evo-group-wrapper-home">
                        <div class="evo-label-home">Orario Previsto</div>
                        <div id="compactExitTimeBoxHome">...</div>
                    </div>
                </div>
            `;

            const card = table.closest('.card');
            if (card) card.parentNode.insertBefore(container, card);

            const selector = document.getElementById('fasciaOrariaSelectorHome');
            const saved = GM_getValue(STORAGE_KEY_FASCIA);
            if (saved && FASCE_ORARIE[saved]) selector.value = saved;

            selector.addEventListener('change', (e) => {
                GM_setValue(STORAGE_KEY_FASCIA, e.target.value);
                recalc();
            });
            recalc();
            setInterval(recalc, 5000);
        }

        setInterval(init, 2000);
    })();

    // --- MODULO 2: Responsive & Mobile Style ---
    (function () {
        function injectCSS() {
            if (document.getElementById('evo-responsive-css')) return;
            const style = document.createElement('style');
            style.id = 'evo-responsive-css';
            style.innerHTML = `
                @media (max-width: 1024px) {
                    /* Layout Home */
                    .parent { grid-template-columns: 1fr !important; gap: 1rem !important; }
                    .welcome, .body-container, .utils { grid-column: 1 / -1 !important; }
                    
                    /* Font Giganti */
                    h4 { font-size: 2.2rem !important; }
                    .card, .clockings-table, body { font-size: 1.8rem !important; }
                    .badge { font-size: 1.6rem !important; padding: 0.6rem 1rem !important; }
                    .material-symbols-outlined { font-size: 2.4rem !important; }
                    
                    /* Form & Marcatempo */
                    .form_interno.w-50 { width: 98% !important; margin: 0 auto !important; }
                    .formTable td { display: block !important; width: 100% !important; padding: 1rem 0 !important; border: none !important; }
                    .formTable td.desc { font-weight: bold !important; font-size: 2rem !important; }
                    .form-check-input { width: 3rem !important; height: 3rem !important; }
                    .form-check-label { font-size: 2.2rem !important; margin-left: 1rem !important; }
                    .form-select, .form-control, input[type="time"] { font-size: 1.8rem !important; padding: 1rem !important; height: auto !important; }
                    
                    /* Bottoni */
                    .bottone, .bottone-plus { font-size: 2rem !important; padding: 1.2rem !important; width: 100% !important; margin: 0.5rem 0 !important; display: block !important; }
                    
                    /* Calculator Mobile Fix */
                    #evoCalculatorContainerHome h4 { font-size: 2.2rem !important; }
                    .evo-label-home { font-size: 1.6rem !important; }
                    #fasciaOrariaSelectorHome, #compactExitTimeBoxHome { font-size: 1.8rem !important; width: auto !important; min-width: 180px !important; height: auto !important; padding: 1rem !important; }
                    #compactExitTimeBoxHome .value { font-size: 2.2rem !important; }
                }
            `;
            document.head.appendChild(style);
        }
        injectCSS();
    })();

    // --- MODULO 3: Bottoni Rapidi (Telelavoro & Manuale) ---
    (function () {
        function addButtons() {
            const h4s = Array.from(document.querySelectorAll('h4'));
            const container = h4s.find(h => h.textContent.includes('Timbrature di giornata'));
            if (!container || container.querySelector('#EvoPlusBtns')) return;

            const dashForm = document.querySelector('form[name="Dashboard"]');
            if (!dashForm) return;

            const btnWrapper = document.createElement('div');
            btnWrapper.id = 'EvoPlusBtns';
            btnWrapper.style.display = 'flex';
            btnWrapper.style.gap = '8px';

            function createBtn(action, icon, text, value) {
                const form = document.createElement('form');
                form.method = 'POST';
                form.action = action;
                ['jwtToken', 'theme', 'matricola', 'fullname', 'selectedRuolo', 'roleDescr'].forEach(name => {
                    const val = dashForm.querySelector(\`input[name="\${name}"]\`)?.value;
                    if (val) {
                        const h = document.createElement('input');
                        h.type = 'hidden'; h.name = name; h.value = val;
                        form.appendChild(h);
                    }
                });
                const origin = document.createElement('input');
                origin.type = 'hidden'; origin.name = 'origin'; origin.value = 'dashboard.do';
                form.appendChild(origin);

                const btn = document.createElement('button');
                btn.type = 'submit'; btn.name = 'event_Create'; btn.value = value;
                btn.className = 'bottone bottone-plus';
                btn.style.padding = '4px 10px'; btn.style.fontSize = '13px';
                btn.innerHTML = \`<i class="material-symbols-outlined align-middle" style="font-size:18px">\${icon}</i> <span class="d-none d-md-inline">\${text}</span>\`;
                form.appendChild(btn);
                return form;
            }

            btnWrapper.appendChild(createBtn('/jt-employee-portal/richiesteTimbratureVirtualiElenco.do', 'home_work', 'TeleLavoro', 'TeleLavoro'));
            btnWrapper.appendChild(createBtn('/jt-employee-portal/movimentimenu.do', 'touch_app', 'Manuale', 'Nuovo'));

            container.style.display = 'flex';
            container.style.alignItems = 'center';
            container.style.justifyContent = 'space-between';
            container.appendChild(btnWrapper);
        }
        setInterval(addButtons, 1500);
    })();

})();
