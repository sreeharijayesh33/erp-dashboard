# ERP User Management Dashboard

A modern, responsive ERP user management system built with React, featuring role-based access control and a sleek dark theme with orange accents.

## 🌟 Features

### 🔐 **Role-Based Authentication**
- **Admin**: Full user management (Create, Read, Update, Delete)
- **Manager**: View-only access to employee directory
- **Employee**: Personal profile view only

### 🎨 **Modern UI/UX**
- Dark theme with vibrant orange accent colors
- Fully responsive design for all devices
- Smooth animations and hover effects
- Professional, clean interface

### 🛡️ **Security & Access Control**
- Protected routes based on user roles
- Context-based state management
- Secure authentication flow

### ⚡ **Performance**
- React functional components with hooks
- Efficient state management
- Optimized rendering

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/sreeharijayesh33/erp-dashboard.git

# Navigate to project directory
cd erp-dashboard

# Install dependencies
npm install

# Start the development server
npm start
```

The application will open at `http://localhost:3000`

## 🔑 Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| **Admin** | admin@erp.com | password123 |
| **Manager** | manager@erp.com | password123 |
| **Employee** | employee@erp.com | password123 |

## 📱 Screenshots

### Login Page
- Clean, professional login interface
- Role-based demo account information
- Responsive design

### Admin Dashboard
- Complete user management table
- Add/Edit/Delete user functionality
- Role and status management
- Search and filter capabilities

### Manager Dashboard
- Employee directory (read-only)
- Employee status visibility
- Professional interface

### Employee Dashboard
- Personal profile view
- Account details display
- Edit profile functionality

## 🛠️ Tech Stack

- **Frontend**: React 18.x
- **Icons**: Lucide React
- **Styling**: Custom CSS with CSS Grid & Flexbox
- **State Management**: React Context API
- **Authentication**: Mock API (ready for backend integration)

## 🏗️ Project Structure

```
erp-dashboard/
├── public/
├── src/
│   ├── App.js          # Main application component
│   ├── App.css         # Styling and theme
│   ├── index.js        # Application entry point
│   └── index.css       # Global styles
├── package.json
└── README.md
```

## 🔧 Key Components

### Authentication System
- `AuthContext` - Global authentication state
- `AuthProvider` - Authentication context provider
- `Login` - Login interface component

### Dashboard Components
- `Header` - Navigation and user info
- `UserManagement` - Admin user CRUD operations
- `EmployeeList` - Manager employee directory
- `Profile` - Employee profile view
- `UserModal` - Add/Edit user modal

### Route Protection
- `AuthRouter` - Route protection based on authentication
- Role-based content rendering

## 🌐 API Integration

The application includes a mock API structure ready for backend integration:

```javascript
const mockAPI = {
  login: async (credentials) => { /* ... */ },
  getUsers: async () => { /* ... */ },
  // Ready for expansion with real API endpoints
};
```

## 🎯 Features by Role

### 👑 Admin Features
- ✅ View all users in a comprehensive table
- ✅ Add new users with role assignment
- ✅ Edit existing user details
- ✅ Delete users with confirmation
- ✅ Manage user roles and status

### 👨‍💼 Manager Features
- ✅ View employee directory
- ✅ Access employee contact information
- ✅ Monitor employee status
- ✅ Professional read-only interface

### 👤 Employee Features
- ✅ View personal profile
- ✅ Access account details
- ✅ Edit profile information
- ✅ Clean, focused interface

## 🚀 Deployment

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Upload build folder to Netlify
```

### Deploy to GitHub Pages
```bash
npm install --save-dev gh-pages
npm run build
npm run deploy
```

## 🔮 Future Enhancements

- [ ] Real backend API integration
- [ ] Advanced search and filtering
- [ ] Data export functionality
- [ ] Email notifications
- [ ] Activity logging
- [ ] Advanced user permissions
- [ ] Dashboard analytics
- [ ] Multi-language support


## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Sreehari Jayesh**
- GitHub: [@sreeharijayesh33](https://github.com/sreeharijayesh33)

## 🙏 Acknowledgments

- React team for the amazing framework
- Lucide React for beautiful icons
- Modern web design inspiration

---

⭐ **Star this repository if you found it helpful!**