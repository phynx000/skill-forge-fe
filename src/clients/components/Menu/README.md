# CategoryMenu Component

Component React TypeScript hiển thị danh mục khóa học sử dụng Ant Design.

## Tính năng

- ✅ Gọi API để lấy danh sách danh mục từ backend
- ✅ Hiển thị danh mục gốc dạng horizontal menu bar
- ✅ Hover để hiển thị sub-categories dạng dropdown
- ✅ Hỗ trợ nhiều cấp danh mục con (nested subcategories)
- ✅ Responsive design tương thích mobile
- ✅ TypeScript với interface rõ ràng
- ✅ Custom hook để quản lý state
- ✅ Fallback với mock data khi API lỗi
- ✅ Loading state và error handling

## Cấu trúc file

```
src/
├── components/
│   └── Menu/
│       ├── CategoryMenu.tsx       # Component chính
│       └── CategoryMenu.scss      # Styles
├── hooks/
│   └── useCategory.ts            # Custom hook
├── services/
│   └── categoryApi.ts            # API calls
├── types/
│   └── category.ts               # TypeScript interfaces
└── utils/
    └── mockData.ts               # Mock data cho testing
```

## Sử dụng

### 1. Import và sử dụng cơ bản

```tsx
import CategoryMenu from './components/Menu/CategoryMenu';

function App() {
  return (
    <div>
      <CategoryMenu />
    </div>
  );
}
```

### 2. Sử dụng với callback

```tsx
import CategoryMenu from './components/Menu/CategoryMenu';

function App() {
  const handleCategoryClick = (categoryId: string, categoryName: string) => {
    console.log('Selected category:', { categoryId, categoryName });
    // Navigate to course list with category filter
    navigate(`/courses?category=${categoryId}`);
  };

  return (
    <CategoryMenu onCategoryClick={handleCategoryClick} />
  );
}
```

### 3. Tích hợp vào layout

```tsx
// app.header.tsx
import CategoryMenu from "../components/Menu/CategoryMenu";

export default function AppHeader() {
  const navigate = useNavigate();
  
  const handleCategoryClick = (categoryId: string, categoryName: string) => {
    navigate(`/list-course?category=${categoryId}`);
  };

  return (
    <div className="app-header-container">
      {/* Main Header */}
      <div className="main-header">
        {/* ... header content ... */}
      </div>
      
      {/* Category Menu Bar */}
      <div className="lg:block hidden">
        <CategoryMenu onCategoryClick={handleCategoryClick} />
      </div>
    </div>
  );
}
```

## Props

| Prop | Type | Default | Mô tả |
|------|------|---------|-------|
| `onCategoryClick` | `(categoryId: string, categoryName: string) => void` | `undefined` | Callback khi click vào category |
| `useMockData` | `boolean` | `true` | Sử dụng mock data thay vì API thật |

## API Response Format

Component mong đợi API trả về data theo format:

```typescript
{
  statusCode: 200,
  error: null,
  message: "Call api Success",
  data: [
    {
      id: 902,
      name: "Development",
      description: "Courses about develop web, app, etc",
      subCategories: [
        {
          id: 906,
          name: "Web development", 
          description: "Courses about web",
          subCategories: []
        }
        // ... more subcategories
      ]
    }
    // ... more categories
  ]
}
```

## Cấu hình API

Cập nhật URL API trong file `src/services/categoryApi.ts`:

```typescript
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';
```

Thêm vào file `.env`:
```
VITE_API_URL=http://your-backend-url/api
```

## Custom Hook

### useCategory

Hook để quản lý state của categories:

```typescript
const { categories, loading, error, refetchCategories } = useCategory(useMockData);
```

**Returns:**
- `categories`: Mảng danh mục
- `loading`: Loading state
- `error`: Error message
- `refetchCategories`: Function để reload data

## Styling

Component sử dụng SCSS modules với các class chính:

- `.category-menu-container`: Container chính
- `.category-menu-wrapper`: Wrapper cho menu items
- `.category-menu-item-root`: Item danh mục gốc
- `.category-dropdown-overlay`: Dropdown overlay

### Customization

Có thể override styles bằng cách import và modify SCSS variables:

```scss
// Custom styles
.category-menu-container {
  background-color: your-color;
  
  .category-menu-item-root {
    &:hover {
      background-color: your-hover-color;
    }
  }
}
```

## Development

### Chạy với Mock Data

```tsx
<CategoryMenu useMockData={true} />
```

### Chuyển sang API thật

```tsx
<CategoryMenu useMockData={false} />
```

### Debug

Mở Developer Tools Console để xem logs khi click vào categories.

## Browser Support

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+

## Dependencies

- React 18+
- Ant Design 5+
- Axios
- TypeScript 4+
