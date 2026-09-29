let currentLang = 'da';
let currentCurr = 'dkk';

export function initI18n() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            currentLang = e.target.dataset.lang;
            updateContent();
        });
    });
    
    document.querySelectorAll('.curr-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            currentCurr = e.target.dataset.curr;
            updateContent();
        });
    });
    
    updateContent();
}

export function updateContent() {
    document.querySelectorAll('[data-da]').forEach(el => {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            el.placeholder = el.getAttribute(`data-${currentLang}`);
        } else {
            el.innerHTML = el.getAttribute(`data-${currentLang}`);
        }
    });
    
    document.querySelectorAll('[data-dkk]').forEach(el => {
        el.innerHTML = el.getAttribute(`data-${currentCurr}`);
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
