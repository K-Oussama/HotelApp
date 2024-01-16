import instance from './apiService';


// Function to login
export const login = async (username, password, navigate) => {
    const token = btoa(`${username}:${password}`);
  
    instance.get('/', {
      headers: {
        'Authorization': `Basic ${token}`,
      },
    })
    .then(response => {
      // Login successful, redirect to dashboard
      if(response.data._links.users.templated === true) {
        localStorage.setItem('authToken', token);
        navigate? navigate('/') : window.location.href = '/';
        } else {
            alert('Login failed. Please check your username and password.');
            throw new Error('Login failed');
        }
    })
    .catch(error => {
      // Login failed, show error
      console.error('Login failed:', error);
      alert('Login failed. Please check your username and password.');
    });
  }

// Function to create a user /api/users then to login in /login endpoint
export const register = async (name, email, username, password, role = 'CLIENT') => {
  logout();
    const response = await instance.post('/users', { name, email, username, password, role });
    if (response.status === 201) {
        console.warn('registration data'+response?.data);
        return login(username, password);
    } else {
        throw new Error('Registration failed');
    }
};

// logout function
export const logout = () => {
  instance.post('/logout')
    .then(() => {
      // Logout successful, remove local data and clear cookies
      localStorage.removeItem('authToken');
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/;domain=localhost");
      });
    })
    .catch(error => {
      // Logout failed, show error
      console.error('Logout failed:', error);
    });
};





