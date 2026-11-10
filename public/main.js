import { initI18n } from './tools/i18n-currency.js';
import { initRealAudioPlayers, toggleMoreTracks } from './tools/audio-player.js';
import { initForm } from './tools/form.js';
import { initParticles } from './tools/canvas-particles.js';

window.toggleMoreTracks = toggleMoreTracks;

function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const barsIcon = document.getElementById('menu-icon-bars');
    const closeIcon = document.getElementById('menu-icon-close');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
            menuBtn.setAttribute('aria-expanded', !isExpanded);
            mobileMenu.classList.toggle('hidden');
            if (barsIcon) barsIcon.classList.toggle('hidden');
            if (closeIcon) closeIcon.classList.toggle('hidden');
        });

        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                menuBtn.setAttribute('aria-expanded', 'false');
                if (barsIcon) barsIcon.classList.remove('hidden');
                if (closeIcon) closeIcon.classList.add('hidden');
            });
        });
    }
}

function init() {
    initI18n();
    initRealAudioPlayers();
    initForm();
    initParticles();
    initMobileMenu();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}


