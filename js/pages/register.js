const RegisterPage = {
    selectedRole: 'member',
    
    render: function() {
        return `
            <div class="register-container">
                <h1 class="register-title">Daftar Akun</h1>
                
                <div class="role-selector">
                    <div class="role-option ${this.selectedRole === 'member' ? 'selected' : ''}" onclick="RegisterPage.selectRole('member')">
                        <i class="fas fa-user"></i> Member
                    </div>
                    <div class="role-option ${this.selectedRole === 'penulis' ? 'selected' : ''}" onclick="RegisterPage.selectRole('penulis')">
                        <i class="fas fa-pen"></i> Penulis
                    </div>
                </div>
                
                <form onsubmit="RegisterPage.handleRegister(event)">
                    <div class="form-group">
                        <label for="nama">Nama Lengkap</label>
                        <input type="text" id="nama" required placeholder="Masukkan nama lengkap">
                    </div>
                    
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" required placeholder="Masukkan email">
                    </div>
                    
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" required placeholder="Minimal 6 karakter">
                    </div>
                    
                    <div class="form-group">
                        <label for="confirm_password">Konfirmasi Password</label>
                        <input type="password" id="confirm_password" required placeholder="Ulangi password">
                    </div>
                    
                    <button type="submit" class="login-submit">Daftar</button>
                </form>
                
                <div class="auth-link">
                    Sudah punya akun? <a onclick="navigateTo('login')">Login disini</a>
                </div>
            </div>
        `;
    },
    
    selectRole: function(role) {
        this.selectedRole = role;
        navigateTo('register');
    },
    
    handleRegister: function(event) {
        event.preventDefault();
        
        const nama = document.getElementById('nama').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm_password').value;
        
        if (!nama || !email || !password) {
            alert('Semua field harus diisi!');
            return;
        }
        
        if (password.length < 6) {
            alert('Password minimal 6 karakter!');
            return;
        }
        
        if (password !== confirmPassword) {
            alert('Password tidak cocok!');
            return;
        }
        
        // Simulasi registrasi sukses
        const userData = {
            id: Date.now(),
            nama: nama,
            email: email,
            role: this.selectedRole,
            memberLevel: this.selectedRole === 'member' ? 'bronze' : null,
            avatar: 'images/avatar-default.jpg',
            xp: this.selectedRole === 'penulis' ? 0 : null
        };
        
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userData', JSON.stringify(userData));
        
        alert(`Registrasi sebagai ${this.selectedRole} berhasil! Selamat datang ${nama}`);
        
        if (this.selectedRole === 'member') {
            navigateTo('dashboard-member');
        } else {
            navigateTo('dashboard-penulis');
        }
    }
};