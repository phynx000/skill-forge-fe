# SkillForge UI - Frontend Application

> 🎓 Modern e-learning platform built with React + TypeScript + Vite

## 🚀 **Quick Start**

### **Prerequisites**
- Node.js 18+ 
- npm or yarn
- Git

### **Installation**

1. **Clone the repository:**
```bash
git clone https://github.com/phynx000/skill-forge-fe.git
cd skill-forge-fe/skillforge-ui
```

2. **Install dependencies:**
```bash
npm install
# or
yarn install
```

3. **Setup environment variables:**
```bash
cp .env.example .env
```
Edit `.env` file with your configuration:
```env
VITE_BASE_URL_SERVER=http://localhost:8080
VITE_APP_NAME=SkillForge
```

4. **Start development server:**
```bash
npm run dev
# or
yarn dev
```

5. **Open browser:**
Navigate to `http://localhost:5173`

## 📁 **Project Structure**

```
src/
├── admin/              # Admin panel components
├── clients/            # Client-facing components
│   ├── components/     # Reusable UI components
│   ├── layouts/        # Page layouts
│   ├── pages/          # Page components
│   └── routers/        # Route configurations
├── components/         # Shared components
├── config/             # App configurations
├── hooks/              # Custom React hooks
├── services/           # API services
├── styles/             # Global styles
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## 🛠 **Tech Stack**

- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **UI Library:** Ant Design
- **Styling:** SCSS + CSS Modules
- **HTTP Client:** Axios
- **Routing:** React Router v6
- **State Management:** React Hooks + Context
- **Code Quality:** ESLint + Prettier

## 📦 **Available Scripts**

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
npm run type-check   # Run TypeScript check
```

## 🔧 **Environment Variables**

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_BASE_URL_SERVER` | Backend API URL | `http://localhost:8080` |
| `VITE_APP_NAME` | Application name | `SkillForge` |
| `VITE_DEV_MODE` | Development mode | `true` |

## 🎨 **Features**

### **Student Features:**
- ✅ Course browsing and filtering
- ✅ Course enrollment and payment
- ✅ Video player with HLS support
- ✅ Progress tracking
- ✅ User profiles

### **Instructor Features:**
- ✅ Course creation and management
- ✅ Content upload
- ✅ Student analytics

### **Admin Features:**
- ✅ User management
- ✅ Course approval
- ✅ System analytics

## 🌐 **API Integration**

### **Base Configuration:**
```typescript
const BASE_URL = import.meta.env.VITE_BASE_URL_SERVER;
```

### **Key Endpoints:**
- `GET /api/v1/courses` - Get courses
- `POST /api/v1/enrollments` - Enroll in course
- `GET /api/v1/play-course/:id` - Get course content

## 🎯 **Development Guidelines**

### **Component Structure:**
```typescript
// Component template
interface ComponentProps {
    // Define props
}

const Component: React.FC<ComponentProps> = ({ prop1, prop2 }) => {
    // Hooks
    // State
    // Effects
    // Handlers
    
    return (
        <div className="component">
            {/* JSX */}
        </div>
    );
};

export default Component;
```

### **Custom Hooks:**
```typescript
// Hook template
const useCustomHook = () => {
    const [state, setState] = useState();
    
    // Logic
    
    return { state, actions };
};
```

## 🚀 **Deployment**

### **Production Build:**
```bash
npm run build
```

### **Deploy to Vercel:**
```bash
npm install -g vercel
vercel --prod
```

### **Deploy to Netlify:**
```bash
npm run build
# Upload dist/ folder to Netlify
```

## 🤝 **Contributing**

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 **License**

This project is licensed under the MIT License.

## 🆘 **Support**

- 📧 Email: support@skillforge.com
- 💬 Discord: [SkillForge Community](https://discord.gg/skillforge)
- 📚 Docs: [Documentation](https://docs.skillforge.com)

---

Made with ❤️ by the SkillForge Team
    ...reactDom.configs.recommended.rules,
  },
})
```
