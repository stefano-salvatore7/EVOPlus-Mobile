# EVO Mobile Plus - Complete Suite

Questo script Tampermonkey è la **suite completa** per il sistema di gestione delle presenze EVO (usato su `https://personale-unibo.hrgpi.it/`). Unifica in un unico script tutte le funzionalità necessarie per un'esperienza mobile ottimale, rendendo responsive tutte le pagine principali e aggiungendo bottoni rapidi di accesso.

**(Versione Script: 1.3)**

## 📱 Cosa Fa Questo Script

**EVO Mobile Plus** combina 6 funzionalità essenziali in un unico script facile da gestire:

### 1️⃣ **Layout Responsive HOME/Dashboard**
- Trasforma il layout da 6 colonne a **1 colonna** su mobile
- Sposta le card "Saldo Ferie" e "Richieste pendenti" **sotto** il contenuto principale
- **Font enormi** (raddoppiati rispetto al desktop) per leggibilità ottimale
- Ottimizzazione completa di tutti gli elementi: titoli (2.8rem), testo (2.2rem), tabelle (2rem), badge (1.8rem), icone (3rem)

### 2️⃣ **Bottoni Rapidi nella HOME**
- **Bottone TeleLavoro**: accesso rapido al Marcatempo Virtuale direttamente dalla home
- **Bottone Manuale**: accesso rapido alle Timbrature Mancanti
- Su mobile mostrano **solo le icone** per risparmiare spazio
- Su desktop mostrano **icona + testo** completo

### 3️⃣ **Marcatempo Virtuale Responsive**
- Form ottimizzato per mobile con larghezza 95%
- Radio buttons enormi (3rem) per Entrata/Uscita
- Select e input ingranditi (1.7-2rem)
- Bottoni grandi e facili da premere
- Layout verticale ottimizzato

### 4️⃣ **Timbrature Mancanti Responsive**
- Form responsive a larghezza 100%
- Radio buttons disposti 2 per riga
- Input date/time ingranditi (1.8rem)
- Tabella "Contesto del giorno" ottimizzata
- Motivo e select completamente leggibili

### 5️⃣ **Gestione Intelligente delle Pagine**
- Rileva automaticamente la pagina attiva
- Carica solo i moduli necessari per quella specifica pagina
- Nessun conflitto tra i diversi moduli
- Performance ottimale

### 6️⃣ **Compatibilità Calculator**
- Completamente compatibile con "EVO Exit Time Calculator (HOME)"
- Ottimizza tutti gli elementi del calculator: fascia oraria (2rem), switch (2rem), box uscita (2rem)
- Mantiene border-radius arrotondati su tutti gli elementi

## 🎯 Vantaggi Rispetto agli Script Separati

✅ **Un solo script da installare** invece di 6 diversi  
✅ **Manutenzione semplificata** - un solo aggiornamento per tutto  
✅ **Nessun conflitto** tra script multipli  
✅ **Log unificati** con prefisso `[EVO Mobile Plus]`  
✅ **Gestione intelligente** delle risorse  
✅ **Performance migliorate** - caricamento ottimizzato  

## 📦 Funzionalità Dettagliate

### Responsive HOME/Dashboard

**Font Enormi per Leggibilità Mobile:**
- Titoli H4: **2.8rem** (es: "Timbrature di giornata", "Anomalie da sanare")
- Titolo benvenuto H2: **1.75rem** (proporzioni equilibrate)
- Testo nelle card: **2.2rem**
- Tabelle: **2rem**
- Badge: **1.8rem**
- Icone Material: **3rem**
- Liste: **2rem**
- Progress circle: **3rem** con dimensione **200px**
- Bottoni: **2rem**
- Link: **2rem**

**Layout Ottimizzato:**
- Griglia principale passa a **1 colonna**
- Card benvenuto a larghezza piena
- Utils (sidebar) spostata sotto il contenuto
- Progress circle in layout verticale
- Padding aumentato nelle card (2rem)
- Gap ottimizzato tra elementi

### Bottoni Rapidi HOME

