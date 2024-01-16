import React, { useState, useEffect } from 'react';
import { getAllUsers, updateUser, deleteUser } from '../../services/userService';

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [editedUser, setEditedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleEdit = (user) => {
    console.log('handleEdit user:', user);
    const id = user._links.self.href.split('/').pop();
    user.id = id;
    setEditMode(user.id);
    setEditedUser(user);
  };

  const handleUpdate = async () => {
    try {
      if (editedUser && editedUser.id) {
      await updateUser(editedUser.id, editedUser);
      setEditMode(null);
      setEditedUser(null);
      fetchUsers();
      } else {
        console.error('Error: editedUser or editedUser.id is undefined');
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div>
      <h1>Users</h1>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id}>
              {editMode === user.id ? (
                <>
                  {/* Edit mode */}
                  <td>
                    <input
                      type="text"
                      value={editedUser.name}
                      onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editedUser.username}
                      onChange={(e) => setEditedUser({ ...editedUser, username: e.target.value })}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editedUser.email}
                      onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editedUser.role}
                      onChange={(e) => setEditedUser({ ...editedUser, role: e.target.value })}
                    />
                  </td>

                  <button onClick={handleUpdate}>Save</button>
                  <button onClick={() => { setEditMode(null); setEditedUser(null); }}>Cancel</button>
                </>
              ) : (
                <>
                  {/* View mode */}
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>

                  <button onClick={() => handleEdit(user)}>Edit</button>
                  <button onClick={() => handleDelete(user.id)}>Delete</button>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserPage;