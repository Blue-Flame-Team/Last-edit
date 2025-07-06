// كود بسيط لتكبير النص في الموقع
document.addEventListener('DOMContentLoaded', function() {
    
    // المتغيرات الأساسية
    let fontSize = 100;
    const step = 10;
    const maxSize = 150;
    const minSize = 90;
    
    // التحقق من وجود قيمة محفوظة
    if (localStorage.getItem('simple-font-size')) {
        fontSize = parseInt(localStorage.getItem('simple-font-size'));
        applyFontSize(fontSize);
    }
    
    // وظيفة تطبيق حجم الخط
    function applyFontSize(size) {
        fontSize = size;
        localStorage.setItem('simple-font-size', size);
        document.body.style.fontSize = size + '%';
    }
    
    // وظيفة زيادة حجم الخط
    function increaseFont() {
        if (fontSize < maxSize) {
            fontSize += step;
            applyFontSize(fontSize);
        }
    }
    
    // وظيفة تقليل حجم الخط
    function decreaseFont() {
        if (fontSize > minSize) {
            fontSize -= step;
            applyFontSize(fontSize);
        }
    }
    
    // الحصول على أزرار التكبير والتصغير
    const zoomInButtons = document.querySelectorAll('.zoom-in-btn');
    const zoomOutButtons = document.querySelectorAll('.zoom-out-btn');
    
    // إضافة مستمعات الأحداث لزر التكبير
    zoomInButtons.forEach(function(button) {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            increaseFont();
        });
    });
    
    // إضافة مستمعات الأحداث لزر التصغير
    zoomOutButtons.forEach(function(button) {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            decreaseFont();
        });
    });
});
