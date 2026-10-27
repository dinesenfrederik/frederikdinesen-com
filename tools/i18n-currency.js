const STORAGE_KEY_LANG = 'fdsl_user_lang';
const STORAGE_KEY_CURR = 'fdsl_user_curr';
const SESSION_KEY_COUNTRY = 'fdsl_geo_country';

// Determine initial state synchronously before first render
let currentLang = 'da';
let currentCurr = 'dkk';

function computeInitialPreferences() {
    try {
        const savedLang = localStorage.getItem(STORAGE_KEY_LANG);
        const savedCurr = localStorage.getItem(STORAGE_KEY_CURR);
        
        if (savedLang === 'da' || savedLang === 'en') {
            currentLang = savedLang;
        }
        if (savedCurr === 'dkk' || savedCurr === 'eur') {
            currentCurr = savedCurr;
        }

        // If either preference is not manually saved, apply synchronous heuristics
        if (!savedLang || !savedCurr) {
            // Check for test override in URL (e.g. ?country=US or ?geo=US)
            const urlParams = new URLSearchParams(window.location.search);
            const overrideCountry = urlParams.get('country') || urlParams.get('geo');
            const cachedCountry = overrideCountry || sessionStorage.getItem(SESSION_KEY_COUNTRY);

            if (cachedCountry) {
                const isDK = cachedCountry.toUpperCase() === 'DK';
                if (!savedLang) currentLang = isDK ? 'da' : 'en';
                if (!savedCurr) currentCurr = isDK ? 'dkk' : 'eur';
            } else {
                // Heuristic: check timezone and browser languages
                const tz = (Intl.DateTimeFormat && Intl.DateTimeFormat().resolvedOptions().timeZone) || '';
                const browserLangs = navigator.languages || [navigator.language || ''];
                const isDanishTz = tz === 'Europe/Copenhagen';
                const hasDanishLang = browserLangs.some(l => typeof l === 'string' && l.toLowerCase().startsWith('da'));
                const likelyDK = isDanishTz || hasDanishLang;

                if (!likelyDK) {
                    if (!savedLang) currentLang = 'en';
                    if (!savedCurr) currentCurr = 'eur';
                }
            }
        }
    } catch (e) {
        // Fallback gracefully on storage access errors (e.g. strict private mode)
        console.debug('[i18n] Storage access restricted, using default state:', e);
    }
}

computeInitialPreferences();

export function initI18n() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const btnEl = e.target.closest('.lang-btn');
            if (!btnEl) return;
            currentLang = btnEl.dataset.lang;
            try {
                localStorage.setItem(STORAGE_KEY_LANG, currentLang);
            } catch (_) {}
            updateContent();
        });
    });
    
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
    resolveVisitorGeo();
}

async function resolveVisitorGeo() {
    let hasManualLang = false;
    let hasManualCurr = false;
    try {
        hasManualLang = Boolean(localStorage.getItem(STORAGE_KEY_LANG));
        hasManualCurr = Boolean(localStorage.getItem(STORAGE_KEY_CURR));
    } catch (_) {}

    // If the visitor already explicitly set both preferences, respect them
    if (hasManualLang && hasManualCurr) {
        return;
    }

    try {
        const urlParams = new URLSearchParams(window.location.search);
        let country = urlParams.get('country') || urlParams.get('geo') || sessionStorage.getItem(SESSION_KEY_COUNTRY);

        if (!country) {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 2000);
            const res = await fetch('https://api.country.is', { signal: controller.signal });
            clearTimeout(timeoutId);
            if (res.ok) {
                const data = await res.json();
                country = data?.country || '';
                if (country) {
                    try {
                        sessionStorage.setItem(SESSION_KEY_COUNTRY, country);
                    } catch (_) {}
                }
            }
        }

        if (country) {
            const isDK = country.toUpperCase() === 'DK';
            let changed = false;

            if (!hasManualLang) {
                const targetLang = isDK ? 'da' : 'en';
                if (currentLang !== targetLang) {
                    currentLang = targetLang;
                    changed = true;
                }
            }

            if (!hasManualCurr) {
                const targetCurr = isDK ? 'dkk' : 'eur';
                if (currentCurr !== targetCurr) {
                    currentCurr = targetCurr;
                    changed = true;
                }
            }

            if (changed) {
                updateContent();
            }
        }
    } catch (err) {
        console.debug('[i18n] Async geo-lookup failed or timed out, keeping heuristic defaults:', err);
    }
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

