// ==UserScript==
// @name          Evo Mobile plus
// @namespace     https://unibo.it/
// @version       1.1
// @description   Mega script unificato per l'ottimizzazione mobile di EVO: Marcatempo, Timbrature, Sidebar e Calcolo Uscita.
// @author        Stefano
// @match         https://personale-unibo.hrgpi.it/*
// @icon          https://www.unibo.it/favicon.ico
// @grant         GM_setValue
// @grant         GM_getValue
// @grant         GM_deleteValue
// @run-at        document-end
// ==/UserScript==

/**
 * MODULO 1: EVO - Calcola Orario di Uscita (HOME)
 */
(function () {
    'use strict';
    // --- Definizione costanti ---
    const FASCE_ORARIE = { '07:30 - 08:30': '07:30', '08:00 - 09:00': '08:00', '08:30 - 09:30': '08:30' };
    const DEFAULT_FASCIA = '07:30 - 08:30';
    const STORAGE_KEY_FASCIA = 'evoExitTime_selectedFascia_home';
    const STORAGE_KEY_CALC_MODE = 'evoExitTime_calcMode_home';
    const COLOR_PRIMARY_ACTIVE = "#bb2e29";
    const COLOR_INACTIVE_BACKGROUND = "#ffffff";
    const COLOR_INACTIVE_TEXT = "#333333";
    const COLOR_SWITCH_BORDER = "#ffffff";
    const COLOR_COMPACT_BOX_BACKGROUND = "#DDD8D8";
    const COLOR_COMPACT_BOX_TEXT = "#333333";
    const COLOR_COMPACT_BOX_VALUE = "#333333";

    const CALC_MODE_SEVEN_TWELVE = { key: 'sevenTwelve', textShort: '7:12', minutes: 432, color: COLOR_PRIMARY_ACTIVE, logType: "7h 12m" };
    const CALC_MODE_SIX_ONE = { key: 'sixOne', textShort: '6:01', minutes: 361, color: COLOR_PRIMARY_ACTIVE, logType: "6h 1m" };
    const CALC_MODES_SWITCH = { [CALC_MODE_SEVEN_TWELVE.key]: CALC_MODE_SEVEN_TWELVE, [CALC_MODE_SIX_ONE.key]: CALC_MODE_SIX_ONE };
    const DEFAULT_CALC_MODE_KEY_SWITCH = CALC_MODE_SEVEN_TWELVE.key;
    const EXIT_LABEL = "Uscita:";

    function injectCSS() {
        const style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = `
            @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap');
            #evoCalculatorContainerHome *, #evoCalculatorContainerHome { font-family: 'Open Sans', sans-serif !important; }
            #evoCalculatorContainerHome { background-color: #fff; border-radius: 0.25rem; box-shadow: 0 0.125rem 0.25rem rgba(0,0,0,0.075); padding: 1.25rem; margin-bottom: 1.5rem; }
            #evoCalculatorContainerHome h4 { font-size: 1.5rem; margin-bottom: 0.75rem; color: #212529; font-weight: 500; display: flex; align-items: center; gap: 8px; }
            .evo-content-wrapper-home { display: flex; align-items: flex-start; gap: 15px; flex-wrap: wrap; }
            .evo-label-home { font-size: 13px; font-weight: 600; color: #555; margin-bottom: 5px; white-space: nowrap; }
            .evo-group-wrapper-home { display: flex; flex-direction: column; align-items: center; }
            .evo-controls-inner-home { display: flex; align-items: center; gap: 7px; }
            #fasciaOrariaSelectorHome { padding: 8px; border-radius: 5px; border: 1px solid #ccc; font-size: 14px; width: 130px; height: 37.7667px; }
            .calc-mode-switch-home { display: flex; position: relative; border: 1px solid #ccc; border-radius: 6px; overflow: hidden; cursor: pointer; font-size: 14px; background-color: ${COLOR_INACTIVE_BACKGROUND}; padding: 3px; width: 144px; height: 37.7667px; }
            .calc-mode-slider-home { position: absolute; top: 3px; height: calc(100% - 6px); width: calc(50% - 6px); background-color: ${COLOR_PRIMARY_ACTIVE}; border-radius: inherit; transition: left 0.2s ease; z-index: 1; }
            .calc-mode-slider-home.pos-0 { left: 3px; }
            .calc-mode-slider-home.pos-1 { left: calc(100% - (50% - 6px) - 3px); }
            .calc-mode-switch-segment-home { flex: 1; padding: 0 5px; line-height: calc(37.7667px - 6px); text-align: center; z-index: 2; position: relative; color: ${COLOR_INACTIVE_TEXT}; transition: color 0.2s ease; }
            .calc-mode-switch-segment-home.active-text { color: ${COLOR_SWITCH_BORDER}; }
            #compactExitTimeBoxHome { background-color: ${COLOR_COMPACT_BOX_BACKGROUND}; color: ${COLOR_COMPACT_BOX_TEXT}; width: 118.7px; height: 37.8px; padding: 8px 12px; border-radius: 5px; border: 1px solid #ccc; font-size: 14px; font-weight: bold; display: flex; align-items: center; justify-content: center; gap: 5px; }
        `;
        document.head.appendChild(style);
    }

    function timeToMinutes(t) { const [h, m] = t.split(':').map(Number); return h * 60 + m; }
    function minutesToTime(mins) { const h = String(Math.floor(mins / 60)).padStart(2, '0'); const m = String(mins % 60).padStart(2, '0'); return `${h}:${m}`; }

    function estraiTimbratureHome() {
        const badgeList = [];
        const table = document.querySelector('table.clockings-table');
        if (!table) return badgeList;
        const rows = table.querySelectorAll('tbody tr');
        rows.forEach((row, index) => {
            if (index === 0) return;
            const cells = row.querySelectorAll('td');
            if (cells.length >= 4) {
                const pairs = [[0, 1], [2, 3]];
                pairs.forEach(p => {
                    const tipo = cells[p[0]].textContent.trim();
                    const orario = cells[p[1]].textContent.trim();
                    if ((tipo.includes('Entrata') || tipo.includes('Uscita')) && /^\d{2}:\d{2}$/.test(orario)) {
                        badgeList.push({ tipo: tipo.includes('Entrata') ? 'E' : 'U', orario });
                    }
                });
            }
        });
        return badgeList;
    }

    function calcolaOrarioDiUscita(fasciaSelezionataKey, mode) {
        const { minutes: minutiLavorativiNetti } = mode;
        const limiteIngressoMinuti = timeToMinutes(FASCE_ORARIE[fasciaSelezionataKey]);
        const badgeList = estraiTimbratureHome();
        badgeList.sort((a, b) => timeToMinutes(a.orario) - timeToMinutes(b.orario));
        if (badgeList.length === 0 || !badgeList.find(b => b.tipo === "E")) {
            if (compactExitTimeBox) compactExitTimeBox.innerHTML = `<span class="exit-label">${EXIT_LABEL}</span> <span class="value">N/A</span>`;
            return;
        }
        const entrataInizialeObj = badgeList.find(b => b.tipo === "E");
        let entrataInizialeMinuti = Math.max(limiteIngressoMinuti, timeToMinutes(entrataInizialeObj.orario));
        let pausaConsiderata = 10;
        for (let i = 0; i < badgeList.length - 1; i++) {
            if (badgeList[i].tipo === "U" && badgeList[i + 1].tipo === "E") {
                const diff = timeToMinutes(badgeList[i+1].orario) - timeToMinutes(badgeList[i].orario);
                if (diff > 0 && diff < 180) pausaConsiderata = Math.max(10, diff);
                break;
            }
        }
        const uscitaPrevista = minutesToTime(entrataInizialeMinuti + minutiLavorativiNetti + pausaConsiderata);
        if (compactExitTimeBox) compactExitTimeBox.innerHTML = `<span class="exit-label">${EXIT_LABEL}</span> <span class="value">${uscitaPrevista}</span>`;
    }

    let fasciaSelect, sevenTwelveSegment, sixOneSegment, sliderElement, compactExitTimeBox, currentActiveModeKeySwitch;

    function setActiveSwitchSegment(modeKey) {
        currentActiveModeKeySwitch = modeKey;
        GM_setValue(STORAGE_KEY_CALC_MODE, modeKey);
        if (sevenTwelveSegment) sevenTwelveSegment.classList.toggle('active-text', modeKey === CALC_MODE_SEVEN_TWELVE.key);
        if (sixOneSegment) sixOneSegment.classList.toggle('active-text', modeKey === CALC_MODE_SIX_ONE.key);
        if (sliderElement) { sliderElement.classList.remove('pos-0', 'pos-1'); sliderElement.classList.add(modeKey === CALC_MODE_SEVEN_TWELVE.key ? 'pos-0' : 'pos-1'); }
        if (fasciaSelect) calcolaOrarioDiUscita(fasciaSelect.value, CALC_MODES_SWITCH[modeKey]);
    }

    const waitForPageElements = setInterval(() => {
        const isDashboard = document.querySelector('form[name="Dashboard"]') !== null;
        const clockingsCard = document.querySelector('.card h4');
        if (isDashboard && clockingsCard && clockingsCard.textContent.includes('Timbrature di giornata')) {
            clearInterval(waitForPageElements);
            injectCSS();
            currentActiveModeKeySwitch = GM_getValue(STORAGE_KEY_CALC_MODE, DEFAULT_CALC_MODE_KEY_SWITCH);
            const container = document.createElement('div'); container.id = 'evoCalculatorContainerHome';
            container.innerHTML = '<h4>Ora del Giorno</h4><div class="evo-content-wrapper-home"><div class="evo-group-wrapper-home linea-oraria"><div class="evo-label-home">Linea oraria</div><div class="evo-controls-inner-home"></div></div><div class="evo-group-wrapper-home"><div class="evo-label-home">Orario di uscita</div><div id="compactExitTimeBoxHome"></div></div></div>';
            const controls = container.querySelector('.evo-controls-inner-home');
            fasciaSelect = document.createElement('select'); fasciaSelect.id = 'fasciaOrariaSelectorHome';
            for (const key in FASCE_ORARIE) { const opt = document.createElement('option'); opt.value = key; opt.textContent = key; fasciaSelect.appendChild(opt); }
            fasciaSelect.value = GM_getValue(STORAGE_KEY_FASCIA, DEFAULT_FASCIA);
            fasciaSelect.addEventListener('change', (e) => { GM_setValue(STORAGE_KEY_FASCIA, e.target.value); calcolaOrarioDiUscita(e.target.value, CALC_MODES_SWITCH[currentActiveModeKeySwitch]); });
            controls.appendChild(fasciaSelect);
            const sw = document.createElement('div'); sw.className = 'calc-mode-switch-home';
            sliderElement = document.createElement('span'); sliderElement.className = 'calc-mode-slider-home'; sw.appendChild(sliderElement);
            sevenTwelveSegment = document.createElement('span'); sevenTwelveSegment.className = 'calc-mode-switch-segment-home'; sevenTwelveSegment.textContent = '7:12'; sevenTwelveSegment.onclick = () => setActiveSwitchSegment(CALC_MODE_SEVEN_TWELVE.key); sw.appendChild(sevenTwelveSegment);
            sixOneSegment = document.createElement('span'); sixOneSegment.className = 'calc-mode-switch-segment-home'; sixOneSegment.textContent = '6:01'; sixOneSegment.onclick = () => setActiveSwitchSegment(CALC_MODE_SIX_ONE.key); sw.appendChild(sixOneSegment);
            controls.appendChild(sw);
            compactExitTimeBox = container.querySelector('#compactExitTimeBoxHome');
            const card = clockingsCard.closest('.card');
            if (card) card.parentNode.insertBefore(container, card);
            setActiveSwitchSegment(currentActiveModeKeySwitch);
        }
    }, 500);
})();

