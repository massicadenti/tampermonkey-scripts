// ==UserScript==
// @name         Kipper.Ai remove subscription request
// @namespace    http://kipper.ai/*
// @version      0.5, Jul 07 2024
// @description  Rimuove le classi che scuriscono lo schermo e disabilitano i pulsanti del mouse, rimuove il banner per la sottoscrizione a pagamento, rimuove la parte di script che blocca lo scorrimento della pagina
// @author       Massi cadenti (with help from ChatGPT)
// @match        https://www.kipper.ai/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Funzione per rimuovere le classi specifiche e ripristinare luminosità
    function restoreBrightness() {
        // Rimuovi classi problematiche
        const elementsToFade = document.querySelectorAll('.fade-out, .pointer-events-none');
        elementsToFade.forEach(el => {
            el.classList.remove('fade-out', 'pointer-events-none');
        });

        // Ripristina gli elementi che sono stati resi non cliccabili
        const disabledElements = document.querySelectorAll('[style*="pointer-events: none"]');
        disabledElements.forEach(el => {
            el.style.pointerEvents = 'auto';
        });

        // Ripristina la luminosità rimuovendo le proprietà che la influenzano
        const affectedElements = document.querySelectorAll('[style*="opacity"], [style*="filter"], [style*="background"]');
        affectedElements.forEach(el => {
            el.style.opacity = '';
            el.style.filter = '';
            el.style.background = '';
        });

        // Ripristina la luminosità del body
        document.body.style.opacity = '';
        document.body.style.filter = '';
        document.body.style.background = '';

        // Assicurati che l'overflow della pagina sia abilitato
        document.body.style.overflow = '';

        // Rimuovi le regole CSS globali che influenzano la luminosità
        const styleSheets = document.styleSheets;
        for (let i = 0; i < styleSheets.length; i++) {
            try {
                const sheet = styleSheets[i];
                const rules = sheet.cssRules || sheet.rules;
                for (let j = 0; j < rules.length; j++) {
                    const rule = rules[j];
                    if (rule.style) {
                        if (rule.style.opacity || rule.style.filter) {
                            rule.style.opacity = '';
                            rule.style.filter = '';
                        }
                        if (rule.style.overflow) {
                            rule.style.overflow = '';
                        }
                    }
                }
            } catch (e) {
                // Alcuni stili potrebbero non essere accessibili a causa di politiche di sicurezza
                console.error(e);
            }
        }
    }

    // Rimuovi le classi subito dopo il caricamento della pagina
    window.addEventListener('load', restoreBrightness);

    // Osserva le mutazioni del DOM e ripristina la luminosità
    const observer = new MutationObserver(mutations => {
        mutations.forEach(() => {
            restoreBrightness();
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['class', 'style']
    });

    // Ripristina la luminosità a intervalli regolari
    setInterval(restoreBrightness, 500);

})();

(function() {
    'use strict';

    // Seleziona l'elemento e nascondilo
    let adBanner = document.querySelector('.ad-banner');
    if (adBanner) {
        adBanner.style.display = 'none';
    }
})();

(function() {
    'use strict';

    function hideElement(selector) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            element.style.display = 'none';
        });
    }

    // Nascondi gli elementi con classi specifiche
    hideElement('.justify-center.gap-6.flex-col.flex.relative.h-full.w-3\\/5');
    hideElement('.px-8.justify-center.items-center.gap-8.flex-col.flex.h-full.w-2\\/5.bg-gray-100');
    hideElement('.z-9000.flex-row.lg\\:flex.translate-x-\\[-50\\%\\].left-\\[50\\%\\].translate-y-\\[-50\\%\\].top-\\[50\\%\\].bg-white.overflow-hidden.lg\\:h-\\[34rem\\].rounded-\\[\\.6rem\\].lg\\:w-\\[54rem\\].w-\\[59vw\\].border-\\[\\.8px\\].border-gray-300.fixed.my-other-element.to-slate-100.from-white.bg-gradient-to-b.hidden');

    // Aggiungi un MutationObserver per gli elementi aggiunti dinamicamente
    const observer = new MutationObserver(() => {
        hideElement('.justify-center.gap-6.flex-col.flex.relative.h-full.w-3\\/5');
        hideElement('.px-8.justify-center.items-center.gap-8.flex-col.flex.h-full.w-2\\/5.bg-gray-100');
        hideElement('.z-9000.flex-row.lg\\:flex.translate-x-\\[-50\\%\\].left-\\[50\\%\\].translate-y-\\[-50\\%\\].top-\\[50\\%\\].bg-white.overflow-hidden.lg\\:h-\\[34rem\\].rounded-\\[\\.6rem\\].lg\\:w-\\[54rem\\].w-\\[59vw\\].border-\\[\\.8px\\].border-gray-300.fixed.my-other-element.to-slate-100.from-white.bg-gradient-to-b.hidden');
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();
