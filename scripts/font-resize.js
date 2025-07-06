// وظيفة تكبير وتصغير النص في الموقع
document.addEventListener('DOMContentLoaded', function() {
    // المتغير العام لحجم النص
    let currentTextSize = 100;
    
    // استرجاع الحجم المحفوظ (إن وجد)
    const savedSize = localStorage.getItem('textSizeValue');
    if (savedSize) {
        currentTextSize = parseInt(savedSize);
        applyFontSize(currentTextSize);
    }
    
    // تطبيق تغيير حجم الخط على جميع عناصر النص
    function applyFontSize(sizePercent) {
        // تحديد العناصر التي ستتأثر بتغيير الحجم
        const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, a, li, td, th, button, input, textarea, label, div, .section-title, .card-title, .footer-title');
        
        // حساب نسبة التغيير (100% هو الحجم الطبيعي)
        const sizeRatio = sizePercent / 100;
        
        // تطبيق الحجم على كل عنصر
        textElements.forEach(function(element) {
            // تجاهل بعض العناصر الخاصة (مثل الأيقونات)
            if (element.classList.contains('fas') || element.classList.contains('fab') || element.classList.contains('fa')) {
                return;
            }
            
            // الحصول على حجم الخط الأصلي إذا لم يتم تخزينه بعد
            if (!element.dataset.originalFontSize) {
                const computedStyle = window.getComputedStyle(element);
                const originalSize = parseFloat(computedStyle.fontSize);
                element.dataset.originalFontSize = originalSize;
            }
            
            // تطبيق الحجم الجديد
            const originalSize = parseFloat(element.dataset.originalFontSize);
            const newSize = originalSize * sizeRatio;
            element.style.fontSize = newSize + 'px';
        });
    }
    
    // وظيفة تغيير حجم النص (تُستدعى من الأزرار)
    window.changeFontSize = function(change) {
        // حساب الحجم الجديد
        const newSize = currentTextSize + change;
        
        // التأكد من عدم تجاوز الحدود (70% إلى 150%)
        if (newSize >= 70 && newSize <= 150) {
            currentTextSize = newSize;
            
            // تطبيق الحجم الجديد
            applyFontSize(currentTextSize);
            
            // حفظ الإعداد
            localStorage.setItem('textSizeValue', currentTextSize);
            
        }
    };
});

// تحديد العناصر
const fontSizeButtons = document.querySelectorAll('.font-size-btn');
const defaultFontSize = 16; // الحجم الافتراضي للخط
let currentFontSize = defaultFontSize;

// دالة تغيير حجم الخط
function changeFontSize(direction) {
    // تحديد العناصر التي نريد تغيير حجم خطها
    const elements = document.querySelectorAll('p, span, a, h1, h2, h3, h4, h5, h6, li, td, th, div:not(.exclude-font-resize)');
    
    // تحديد مقدار التغيير
    const step = direction === 'increase' ? 1 : -1;
    
    // التحقق من حدود الحجم
    if ((direction === 'increase' && currentFontSize < 24) || 
        (direction === 'decrease' && currentFontSize > 12)) {
        
        currentFontSize += step;
        
        // تطبيق الحجم الجديد
        elements.forEach(element => {
            // حفظ الحجم الأصلي إذا لم يكن محفوظاً
            if (!element.dataset.originalFontSize) {
                const originalSize = window.getComputedStyle(element).fontSize;
                element.dataset.originalFontSize = parseFloat(originalSize);
            }
            
            // تطبيق الحجم الجديد
            const originalSize = parseFloat(element.dataset.originalFontSize);
            const newSize = originalSize * (currentFontSize / defaultFontSize);
            element.style.fontSize = `${newSize}px`;
        });
        
        // حفظ الحجم الحالي في localStorage
        localStorage.setItem('currentFontSize', currentFontSize);
    }
}

// دالة إعادة تعيين حجم الخط
function resetFontSize() {
    const elements = document.querySelectorAll('p, span, a, h1, h2, h3, h4, h5, h6, li, td, th, div:not(.exclude-font-resize)');
    
    elements.forEach(element => {
        if (element.dataset.originalFontSize) {
            element.style.fontSize = `${element.dataset.originalFontSize}px`;
        } else {
            element.style.fontSize = '';
        }
    });
    
    currentFontSize = defaultFontSize;
    localStorage.setItem('currentFontSize', currentFontSize);
}

// استعادة حجم الخط المحفوظ عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    const savedFontSize = localStorage.getItem('currentFontSize');
    if (savedFontSize) {
        currentFontSize = parseInt(savedFontSize);
        if (currentFontSize !== defaultFontSize) {
            // تطبيق الحجم المحفوظ
            const direction = currentFontSize > defaultFontSize ? 'increase' : 'decrease';
            const steps = Math.abs(currentFontSize - defaultFontSize);
            for (let i = 0; i < steps; i++) {
                changeFontSize(direction);
            }
        }
    }
    
    // إضافة مستمعي الأحداث لأزرار تغيير الحجم
    const increaseBtn = document.querySelector('.increase-font-size');
    const decreaseBtn = document.querySelector('.decrease-font-size');
    const resetBtn = document.querySelector('.reset-font-size');
    
    if (increaseBtn) {
        increaseBtn.addEventListener('click', () => changeFontSize('increase'));
    }
    if (decreaseBtn) {
        decreaseBtn.addEventListener('click', () => changeFontSize('decrease'));
    }
    if (resetBtn) {
        resetBtn.addEventListener('click', resetFontSize);
    }
});
