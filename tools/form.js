import { getCurrentLang } from './i18n-currency.js';

/**
 * Web3Forms Access Key for henvendelser til dinesenfrederik@gmail.com
 */
export const WEB3FORMS_ACCESS_KEY = "a73841c5-00b2-4351-9783-404ac2866bbd";

export function initForm() {
    const serviceBtns = document.querySelectorAll('.service-btn');
    serviceBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Reset all
            serviceBtns.forEach(b => {
                b.classList.remove('bg-amber', 'text-obsidian', 'border-amber');
                b.classList.add('border-border', 'text-gray-400');
            });
            // Set active
            btn.classList.remove('border-border', 'text-gray-400');
            btn.classList.add('bg-amber', 'text-obsidian', 'border-amber');
        });
    });

    const contactForm = document.getElementById('contact-form');
    if (contactForm && !contactForm.dataset.listenerAttached) {
        contactForm.dataset.listenerAttached = 'true';
        
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }
            
            const currentLang = getCurrentLang();
            const isEn = currentLang === 'en';

            const activeServiceBtn = document.querySelector('.service-btn.bg-amber');
            const service = activeServiceBtn ? activeServiceBtn.textContent.trim() : (isEn ? 'General Inquiry' : 'Generel henvendelse');

            const name = document.getElementById('cf-name')?.value.trim() || '';
            const band = document.getElementById('cf-band')?.value.trim() || '';
            const email = document.getElementById('cf-email')?.value.trim() || '';
            const musicReferenceLink = document.getElementById('cf-music-ref')?.value.trim() || '';
            const message = document.getElementById('cf-notes')?.value.trim() || '';

            const payload = {
                access_key: WEB3FORMS_ACCESS_KEY,
                subject: `Ny henvendelse fra FD Sound Labs: ${name} / ${band}`,
                from_name: "FD Sound Labs Website",
                to_email: "dinesenfrederik@gmail.com",
                name: name,
                band: band,
                email: email,
                service: service,
                musicReferenceLink: musicReferenceLink,
                message: message
            };

            // Remove any existing error banner
            const existingError = document.getElementById('cf-error-banner');
            if (existingError) existingError.remove();

            // Locate submit button & set loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnHtml = submitBtn ? submitBtn.innerHTML : '';
            
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.classList.add('opacity-75', 'cursor-not-allowed');
                const loadingText = isEn ? 'Sending inquiry...' : 'Sender henvendelse...';
                submitBtn.innerHTML = `
                    <span class="inline-flex items-center justify-center gap-2">
                        <svg class="animate-spin h-4 w-4 text-obsidian" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        ${loadingText}
                    </span>
                `;
            }

            try {
                // If the key is the placeholder, operate in graceful dev/mock mode
                if (WEB3FORMS_ACCESS_KEY === "YOUR_ACCESS_KEY_HERE" || !WEB3FORMS_ACCESS_KEY) {
                    console.info('[Web3Forms Mock Mode] Formular indsendt i dev-mode. For live levering til dinesenfrederik@gmail.com, indsæt din Web3Forms Access Key i tools/form.js:', payload);
                    // Simulate network latency
                    await new Promise(resolve => setTimeout(resolve, 600));
                } else {
                    const response = await fetch('https://api.web3forms.com/submit', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify(payload)
                    });

                    const data = await response.json();
                    if (!response.ok || !data.success) {
                        throw new Error(data.message || (isEn ? 'Submission failed. Please try again.' : 'Afsendelse fejlede. Prøv venligst igen.'));
                    }
                }

                // Render success view
                showFormSuccessState(contactForm, payload, currentLang);
            } catch (error) {
                console.error('[Web3Forms Error]', error);
                
                // Restore button state
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('opacity-75', 'cursor-not-allowed');
                    submitBtn.innerHTML = originalBtnHtml;
                }

                // Render in-DOM error banner
                renderErrorBanner(contactForm, error.message, isEn);
            }
        });
    }
}

