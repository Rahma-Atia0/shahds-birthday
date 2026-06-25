// ==========================================
//(Countdown Timer)
// ==========================================
// const birthdayDate = new Date("2026-06-25T00:00:00").getTime(); 
const birthdayDate = new Date("2026-06-14T00:00:00").getTime(); 

// (صفحة counter.html)
if (document.getElementById("days")) {
    const countdown = setInterval(() => {
        const now = new Date().getTime();
        const distance = birthdayDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (document.getElementById("days")) {
            document.getElementById("days").innerText = days < 10 ? "0" + days : days;
            document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
            document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
            document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;
        }

        if (distance < 0) {
            clearInterval(countdown);
            if (document.getElementById("counter-section")) {
                document.getElementById("counter-section").querySelector('h2').innerText = "It's Nana's Day! ✨";
                const container = document.querySelector(".countdown-container");
                if (container) container.style.display = "none";
            }
        }
    }, 1000);
}


// ==========================================
// 2. منطق التحكم في الـ Popup والـ Quiz
// ==========================================

// جعلنا دالة showPopup متاحة عالمياً (Global) لتستدعيها الأزرار في الـ HTML
window.showPopup = function(message, type) {
    const popup = document.getElementById('custom-popup');
    const popupMessage = document.getElementById('popup-message');
    const popupBtn = document.getElementById('popup-btn');

    if (popup && popupMessage && popupBtn) {
        popupMessage.innerText = message;

        if (type === 'success') {
            popupMessage.className = "text-success";
            popupBtn.innerText = "هييه 🎉";
        } else {
            popupMessage.className = "text-error";
            popupBtn.innerText = "هحاول تاني خلاص 😭";
        }

        popup.classList.add('show');
    }
}

window.closePopup = function() {
    const popup = document.getElementById('custom-popup');
    if (popup) {
        popup.classList.remove('show');
    }
}

const quiz = [
    {
        question: "بتحبي ايه اكتر؟",
        answers: {
            me: { text: "أنا", correct: true, message: "شطورة إجابة صحيحة 🥰" },
            think: { text: "فكري", correct: false, message: "😡 مفيش عيد ميلادددد" },
            mahshi: { text: "محشي ورق العنب", correct: false, message: "طب مفيش عيد ميلادددد 😡" }
        }
    },
    {
        question: "اكتر حاجه بتحبي تعمليها ف يومك ؟",
        answers: {
            html: { text: "اتفرج على كلام من لهب", correct: false, message: "طب مفيش عيد ميلادددد 😡" },
            css: { text: "اكلمك طبعا", correct: true, message: "شطوووور" },
            js: { text: "انام", correct: false, message: "طب مفيش عيد ميلادددد 😡" }
        }
    },
    {
        question: "لو خيروكي بين",
        answers: {
            cs: { text: "تحولي حاسبات معايا", correct: true, message: "شطورة إجابة صحيحة 🥰" },
            sciense: { text: "تفضلي ف كليتك ", correct: false, message: "طب مفيش عيد ميلادددد 😡" },
            marrige: { text: "تتجوزي وتقعدي ف البيت  ", correct: false, message: "طب مفيش عيد ميلادددد😡" }
        }
    }
];
let currentQuestion = 0;

window.checkAnswer = function(answerKey) {
    const question = quiz[currentQuestion];
    const selected = question.answers[answerKey];

    // لو جاوبت صح في السؤال الأخير (السؤال الثالث - index 2)
    if (selected.correct && currentQuestion === 2) {
        showPopup(selected.message, "success");
        startBalloons();

        // بعد ثانيتين هنظهر سكشن النجاح والزرار الجديد بدلاً من الأسئلة
        setTimeout(() => {
            showSuccessSection();
        }, 2000);
        return; 
    }

    // المنطق الطبيعي لباقي الأسئلة
    showPopup(selected.message, selected.correct ? "success" : "error");

    if (selected.correct) {
        startBalloons();

        setTimeout(() => {
            currentQuestion++;
            goToNextQuestion();
        }, 2000);
    }
}

function goToNextQuestion() {
    const q1 = document.getElementById('question-1');
    const q2 = document.getElementById('question-2');
    const q3 = document.getElementById('question-3');

    if (currentQuestion === 1) {
        if (q1) q1.classList.remove('active');
        if (q2) q2.classList.add('active');
    }
    if (currentQuestion === 2) {
        if (q2) q2.classList.remove('active');
        if (q3) q3.classList.add('active');
    }
}

function showSuccessSection() {
    const q3 = document.getElementById('question-3');
    if (q3) {
        q3.classList.remove('active'); 
    }

    const quizContainer = document.getElementById('quiz-container') || (q3 ? q3.parentElement : null); 
    
    if (quizContainer) {
        quizContainer.innerHTML = `
            <div class="quiz-success-message" style="text-align: center; padding: 20px; animation: fadeIn 1s ease;">
                <h2 style="color: #ff4f87; font-size: 2rem; margin-bottom: 15px;">  مبروووك نجحتي ف الاختبارر 👏👏</h2>
                <p style="font-size: 1.5rem; color: #ff4f87; margin-bottom: 25px;">يلا ورايا ع اللي بعده</p>
                <a href="envelope.html" class="next-section-btn" style="
                    display: inline-block;
                    padding: 12px 30px;
                    background-color: #ff4f87;
                    color: #FFF;
                    text-decoration: none;
                    border-radius: 25px;
                    font-weight: bold;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
                    transition: transform 0.3s, background-color 0.3s;
                " onmouseover="this.style.transform='scale(1.05)'; this.style.backgroundColor='#ff4f87'" 
                    onmouseout="this.style.transform='scale(1)'; this.style.backgroundColor='#ff4f87df'">
                بينااا   
                </a>
            </div>
        `;
    }
}


