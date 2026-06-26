// Main entry point
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Initializing app...');
    
    // Inisialisasi default values untuk LoginPage
    if (typeof LoginPage !== 'undefined') {
        LoginPage.selectedRole = 'member';
    }
    
    if (typeof RegisterPage !== 'undefined') {
        RegisterPage.selectedRole = 'member';
    }
    
    // Cek apakah user sudah login
    const checkAuth = function() {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        console.log('Auth check - isLoggedIn:', isLoggedIn);
        return true; // Sementara true dulu untuk testing
    };
    
    // Handle hash change
    window.addEventListener('hashchange', function() {
        console.log('Hash change event triggered');
        if (checkAuth()) {
            Router.handleHashChange();
        }
    });
    
    // Initial load
    console.log('Initial load - current hash:', window.location.hash);
    if (checkAuth()) {
        // Jika tidak ada hash, redirect ke home
        if (!window.location.hash || window.location.hash === '#') {
            console.log('No hash, navigating to home');
            Router.navigate('home');
        } else {
            console.log('Hash found, handling hash change');
            Router.handleHashChange();
        }
    }
});

// Untuk development: reset login (hapus di production)
window.logout = function() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    Router.navigate('home');
};