/**
 * MODULO 2: EVO - Responsive Marcatempo Virtuale
 */
(function () {
    'use strict';
    function injectResponsiveCSS() {
        const style = document.createElement('style');
        style.innerHTML = `
            @media (max-width: 1024px) {
                .form_interno.w-50 { width: 95% !important; margin: 0 auto !important; }
                .bg-white.p-4 { padding: 1.5rem !important; }
                .bg-white p b { font-size: 1.8rem !important; }
                .formTable td { display: block !important; width: 100% !important; padding: 0.8rem 0 !important; }
                .form-check-input { width: 3rem !important; height: 3rem !important; }
                .form-check-label { font-size: 2.2rem !important; }
                .form-select { font-size: 1.7rem !important; padding: 0.8rem !important; }
                .bottone, .bottone-plus { font-size: 1.9rem !important; padding: 1rem 1.5rem !important; }
            }
        `;
        document.head.appendChild(style);
    }
    const wait = setInterval(() => {
        if (document.querySelector('form[name="OnlineClockingRequestEdit"]') && document.querySelector('.formTable')) {
            clearInterval(wait);
            injectResponsiveCSS();
        }
    }, 500);
})();

/**
 * MODULO 3: EVO - Responsive Timbratura Manuale
 */
(function () {
    'use strict';
    function injectResponsiveCSS() {
        const style = document.createElement('style');
        style.innerHTML = `
            @media (max-width: 1024px) {
                .bg-white.m-2 { width: 100% !important; margin: 0.5rem 0 !important; }
                .formTable td { display: block !important; width: 100% !important; padding: 0.8rem 0 !important; }
                .form-check-input { width: 2.5rem !important; height: 2.5rem !important; }
                .form-check-label { font-size: 2rem !important; }
                .form-control, .form-select { font-size: 1.8rem !important; padding: 0.9rem !important; }
                .bottone, .bottone-plus { font-size: 1.9rem !important; padding: 1rem 1.5rem !important; width: 100% !important; }
            }
        `;
        document.head.appendChild(style);
    }
    const wait = setInterval(() => {
        if (document.querySelector('form[name="Movim"]') && document.querySelector('.formTable')) {
            clearInterval(wait);
            injectResponsiveCSS();
        }
    }, 500);
})();

