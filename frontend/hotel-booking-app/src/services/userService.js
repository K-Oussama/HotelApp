import api from './apiService';

// Function to get all users
export async function getAllUsers() {
    try {
        const response = await api.get('/users');
        return response.data._embedded.users;
    } catch (error) {
        console.error('Error getting users:', error);
        throw error;
    }
}

// Function to get a user by ID
export async function getUserById(userId) {
    try {
        const response = await api.get(`/users/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error getting user:', error);
        throw error;
    }
}

// Function to create a new user
export async function createUser(userDetails) {
    try {
        const response = await api.post('/users', userDetails);
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}

// Function to update a user
export async function updateUser(userId, updatedUserDetails) {
    try {
        const response = await api.put(`/api/users/${userId}`, updatedUserDetails);
        return response.data;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
}

// Function to delete a user
export async function deleteUser(userId) {
    try {
        const response = await api.delete(`/api/users/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
}
