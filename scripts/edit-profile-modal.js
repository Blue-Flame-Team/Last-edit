// وظائف نافذة تعديل الملف الشخصي

// تعريف المتغيرات في النطاق العام
// let editProfileModal;
// let closeEditProfileModal;
// let editProfileForm;
// let changePasswordBtn;
// let saveEditProfile;

// دالة إعداد زر تغيير كلمة المرور
function setupPasswordButton() {
    const btn = document.getElementById('changePasswordBtn');
    if (btn) {
        btn.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            
            // إخفاء نافذة تعديل البيانات
            if (editProfileModal) {
                editProfileModal.style.display = 'none';
            }
            
            // عرض نافذة تغيير كلمة المرور
            if (typeof window.showPasswordChangeModal === 'function') {
                window.showPasswordChangeModal();
            } else {

                // محاولة تحميل الملف
                const script = document.createElement('script');
                script.src = window.location.pathname.includes('/pages/') ? '../scripts/profile-icons-universal-fix.js' : 'scripts/profile-icons-universal-fix.js';
                script.onload = function() {
                    if (typeof window.showPasswordChangeModal === 'function') {
                        window.showPasswordChangeModal();
                    }
                };
                document.head.appendChild(script);
            }
        };
    } else {
    }
}

// تعريف الدالة في النطاق العام
window.showEditProfileModal = function() {
    
    // إذا لم تكن النافذة موجودة، نحاول تحميلها من الملف
    if (!editProfileModal) {
        const modalPath = window.location.pathname.includes('/pages/') ? '../includes/user-dashboard-modal.html' : 'includes/user-dashboard-modal.html';
        fetch(modalPath)
            .then(response => {
                return response.text();
            })
            .then(html => {
                // إضافة النافذة للصفحة
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = html;
                const newModal = tempDiv.querySelector('#edit-profile-modal');
                if (newModal) {
                    document.body.appendChild(newModal);
                    editProfileModal = newModal;
                    
                    // تحديث المراجع
                    updateReferences();
                    
                    // إعادة ربط الأحداث
                    bindEvents();
                    
                    // فتح النافذة
                    showModal();
                } else {

                }
            })
            .catch(error => {

                alert('حدث خطأ في تحميل نافذة تعديل البيانات');
            });
    } else {
        showModal();
    }
};

// دالة لإظهار النافذة
function showModal() {
    if (editProfileModal) {
        editProfileModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        loadUserData();
    }
}

// دالة لإغلاق النافذة
function closeModal() {
    if (editProfileModal) {
        editProfileModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// دالة لربط الأحداث
function bindEvents() {
    
    // إضافة مستمع حدث للزر إغلاق
    if (closeEditProfileModal) {
        closeEditProfileModal.addEventListener('click', closeModal);
    }

    // إغلاق النافذة عند النقر خارجها
    if (editProfileModal) {
        editProfileModal.addEventListener('click', function(e) {
            if (e.target === editProfileModal) {
                closeModal();
            }
        });
    }

    // معالجة حدث النقر على زر تغيير كلمة المرور
    setupPasswordButton();

    // معالجة حدث النقر على زر حفظ التغييرات
    if (saveEditProfile) {
        saveEditProfile.addEventListener('click', function(e) {
            e.preventDefault();
            
            // جمع البيانات من النموذج
            const formData = {
                userType: document.getElementById('userType').value,
                email: document.getElementById('editEmail').value,
                city: document.getElementById('city').value,
                address: document.getElementById('detailedAddress').value,
                phone: document.getElementById('editPhone').value,
                mobile: document.getElementById('mobilePhone').value,
                fax: document.getElementById('fax').value,
                poBox: document.getElementById('poBox').value,
                postalCode: document.getElementById('postalCode').value
            };

            // التحقق من صحة البيانات
            if (!formData.email) {
                alert('يرجى إدخال البريد الإلكتروني');
                return;
            }

            // تحديث بيانات المستخدم في localStorage
            try {
                const currentUserData = JSON.parse(localStorage.getItem('currentUser') || '{}');
                const updatedUserData = { ...currentUserData, ...formData };
                localStorage.setItem('currentUser', JSON.stringify(updatedUserData));
                
                // إغلاق النافذة وإظهار رسالة نجاح
                closeModal();
                alert('تم تحديث البيانات بنجاح');
            } catch (error) {

                alert('حدث خطأ أثناء حفظ البيانات');
            }
        });
    }
    
}

// تحميل بيانات المستخدم
function loadUserData() {
    
    // محاولة استرجاع بيانات المستخدم من localStorage
    const userData = localStorage.getItem('currentUser');
    if (userData) {
        try {
            const user = JSON.parse(userData);
            
            // ملء النموذج بالبيانات
            document.getElementById('userType').value = user.userType || '';
            document.getElementById('editEmail').value = user.email || '';
            document.getElementById('city').value = user.city || '';
            document.getElementById('detailedAddress').value = user.address || '';
            document.getElementById('editPhone').value = user.phone || '';
            document.getElementById('mobilePhone').value = user.mobile || '';
            document.getElementById('fax').value = user.fax || '';
            document.getElementById('poBox').value = user.poBox || '';
            document.getElementById('postalCode').value = user.postalCode || '';
            
        } catch (error) {

        }
    } else {
    }
}

// تحميل الأحداث عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // تحديث المراجع
    updateReferences();
    
    // إعداد زر تغيير كلمة المرور
    setupPasswordButton();
    
    // محاولة ثانية بعد تأخير قصير
    setTimeout(setupPasswordButton, 1000);
});

// تحديث المراجع
function updateReferences() {
    try {
        editProfileModal = document.getElementById('edit-profile-modal');
        closeEditProfileModal = document.getElementById('closeEditProfileModal');
        editProfileForm = document.getElementById('editProfileForm');
        changePasswordBtn = document.getElementById('changePasswordBtn');
        saveEditProfile = document.getElementById('saveEditProfile');

        // التحقق من وجود العناصر
        const references = {
            modal: !!editProfileModal,
            closeBtn: !!closeEditProfileModal,
            form: !!editProfileForm,
            changePasswordBtn: !!changePasswordBtn,
            saveBtn: !!saveEditProfile
        };

        
        return references;
    } catch (error) {

        return {};
    }
} 