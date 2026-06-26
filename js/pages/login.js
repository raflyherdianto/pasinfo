const LoginPage = {
    selectedRole: 'member',
    
    render: function() {
        console.log('LoginPage.render() called, selectedRole:', this.selectedRole);
        
        return `
            <div class="login-container">
                <h1 class="login-title">Login</h1>
                <p class="login-subtitle">Pilih peran Anda untuk melanjutkan</p>
                
                <div class="role-selection">
                    <div class="role-card ${this.selectedRole === 'member' ? 'selected' : ''}" onclick="LoginPage.selectRole('member')">
                        <i class="fas fa-user"></i>
                        <h3>Member</h3>
                        <p>Akses baca dan komentar</p>
                    </div>
                    <div class="role-card ${this.selectedRole === 'penulis' ? 'selected' : ''}" onclick="LoginPage.selectRole('penulis')">
                        <i class="fas fa-pen"></i>
                        <h3>Penulis/Editor</h3>
                        <p>Menulis dan mengelola berita</p>
                    </div>
                </div>
                
                <form onsubmit="LoginPage.handleLogin(event)">
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" required placeholder="Masukkan email Anda">
                    </div>
                    
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" required placeholder="Masukkan password">
                    </div>
                    
                    <button type="submit" class="login-submit">Login</button>
                </form>
                
                <div class="auth-link">
                    Belum punya akun? <a onclick="navigateTo('register')">Daftar disini</a>
                </div>
            </div>
        `;
    },
    
    selectRole: function(role) {
        this.selectedRole = role;
        navigateTo('login');
    },
    
    handleLogin: function(event) {
        event.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        if (!email || !password) {
            alert('Email dan password harus diisi!');
            return;
        }
        
        // Simulasi user data berdasarkan role
        const userData = {
            id: 1,
            nama: email.split('@')[0],
            email: email,
            role: this.selectedRole,
            memberLevel: this.selectedRole === 'member' ? 'bronze' : null,
            avatar: 'images/avatar-default.jpg',
            xp: this.selectedRole === 'penulis' ? 1250 : null
        };
        
        // Simpan ke localStorage
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userData', JSON.stringify(userData));
        
        alert(`Login sebagai ${this.selectedRole} berhasil!`);
        
        // Redirect berdasarkan role
        if (this.selectedRole === 'member') {
            navigateTo('dashboard-member');
        } else {
            navigateTo('dashboard-penulis');
        }
    }
};