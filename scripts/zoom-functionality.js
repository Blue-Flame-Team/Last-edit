// زيادة أو تصغير حجم النص في الموقع
document.addEventListener('DOMContentLoaded', function() {
    
    // المتغيرات والثوابت
    let textSize = 100; // القيمة الابتدائية للنص (النسبة المئوية)
    const minSize = 90;  // الحد الأدنى لتصغير النص
    const maxSize = 150; // الحد الأقصى لتكبير النص
    const sizeStep = 10; // مقدار الزيادة/النقصان في كل مرة
    
    // استرجاع الحجم المحفوظ من التخزين المحلي
    if (localStorage.getItem('textSize')) {
        textSize = parseInt(localStorage.getItem('textSize'));
        applyTextSize(textSize);
    }
    
    // وظيفة تطبيق حجم النص مع تأثير بصري
    function applyTextSize(size) {
        textSize = size;
        
        // حفظ الإعداد في التخزين المحلي
        localStorage.setItem('textSize', size);
        
        // تطبيق الحجم الجديد على الصفحة
        document.documentElement.style.setProperty('--text-size', size + '%');
        document.body.style.fontSize = size + '%';
        
        // وضع سمة البيانات لتطبيق تنسيقات CSS إضافية
        document.body.setAttribute('data-font-size', size);
        
        // إضافة تأثير بصري للتنبيه بالتغيير
        addVisualFeedback();
        
        // تحديث حالة الأزرار
        updateZoomButtonsState();
    }
    
    // إضافة تأثير بصري عند تغيير حجم الخط
    function addVisualFeedback() {
        // إضافة فئة للإشارة إلى أن حجم الخط قد تغير
        document.body.classList.add('font-size-changed');
        
        // إزالة الفئة بعد انتهاء التأثير
        setTimeout(function() {
            document.body.classList.remove('font-size-changed');
        }, 300);
    }
    
    // تحديث حالة أزرار التكبير والتصغير
    function updateZoomButtonsState() {
        // جميع أزرار التكبير
        const zoomInBtns = document.querySelectorAll('.zoom-in-btn');
        zoomInBtns.forEach(btn => {
            if (textSize >= maxSize) {
                btn.classList.add('disabled');
            } else {
                btn.classList.remove('disabled');
            }
        });
        
        // جميع أزرار التصغير
        const zoomOutBtns = document.querySelectorAll('.zoom-out-btn');
        zoomOutBtns.forEach(btn => {
            if (textSize <= minSize) {
                btn.classList.add('disabled');
            } else {
                btn.classList.remove('disabled');
            }
        });
    }
    
    // إضافة مستمع أحداث لأزرار التكبير/التصغير
    function addZoomEventListeners() {
        // أزرار التكبير
        const zoomInBtns = document.querySelectorAll('.zoom-in-btn');
        zoomInBtns.forEach(btn => {
            // إزالة المستمعات السابقة إذا وجدت
            btn.removeEventListener('click', zoomInHandler);
            
            // إضافة مستمع جديد
            btn.addEventListener('click', zoomInHandler);
        });
        
        // أزرار التصغير
        const zoomOutBtns = document.querySelectorAll('.zoom-out-btn');
        zoomOutBtns.forEach(btn => {
            // إزالة المستمعات السابقة إذا وجدت
            btn.removeEventListener('click', zoomOutHandler);
            
            // إضافة مستمع جديد
            btn.addEventListener('click', zoomOutHandler);
        });
    }
    
    // معالج حدث التكبير
    function zoomInHandler(e) {
        e.preventDefault();
        if (textSize < maxSize) {
            applyTextSize(textSize + sizeStep);
        }
    }
    
    // معالج حدث التصغير
    function zoomOutHandler(e) {
        e.preventDefault();
        if (textSize > minSize) {
            applyTextSize(textSize - sizeStep);
        }
    }
    
    // تطبيق مستمعات الأحداث
    addZoomEventListeners();
    
    // تحديث حالة الأزرار عند بدء التشغيل
    updateZoomButtonsState();
});
