import api from './apiService';

// Function to get all rooms
export async function getAllRooms() {
    try {
        const response = await api.get('/rooms');
        return response.data._embedded.rooms;
    } catch (error) {
        console.error('Error getting rooms:', error);
        throw error;
    }
}

// Function to get a room by ID
export async function getRoomById(roomId) {
    try {
        const response = await api.get(`/rooms/${roomId}`);
        return response.data;
    } catch (error) {
        console.error('Error getting room:', error);
        throw error;
    }
}

// Function to create a new room
export async function createRoom(roomDetails) {
    try {
        const response = await api.post('/rooms', roomDetails);
        return response.data;
    } catch (error) {
        console.error('Error creating room:', error);
        throw error;
    }
}

// Function to update a room
export async function updateRoom(roomId, updatedRoomDetails) {
    try {
        const response = await api.put(`/rooms/${roomId}`, updatedRoomDetails);
        return response.data;
    } catch (error) {
        console.error('Error updating room:', error);
        throw error;
    }
}

// Function to delete a room
export async function deleteRoom(roomId) {
    try {
        const response = await api.delete(`/rooms/${roomId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting room:', error);
        throw error;
    }
}
