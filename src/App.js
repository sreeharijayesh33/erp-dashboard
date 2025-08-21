import React, { useState, useContext, createContext, useEffect } from 'react';
import { Users, UserPlus, Edit, Trash2, Eye, LogOut, Shield, User, Settings } from 'lucide-react';
import './App.css';

// Auth Context for state management
const AuthContext = createContext();

// Mock API functions
const mockAPI = {
  login: async (credentials) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const users = {
      'admin@erp.com': { id: 1, email: 'admin@erp.com', role: 'admin', name: 'John Admin' },
      'manager@erp.com': { id: 2, email: 'manager@erp.com', role: 'manager', name: 'Jane Manager' },
      'employee@erp.com': { id: 3, email: 'employee@erp.com', role: 'employee', name: 'Bob Employee' }
    };
    
    if (credentials.password === 'password123' && users[credentials.email]) {
      return { success: true, user: users[credentials.email] };
    }
    throw new Error('Invalid credentials');
  },
  
  getUsers: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [
      { id: 1, name: 'John Admin', email: 'admin@erp.com', role: 'admin', status: 'active' },
      { id: 2, name: 'Jane Manager', email: 'manager@erp.com', role: 'manager', status: 'active' },
      { id: 3, name: 'Bob Employee', email: 'employee@erp.com', role: 'employee', status: 'active' },
      { id: 4, name: 'Alice Smith', email: 'alice@erp.com', role: 'employee', status: 'inactive' },
      { id: 5, name: 'Mike Johnson', email: 'mike@erp.com', role: 'employee', status: 'active' }
    ];
  }
};

// Auth Provider Component
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const response = await mockAPI.login(credentials);
      setUser(response.user);
      return response;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use auth context
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

// Login Component
const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login, loading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      await login(credentials);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-icon">
            <Shield size={32} />
          </div>
          <h2>ERP Dashboard</h2>
          <p>Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              required
              placeholder="Enter your email"
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              required
              placeholder="Enter your password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            />
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="login-button"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="demo-accounts">
          <p>Demo accounts:</p>
          <div className="demo-list">
            <div className="demo-admin">Admin: admin@erp.com</div>
            <div className="demo-manager">Manager: manager@erp.com</div>
            <div className="demo-employee">Employee: employee@erp.com</div>
            <div className="demo-password">Password: password123</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Header Component
const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <div className="header-icon">
            <Shield size={24} />
          </div>
          <div className="header-title">
            <h1>ERP Dashboard</h1>
            <p>User Management System</p>
          </div>
        </div>

        <div className="header-right">
          <div className="user-info">
            <div className="user-name">{user.name}</div>
            <div className={`user-role role-${user.role}`}>
              {user.role}
            </div>
          </div>
          <button
            onClick={logout}
            className="logout-button"
            title="Logout"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

// User Management Component (Admin)
const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const userData = await mockAPI.getUsers();
      setUsers(userData);
    } catch (error) {
      console.error('Failed to load users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  const handleAddUser = (newUser) => {
    const user = {
      ...newUser,
      id: Math.max(...users.map(u => u.id)) + 1,
      status: 'active'
    };
    setUsers([...users, user]);
    setShowAddModal(false);
  };

  const handleEditUser = (updatedUser) => {
    setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
    setEditingUser(null);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div>Loading users...</div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h2 className="page-title">
          <Users size={32} />
          User Management
        </h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="add-button"
        >
          <UserPlus size={20} />
          <span>Add User</span>
        </button>
      </div>

      <div className="table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="user-name">{user.name}</td>
                <td className="user-email">{user.email}</td>
                <td>
                  <span className={`role-badge role-${user.role}`}>
                    {user.role}
                  </span>
                </td>
                <td>
                  <span className={`status-badge status-${user.status}`}>
                    {user.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button
                      onClick={() => setEditingUser(user)}
                      className="edit-button"
                      title="Edit"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="delete-button"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddModal && <UserModal onClose={() => setShowAddModal(false)} onSave={handleAddUser} />}
      {editingUser && <UserModal user={editingUser} onClose={() => setEditingUser(null)} onSave={handleEditUser} />}
    </div>
  );
};

// Employee List Component (Manager)
const EmployeeList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const userData = await mockAPI.getUsers();
      setUsers(userData.filter(user => user.role === 'employee'));
    } catch (error) {
      console.error('Failed to load users:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div>Loading employees...</div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h2 className="page-title">
        <Eye size={32} />
        Employee Directory
      </h2>

      <div className="table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="user-name">{user.name}</td>
                <td className="user-email">{user.email}</td>
                <td>
                  <span className={`status-badge status-${user.status}`}>
                    {user.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Profile Component (Employee)
const Profile = () => {
  const { user } = useAuth();
  
  return (
    <div className="page-container">
      <h2 className="page-title">
        <User size={32} />
        My Profile
      </h2>

      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            <User size={40} />
          </div>
          <div className="profile-info">
            <h3>{user.name}</h3>
            <p className={`role-${user.role}`}>{user.role}</p>
          </div>
        </div>

        <div className="profile-details">
          <div className="detail-item">
            <label>Email</label>
            <div>{user.email}</div>
          </div>
          
          <div className="detail-item">
            <label>Role</label>
            <div className="capitalize">{user.role}</div>
          </div>
          
          <div className="detail-item">
            <label>Status</label>
            <span className="status-badge status-active">
              Active
            </span>
          </div>
          
          <div className="detail-item">
            <label>User ID</label>
            <div>#{user.id}</div>
          </div>
        </div>

        <div className="profile-actions">
          <button className="edit-profile-button">
            <Settings size={20} />
            <span>Edit Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// User Modal Component
const UserModal = ({ user, onClose, onSave }) => {
  const [formData, setFormData] = useState(
    user || { name: '', email: '', role: 'employee', status: 'active' }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>{user ? 'Edit User' : 'Add New User'}</h3>
        </div>
        
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          
          <div className="form-group">
            <label>Role</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
              <option value="employee">Employee</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          
          <div className="modal-actions">
            <button
              type="button"
              onClick={onClose}
              className="cancel-button"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="save-button"
            >
              {user ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Main Dashboard Component
const Dashboard = () => {
  const { user } = useAuth();

  const renderContent = () => {
    switch (user.role) {
      case 'admin':
        return <UserManagement />;
      case 'manager':
        return <EmployeeList />;
      case 'employee':
        return <Profile />;
      default:
        return <div>Access denied</div>;
    }
  };

  return (
    <div className="dashboard">
      <Header />
      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  );
};

// Route Protection Component
const AuthRouter = () => {
  const { user } = useAuth();
  return user ? <Dashboard /> : <Login />;
};

// Main App Component
const App = () => {
  return (
    <AuthProvider>
      <AuthRouter />
    </AuthProvider>
  );
};

export default App;