/**
 * MODULO 4: EVO - Bottone Marcatempo Virtuale (HOME)
 */
(function () {
    'use strict';
    function injectButtonCSS() {
        if (document.getElementById('evo-btn-mobile-css')) return;
        const style = document.createElement('style');
        style.id = 'evo-btn-mobile-css';
        style.innerHTML = `
            .evo-btn-label-telelavoro, .evo-btn-label-timb-mancanti { display: inline; }
            @media (max-width: 1024px) {
                .evo-btn-label-telelavoro, .evo-btn-label-timb-mancanti { display: none !important; }
                #TeleLavoroMarcatempoBtn, #TimbMacantiBtn { padding: 0.4rem 0.6rem !important; }
            }
        `;
        document.head.appendChild(style);
    }
    function addTeleLavoroButton() {
        const h4 = Array.from(document.querySelectorAll('h4')).find(el => el.textContent.includes('Timbrature di giornata'));
        if (!h4 || h4.querySelector('#TeleLavoroMarcatempoBtn')) return;
        const dashForm = document.querySelector('form[name="Dashboard"]');
        if (!dashForm) return;
        const form = document.createElement('form'); form.name = 'OnlineClockingRequestList'; form.method = 'POST'; form.action = '/jt-employee-portal/richiesteTimbratureVirtualiElenco.do'; form.style.display = 'inline-block'; form.style.marginLeft = '10px';
        ['jwtToken', 'theme', 'matricola', 'fullname', 'selectedRuolo', 'roleDescr'].forEach(f => {
            const orig = dashForm.querySelector(`input[name="${f}"]`);
            if (orig) { const h = document.createElement('input'); h.type = 'hidden'; h.name = f; h.value = orig.value; form.appendChild(h); }
        });
        const origin = document.createElement('input'); origin.type = 'hidden'; origin.name = 'origin'; origin.value = 'dashboard.do'; form.appendChild(origin);
        const btn = document.createElement('button'); btn.id = 'TeleLavoroMarcatempoBtn'; btn.type = 'submit'; btn.className = 'bottone bottone-plus'; btn.style.padding = '0.4rem 0.8rem'; btn.style.fontSize = '0.9rem';
        btn.innerHTML = '<i class="material-symbols-outlined align-middle" style="font-size: 1.2rem;">add</i><i class="material-symbols-outlined align-middle" style="font-size: 1.2rem;">home_work</i><span class="evo-btn-label-telelavoro">&nbsp;TeleLavoro</span>';
        form.appendChild(btn);
        h4.style.display = 'flex'; h4.style.alignItems = 'center'; h4.style.justifyContent = 'space-between'; h4.style.width = '100%';
        const span = document.createElement('span'); span.innerHTML = h4.innerHTML; h4.innerHTML = ''; h4.appendChild(span); h4.appendChild(form);
    }
    const wait = setInterval(() => {
        const isDash = document.querySelector('form[name="Dashboard"]') !== null;
        const card = document.querySelector('.card h4');
        if (isDash && card && card.textContent.includes('Timbrature di giornata')) {
            clearInterval(wait); injectButtonCSS(); addTeleLavoroButton();
        }
    }, 500);
})();