// ==========================================
// 3. كود الـ Canvas المشترك (للالون والـ Confetti)
// ==========================================
const canvas = document.getElementById('confetti-canvas');
const ctx = canvas ? canvas.getContext('2d') : null;

let particles = [];
let animationFrame;

function resizeCanvas() {
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// --- كلاس البالونة ---
class Balloon {
    constructor() {
        this.x = Math.random() * (canvas ? canvas.width : window.innerWidth);
        this.y = (canvas ? canvas.height : window.innerHeight) + Math.random() * 200; 
        this.radius = Math.random() * 15 + 15; 
        this.color = ['#F7C1BB', '#F4D793', '#A8E6CF', '#DED2F9', '#FFAAA6'][Math.floor(Math.random() * 5)];
        this.speedY = Math.random() * 2 + 1.5; 
        this.wobble = Math.random() * 2; 
        this.wobbleSpeed = Math.random() * 0.05 + 0.02;
    }
    
    update() {
        this.y -= this.speedY; 
        this.wobble += this.wobbleSpeed;
        this.x += Math.sin(this.wobble) * 0.5; 
    }
    
    draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, this.radius * 0.85, this.radius, 0, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        
        ctx.beginPath();
        ctx.moveTo(this.x, this.y + this.radius);
        ctx.lineTo(this.x - 4, this.y + this.radius + 6);
        ctx.lineTo(this.x + 4, this.y + this.radius + 6);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(this.x, this.y + this.radius + 6);
        ctx.lineTo(this.x + Math.sin(this.wobble) * 5, this.y + this.radius + 25);
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.15)';
        ctx.lineWidth = 1;
        ctx.stroke();
    }
}

// --- كلاس الـ Confetti ---
class Confetti {
    constructor() {
        this.x = Math.random() * (canvas ? canvas.width : window.innerWidth);
        this.y = Math.random() * -(canvas ? canvas.height : window.innerHeight);
        this.size = Math.random() * 6 + 4;
        this.color = ['#A88B87', '#D4C5B9', '#E2D4C9', '#A3B19B'][Math.floor(Math.random() * 4)];
        this.speedY = Math.random() * 3 + 2;
        this.speedX = Math.random() * 2 - 1;
    }
    update() {
        this.y += this.speedY;
        this.x += this.speedX;
    }
    draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
}

function startBalloons() {
    if (!canvas) return; // حماية في حال عدم وجود كانفاس بالصفحة الحاليّة
    particles = []; 
    for (let i = 0; i < 50; i++) {
        particles.push(new Balloon());
    }
    cancelAnimationFrame(animationFrame);
    animateParticles('up');
}

function startConfetti() {
    if (!canvas) return;
    particles = [];
    for (let i = 0; i < 100; i++) {
        particles.push(new Confetti());
    }
    cancelAnimationFrame(animationFrame);
    animateParticles('down');
}

function animateParticles(direction) {
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach((p, index) => {
        p.update();
        p.draw();
        
        if (direction === 'up' && p.y < -50) particles.splice(index, 1);
        if (direction === 'down' && p.y > canvas.height) particles.splice(index, 1);
    });
    
    if (particles.length > 0) {
        animationFrame = requestAnimationFrame(() => animateParticles(direction));
    }
}

const surpriseBtn = document.getElementById('surprise-btn');
if (surpriseBtn) {
    surpriseBtn.addEventListener('click', () => {
        surpriseBtn.innerText = "Wish Sent! ✨";
        surpriseBtn.style.backgroundColor = "#3D3A35";
        surpriseBtn.style.color = "#F4F1EA";
        startConfetti();
    });
}

// ==========================================
// 4. منطق فتح وإغلاق الظرف (Envelope)
// ==========================================
const envelope = document.getElementById("envelope");

if (envelope) {
    envelope.addEventListener("click", (e) => {
        if (e.target.closest('.letter')) return;
        envelope.classList.toggle("open");
    });
}

// ==========================================
// 5. التحكم المطلق في سحب الرسائل بالماوس (Drag)
// ==========================================
const letters = document.querySelectorAll(".letter");

if (envelope && letters.length > 0) {
    letters.forEach(letter => {
        let isDragging = false;
        let offsetX = 0;
        let offsetY = 0;

        letter.addEventListener("mousedown", (e) => {
            if (!envelope.classList.contains('open')) return;

            isDragging = true;

            const rect = letter.getBoundingClientRect();
            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;

            letter.style.transition = "none";
            letter.style.position = "absolute";
            
            letter.style.left = (rect.left + window.scrollX) + "px";
            letter.style.top = (rect.top + window.scrollY) + "px";
            
            letter.style.bottom = "auto";
            letter.style.transform = "none"; 
            
            document.body.appendChild(letter);

            letter.style.zIndex = 10000;
            letter.style.cursor = "grabbing";
            
            e.preventDefault(); 
        });

        document.addEventListener("mousemove", (e) => {
            if (!isDragging) return;

            letter.style.left = (e.clientX + window.scrollX - offsetX) + "px";
            letter.style.top = (e.clientY + window.scrollY - offsetY) + "px";
        });

        document.addEventListener("mouseup", () => {
            if (isDragging) {
                isDragging = false;
                letter.style.cursor = "grab";
            }
        });
    });
}