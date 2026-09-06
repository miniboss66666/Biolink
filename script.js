// ==================== CẤU HÌNH ====================
const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbz4IxAZfyMKdRHc_0RvfKlBNBDeScF0DjLdmDibYLCbukeMJEVNs5xXUNtUr3iSeLm0/exec";

// ==================== ĐA NGÔN NGỮ ====================
let currentLang = 'de';
let visitorName = '';

const i18n = {
    de: {
        askTitle: "Wie heißt du?",
        askSub: "Bevor wir anfangen, sag mir bitte deinen Namen.",
        askHolder: "Dein Name...",
        btnEnter: "Enter →",
        btnSkip: "Überspringen →",
        defaultFriend: "mein Freund",
        aiGenerating: "KI generiert Profil...",
        greet: (name) => `Hallo <b>${name}</b>! Ich heiße <b>Pham Minh Quang</b> (Pham ist mein Nachname). Du kannst mich <b>P</b> nennen. <b>Miniboss</b> ist mein Spitzname. Willkommen in meiner Ecke!`,
        lblHeight: "Größe",
        lblBorn: "Geburtsjahr",
        lblNat: "Nationalität",
        lblAnimals: "Lieblingstiere",
        valAnimals: "Tiere im Allgemeinen, besonders Katzen 🐱",
        lblHobbies: "Hobbys",
        valHobbies: "Sport, Games, Musik, Forschung & Coden",
        lblNum: "Lieblingszahl",
        lblColor: "Lieblingsfarbe",
        lblTopic: "Lieblingsthema",
        valTopic: "Wissenschaft, Tech, KI",
        contactTitle: "Kontakt & Links",
        msgTitle: "Das ist alles über mich. Möchtest du mir noch etwas sagen?",
        msgHolder: "Hinterlasse mir eine Nachricht...",
        btnSend: "Senden →",
        sending: "Wird gesendet...",
        sent: "Nachricht gesendet! Vielen Dank :D",
        error: "Fehler beim Senden. Bitte versuche es erneut.",
        copied: "In die Zwischenablage kopiert!"
    },
    vi: {
        askTitle: "Bạn tên là gì?",
        askSub: "Trước khi bắt đầu, hãy cho mình biết tên bạn nhé.",
        askHolder: "Tên của bạn...",
        btnEnter: "Tiếp tục →",
        btnSkip: "Bỏ qua →",
        defaultFriend: "bạn",
        aiGenerating: "AI đang khởi tạo hồ sơ...",
        greet: (name) => `Chào <b>${name}</b>! Tôi tên là <b>Phạm Minh Quang</b> (Phạm là họ của tôi). Bạn có thể gọi tôi là <b>P</b>. <b>Miniboss</b> là biệt danh của tôi. Rất vui được gặp bạn!`,
        lblHeight: "Chiều cao",
        lblBorn: "Năm sinh",
        lblNat: "Quốc tịch",
        lblAnimals: "Động vật",
        valAnimals: "Thích động vật, đặc biệt là mèo 🐱",
        lblHobbies: "Sở thích",
        valHobbies: "Thể thao, game, âm nhạc, nghiên cứu & Lập trình",
        lblNum: "Số yêu thích",
        lblColor: "Màu yêu thích",
        lblTopic: "Chủ đề yêu thích",
        valTopic: "Khoa học, Công nghệ, AI",
        contactTitle: "Liên hệ & Liên kết",
        msgTitle: "Đó là tất cả về tôi, có điều gì bạn muốn nói với tôi không?",
        msgHolder: "Nhập lời nhắn của bạn...",
        btnSend: "Gửi lời nhắn →",
        sending: "Đang gửi...",
        sent: "Đã gửi thành công! Cảm ơn bạn :D",
        error: "Có lỗi khi gửi. Thử lại sau nhé!",
        copied: "Đã sao chép vào bộ nhớ tạm!"
    },
    en: {
        askTitle: "What's your name?",
        askSub: "Before we start, please let me know who you are.",
        askHolder: "Your name...",
        btnEnter: "Enter →",
        btnSkip: "Skip →",
        defaultFriend: "my friend",
        aiGenerating: "AI is generating profile...",
        greet: (name) => `Hello <b>${name}</b>! I'm <b>Pham Minh Quang</b> (Pham is my surname). You can call me <b>P</b>. <b>Miniboss</b> is my Nickname. Welcome to my space!`,
        lblHeight: "Height",
        lblBorn: "Birth Year",
        lblNat: "Nationality",
        lblAnimals: "Animals",
        valAnimals: "Love animals, especially cats 🐱",
        lblHobbies: "Hobbies",
        valHobbies: "Sports, games, music, research & Coding",
        lblNum: "Favorite Number",
        lblColor: "Favorite Color",
        lblTopic: "Favorite Topic",
        valTopic: "Science, Technology, AI",
        contactTitle: "Contact & Links",
        msgTitle: "That's all about me. Is there anything you'd like to tell me?",
        msgHolder: "Leave a message...",
        btnSend: "Send →",
        sending: "Sending...",
        sent: "Message sent! Thank you :D",
        error: "Error sending message. Try again!",
        copied: "Copied to clipboard!"
    }
};

