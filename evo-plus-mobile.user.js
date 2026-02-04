// ==UserScript==
// @name         EVO Mobile Plus
// @namespace    https://unibo.it/
// @version      1.2
// @description  Suite completa per EVO: layout responsive, bottoni rapidi, font ottimizzati per mobile
// @author       Stefano
// @match        https://personale-unibo.hrgpi.it/*
// @icon         https://www.unibo.it/favicon.ico
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function () {
    'use strict';

    // ========================================================================
    // MODULO 1: CSS RESPONSIVE SIDEBAR (HOME)
    // ========================================================================
    function injectResponsiveSidebarCSS() {
        const style = document.createElement('style');
        style.type = 'text/css';
        style.id = 'evo-responsive-sidebar-css';
        style.innerHTML = `
            /* Media query per dispositivi mobile - usando max-width in combinazione con orientamento */
            /* Copre smartphone in portrait anche con alta risoluzione */
            /* ESCLUDE esplicitamente schermi desktop grandi */
            @media (max-width: 1024px) and (orientation: portrait),
                   (max-width: 768px) and (orientation: landscape) {
                /* Modifica il layout della griglia principale */
                .parent {
                    grid-template-columns: repeat(1, 1fr) !important;
                    gap: 1rem !important;
                }

                /* Card di benvenuto occupa tutta la larghezza */
                .welcome {
                    grid-column: span 1 / span 1 !important;
                }

                /* Container del body occupa tutta la larghezza */
                .body-container {
                    grid-column: span 1 / span 1 !important;
                    grid-template-columns: repeat(1, 1fr) !important;
                }

                /* Utils (sidebar) occupa tutta la larghezza e va sotto */
                .utils {
                    grid-column: span 1 / span 1 !important;
                    grid-row: auto !important;
                    grid-column-start: auto !important;
                    grid-row-start: auto !important;
                }

                /* Migliora la visualizzazione della progress-circle su mobile */
                .rights-div {
                    flex-direction: column !important;
                    align-items: center !important;
                    text-align: center !important;
                }

                .progress-circle {
                    margin-bottom: 1.5rem;
                }

                /* FONT ENORMI PER MOBILE - IL DOPPIO DELLA VERSIONE PRECEDENTE */
                /* Titoli principali */
                h2 {
                    font-size: 1.75rem !important;
                    line-height: 1.3 !important;
                }

                h4 {
                    font-size: 2.8rem !important;
                    line-height: 1.4 !important;
                    margin-bottom: 1rem !important;
                }

                /* Testo generale delle card */
                .card {
                    font-size: 2.2rem !important;
                    line-height: 1.6 !important;
                }

                /* Tabella timbrature con font enormi */
                .clockings-table {
                    font-size: 2rem !important;
                    line-height: 1.5 !important;
                }

                .clockings-table th,
                .clockings-table td {
                    padding: 1.2rem !important;
                }

                /* Badge enormi e leggibili */
                .badge {
                    font-size: 1.8rem !important;
                    padding: 0.8rem 1.4rem !important;
                }

                /* Liste enormi */
                .utils ul li {
                    font-size: 2rem !important;
                    line-height: 1.8 !important;
                    margin-bottom: 0.8rem !important;
                }

                /* Testo informativo enorme */
                .d-flex.align-items-center.pb-2 {
                    font-size: 2.2rem !important;
                    line-height: 1.6 !important;
                }

                /* Progress circle con testo enorme */
                .progress-circle {
                    font-size: 3rem !important;
                    --size: 200px !important;
                }

                /* Icone Material enormi */
                .material-symbols-outlined {
                    font-size: 3rem !important;
                }

                /* Padding maggiore nelle card per mobile */
                .card.p-3 {
                    padding: 2rem !important;
                }

                .welcome {
                    padding: 2rem !important;
                }

                /* Bottoni enormi */
                .bottone {
                    font-size: 2rem !important;
                    padding: 1.2rem 2rem !important;
                }

                /* Link enormi */
                a {
                    font-size: 2rem !important;
                }

                /* Testo generale del body enorme */
                body, .form-mw {
                    font-size: 2rem !important;
                    line-height: 1.6 !important;
                }

                /* Testo in grassetto */
                b, strong {
                    font-size: inherit !important;
                }

                /* STILI PER IL CALCULATOR "ORA DEL GIORNO" */
                #evoCalculatorContainerHome h4 {
                    font-size: 2.8rem !important;
                    line-height: 1.4 !important;
                    margin-bottom: 1rem !important;
                }

                .evo-label-home {
                    font-size: 1.8rem !important;
                    margin-bottom: 0.8rem !important;
                }

                #fasciaOrariaSelectorHome {
                    font-size: 2rem !important;
                    padding: 1rem !important;
                    width: auto !important;
                    min-width: 200px !important;
                    height: auto !important;
                    border-radius: 8px !important;
                }

                .calc-mode-switch-home {
                    font-size: 2rem !important;
                    padding: 0.5rem !important;
                    width: auto !important;
                    min-width: 200px !important;
                    height: auto !important;
                    border-radius: 10px !important;
                }

                .calc-mode-switch-segment-home {
                    font-size: 2rem !important;
                    padding: 0.8rem 1.2rem !important;
                    line-height: 1.4 !important;
                }

                .calc-mode-slider-home {
                    border-radius: 8px !important;
                }

                #compactExitTimeBoxHome {
                    font-size: 2rem !important;
                    padding: 1rem 1.5rem !important;
                    width: auto !important;
                    min-width: 180px !important;
                    height: auto !important;
                    border-radius: 8px !important;
                }

                #compactExitTimeBoxHome .exit-label {
                    font-size: 2rem !important;
                }

                #compactExitTimeBoxHome .value {
                    font-size: 2.4rem !important;
                    font-weight: bold !important;
                }

                .evo-content-wrapper-home {
                    gap: 2rem !important;
                }

                .evo-group-wrapper-home {
                    gap: 1rem !important;
                }

                #evoCalculatorContainerHome {
                    padding: 2rem !important;
                    margin-bottom: 2rem !important;
                }
            }

            /* Media query per dispositivi in landscape con larghezza ridotta (SOLO MOBILE) */
            @media (max-width: 1024px) and (orientation: landscape) and (max-height: 600px) and (hover: none) {
                .parent {
                    gap: 0.75rem !important;
                }
                
                /* Font ridotti per landscape mobile */
                body, .form-mw {
                    font-size: 1.4rem !important;
                }
                
                h2 {
                    font-size: 1.5rem !important;
                }
                
                h4 {
                    font-size: 1.8rem !important;
                }
            }

            /* Media query per dispositivi molto piccoli */
            @media (max-width: 480px) and (orientation: portrait), 
                   (max-width: 640px) and (orientation: portrait) and (max-height: 800px) {
                .parent {
                    gap: 1rem !important;
                }

                /* Font enormi anche su schermi piccoli */
                h2 {
                    font-size: 1.5rem !important;
                    line-height: 1.3 !important;
                }

                h4 {
                    font-size: 2.4rem !important;
                    line-height: 1.4 !important;
                }

                .card {
                    font-size: 2rem !important;
                    line-height: 1.6 !important;
                }

                .clockings-table {
                    font-size: 1.8rem !important;
                    line-height: 1.5 !important;
                }

                .clockings-table th,
                .clockings-table td {
                    padding: 1rem !important;
                }

                .badge {
                    font-size: 1.6rem !important;
                    padding: 0.7rem 1.2rem !important;
                }

                /* Progress circle proporzionato */
                .progress-circle {
                    --size: 180px !important;
                    font-size: 2.6rem !important;
                }

                .utils ul li {
                    font-size: 1.9rem !important;
                    line-height: 1.7 !important;
                }

                .material-symbols-outlined {
                    font-size: 2.6rem !important;
                }

                body, .form-mw {
                    font-size: 1.9rem !important;
                    line-height: 1.6 !important;
                }

                .bottone {
                    font-size: 1.8rem !important;
                    padding: 1rem 1.6rem !important;
                }

                a {
                    font-size: 1.9rem !important;
                }

                /* STILI PER IL CALCULATOR "ORA DEL GIORNO" SU SCHERMI PICCOLI */
                #evoCalculatorContainerHome h4 {
                    font-size: 2.4rem !important;
                }

                .evo-label-home {
                    font-size: 1.6rem !important;
                }

                #fasciaOrariaSelectorHome {
                    font-size: 1.8rem !important;
                    padding: 0.9rem !important;
                    border-radius: 8px !important;
                }

                .calc-mode-switch-home {
                    font-size: 1.8rem !important;
                    border-radius: 10px !important;
                }

                .calc-mode-switch-segment-home {
                    font-size: 1.8rem !important;
                    padding: 0.7rem 1rem !important;
                }

                .calc-mode-slider-home {
                    border-radius: 8px !important;
                }

                #compactExitTimeBoxHome {
                    font-size: 1.8rem !important;
                    padding: 0.9rem 1.3rem !important;
                    border-radius: 8px !important;
                }

                #compactExitTimeBoxHome .exit-label {
                    font-size: 1.8rem !important;
                }

                #compactExitTimeBoxHome .value {
                    font-size: 2.2rem !important;
                }
            }

            /* Aggiunge supporto per touch screen indipendentemente dalla risoluzione */
            @media (hover: none) and (pointer: coarse) {
                .parent {
                    grid-template-columns: repeat(1, 1fr) !important;
                }

                .welcome {
                    grid-column: span 1 / span 1 !important;
                }

                .body-container {
                    grid-column: span 1 / span 1 !important;
                    grid-template-columns: repeat(1, 1fr) !important;
                }

                .utils {
                    grid-column: span 1 / span 1 !important;
                    grid-row: auto !important;
                    grid-column-start: auto !important;
                    grid-row-start: auto !important;
                }
            }
        `;
        document.head.appendChild(style);
        console.log("[EVO Mobile Plus] CSS responsive sidebar iniettato");
    }

    // ========================================================================
    // MODULO 2: CSS PER BOTTONI MOBILE (nasconde testo su mobile)
    // ========================================================================
    function injectButtonCSS() {
        if (document.getElementById('evo-btn-mobile-css')) return;

        const style = document.createElement('style');
        style.id = 'evo-btn-mobile-css';
        style.innerHTML = `
            /* Desktop: tutto visibile */
            .evo-btn-label-telelavoro,
            .evo-btn-label-timb-mancanti {
                display: inline;
            }

            /* Mobile: solo icona, testo nascosto */
            @media (max-width: 1024px) and (orientation: portrait),
                   (max-width: 768px),
                   (hover: none) and (pointer: coarse) {
                .evo-btn-label-telelavoro,
                .evo-btn-label-timb-mancanti {
                    display: none !important;
                }

                #TeleLavoroMarcatempoBtn,
                #TimbMacantiBtn {
                    padding: 0.4rem 0.6rem !important;
                }

                #TeleLavoroMarcatempoBtn .material-symbols-outlined,
                #TimbMacantiBtn .material-symbols-outlined {
                    font-size: 1.6rem !important;
                }
            }
        `;
        document.head.appendChild(style);
        console.log("[EVO Mobile Plus] CSS bottoni mobile iniettato");
    }

    // ========================================================================
    // MODULO 3: BOTTONE TELELAVORO (HOME)
    // ========================================================================
    function addTeleLavoroButton() {
        const h4Elements = document.querySelectorAll('h4');
        let clockingsTitle = null;

        for (const h4 of h4Elements) {
            if (h4.textContent.includes('Timbrature di giornata')) {
                clockingsTitle = h4;
                break;
            }
        }

        if (!clockingsTitle) {
            console.log('[EVO Mobile Plus] Titolo "Timbrature di giornata" non trovato');
            return;
        }

        if (clockingsTitle.querySelector('#TeleLavoroMarcatempoBtn')) {
            console.log('[EVO Mobile Plus] Bottone TeleLavoro già presente');
            return;
        }

        const form = document.createElement('form');
        form.name = 'OnlineClockingRequestList';
        form.method = 'POST';
        form.action = '/jt-employee-portal/richiesteTimbratureVirtualiElenco.do';
        form.style.display = 'inline-block';
        form.style.marginLeft = '10px';

        const dashboardForm = document.querySelector('form[name="Dashboard"]');
        if (!dashboardForm) {
            console.log('[EVO Mobile Plus] Form Dashboard non trovato');
            return;
        }

        const fieldsToClone = ['jwtToken', 'theme', 'matricola', 'fullname', 'selectedRuolo', 'roleDescr'];
        fieldsToClone.forEach(fieldName => {
            const originalField = dashboardForm.querySelector(`input[name="${fieldName}"]`);
            if (originalField) {
                const hiddenInput = document.createElement('input');
                hiddenInput.type = 'hidden';
                hiddenInput.name = fieldName;
                hiddenInput.value = originalField.value;
                form.appendChild(hiddenInput);
            }
        });

        const originInput = document.createElement('input');
        originInput.type = 'hidden';
        originInput.name = 'origin';
        originInput.value = 'dashboard.do';
        form.appendChild(originInput);

        const button = document.createElement('button');
        button.id = 'TeleLavoroMarcatempoBtn';
        button.type = 'submit';
        button.className = 'bottone bottone-plus';
        button.name = 'event_Create';
        button.value = 'TeleLavoro';
        button.setAttribute('data-bs-toggle', 'tooltip');
        button.setAttribute('data-bs-custom-class', 'custom-tooltip');
        button.setAttribute('data-bs-title', 'TeleLavoro Marcatempo');
        button.style.padding = '0.4rem 0.8rem';
        button.style.fontSize = '0.9rem';
        button.style.marginLeft = '0.5rem';

        button.innerHTML = `
            <i class="material-symbols-outlined align-middle" style="font-size: 1.2rem;">add</i>
            <i class="material-symbols-outlined align-middle" style="font-size: 1.2rem;">home_work</i>
            <span class="evo-btn-label-telelavoro">&nbsp;TeleLavoro</span>
        `;

        form.appendChild(button);

        clockingsTitle.style.display = 'flex';
        clockingsTitle.style.alignItems = 'center';
        clockingsTitle.style.justifyContent = 'space-between';
        clockingsTitle.style.width = '100%';

        const titleContent = clockingsTitle.innerHTML;
        clockingsTitle.innerHTML = '';
        
        const titleSpan = document.createElement('span');
        titleSpan.innerHTML = titleContent;
        clockingsTitle.appendChild(titleSpan);

        clockingsTitle.appendChild(form);

        console.log('[EVO Mobile Plus] Bottone TeleLavoro aggiunto');

        if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
            new bootstrap.Tooltip(button);
        }
    }

    // ========================================================================
    // MODULO 4: BOTTONE TIMBRATURE MANCANTI (HOME)
    // ========================================================================
    function addTimbMacantiButton() {
        const h4Elements = document.querySelectorAll('h4');
        let clockingsTitle = null;

        for (const h4 of h4Elements) {
            if (h4.textContent.includes('Timbrature di giornata')) {
                clockingsTitle = h4;
                break;
            }
        }

        if (!clockingsTitle) {
            console.log('[EVO Mobile Plus] Titolo "Timbrature di giornata" non trovato');
            return;
        }

        if (clockingsTitle.querySelector('#TimbMacantiBtn')) {
            console.log('[EVO Mobile Plus] Bottone Timb. Mancanti già presente');
            return;
        }

        const dashboardForm = document.querySelector('form[name="Dashboard"]');
        if (!dashboardForm) {
            console.log('[EVO Mobile Plus] Form Dashboard non trovato');
            return;
        }

        const form = document.createElement('form');
        form.name = 'MissingClockingsList';
        form.method = 'POST';
        form.action = '/jt-employee-portal/movimentimenu.do';
        form.style.display = 'inline-block';
        form.style.marginLeft = '5px';

        const fieldsToClone = ['jwtToken', 'theme', 'matricola', 'fullname', 'selectedRuolo', 'roleDescr'];
        fieldsToClone.forEach(fieldName => {
            const originalField = dashboardForm.querySelector(`input[name="${fieldName}"]`);
            if (originalField) {
                const hiddenInput = document.createElement('input');
                hiddenInput.type = 'hidden';
                hiddenInput.name = fieldName;
                hiddenInput.value = originalField.value;
                form.appendChild(hiddenInput);
            }
        });

        const originInput = document.createElement('input');
        originInput.type = 'hidden';
        originInput.name = 'origin';
        originInput.value = 'dashboard.do';
        form.appendChild(originInput);

        const button = document.createElement('button');
        button.id = 'TimbMacantiBtn';
        button.type = 'submit';
        button.className = 'bottone bottone-plus';
        button.name = 'event_Create';
        button.value = 'Nuovo';
        button.setAttribute('data-bs-toggle', 'tooltip');
        button.setAttribute('data-bs-custom-class', 'custom-tooltip');
        button.setAttribute('data-bs-title', 'Timbratura Manuale');
        button.style.padding = '0.4rem 0.8rem';
        button.style.fontSize = '0.9rem';
        button.style.marginLeft = '0.5rem';

        button.innerHTML = `
            <i class="material-symbols-outlined align-middle" style="font-size: 1.2rem;">add</i>
            <i class="material-symbols-outlined align-middle" style="font-size: 1.2rem;">touch_app</i>
            <span class="evo-btn-label-timb-mancanti">&nbsp;Manuale</span>
        `;

        form.appendChild(button);

        const teleLavoroForm = clockingsTitle.querySelector('form[name="OnlineClockingRequestList"]');

        if (teleLavoroForm) {
            teleLavoroForm.insertAdjacentElement('afterend', form);
            console.log('[EVO Mobile Plus] Bottone Timb. Mancanti aggiunto accanto a TeleLavoro');
        } else {
            clockingsTitle.style.display = 'flex';
            clockingsTitle.style.alignItems = 'center';
            clockingsTitle.style.justifyContent = 'space-between';
            clockingsTitle.style.width = '100%';

            if (!clockingsTitle.querySelector('span > .material-symbols-outlined') && 
                !clockingsTitle.querySelector('span > span')) {
                const titleContent = clockingsTitle.innerHTML;
                clockingsTitle.innerHTML = '';

                const titleSpan = document.createElement('span');
                titleSpan.innerHTML = titleContent;
                clockingsTitle.appendChild(titleSpan);
            }

            clockingsTitle.appendChild(form);
            console.log('[EVO Mobile Plus] Bottone Timb. Mancanti aggiunto al posto di TeleLavoro');
        }

        if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
            new bootstrap.Tooltip(button);
        }
    }

    // ========================================================================
    // MODULO 5: CSS RESPONSIVE MARCATEMPO VIRTUALE
    // ========================================================================
    function injectMarcatempoCSS() {
        const style = document.createElement('style');
        style.type = 'text/css';
        style.id = 'evo-marcatempo-css';
        style.innerHTML = `
            /* Media query per dispositivi mobile */
            @media (max-width: 1024px) and (orientation: portrait),
                   (max-width: 768px) {
                
                /* Form container più largo */
                .form_interno.w-50 {
                    width: 95% !important;
                    max-width: 100% !important;
                    margin: 0 auto !important;
                }

                /* Card bianca con padding ottimizzato */
                .bg-white.p-4 {
                    padding: 1.5rem !important;
                }

                /* Testo di attenzione più grande */
                .bg-white p b {
                    font-size: 1.8rem !important;
                    line-height: 1.5 !important;
                }

                /* Tabella form responsive */
                .formTable {
                    font-size: 1.8rem !important;
                }

                .formTable td {
                    display: block !important;
                    width: 100% !important;
                    padding: 0.8rem 0 !important;
                    border: none !important;
                }

                .formTable td.desc {
                    font-weight: bold !important;
                    font-size: 1.9rem !important;
                    padding-left: 0 !important;
                    margin-bottom: 0.5rem !important;
                }

                .formTable tr {
                    display: block !important;
                    margin-bottom: 1.5rem !important;
                    border-bottom: 1px solid #ddd !important;
                    padding-bottom: 1rem !important;
                }

                /* Giorno e ora */
                #hour {
                    font-size: 2rem !important;
                    font-weight: bold !important;
                }

                /* Radio buttons (Entrata/Uscita) molto più grandi e affiancati */
                .form-check {
                    margin-bottom: 1.5rem !important;
                    padding: 0.5rem !important;
                    /* Modifica per non farli andare a capo */
                    display: inline-flex !important; 
                    align-items: center !important;
                    margin-right: 1.5rem !important;
                }

                .form-check-input {
                    /* Dimensione aumentata per selettori Entrata/Uscita */
                    width: 3rem !important; 
                    height: 3rem !important;
                    margin-top: 0 !important;
                    cursor: pointer !important;
                    flex-shrink: 0 !important;
                }

                .form-check-label {
                    /* Testo selettori più grande */
                    font-size: 2.2rem !important; 
                    margin-left: 0.8rem !important;
                    padding-left: 0.5rem !important;
                    cursor: pointer !important;
                    display: flex !important;
                    align-items: center !important;
                }

                /* Select più grandi */
                .form-select {
                    width: 100% !important;
                    max-width: 100% !important;
                    font-size: 1.7rem !important;
                    padding: 0.8rem !important;
                    margin: 0.5rem 0 !important;
                }

                /* Testo obbligatorio */
                .bg-white p {
                    font-size: 1.6rem !important;
                    line-height: 1.6 !important;
                }

                /* Bottoni enormi */
                .bottone,
                .bottone-plus,
                .bottone_indietro,
                .bottone-indietro-plus {
                    font-size: 1.9rem !important;
                    padding: 1rem 1.5rem !important;
                    margin: 0.5rem 0.5rem 0.5rem 0 !important;
                    width: auto !important;
                    min-width: 150px !important;
                    display: inline-block !important;
                }

                /* Icone nei bottoni */
                .bottone .material-symbols-outlined,
                .bottone-plus .material-symbols-outlined,
                .bottone_indietro .material-symbols-outlined,
                .bottone-indietro-plus .material-symbols-outlined {
                    font-size: 2.2rem !important;
                }

                /* Container bottoni */
                .bg-white > div:last-child {
                    display: flex !important;
                    flex-direction: column !important;
                    gap: 1rem !important;
                    margin-top: 2rem !important;
                }

                /* Fix per il layout dei radio buttons: manteniamo la riga per Entrata/Uscita */
                .formTable td.d-flex {
                    flex-direction: row !important;
                    align-items: center !important;
                    padding-left: 0 !important;
                }

                /* Messaggi di errore */
                .errors {
                    font-size: 1.7rem !important;
                    padding: 1rem !important;
                }

                .errors .material-symbols-outlined {
                    font-size: 2rem !important;
                }

                /* Modal responsive */
                .modal-dialog {
                    margin: 1rem !important;
                    max-width: 95% !important;
                }

                .modal-title {
                    font-size: 2rem !important;
                }

                .modal-body {
                    font-size: 1.7rem !important;
                    line-height: 1.6 !important;
                }

                .modal-body p {
                    font-size: 1.7rem !important;
                }
            }

            /* Media query per schermi molto piccoli */
            @media (max-width: 480px) and (orientation: portrait),
                   (max-width: 640px) and (orientation: portrait) and (max-height: 800px) {
                
                .form_interno.w-50 {
                    width: 98% !important;
                }

                .bg-white.p-4 {
                    padding: 1rem !important;
                }

                .bg-white p b {
                    font-size: 1.6rem !important;
                }

                .formTable {
                    font-size: 1.6rem !important;
                }

                .formTable td.desc {
                    font-size: 1.7rem !important;
                }

                .form-check-input {
                    width: 2.2rem !important;
                    height: 2.2rem !important;
                }

                .form-check-label {
                    font-size: 1.8rem !important;
                }

                .form-select {
                    font-size: 1.5rem !important;
                }

                .bottone,
                .bottone-plus,
                .bottone_indietro,
                .bottone-indietro-plus {
                    font-size: 1.7rem !important;
                    padding: 0.9rem 1.3rem !important;
                }
            }

            /* Rilevamento touch screen */
            @media (hover: none) and (pointer: coarse) {
                .form_interno.w-50 {
                    width: 95% !important;
                }

                .formTable td {
                    display: block !important;
                    width: 100% !important;
                }

                .form-select {
                    width: 100% !important;
                    font-size: 1.7rem !important;
                }
            }
        `;
        document.head.appendChild(style);
        console.log("[EVO Mobile Plus] CSS Marcatempo Virtuale iniettato");
    }

    // ========================================================================
    // MODULO 6: CSS RESPONSIVE TIMBRATURE MANCANTI
    // ========================================================================
    function injectTimbratureMancentiCSS() {
        const style = document.createElement('style');
        style.type = 'text/css';
        style.id = 'evo-timbrature-mancanti-css';
        style.innerHTML = `
            /* Media query per dispositivi mobile */
            @media (max-width: 1024px) and (orientation: portrait),
                   (max-width: 768px) {
                
                /* Container principale più largo */
                .d-flex.flex-wrap.justify-content-center {
                    padding: 0.5rem !important;
                }

                /* Card bianche più larghe */
                .bg-white.m-2 {
                    margin: 0.5rem 0 !important;
                    width: 100% !important;
                    max-width: 100% !important;
                }

                .bg-white.p-4 {
                    padding: 1.5rem !important;
                }

                /* Testo obbligatorio più grande */
                .bg-white {
                    font-size: 1.7rem !important;
                    line-height: 1.6 !important;
                }

                /* Tabella form responsive */
                .formTable {
                    font-size: 1.8rem !important;
                }

                .formTable td {
                    display: block !important;
                    width: 100% !important;
                    padding: 0.8rem 0 !important;
                    border: none !important;
                }

                .formTable td.desc {
                    font-weight: bold !important;
                    font-size: 1.9rem !important;
                    padding-left: 0 !important;
                    margin-bottom: 0.5rem !important;
                    width: 100% !important;
                }

                .formTable tr {
                    display: block !important;
                    margin-bottom: 1.5rem !important;
                    border-bottom: 1px solid #ddd !important;
                    padding-bottom: 1rem !important;
                }

                /* Radio buttons: 2 per riga solo nella riga "Verso" */
                .formTable td.d-flex {
                    display: flex !important;
                    flex-wrap: wrap !important;
                    padding-left: 0 !important;
                }

                .formTable td.d-flex > .form-check {
                    width: 50% !important;
                    display: flex !important;
                    align-items: center !important;
                    margin-bottom: 0.8rem !important;
                }

                .form-check-input {
                    width: 2.5rem !important;
                    height: 2.5rem !important;
                    margin-top: 0 !important;
                    margin-right: 0.8rem !important;
                    cursor: pointer !important;
                    flex-shrink: 0 !important;
                }

                .form-check-label {
                    font-size: 2rem !important;
                    margin-left: 0.8rem !important;
                    padding-left: 0.5rem !important;
                    cursor: pointer !important;
                    display: inline-flex !important;
                    align-items: center !important;
                }

                /* Input date e time più grandi */
                .input-group {
                    width: 100% !important;
                    margin: 0.5rem 0 !important;
                }

                .input-group .form-control {
                    font-size: 1.8rem !important;
                    padding: 0.9rem !important;
                }

                input[type="time"] {
                    font-size: 1.8rem !important;
                    padding: 0.9rem !important;
                    width: 100% !important;
                }

                /* Icona calendario */
                .icon-datapicker {
                    font-size: 2.5rem !important;
                }

                .input-group-text {
                    padding: 0.6rem !important;
                }

                /* Select più grandi */
                .form-select {
                    width: 100% !important;
                    max-width: 100% !important;
                    font-size: 1.7rem !important;
                    padding: 0.9rem !important;
                    margin: 0.5rem 0 !important;
                }

                /* Input text (Motivo) più grande */
                input[type="text"].w-100 {
                    font-size: 1.7rem !important;
                    padding: 0.9rem !important;
                    margin: 0.5rem 0 !important;
                }

                /* Bottoni enormi */
                .bottone,
                .bottone-plus,
                .bottone_indietro,
                .bottone-indietro-plus {
                    font-size: 1.9rem !important;
                    padding: 1rem 1.5rem !important;
                    margin: 0.5rem 0.5rem 0.5rem 0 !important;
                    width: 100% !important;
                    display: block !important;
                }

                /* Icone nei bottoni */
                .bottone .material-symbols-outlined,
                .bottone-plus .material-symbols-outlined,
                .bottone_indietro .material-symbols-outlined,
                .bottone-indietro-plus .material-symbols-outlined {
                    font-size: 2.2rem !important;
                }

                /* Sezione "Contesto del giorno" */
                .titoletto {
                    font-size: 2rem !important;
                    font-weight: bold !important;
                    margin-bottom: 1rem !important;
                }

                /* Tabella contesto responsive */
                .table-striped {
                    font-size: 1.6rem !important;
                }

                .table-striped th,
                .table-striped td {
                    padding: 0.8rem !important;
                    font-size: 1.6rem !important;
                }

                .table-striped th {
                    font-size: 1.7rem !important;
                }

                /* Fix per il layout dei radio buttons: 2 per riga (sinistra / destra) */
                .formTable td.d-flex {
                    flex-wrap: wrap !important;
                    padding-left: 0 !important;
                }

                .formTable td.d-flex .form-check {
                    width: 50% !important;
                    margin-bottom: 0.6rem !important;
                }

                /* Messaggi di errore */
                .errors {
                    font-size: 1.7rem !important;
                    padding: 1rem !important;
                }

                .errors .material-symbols-outlined {
                    font-size: 2rem !important;
                }

                /* Accordion più grande */
                .accordion {
                    font-size: 1.6rem !important;
                }
            }

            /* Media query per schermi molto piccoli */
            @media (max-width: 480px) and (orientation: portrait),
                   (max-width: 640px) and (orientation: portrait) and (max-height: 800px) {
                
                .bg-white.p-4 {
                    padding: 1rem !important;
                }

                .bg-white {
                    font-size: 1.6rem !important;
                }

                .formTable {
                    font-size: 1.6rem !important;
                }

                .formTable td.desc {
                    font-size: 1.7rem !important;
                }

                .form-check-input {
                    width: 2.2rem !important;
                    height: 2.2rem !important;
                }

                .form-check-label {
                    font-size: 1.8rem !important;
                }

                .input-group .form-control,
                input[type="time"] {
                    font-size: 1.6rem !important;
                }

                .form-select {
                    font-size: 1.5rem !important;
                }

                input[type="text"].w-100 {
                    font-size: 1.5rem !important;
                }

                .bottone,
                .bottone-plus,
                .bottone_indietro,
                .bottone-indietro-plus {
                    font-size: 1.7rem !important;
                    padding: 0.9rem 1.3rem !important;
                }

                .titoletto {
                    font-size: 1.8rem !important;
                }

                .table-striped {
                    font-size: 1.4rem !important;
                }

                .table-striped th,
                .table-striped td {
                    font-size: 1.4rem !important;
                    padding: 0.6rem !important;
                }
            }

            /* Rilevamento touch screen */
            @media (hover: none) and (pointer: coarse) {
                .bg-white.m-2 {
                    width: 100% !important;
                }

                .formTable td {
                    display: block !important;
                    width: 100% !important;
                }

                .form-select,
                input[type="text"].w-100 {
                    width: 100% !important;
                    font-size: 1.7rem !important;
                }
            }
        `;
        document.head.appendChild(style);
        console.log("[EVO Mobile Plus] CSS Timbrature Mancanti iniettato");
    }

    // ========================================================================
    // COORDINATORE PRINCIPALE
    // ========================================================================
    function initEvoMobilePlus() {
        const waitForPageLoad = setInterval(() => {
            const isDashboardPage = document.querySelector('form[name="Dashboard"]') !== null;
            const isMarcatempoPage = document.querySelector('form[name="OnlineClockingRequestEdit"]') !== null;
            const isTimbraturaManuPage = document.querySelector('form[name="Movim"]') !== null;
            const clockingsCard = document.querySelector('.card h4');
            const isClockingsCard = clockingsCard && clockingsCard.textContent.includes('Timbrature di giornata');
            const utilsSection = document.querySelector('.utils');

            // PAGINA DASHBOARD/HOME
            if (isDashboardPage && utilsSection) {
                clearInterval(waitForPageLoad);
                
                // Inietta CSS responsive sidebar
                if (!document.getElementById('evo-responsive-sidebar-css')) {
                    injectResponsiveSidebarCSS();
                }
                
                // Inietta CSS bottoni mobile
                injectButtonCSS();
                
                // Aggiungi bottoni (con delay per TimbMancanti)
                if (isClockingsCard) {
                    addTeleLavoroButton();
                    setTimeout(() => {
                        addTimbMacantiButton();
                    }, 1000);
                }
                
                console.log("[EVO Mobile Plus] Inizializzato su Dashboard/Home");
            }
            
            // PAGINA MARCATEMPO VIRTUALE
            if (isMarcatempoPage && document.querySelector('.formTable')) {
                clearInterval(waitForPageLoad);
                if (!document.getElementById('evo-marcatempo-css')) {
                    injectMarcatempoCSS();
                }
                console.log("[EVO Mobile Plus] Inizializzato su Marcatempo Virtuale");
            }
            
            // PAGINA TIMBRATURA MANUALE
            if (isTimbraturaManuPage && document.querySelector('.formTable')) {
                clearInterval(waitForPageLoad);
                if (!document.getElementById('evo-timbrature-mancanti-css')) {
                    injectTimbratureMancentiCSS();
                }
                console.log("[EVO Mobile Plus] Inizializzato su Timbratura Manuale");
            }
        }, 500);

        // Timeout di sicurezza
        setTimeout(() => {
            clearInterval(waitForPageLoad);
        }, 15000);
    }

    // Avvia lo script
    initEvoMobilePlus();
    console.log("[EVO Mobile Plus] Script caricato e in esecuzione");

})();
