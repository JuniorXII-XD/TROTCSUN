/* ═══════════════════════════════════════════════════════════
   AUTH PAGES — Interactive Features
   ═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    initPasswordToggle();
    initPasswordStrength();
    initFormValidation();
});

/* ─── Toggle Password Visibility ─── */
function initPasswordToggle() {
    document.querySelectorAll('.form-toggle-password').forEach(btn => {
        btn.addEventListener('click', () => {
            const wrapper = btn.closest('.form-input-wrapper');
            const input = wrapper.querySelector('.form-input');
            const isPassword = input.type === 'password';
            input.type = isPassword ? 'text' : 'password';

            // Update icon
            btn.innerHTML = isPassword
                ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                     <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                     <line x1="1" y1="1" x2="23" y2="23"/>
                   </svg>`
                : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                     <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                     <circle cx="12" cy="12" r="3"/>
                   </svg>`;
        });
    });
}

/* ─── Password Strength Meter ─── */
function initPasswordStrength() {
    const passwordInput = document.getElementById('regPassword');
    const strengthFill = document.getElementById('strengthFill');
    const strengthText = document.getElementById('strengthText');

    if (!passwordInput || !strengthFill || !strengthText) return;

    passwordInput.addEventListener('input', () => {
        const password = passwordInput.value;
        const strength = calculateStrength(password);

        strengthFill.style.width = strength.percent + '%';
        strengthFill.style.background = strength.color;
        strengthText.textContent = strength.label;
        strengthText.style.color = strength.color;
    });
}

function calculateStrength(password) {
    if (!password) return { percent: 0, color: '', label: '' };

    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 10) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    const levels = [
        { percent: 20, color: '#ef4444', label: 'Weak' },
        { percent: 40, color: '#f97316', label: 'Fair' },
        { percent: 60, color: '#eab308', label: 'Good' },
        { percent: 80, color: '#22c55e', label: 'Strong' },
        { percent: 100, color: '#16a34a', label: 'Excellent' }
    ];

    return levels[Math.min(score, levels.length) - 1] || levels[0];
}

/* ─── Form Validation ─── */
function initFormValidation() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = loginForm.querySelector('.auth-btn');
            simulateSubmit(btn, 'Signing in...', 'Sign In');
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const password = document.getElementById('regPassword').value;
            const confirm = document.getElementById('confirmPassword').value;

            if (password !== confirm) {
                const confirmWrapper = document.getElementById('confirmPassword').closest('.form-input-wrapper');
                confirmWrapper.style.borderColor = '#ef4444';
                confirmWrapper.querySelector('.form-input').style.borderColor = '#ef4444';
                setTimeout(() => {
                    confirmWrapper.querySelector('.form-input').style.borderColor = '';
                }, 2000);
                return;
            }

            const btn = registerForm.querySelector('.auth-btn');
            simulateSubmit(btn, 'Creating account...', 'Create Account');
        });
    }
}

function simulateSubmit(btn, loadingText, originalText) {
    btn.disabled = true;
    btn.innerHTML = `
        <svg class="auth-spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
        </svg>
        <span>${loadingText}</span>`;
    btn.style.opacity = '0.7';

    setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = `
            <span>${originalText}</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>`;
        btn.style.opacity = '1';

        // Show demo alert
        alert('This is a UI prototype. Backend authentication is not yet implemented.');
    }, 1500);
}

// Add spinner animation
const spinnerStyle = document.createElement('style');
spinnerStyle.textContent = `
    .auth-spinner {
        animation: authSpin 1s linear infinite;
    }
    @keyframes authSpin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(spinnerStyle);