// ==================== REALTIME GERMANY TIME & STATUS ====================
function updateGermanyTime() {
    try {
        const now = new Date();
        const options = { timeZone: 'Europe/Berlin', hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' };
        const timeString = new Intl.DateTimeFormat([], options).format(now);
        
        const timeEl = document.getElementById('germany-time');
        const statusEl = document.getElementById('germany-status');
        
        if (timeEl) timeEl.innerText = `DE: ${timeString}`;

        const hour = parseInt(timeString.split(':')[0]);
        if (statusEl) {
            if (hour >= 23 || hour < 7) {
                statusEl.innerText = "Sleeping 🌙";
            } else if (hour >= 8 && hour < 17) {
                statusEl.innerText = "Studying / Coding ☕";
            } else {
                statusEl.innerText = "Gaming / Free time 🎮";
            }
        }
    } catch(e) {
        console.error("Time error:", e);
    }
}
setInterval(updateGermanyTime, 1000);
updateGermanyTime();

// ==================== MUSIC PLAYER (WITH TIME & PROGRESS) ====================
const PLAYLIST = [
    { title: "La Campanella", url: "Piano background music.mp3" },
    { title: "Chinese Chill", url: "Chinese background music.mp3" },
    { title: "Cắt Đôi Nỗi Sầu", url: "cắt đôi nỗi sầu.mp3" },
    { title: "Blue Tequila", url: "Táo Blue Tequila.mp3" },
    { title: "Merry-Go-Round", url: "Merry go round of life.mp3" },
    { title: "Ocean View", url: "A town with a ocean view.mp3" },
    { title: "Sơn Tùng M-TP", url: "đừng làm trái tim anh đau.mp3" }
];

let currentTrack = Math.floor(Math.random() * PLAYLIST.length);
let isPlaying = false;
let audio = null;

function initMusicPlayer() {
    audio = document.getElementById('bg-audio');
    if (!audio) return;

    loadTrack(currentTrack);

    audio.ontimeupdate = updateProgress;
    audio.onended = () => nextTrack();
}

function loadTrack(index) {
    if (!audio || !PLAYLIST[index]) return;
    audio.src = encodeURI(PLAYLIST[index].url);
    const titleEl = document.getElementById('music-title');
    if (titleEl) titleEl.innerText = PLAYLIST[index].title;
    updateProgressBar(0);
}

function setPlayState(playing) {
    isPlaying = playing;
    const icon = document.getElementById('music-icon');
    if (icon) {
        icon.className = isPlaying ? "fa-solid fa-pause" : "fa-solid fa-play";
    }
}

function toggleMusic() {
    if (!audio) return;
    if (isPlaying) {
        audio.pause();
        setPlayState(false);
    } else {
        audio.play().then(() => setPlayState(true)).catch(err => console.log(err));
    }
}

function nextTrack() {
    currentTrack = (currentTrack + 1) % PLAYLIST.length;
    loadTrack(currentTrack);
    audio.play().then(() => setPlayState(true)).catch(err => console.log(err));
}

function prevTrack() {
    currentTrack = (currentTrack - 1 + PLAYLIST.length) % PLAYLIST.length;
    loadTrack(currentTrack);
    audio.play().then(() => setPlayState(true)).catch(err => console.log(err));
}

function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

function updateProgress() {
    if (audio && audio.duration) {
        const percent = (audio.currentTime / audio.duration) * 100;
        updateProgressBar(percent);
        const curEl = document.getElementById('current-time');
        const durEl = document.getElementById('duration-time');
        if (curEl) curEl.innerText = formatTime(audio.currentTime);
        if (durEl) durEl.innerText = formatTime(audio.duration);
    }
}

function updateProgressBar(percent) {
    const bar = document.getElementById('progress-bar');
    if (bar) bar.style.width = `${percent}%`;
}

function seekAudio(e) {
    if (!audio || !audio.duration) return;
    const container = document.getElementById('progress-container');
    const rect = container.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = clickX / rect.width;
    audio.currentTime = percent * audio.duration;
}

// ==================== TỰ ĐỘNG PHÁT NHẠC KHI BẮT ĐẦU ====================
function startAISequence(isSkip = false) {
    const input = document.getElementById('visitor-name');
    visitorName = isSkip ? i18n[currentLang].defaultFriend : (input.value.trim() || i18n[currentLang].defaultFriend);

    // 👉 TỰ ĐỘNG PHÁT NHẠC NGAY KHI KHÁCH CLICK BẮT ĐẦU VÀO WEB
    if (audio && !isPlaying) {
        audio.play().then(() => setPlayState(true)).catch(err => console.log("Autoplay:", err));
    }

    document.getElementById('welcome-screen').style.display = 'none';
    const aiScreen = document.getElementById('ai-loading-screen');
    aiScreen.style.display = 'block';
    document.getElementById('ai-status-text').innerText = i18n[currentLang].aiGenerating;

    setTimeout(() => {
        aiScreen.style.display = 'none';
        document.getElementById('main-bio').style.display = 'block';
        updateTexts();
        streamGreeting();
    }, 1200);
}

// ==================== AI STREAMING SIMULATION ====================
function startAISequence(isSkip = false) {
    const input = document.getElementById('visitor-name');
    visitorName = isSkip ? i18n[currentLang].defaultFriend : (input.value.trim() || i18n[currentLang].defaultFriend);

    document.getElementById('welcome-screen').style.display = 'none';
    const aiScreen = document.getElementById('ai-loading-screen');
    aiScreen.style.display = 'block';
    document.getElementById('ai-status-text').innerText = i18n[currentLang].aiGenerating;

    setTimeout(() => {
        aiScreen.style.display = 'none';
        document.getElementById('main-bio').style.display = 'block';
        updateTexts();
        streamGreeting();
    }, 1200);
}

function streamGreeting() {
    const fullHtml = i18n[currentLang].greet(visitorName);
    const greetingEl = document.getElementById('bio-greeting');
    greetingEl.innerHTML = '';
    
    let charIndex = 0;
    let isTag = false;
    let currentText = '';

    const interval = setInterval(() => {
        if (charIndex < fullHtml.length) {
            let char = fullHtml[charIndex];
            if (char === '<') isTag = true;
            currentText += char;
            if (char === '>') isTag = false;

            charIndex++;
            if (!isTag) {
                greetingEl.innerHTML = currentText;
            }
        } else {
            clearInterval(interval);
            greetingEl.innerHTML = fullHtml;
            
            document.getElementById('info-card').classList.add('revealed');
            document.getElementById('links-container').classList.add('revealed');
            document.getElementById('message-section').classList.add('revealed');
        }
    }, 25);
}

// ==================== CÁC CHỨC NĂNG CƠ BẢN ====================
function updateTexts() {
    const t = i18n[currentLang];
    document.getElementById('lang-text').innerText = currentLang.toUpperCase();
    document.getElementById('ask-name-title').innerText = t.askTitle;
    document.getElementById('ask-name-sub').innerText = t.askSub;
    document.getElementById('visitor-name').placeholder = t.askHolder;
    document.getElementById('btn-enter').innerText = t.btnEnter;
    document.getElementById('btn-skip').innerText = t.btnSkip;

    document.getElementById('lbl-height').innerText = t.lblHeight;
    document.getElementById('lbl-born').innerText = t.lblBorn;
    document.getElementById('lbl-nat').innerText = t.lblNat;
    document.getElementById('lbl-animals').innerText = t.lblAnimals;
    document.getElementById('val-animals').innerText = t.valAnimals;
    document.getElementById('lbl-hobbies').innerText = t.lblHobbies;
    document.getElementById('val-hobbies').innerText = t.valHobbies;
    document.getElementById('lbl-num').innerText = t.lblNum;
    document.getElementById('lbl-color').innerText = t.lblColor;
    document.getElementById('lbl-topic').innerText = t.lblTopic;
    document.getElementById('val-topic').innerText = t.valTopic;
    document.getElementById('lbl-contact-title').innerText = t.contactTitle;
    document.getElementById('lbl-msg-title').innerText = t.msgTitle;
    document.getElementById('guest-msg').placeholder = t.msgHolder;
    document.getElementById('btn-send').innerText = t.btnSend;
}

function toggleLanguage() {
    const langs = ['de', 'vi', 'en'];
    let nextIndex = (langs.indexOf(currentLang) + 1) % langs.length;
    currentLang = langs[nextIndex];
    updateTexts();
    if (document.getElementById('main-bio').style.display === 'block') {
        streamGreeting();
    }
}

function toggleTheme() {
    const body = document.body;
    const themeIcon = document.querySelector('#theme-btn i');
    if (body.getAttribute('data-theme') === 'dark') {
        body.setAttribute('data-theme', 'light');
        themeIcon.className = "fa-solid fa-sun";
    } else {
        body.setAttribute('data-theme', 'dark');
        themeIcon.className = "fa-solid fa-moon";
    }
}

const nameInput = document.getElementById('visitor-name');
if (nameInput) {
    nameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') startAISequence(false);
    });
}

