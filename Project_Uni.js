// ------------------------header-----------------

// -------------------- انیمیشن نوارهای مهارت هنگام ورود به بخش Skills --------------------
const skillBars = document.querySelectorAll('.bar');
const skillsSection = document.querySelector('#skills');

// ذخیره عرض هدف و تنظیم اولیه به 0%
skillBars.forEach(bar => {
    const originalWidth = bar.style.width; // ممکن است خالی باشد
    let target = originalWidth;
    if (!target) {
        
        if (bar.classList.contains('one')) target = '51%';
        else if (bar.classList.contains('two')) target = '80%';
        else if (bar.classList.contains('three')) target = '75%';
        else if (bar.classList.contains('four')) target = '20%';
        else target = '0%';
    }
    bar.style.width = '0%';
    bar.dataset.targetWidth = target;
});

let animated = false;

function animateSkills() {
    if (animated) return;
    const rect = skillsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
        skillBars.forEach(bar => {
            const target = bar.dataset.targetWidth;
            bar.style.transition = 'width 1s ease-out';
            bar.style.width = target;
        });
        animated = true;
    }
}

window.addEventListener('load', animateSkills);
window.addEventListener('scroll', animateSkills);

// -------------------- پیام برای لینک‌های شبکه‌های اجتماعی (موقتی) --------------------
// const socialLinks = document.querySelectorAll('.link_connect');
// socialLinks.forEach(link => {
//     link.addEventListener('click', function(e) {
//         e.preventDefault();
//         alert('لینک با موفقیت کپی شد.');
//     });
// });
// // انتخاب تمام لینک‌های بخش ارتباط با من
// const allLinks = document.querySelectorAll('.link_connect');

// allLinks.forEach(link => {
//     link.addEventListener('click', function(e) {
//         // جلوگیری از رفتن به لینک خالی (مثل #)
//         e.preventDefault();

//         // پیدا کردن متن داخل .connect_media (متن قابل کپی)
//         const textElement = this.querySelector('.connect_media');
//         if (textElement) {
//             const textToCopy = textElement.innerText.trim();

//             // کپی متن در کلیپ‌بورد
//             navigator.clipboard.writeText(textToCopy).then(() => {
//                 // نمایش پیام موقت (توستر ساده)
//                 showCopyMessage(this, textToCopy);
//             }).catch(err => {
//                 console.error('خطا در کپی: ', err);
//                 alert('کپی ناموفق بود، دوباره تلاش کنید.');
//             });
//         }
//     });
// });

// (اختیاری) اگر هنوز از کلاس .menu_item در جای دیگری استفاده می‌کنی (مثل منوی قدیمی)
// این قسمت کاملاً جدا است و به همبرگر وابسته نیست
const menuItems = document.querySelectorAll('.menu_item');
if (menuItems.length > 0) {
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            const text = this.innerText.trim().toLowerCase();
            let targetId = '';
            if (text === 'skills') targetId = '#skills';
            else if (text === 'profile') targetId = '#profile';
            else if (text === 'work sample') targetId = '#';
            else if (text === 'our services') targetId = '#';
            if (targetId && targetId !== '#') {
                const targetEl = document.querySelector(targetId);
                if (targetEl) {
                    targetEl.scrollIntoView({ behavior: 'smooth' });
                }
            } else if (targetId === '#') {
                alert('این بخش در به‌روزرسانی بعدی اضافه می‌شود.');
            }
        });
    });
}
// --------comments--------

// آرایه نگهداری نظرات (در حافظه مرورگر)
let comments = [];

function submitComment() {
    const nameInput = document.getElementById('commentName');
    const textInput = document.getElementById('commentText');

    const name = nameInput.value.trim();
    const text = textInput.value.trim();

    // اعتبارسنجی
    if (!name || !text) {
        shakeForm();
        return;
    }

    // ساخت آبجکت نظر
    const comment = {
        name: name,
        text: text,
        date: getNowFarsi()
    };

    // اضافه کردن به آرایه
    comments.unshift(comment); // جدیدترین بالا نمایش داده بشه

    // رندر کردن
    renderComments();

    // پاک کردن فرم
    nameInput.value = '';
    textInput.value = '';
}

function renderComments() {
    const list = document.getElementById('commentsList');

    if (comments.length === 0) {
        list.innerHTML = '<p class="no-comments">No comments yet.</p>';
        return;
    }

    list.innerHTML = comments.map((c, i) => `
        <div class="comment-card" id="comment-${i}">
            <div class="comment-card-header">
                <span class="comment-author">${escapeHTML(c.name)}</span>
                <span class="comment-date">${c.date}</span>
            </div>
            <p class="comment-body">${escapeHTML(c.text)}</p>
        </div>
    `).join('');
}

// تابع گرفتن تاریخ و ساعت فارسی
function getNowFarsi() {
    const now = new Date();
    return now.toLocaleString('fa-IR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// جلوگیری از XSS
function escapeHTML(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

// انیمیشن لرزش فرم در صورت خالی بودن
function shakeForm() {
    const form = document.querySelector('.comment-form');
    form.style.animation = 'none';
    setTimeout(() => {
        form.style.animation = 'shake 0.3s ease';
    }, 10);
}

// اضافه کردن keyframe لرزش به صفحه
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    @keyframes shake {
        0%   { transform: translateX(0); }
        25%  { transform: translateX(-6px); }
        50%  { transform: translateX(6px); }
        75%  { transform: translateX(-4px); }
        100% { transform: translateX(0); }
    }
`;
document.head.appendChild(shakeStyle);

// نمایش اولیه
renderComments();

// -------------animation----------
window.addEventListener('load', function () {
    setTimeout(function () {
        const overlay = document.querySelector('.loader-overlay');
        overlay.style.opacity = '0';
        setTimeout(function () {
            overlay.style.display = 'none';
        }, 500);
    }, 1500);
});
