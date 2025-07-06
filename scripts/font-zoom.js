// تهيئة وظيفة تكبير وتصغير النصوص

// المتغيرات الأساسية
let currentScale = 1;
const MIN_SCALE = 0.7;
const MAX_SCALE = 1.5;
const STEP = 0.1;

// دالة تغيير حجم النصوص
function changeFontSize(change) {
    
    // تحديد العناصر النصية
    const textElements = document.querySelectorAll('.text-content, p, h1, h2, h3, h4, h5, h6, span, div, a, button, input, textarea, label, li, td, th');
    
    // حساب المقياس الجديد
    if (change > 0 && currentScale < MAX_SCALE) {
        currentScale += STEP;
    } else if (change < 0 && currentScale > MIN_SCALE) {
        currentScale -= STEP;
    }
    
    
    // تطبيق المقياس الجديد
    textElements.forEach(element => {
        // تجاهل العناصر المستثناة
        if (element.closest('.icon-btn') || 
            element.closest('.logo') || 
            element.closest('.settings-toggle-btn') ||
            element.closest('.hamburger-menu') ||
            element.closest('.mobile-menu-overlay') ||
            element.closest('.zoom-group') ||
            element.tagName.toLowerCase() === 'img' ||
            element.tagName.toLowerCase() === 'svg') {
            return;
        }

        try {
            element.style.transform = `scale(${currentScale})`;
            element.style.transformOrigin = 'right top';
            element.style.display = 'inline-block';
        } catch (error) {

        }
    });
}

// تصدير الدالة للنافذة
window.changeFontSize = changeFontSize;

document.addEventListener('DOMContentLoaded', function() {
    // بدء تهيئة وظيفة تكبير النصوص
    
    // البحث عن أزرار التكبير والتصغير
    const zoomInButtons = document.querySelectorAll('.zoom-in, [id*="zoom-in"], [class*="zoom-in"]');
    const zoomOutButtons = document.querySelectorAll('.zoom-out, [id*="zoom-out"], [class*="zoom-out"]');
    
    // إعداد أزرار التكبير
    zoomInButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            // تكبير النص
        });
    });
    
    // إعداد أزرار التصغير
    zoomOutButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            // تصغير النص
        });
    });
    
    // اكتملت تهيئة وظيفة تكبير وتصغير النصوص
}); 