function copyText(text) {
    navigator.clipboard.writeText(text).then(() => {
        const toast = document.getElementById('toast');
        toast.innerText = i18n[currentLang].copied;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2000);
    });
}

// ==================== EASTER EGGS ====================
function catEasterEgg() {
    const catEmojis = ['🐱', '😸', '🐈', '🐾', '😻', '✨'];
    for (let i = 0; i < 25; i++) {
        const cat = document.createElement('div');
        cat.className = 'falling-cat';
        cat.innerText = catEmojis[Math.floor(Math.random() * catEmojis.length)];
        cat.style.left = Math.random() * 100 + 'vw';
        cat.style.animationDuration = (Math.random() * 2 + 2) + 's';
        cat.style.fontSize = (Math.random() * 20 + 20) + 'px';
        document.body.appendChild(cat);
        setTimeout(() => cat.remove(), 4000);
    }
}

const pi100Digits = "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679...";
function piEasterEgg() {
    document.getElementById('pi-text').innerText = pi100Digits;
    document.getElementById('pi-modal').style.display = 'flex';
}

function closePiModal() {
    document.getElementById('pi-modal').style.display = 'none';
}

// ==================== GOOGLE SHEETS ====================
async function sendMessage() {
    const msgInput = document.getElementById('guest-msg');
    const status = document.getElementById('status-msg');
    const t = i18n[currentLang];
    const message = msgInput.value.trim();

    if (!message) return;
    status.innerText = t.sending;
    status.style.color = "var(--text-muted)";

    try {
        await fetch(GOOGLE_SHEET_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: visitorName, message: message })
        });
        status.innerText = t.sent;
        status.style.color = "#4ade80";
        msgInput.value = '';
    } catch (err) {
        status.innerText = t.error;
        status.style.color = "#f87171";
    }
}

// ==================== BACKGROUND VECTOR CANVAS ====================
const canvas = document.getElementById('bgCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.6;
            this.vy = (Math.random() - 0.5) * 0.6;
            this.radius = 1.5;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
            if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
        }
        draw() {
            const isDark = document.body.getAttribute('data-theme') === 'dark';
            ctx.fillStyle = isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < 55; i++) particles.push(new Particle());

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const isDark = document.body.getAttribute('data-theme') === 'dark';
        const strokeStyle = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 110) {
                    ctx.strokeStyle = strokeStyle;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    }
    animate();
}

// ĐẶT Ở NGOÀI CÙNG NHƯ THẾ NÀY MỚI CHUẨN NÈ BRO:
window.addEventListener('DOMContentLoaded', () => {
    initMusicPlayer();
    if (typeof updateTexts === 'function') updateTexts();
});