**Bottone TeleLavoro:**
- Icona: `add` + `home_work`
- Testo desktop: "TeleLavoro"
- Mobile: solo icone
- Azione: apre Marcatempo Virtuale

**Bottone Manuale:**
- Icona: `add` + `touch_app`
- Testo desktop: "Manuale"
- Mobile: solo icone
- Azione: apre Timbrature Mancanti

**Posizionamento Intelligente:**
- Entrambi i bottoni appaiono accanto al titolo "Timbrature di giornata"
- Se TeleLavoro non è presente, Manuale prende il suo posto
- Tooltip informativi su hover

### Marcatempo Virtuale Responsive

**Elementi Ottimizzati:**
- Container form: **95% larghezza**
- Testo attenzione: **1.8rem**
- Label descrittive: **1.9rem** (grassetto)
- Radio Entrata/Uscita: **3rem** (affiancati)
- Label radio: **2.2rem**
- Select causale: **1.7rem**
- Orario (#hour): **2rem** (grassetto)
- Bottoni: **1.9rem** con padding **1rem 1.5rem**
- Icone bottoni: **2.2rem**

**Layout Mobile:**
- Tabella form diventa verticale
- Ogni campo su riga separata
- Border bottom tra le righe
- Radio buttons su stessa riga (non a capo)
- Bottoni in colonna con gap 1rem

### Timbrature Mancanti Responsive

**Elementi Ottimizzati:**
- Container principale: **100% larghezza**
- Card: **100% larghezza**
- Testo generale: **1.7rem**
- Label descrittive: **1.9rem** (grassetto)
- Radio buttons: **2.5rem** (2 per riga)
- Label radio: **2rem**
- Input date/time: **1.8rem**
- Select: **1.7rem**
- Input text (Motivo): **1.7rem**
- Bottoni: **1.9rem** a larghezza piena
- Tabella contesto: **1.6rem**

**Layout Mobile:**
- Radio buttons "Verso" disposti 2 per riga (50% ciascuno)
- Input date e time a larghezza 100%
- Icona calendario: **2.5rem**
- Bottoni verticali a larghezza piena
- Sezione "Contesto del giorno" ottimizzata

## 📲 Installazione su Smartphone Android

Per utilizzare questo script su smartphone, è necessario installare Firefox per Android e Tampermonkey. Ecco la procedura completa:

### 1. Installa Firefox per Android

Se non l'hai già installato:

* Apri il **Google Play Store**
* Cerca **"Firefox Browser"**
* Installa l'app ufficiale di Mozilla Firefox

### 2. Abilita le Estensioni su Firefox Android

Firefox per Android supporta le estensioni, ma devi prima abilitarle:

1. Apri **Firefox** sul tuo smartphone
2. Tocca il menu (tre puntini in basso a destra)
3. Vai in **"Impostazioni"**
4. Scorri fino in fondo e tocca **"Informazioni su Firefox"**
5. **Tocca ripetutamente (5 volte) sul logo di Firefox** che appare nella pagina
6. Vedrai comparire un messaggio che conferma l'attivazione della modalità debug
7. Torna indietro alle Impostazioni
8. Ora vedrai apparire una nuova voce **"Componenti aggiuntivi"** nel menu
9. Tocca **"Componenti aggiuntivi"**
10. Tocca **"Gestione componenti aggiuntivi"**

### 3. Installa Tampermonkey

1. Nella sezione "Gestione componenti aggiuntivi" che hai appena aperto
2. Cerca **"Tampermonkey"** nella barra di ricerca
3. Tocca su **Tampermonkey** nei risultati
4. Tocca **"+ Aggiungi"** per installarlo
5. Conferma l'installazione toccando **"Aggiungi"** nel popup

### 4. **IMPORTANTE: DISINSTALLA GLI SCRIPT VECCHI**

Se hai installato uno o più dei seguenti script separati, **DEVI disinstallarli** prima di installare EVO Mobile Plus:

- ❌ EVO - Responsive Marcatempo Virtuale
- ❌ EVO - Bottone Marcatempo Virtuale (HOME)
- ❌ EVO - Bottone Timbrature Mancanti (HOME)
- ❌ EVO - Layout Responsive Sidebar
- ❌ EVO - Responsive Timbratura Manuale

**Come disinstallare:**
1. Tocca l'icona di Tampermonkey nella barra di Firefox
2. Seleziona "Dashboard"
3. Trova gli script vecchi nell'elenco
4. Tocca l'icona del cestino accanto a ciascuno
5. Conferma la disinstallazione

### 5. Installazione di EVO Mobile Plus

Ora puoi installare lo script unificato:

[**🚀 Clicca qui per installare EVO Mobile Plus**](https://github.com/stefano-salvatore7/EVOPlus-Mobile/raw/refs/heads/main/evo-plus-mobile.user.js)

* Dopo aver cliccato sul link dal tuo smartphone Firefox, Tampermonkey ti mostrerà il codice dello script
* Tocca **"Installa"** per confermare
* Lo script si attiverà automaticamente

### 6. Verifica Aggiornamenti Automatici

Tampermonkey controllerà automaticamente gli aggiornamenti:

* Tocca l'icona di Tampermonkey nella barra degli strumenti
* Seleziona **"Dashboard"**
* Trova "EVO Mobile Plus - Complete Suite" nell'elenco
* Verifica che la casella "Controlla aggiornamenti" sia spuntata
* Tampermonkey controllerà periodicamente il repository per nuove versioni

## 💻 Installazione su PC (Opzionale)

Se vuoi testare lo script anche su PC:

### 1. Installare l'estensione [Tampermonkey](https://www.tampermonkey.net/)

* **[Tampermonkey per Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)**
* **[Tampermonkey per Edge](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd)**
* **[Tampermonkey per Firefox](https://addons.mozilla.org/it/firefox/addon/tampermonkey/)**

### 2. Installazione dello Script

[**🚀 Clicca qui per installare EVO Mobile Plus**](https://github.com/stefano-salvatore7/EVOPlus-Mobile/raw/refs/heads/main/evo-plus-mobile.user.js)

## 🎮 Utilizzo

Una volta installato, lo script si attiva automaticamente quando visiti EVO:

### Nella HOME/Dashboard
1. Apri **Firefox** sul tuo smartphone
2. Naviga alla **Dashboard** di EVO (`https://personale-unibo.hrgpi.it/`)
3. Effettua il login
4. Vedrai:
   - ✅ Layout a colonna singola
   - ✅ Font enormi e leggibili
   - ✅ Due bottoni rapidi accanto a "Timbrature di giornata"
   - ✅ Sidebar "Saldo Ferie" e "Richieste pendenti" sotto il contenuto

### Nel Marcatempo Virtuale
1. Tocca il bottone **TeleLavoro** (icone `add` + `home_work`)
2. Si apre la pagina Marcatempo Virtuale
3. Vedrai:
   - ✅ Form ottimizzato a 95% larghezza
   - ✅ Radio buttons enormi per Entrata/Uscita
   - ✅ Select e input ben leggibili
   - ✅ Bottoni grandi e facili da premere

### Nelle Timbrature Mancanti
1. Tocca il bottone **Manuale** (icone `add` + `touch_app`)
2. Si apre la pagina Timbrature Mancanti
3. Vedrai:
   - ✅ Form a larghezza piena
   - ✅ Radio buttons 2 per riga
   - ✅ Input date/time grandi
   - ✅ Tabella "Contesto del giorno" leggibile

## 🔍 Rilevamento Dispositivi

Lo script utilizza media query intelligenti per identificare i dispositivi mobile:

```css
/* Smartphone in portrait */
@media (max-width: 1024px) and (orientation: portrait)

/* Tablet e smartphone landscape */
@media (max-width: 768px)

/* Dispositivi touch */
@media (hover: none) and (pointer: coarse)

/* Schermi molto piccoli */
@media (max-width: 480px) and (orientation: portrait)
```

**Funziona perfettamente su:**
- ✅ Samsung Galaxy S24 Ultra
- ✅ Samsung Galaxy S25
- ✅ iPhone (tutti i modelli recenti)
- ✅ Xiaomi, Huawei, OnePlus
- ✅ Tablet in modalità portrait
- ✅ Qualsiasi smartphone Android/iOS con Firefox

## 🔧 Log e Debug

Lo script produce log chiari nella console del browser:

```
[EVO Mobile Plus] Script caricato e in esecuzione
[EVO Mobile Plus] CSS responsive sidebar iniettato
[EVO Mobile Plus] CSS bottoni mobile iniettato
[EVO Mobile Plus] Bottone TeleLavoro aggiunto
[EVO Mobile Plus] Bottone Timb. Mancanti aggiunto accanto a TeleLavoro
[EVO Mobile Plus] Inizializzato su Dashboard/Home
```

Per vedere i log:
1. Apri Firefox Developer Tools (Menu → Strumenti → Strumenti di sviluppo web)
2. Vai alla tab "Console"
3. Cerca i messaggi con prefisso `[EVO Mobile Plus]`

## 🎨 Design e Stile

- ✅ Mantiene lo stile originale della pagina EVO
- ✅ Colori e classi CSS native preservati
- ✅ Zero conflitti con altri script
- ✅ Border-radius arrotondati mantenuti
- ✅ Icone Material Symbols perfettamente integrate
- ✅ Tooltip Bootstrap funzionanti

## ⚡ Performance

- ✅ Script leggero (solo CSS injection)
- ✅ Caricamento condizionale per pagina
- ✅ Nessuna manipolazione DOM pesante
- ✅ Nessun impatto sulle prestazioni del sito
- ✅ Timeout di sicurezza (15 secondi max)
- ✅ Check ogni 500ms per caricamento elementi

## 🔄 Compatibilità con Altri Script

**EVO Mobile Plus è completamente compatibile con:**

- ✅ [EVO Exit Time Calculator (HOME)](https://github.com/stefano-salvatore7/evo-exit-time-calc-home) - v2.1 o superiore
- ✅ Qualsiasi altro script EVO che non modifichi gli stessi elementi

**IMPORTANTE:** Non utilizzare insieme agli script vecchi separati che sono stati unificati in questo.

## 📝 Changelog

### Versione 1.3 (Febbraio 2026)
- 🎉 **Release iniziale di EVO Mobile Plus**
- ✅ Unificazione di 6 script separati in uno solo
- ✅ Layout responsive HOME/Dashboard
- ✅ Bottoni rapidi TeleLavoro e Manuale
- ✅ Marcatempo Virtuale responsive
- ✅ Timbrature Mancanti responsive
- ✅ Gestione intelligente delle pagine
- ✅ Log unificati con prefisso `[EVO Mobile Plus]`
- ✅ CSS con ID univoci per evitare duplicazioni
- ✅ Compatibilità completa con calculator

### Script Precedenti Unificati
- Responsive Sidebar HOME v2.3
- Bottone Marcatempo Virtuale v1.4
- Bottone Timbrature Mancanti v1.1
- Responsive Marcatempo v1.2
- Responsive Timbrature Mancanti v1.2

## 🤝 Contributi

Se desideri contribuire a migliorare questo script:

1. Apri una **Issue** sul [repository GitHub](https://github.com/stefano-salvatore7/EVOPlus-Mobile)
2. Proponi una **Pull Request** con le tue modifiche
3. Condividi feedback e suggerimenti

## 📄 Licenza

Questo script è fornito "così com'è" senza garanzie di alcun tipo. Utilizzalo a tuo rischio.

## 🙏 Ringraziamenti

Grazie a tutti gli utenti che hanno testato e fornito feedback sulle versioni precedenti degli script separati, permettendo la creazione di questa suite completa e ottimizzata.

---

**Nota Importante:** Questo script è progettato esclusivamente per migliorare l'esperienza utente mobile su EVO. Non modifica, intercetta o memorizza alcun dato sensibile. Tutto il codice è open source e verificabile.

**Supporto:** Per domande, problemi o suggerimenti, apri una Issue su GitHub.

---

**Versione:** 1.3 | **Data:** Febbraio 2026 | **Autore:** Stefano | **Repository:** [EVOPlus-Mobile](https://github.com/stefano-salvatore7/EVOPlus-Mobile)
