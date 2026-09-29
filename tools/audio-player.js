let currentlyPlayingAudio = null;
let currentlyPlayingButton = null;

function formatTime(seconds) {
    if (isNaN(seconds) || !isFinite(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

export function initRealAudioPlayers() {
    document.querySelectorAll('.real-audio-player').forEach(card => {
        const finalSrc = card.getAttribute('data-audio-src-final');
        const preSrc = card.getAttribute('data-audio-src-pre');
        
        // Initialize with final mix
        const audio = new Audio(finalSrc);
        audio.preload = 'metadata';
        
        const playBtn = card.querySelector('.play-btn');
        const playIcon = playBtn.querySelector('.play-icon');
        const pauseIcon = playBtn.querySelector('.pause-icon');
        
        const timeCurrent = card.querySelector('.time-current');
        const timeDuration = card.querySelector('.time-duration');
        const playhead = card.querySelector('.playhead');
        const progressOverlay = card.querySelector('.progress-overlay');
        const waveformContainer = card.querySelector('.waveform');
        const wavebars = card.querySelectorAll('.waveform > div:not(.progress-overlay):not(.playhead)');
        
        const preMixBtn = card.querySelector('.pre-mix-btn');
        const finalMixBtn = card.querySelector('.final-mix-btn');

        audio.addEventListener('loadedmetadata', () => {
            timeDuration.textContent = formatTime(audio.duration);
        });

        audio.addEventListener('error', (e) => {
            console.warn('[Audio Player] Fejl ved indlæsning af lyd:', audio.src);
        });

        audio.addEventListener('timeupdate', () => {
            timeCurrent.textContent = formatTime(audio.currentTime);
            if (audio.duration) {
                const percent = (audio.currentTime / audio.duration) * 100;
                playhead.style.left = `${percent}%`;
                progressOverlay.style.width = `${percent}%`;
                
                wavebars.forEach((bar, index) => {
                    const barPercent = (index / wavebars.length) * 100;
                    if (barPercent <= percent) {
                        bar.classList.remove('bg-zinc-700');
                        bar.classList.add('bg-amber');
                    } else {
                        bar.classList.remove('bg-amber');
                        bar.classList.add('bg-zinc-700');
                    }
                });
            }
        });
        
        audio.addEventListener('ended', () => {
            playIcon.classList.remove('hidden');
            pauseIcon.classList.add('hidden');
            playhead.style.left = '0%';
            progressOverlay.style.width = '0%';
            timeCurrent.textContent = '0:00';
            currentlyPlayingAudio = null;
            wavebars.forEach(bar => {
                bar.classList.remove('bg-amber');
                bar.classList.add('bg-zinc-700');
            });
        });

        playBtn.addEventListener('click', () => {
            if (audio.paused) {
                if (currentlyPlayingAudio && currentlyPlayingAudio !== audio) {
                    currentlyPlayingAudio.pause();
                    if (currentlyPlayingButton) {
                        currentlyPlayingButton.querySelector('.play-icon').classList.remove('hidden');
                        currentlyPlayingButton.querySelector('.pause-icon').classList.add('hidden');
                    }
                }
                const p = audio.play();
                if (p !== undefined) {
                    p.catch(err => console.warn('[Audio Player] Play prevented:', err));
                }
                playIcon.classList.add('hidden');
                pauseIcon.classList.remove('hidden');
                currentlyPlayingAudio = audio;
                currentlyPlayingButton = playBtn;
            } else {
                audio.pause();
                playIcon.classList.remove('hidden');
                pauseIcon.classList.add('hidden');
                currentlyPlayingAudio = null;
            }
        });

        waveformContainer.addEventListener('click', (e) => {
            if (audio.duration) {
                const rect = waveformContainer.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const percent = Math.max(0, Math.min(1, clickX / rect.width));
                audio.currentTime = percent * audio.duration;
                
                timeCurrent.textContent = formatTime(audio.currentTime);
                playhead.style.left = `${percent * 100}%`;
                progressOverlay.style.width = `${percent * 100}%`;
            }
        });
        
        // A/B Toggling Logic
        function switchAudioSource(newSrc, clickedBtn, otherBtn) {
            if (!newSrc || audio.src === newSrc || audio.src.endsWith(newSrc)) return;
            
            const wasPlaying = !audio.paused;
            const currentTime = audio.currentTime;
            
            // Update UI buttons
            if (clickedBtn) {
                clickedBtn.classList.add('bg-zinc-800', 'text-white');
                clickedBtn.classList.remove('text-zinc-400');
            }
            if (otherBtn) {
                otherBtn.classList.remove('bg-zinc-800', 'text-white');
                otherBtn.classList.add('text-zinc-400');
            }
            
            // Seamless Swap
            audio.src = newSrc;
            audio.load();

            const onLoaded = () => {
                if (currentTime > 0 && currentTime < audio.duration) {
                    audio.currentTime = currentTime;
                }
                if (wasPlaying) {
                    const p = audio.play();
                    if (p !== undefined) p.catch(() => {});
                }
                audio.removeEventListener('loadedmetadata', onLoaded);
            };
            audio.addEventListener('loadedmetadata', onLoaded);
        }
        
        if (preMixBtn && finalMixBtn) {
            preMixBtn.addEventListener('click', () => switchAudioSource(preSrc, preMixBtn, finalMixBtn));
            finalMixBtn.addEventListener('click', () => switchAudioSource(finalSrc, finalMixBtn, preMixBtn));
        }
    });
}

export function toggleMoreTracks() {
    const extraContainer = document.getElementById('extra-tracks');
    const btn = document.getElementById('show-more-btn');
    const currentLang = document.documentElement.lang || 'da';
    if (extraContainer.classList.contains('hidden')) {
        extraContainer.classList.remove('hidden');
        btn.innerHTML = currentLang === 'en' ? 'Show fewer &uarr;' : 'Vis færre &uarr;';
    } else {
        extraContainer.classList.add('hidden');
        btn.innerHTML = btn.getAttribute(`data-${currentLang}`);
    }
}
