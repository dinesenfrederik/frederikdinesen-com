const STORAGE_KEY_CURR = 'fdsl_user_curr';

// Determine initial state synchronously before first render
let currentLang = 'da';
let currentCurr = 'dkk';

// SEO: the Danish page (/) must always render in Danish with DKK prices. It used to switch
// to English/EUR automatically for visitors who didn't look Danish (timezone, browser
// language, IP lookup). Googlebot crawls from the US with an English browser, so Google
// indexed the Danish page in English, duplicating /en and losing every Danish keyword.
// English-speaking visitors reach /en through hreflang in search results and the DA|EN
// link in the navigation. Currency can still be switched manually and the choice is saved.
function isEnglishPage() {
    return (window.location.pathname && window.location.pathname.startsWith('/en')) || document.documentElement.lang === 'en';
}

function computeInitialPreferences() {
    if (isEnglishPage()) {
        currentLang = 'en';
        currentCurr = 'eur';
        return;
    }
    currentLang = 'da';
    try {
        const savedCurr = localStorage.getItem(STORAGE_KEY_CURR);
        if (savedCurr === 'dkk' || savedCurr === 'eur') {
            currentCurr = savedCurr;
        }
    } catch (e) {
        // Storage can be blocked (strict private mode); keep the defaults.
    }
}

computeInitialPreferences();

export function initI18n() {
    if (isEnglishPage()) {
        currentLang = 'en';
        currentCurr = 'eur';
        return;
    }

    document.querySelectorAll('.curr-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const btnEl = e.target.closest('.curr-btn');
            if (!btnEl) return;
            currentCurr = btnEl.dataset.curr;
            try {
                localStorage.setItem(STORAGE_KEY_CURR, currentCurr);
            } catch (_) {}
            updateContent();
        });
    });

    updateContent();
}

export function updateContent() {
    document.querySelectorAll('[data-da]').forEach(el => {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            el.placeholder = el.getAttribute(`data-${currentLang}`) || '';
        } else {
            el.innerHTML = el.getAttribute(`data-${currentLang}`) || '';
        }
    });
    
    document.querySelectorAll('[data-dkk]').forEach(el => {
        el.innerHTML = el.getAttribute(`data-${currentCurr}`) || '';
    });
    
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if(btn.dataset.lang === currentLang) {
            btn.classList.add('text-amber');
            btn.classList.remove('text-zinc-400', 'hover:text-white');
        } else {
            btn.classList.remove('text-amber');
            btn.classList.add('text-zinc-400', 'hover:text-white');
        }
    });
    
    document.querySelectorAll('.curr-btn').forEach(btn => {
        if(btn.dataset.curr === currentCurr) {
            btn.classList.add('text-amber');
            btn.classList.remove('text-zinc-400', 'hover:text-white');
        } else {
            btn.classList.remove('text-amber');
            btn.classList.add('text-zinc-400', 'hover:text-white');
        }
    });
    
    document.documentElement.lang = currentLang;
    
    // Dispatch custom event for language changes
    document.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang: currentLang } }));
}

export function getCurrentLang() {
    return currentLang;
}

export function getCurrentCurr() {
    return currentCurr;
}