function renderErrorBanner(form, errorMsg, isEn) {
    const errorDiv = document.createElement('div');
    errorDiv.id = 'cf-error-banner';
    errorDiv.className = 'p-4 rounded-xl bg-red-950/40 border border-red-500/50 text-red-200 text-sm font-sans flex items-start gap-3 my-4 fade-in';
    
    const fallbackText = isEn 
        ? 'Could not send the inquiry right now. Please try again or email directly to dinesenfrederik@gmail.com.'
        : 'Kunne ikke afsende henvendelsen lige nu. Prøv venligst igen eller send direkte til dinesenfrederik@gmail.com.';

    errorDiv.innerHTML = `
        <svg class="w-5 h-5 text-red-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div>
            <p class="font-bold">${isEn ? 'Transmission error' : 'Fejl ved afsendelse'}</p>
            <p class="text-xs text-red-300/90 mt-1">${escapeHtml(errorMsg || fallbackText)}</p>
        </div>
    `;

    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
        form.insertBefore(errorDiv, submitBtn);
    } else {
        form.appendChild(errorDiv);
    }
}

function showFormSuccessState(form, payload, lang) {
    const isEn = lang === 'en';
    
    const title = isEn ? 'Thank you for your inquiry!' : 'Tak for din henvendelse!';
    const message = isEn 
        ? `We have received your inquiry regarding <strong>${escapeHtml(payload.service || 'Mixing')}</strong>. Frederik will get back to <strong>${escapeHtml(payload.email)}</strong> within 24 hours.`
        : `Vi har modtaget din besked vedrørende <strong>${escapeHtml(payload.service || 'Mixing')}</strong>. Frederik vender personligt tilbage til <strong>${escapeHtml(payload.email)}</strong> inden for 24 timer.`;
    
    const refNote = payload.musicReferenceLink 
        ? `<div class="mt-4 p-3 bg-zinc-900/80 border border-border rounded-xl text-left text-xs font-mono text-zinc-300 break-all">
            <span class="text-amber font-bold">${isEn ? 'Demo link received:' : 'Demolink modtaget:'}</span> ${escapeHtml(payload.musicReferenceLink)}
           </div>`
        : '';
        
    const btnText = isEn ? 'Send another inquiry' : 'Send en ny henvendelse';

    // Store original form HTML for reset if not already stored
    if (!form.dataset.originalHtml) {
        form.dataset.originalHtml = form.innerHTML;
    }

    // Analytics Conversion Event Dispatch (Google Analytics 4 & Vercel)
    try {
        const sendGtag = window.gtag || (typeof gtag === 'function' ? gtag : null);
        if (sendGtag) {
            sendGtag('event', 'generate_lead', {
                event_category: 'Contact Form',
                event_label: payload.service || 'Mixing',
                service: payload.service || 'Mixing',
                value: 1
            });
        }
        if (window.dataLayer && Array.isArray(window.dataLayer)) {
            window.dataLayer.push({
                event: 'generate_lead',
                event_category: 'Contact Form',
                event_label: payload.service || 'Mixing',
                service: payload.service || 'Mixing'
            });
        }
        if (typeof window.va === 'function') {
            window.va('event', {
                name: 'lead_inquiry',
                data: { service: payload.service || 'Mixing' }
            });
        }
    } catch (e) {
        console.warn('[Analytics Dispatch]', e);
    }

    form.innerHTML = `
        <div class="text-center py-8 px-4 fade-in">
            <div class="w-20 h-20 rounded-full bg-amber/10 border-2 border-amber/50 text-amber flex items-center justify-center mx-auto mb-6 shadow-[0_0_25px_rgba(255,159,10,0.3)]">
                <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path>
                </svg>
            </div>
            <h3 class="text-3xl font-bold text-white mb-4 tracking-tight">${title}</h3>
            <p class="text-gray-300 text-base max-w-lg mx-auto leading-relaxed mb-6 font-sans">
                ${message}
            </p>
            ${refNote}
            <div class="mt-8">
                <button type="button" id="reset-contact-form-btn" class="bg-zinc-900 border border-border hover:border-amber text-gray-300 hover:text-white px-8 py-3.5 rounded-full font-bold font-mono text-sm tracking-widest uppercase transition-all shadow-md">
                    &larr; ${btnText}
                </button>
            </div>
            <p class="text-[13px] font-medium text-gray-500 font-mono mt-8">FD SOUND LABS &bull; Aarhus, Danmark</p>
        </div>
    `;

    document.getElementById('reset-contact-form-btn').addEventListener('click', () => {
        form.innerHTML = form.dataset.originalHtml;
        delete form.dataset.listenerAttached;
        initForm();
    });
}

function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

