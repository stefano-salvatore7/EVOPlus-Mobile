// ==UserScript==
// @name          Evo Mobile Plus
// @namespace     https://unibo.it/
// @version       0.3
// @description   Versione unificata di tutti gli strumenti EVO Mobile: Responsive UI, Bottoni rapidi e Calcolatore d'uscita.
// @author        Stefano
// @match         https://personale-unibo.hrgpi.it/*
// @icon          https://www.unibo.it/favicon.ico
// @grant         GM_setValue
// @grant         GM_getValue
// @grant         GM_deleteValue
// @run-at        document-end
// ==/UserScript==

(function() {
    'use strict';

    /**
     * MODULO 1: EVO - Layout Responsive Sidebar & Home
     * (Originariamente: responsive-sidebar-home.user.js)
     * Questo modulo si occupa di raddoppiare la dimensione dei font e ottimizzare la griglia
     * della dashboard principale per renderla leggibile su smartphone.
     */
    (function() {
        function injectResponsiveCSS() {
            const style = document.createElement('style');
            style.type = 'text/css';
            style.innerHTML = `
                @media (max-width: 1024px) and (orientation: portrait),
                       (max-width: 768px) and (orientation: landscape) {
                    .parent { grid-template-columns: repeat(1, 1fr) !important; gap: 1rem !important; }
                    .welcome { grid-column: span 1 / span 1 !important; }
                    .body-container { grid-column: span 1 / span 1 !important; grid-template-columns: repeat(1, 1fr) !important; }
                    .utils { grid-column: span 1 / span 1 !important; grid-row: auto !important; }
                    .rights-div { flex-direction: column !important; align-items: center !important; }
                    h4 { font-size: 2.8rem !important; }
                    .card { font-size: 2.2rem !important; }
                    .clockings-table { font-size: 2rem !important; }
                    .material-symbols-outlined { font-size: 3rem !important; }
                    body, .form-mw { font-size: 2rem !important; }
                }
                @media (hover: none) and (pointer: coarse) {
                    .parent { grid-template-columns: repeat(1, 1fr) !important; }
                }
            `;
            document.head.appendChild(style);
        }

        const waitSidebar = setInterval(() => {
            if (document.querySelector('form[name="Dashboard"]') && document.querySelector('.utils')) {
                clearInterval(waitSidebar);
                injectResponsiveCSS();
            }
        }, 500);
    })();

    /**
     * MODULO 2: EVO - Bottone Marcatempo Virtuale (TeleLavoro)
     * (Originariamente: new-virtual-home.user.js)
     * Aggiunge il tasto per timbrare da remoto direttamente nel titolo "Timbrature di giornata".
     */
    (function() {
        function injectButtonCSS() {
            if (document.getElementById('evo-btn-mobile-css')) return;
            const style = document.createElement('style');
            style.id = 'evo-btn-mobile-css';
            style.innerHTML = `
                .evo-btn-label-telelavoro, .evo-btn-label-timb-mancanti { display: inline; }
                @media (max-width: 1024px) and (orientation: portrait), (max-width: 768px), (hover: none) and (pointer: coarse) {
                    .evo-btn-label-telelavoro, .evo-btn-label-timb-mancanti { display: none !important; }
                }
            `;
            document.head.appendChild(style);
        }

        function addTeleLavoroButton() {
            const h4s = document.querySelectorAll('h4');
            let target = null;
            for (const h of h4s) { if (h.textContent.includes('Timbrature di giornata')) { target = h; break; } }
            if (!target || target.querySelector('#TeleLavoroMarcatempoBtn')) return;

            const dForm = document.querySelector('form[name="Dashboard"]');
            if (!dForm) return;

            const form = document.createElement('form');
            form.name = 'OnlineClockingRequestList';
            form.method = 'POST';
            form.action = '/jt-employee-portal/richiesteTimbratureVirtualiElenco.do';
            form.style.display = 'inline-block';
            form.style.marginLeft = '10px';

            ['jwtToken', 'theme', 'matricola', 'fullname', 'selectedRuolo', 'roleDescr'].forEach(field => {
                const el = dForm.querySelector(`input[name="${field}"]`);
                if (el) {
                    const hidden = document.createElement('input');
                    hidden.type = 'hidden'; hidden.name = field; hidden.value = el.value;
                    form.appendChild(hidden);
                }
            });

            const btn = document.createElement('button');
            btn.id = 'TeleLavoroMarcatempoBtn'; btn.type = 'submit'; btn.className = 'bottone'; btn.name = 'event_Create';
            btn.innerHTML = `<span class="material-symbols-outlined" style="vertical-align: middle; margin-right: 5px;"> nest_remote_comfort </span><span class="evo-btn-label-telelavoro">TeleLavoro</span>`;
            form.appendChild(btn);

            const content = target.innerHTML; target.innerHTML = '';
            const span = document.createElement('span'); span.innerHTML = content;
            target.appendChild(span); target.appendChild(form);
        }

        const waitVirtual = setInterval(() => {
            if (document.querySelector('form[name="Dashboard"]') && document.querySelector('.card h4')) {
                clearInterval(waitVirtual);
                injectButtonCSS();
                addTeleLavoroButton();
            }
        }, 500);
    })();

    /**
     * MODULO 3: EVO - Bottone Timbrature Mancanti
     * (Originariamente: new-missing-home.user.js)
     * Aggiunge il tasto per l'inserimento manuale accanto a quello del TeleLavoro.
     */
    (function() {
        function addTimbMacantiButton() {
            const h4s = document.querySelectorAll('h4');
            let target = null;
            for (const h of h4s) { if (h.textContent.includes('Timbrature di giornata')) { target = h; break; } }
            if (!target || target.querySelector('#TimbMacantiBtn')) return;

            const dForm = document.querySelector('form[name="Dashboard"]');
            const form = document.createElement('form');
            form.name = 'MissingClockingsList'; form.method = 'POST'; form.action = '/jt-employee-portal/movimentimenu.do';
            form.style.display = 'inline-block'; form.style.marginLeft = '5px';

            ['jwtToken', 'theme', 'matricola', 'fullname', 'selectedRuolo', 'roleDescr'].forEach(field => {
                const el = dForm.querySelector(`input[name="${field}"]`);
                if (el) {
                    const h = document.createElement('input');
                    h.type = 'hidden'; h.name = field; h.value = el.value;
                    form.appendChild(h);
                }
            });

            const origin = document.createElement('input');
            origin.type = 'hidden'; origin.name = 'origin'; origin.value = 'dashboard.do';
            form.appendChild(origin);

            const btn = document.createElement('button');
            btn.id = 'TimbMacantiBtn'; btn.type = 'submit'; btn.className = 'bottone bottone-plus'; btn.name = 'event_Create';
            btn.innerHTML = `<span class="material-symbols-outlined" style="vertical-align: middle; margin-right: 5px;"> edit_calendar </span><span class="evo-btn-label-timb-mancanti">Timb. Mancanti</span>`;
            form.appendChild(btn);
            target.appendChild(form);
        }

        // Aspetta un secondo in più per evitare sovrapposizioni con l'altro bottone
        setTimeout(() => {
            if (document.querySelector('form[name="Dashboard"]')) addTimbMacantiButton();
        }, 1500);
    })();

    /**
     * MODULO 4: EVO - Calcolatore Orario di Uscita
     * (Originariamente: evo-exit-time-calculator-home.user.js)
     * Analizza la tabella delle timbrature e calcola l'uscita prevista in base alla fascia.
     */
    (function() {
        const FASCE = {'07:30 - 08:30': '07:30', '08:00 - 09:00': '08:00', '08:30 - 09:30': '08:30'};
        const SK_FASCIA = 'evoExitTime_selectedFascia_home';
        const SK_MODE = 'evoExitTime_calcMode_home';
        const COLOR_ACT = "#bb2e29";

        // Funzioni di utilità temporale
        const tToM = (t) => { const [h, m] = t.split(':').map(Number); return h * 60 + m; };
        const mToT = (m) => { const hh = Math.floor(m / 60); const mm = m % 60; return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`; };

        function getClockings() {
            const list = [];
            const table = document.querySelector('table.clockings-table');
            if (!table) return list;
            table.querySelectorAll('tbody tr').forEach((row, i) => {
                if (i === 0) return;
                const cells = row.querySelectorAll('td');
                if (cells.length >= 2) {
                    const tipo = cells[0].textContent.trim();
                    const ora = cells[1].textContent.trim();
                    if (/^\d{2}:\d{2}$/.test(ora)) {
                        list.push({ tipo: tipo.includes('Entrata') ? 'E' : 'U', ora });
                    }
                }
            });
            return list;
        }

        function calculate(list, startFascia, targetMins) {
            if (list.length === 0) return "--:--";
            let worked = 0, lastE = null;
            list.forEach(b => {
                const mins = tToM(b.ora);
                if (b.tipo === 'E') {
                    lastE = Math.max(mins, tToM(startFascia));
                } else if (b.tipo === 'U' && lastE !== null) {
                    worked += (mins - lastE);
                    lastE = null;
                }
            });
            if (lastE === null) return "--:--";
            return mToT(lastE + (targetMins - worked));
        }

        function refresh() {
            const fascia = GM_getValue(SK_FASCIA, '07:30 - 08:30');
            const mode = GM_getValue(SK_MODE, '7:12');
            const target = mode === '7:12' ? 432 : 361;
            const res = calculate(getClockings(), FASCE[fascia], target);
            const display = document.querySelector('#compactExitTimeBoxHome .value');
            if (display) display.textContent = res;
        }

        const waitCalc = setInterval(() => {
            const h4s = document.querySelectorAll('h4');
            let targetCard = null;
            for (const h of h4s) { if (h.textContent.includes('Timbrature di giornata')) { targetCard = h.closest('.card'); break; } }
            
            if (targetCard) {
                clearInterval(waitCalc);
                const container = document.createElement('div');
                container.style = "background:#f9f9f9; padding:15px; border-radius:8px; margin-bottom:15px; border:1px solid #ddd; display:flex; justify-content:space-between; align-items:center;";
                
                const select = document.createElement('select');
                select.style = "padding:8px; font-size:1.1rem; border-radius:5px;";
                Object.keys(FASCE).forEach(f => {
                    const opt = document.createElement('option');
                    opt.value = f; opt.textContent = f;
                    if (f === GM_getValue(SK_FASCIA, '07:30 - 08:30')) opt.selected = true;
                    select.appendChild(opt);
                });

                select.addEventListener('change', (e) => {
                    GM_setValue(SK_FASCIA, e.target.value);
                    refresh();
                });

                const resultBox = document.createElement('div');
                resultBox.id = 'compactExitTimeBoxHome';
                resultBox.innerHTML = `<span style="font-weight:bold;">Uscita:</span> <span class="value" style="color:${COLOR_ACT}; font-weight:bold; font-size:1.4rem;">--:--</span>`;
                
                container.appendChild(select);
                container.appendChild(resultBox);
                targetCard.parentNode.insertBefore(container, targetCard);
                refresh();
            }
        }, 500);
    })();

    /**
     * MODULO 5: EVO - Responsive Marcatempo Virtuale (Pagina Interna)
     * (Originariamente: evo-responsive-marcatempo.user.js)
     * Ottimizza la pagina dove effettivamente si preme "Inizia Lavoro".
     */
    (function() {
        function inject() {
            const s = document.createElement('style');
            s.innerHTML = `
                @media (max-width: 1024px) {
                    .form_interno.w-50 { width: 95% !important; margin: 0 auto !important; }
                    .formTable td { display: block !important; width: 100% !important; }
                    .form-select { font-size: 1.7rem !important; padding: 0.9rem !important; }
                    .bottone { min-width: 150px !important; font-size: 1.8rem !important; }
                }
            `;
            document.head.appendChild(s);
        }
        const wait = setInterval(() => {
            if (document.querySelector('form[name="OnlineClockingRequestEdit"]')) {
                clearInterval(wait); inject();
            }
        }, 500);
    })();

    /**
     * MODULO 6: EVO - Responsive Timbratura Manuale (Pagina Interna)
     * (Originariamente: evo-responsive-timbrature-mancanti.user.js)
     * Ottimizza la pagina di correzione/inserimento timbrature.
     */
    (function() {
        function inject() {
            const s = document.createElement('style');
            s.innerHTML = `
                @media (max-width: 1024px) {
                    .bg-white.m-2 { width: 100% !important; margin: 0.5rem 0 !important; }
                    .formTable td { display: block !important; width: 100% !important; }
                    input[type="time"], .form-select { font-size: 1.8rem !important; padding: 0.8rem !important; }
                }
            `;
            document.head.appendChild(s);
        }
        const wait = setInterval(() => {
            if (document.querySelector('form[name="Movim"]')) {
                clearInterval(wait); inject();
            }
        }, 500);
    })();

})();
