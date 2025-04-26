// Import the auth module
import auth from './authentication.js';

// DOM Elements
const signUpForm = document.getElementById('signUpForm');
const signInForm = document.getElementById('signInForm');
const resetPasswordForm = document.getElementById('resetPasswordForm');
const logoutButton = document.getElementById('logoutButton');

// Event Listeners
if (signUpForm) {
    signUpForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = signUpForm.querySelector('[name="email"]').value;
        const password = signUpForm.querySelector('[name="password"]').value;
        const fullName = signUpForm.querySelector('[name="fullName"]').value;

        const { data, error } = await auth.signUp(email, password, fullName);
        if (error) {
            console.error('Sign up error:', error.message);
            // Handle error (show error message to user)
        } else {
            // Redirect to email confirmation page
            window.location.href = 'email-confirmation.html';
        }
    });
}

if (signInForm) {
    signInForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = signInForm.querySelector('[name="email"]').value;
        const password = signInForm.querySelector('[name="password"]').value;

        const { data, error } = await auth.signIn(email, password);
        if (error) {
            console.error('Sign in error:', error.message);
            // Handle error (show error message to user)
        } else {
            // Redirect to dashboard
            window.location.href = 'dashboard.html';
        }
    });
}

if (resetPasswordForm) {
    resetPasswordForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = resetPasswordForm.querySelector('[name="email"]').value;

        const { data, error } = await auth.resetPassword(email);
        if (error) {
            console.error('Reset password error:', error.message);
            // Handle error (show error message to user)
        } else {
            // Show success message
            alert('Password reset link sent to your email');
        }
    });
}

if (logoutButton) {
    logoutButton.addEventListener('click', async () => {
        const { error } = await auth.signOut();
        if (error) {
            console.error('Sign out error:', error.message);
        } else {
            window.location.href = 'index.html';
        }
    });
}

// Check authentication status on protected pages
const protectedPages = ['dashboard.html'];
if (protectedPages.includes(window.location.pathname.split('/').pop())) {
    const { isAuthenticated, error } = await auth.isAuthenticated();
    if (!isAuthenticated) {
        window.location.href = 'signin.html';
    }
} 