/**
 * MODULO 5: EVO - Bottone Timbrature Mancanti (HOME)
 */
(function () {
    'use strict';
    function addTimbMacantiButton() {
        const h4 = Array.from(document.querySelectorAll('h4')).find(el => el.textContent.includes('Timbrature di giornata'));
        if (!h4 || h4.querySelector('#TimbMacantiBtn')) return;
        const dashForm = document.querySelector('form[name="Dashboard"]');
        if (!dashForm) return;
        const form = document.createElement('form'); form.name = 'MissingClockingsList'; form.method = 'POST'; form.action = '/jt-employee-portal/movimentimenu.do'; form.style.display = 'inline-block'; form.style.marginLeft = '5px';
        ['jwtToken', 'theme', 'matricola', 'fullname', 'selectedRuolo', 'roleDescr'].forEach(f => {
            const orig = dashForm.querySelector(`input[name="${f}"]`);
            if (orig) { const h = document.createElement('input'); h.type = 'hidden'; h.name = f; h.value = orig.value; form.appendChild(h); }
        });
        const origin = document.createElement('input'); origin.type = 'hidden'; origin.name = 'origin'; origin.value = 'dashboard.do'; form.appendChild(origin);
        const btn = document.createElement('button'); btn.id = 'TimbMacantiBtn'; btn.type = 'submit'; btn.className = 'bottone bottone-plus'; btn.name = 'event_Create'; btn.value = 'Nuovo'; btn.style.padding = '0.4rem 0.8rem'; btn.style.fontSize = '0.9rem';
        btn.innerHTML = '<i class="material-symbols-outlined align-middle" style="font-size: 1.2rem;">add</i><i class="material-symbols-outlined align-middle" style="font-size: 1.2rem;">touch_app</i><span class="evo-btn-label-timb-mancanti">&nbsp;Manuale</span>';
        form.appendChild(btn);
        const teleForm = h4.querySelector('form[name="OnlineClockingRequestList"]');
        if (teleForm) teleForm.insertAdjacentElement('afterend', form);
        else h4.appendChild(form);
    }
    const wait = setInterval(() => {
        const isDash = document.querySelector('form[name="Dashboard"]') !== null;
        const card = document.querySelector('.card h4');
        if (isDash && card && card.textContent.includes('Timbrature di giornata')) {
            clearInterval(wait);
            setTimeout(addTimbMacantiButton, 1000); // Aspetta il bottone TeleLavoro
        }
    }, 500);
})();

/**
 * MODULO 6: EVO - Layout Responsive Sidebar
 */
(function () {
    'use strict';
    function injectResponsiveCSS() {
        const style = document.createElement('style');
        style.innerHTML = `
            @media (max-width: 1024px) {
                .parent { grid-template-columns: repeat(1, 1fr) !important; gap: 1rem !important; }
                .body-container { grid-column: span 1 / span 1 !important; grid-template-columns: repeat(1, 1fr) !important; }
                .utils { grid-column: span 1 / span 1 !important; grid-row: auto !important; }
                h4 { font-size: 2.8rem !important; }
                .card { font-size: 2.2rem !important; }
                .progress-circle { --size: 200px !important; font-size: 3rem !important; }
                .material-symbols-outlined { font-size: 3rem !important; }
            }
        `;
        document.head.appendChild(style);
    }
    const wait = setInterval(() => {
        if (document.querySelector('form[name="Dashboard"]') && document.querySelector('.utils')) {
            clearInterval(wait);
            injectResponsiveCSS();
        }
    }, 500);
})();
