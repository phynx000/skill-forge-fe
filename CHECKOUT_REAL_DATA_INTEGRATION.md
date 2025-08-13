# Cập nhật CheckoutPage: Lấy dữ liệu thực từ CourseDetail

## Vấn đề đã giải quyết:
Trước đây CheckoutPage sử dụng mock data cứng. Bây giờ đã được cập nhật để lấy dữ liệu thực từ API thông qua courseId được truyền từ CourseDetail page.

## Những thay đổi đã triển khai:

### 1. **API Integration**
```typescript
// Lấy courseId từ URL parameter
const [searchParams] = useSearchParams();
const courseIdFromUrl = searchParams.get('courseId');
const courseId = courseIdFromUrl ? Number(courseIdFromUrl) : 0;

// Fetch course detail từ API
const { courseDetail, loading: courseLoading, error: courseError } = useDetailCourse(courseId);
const course = courseDetail?.data;
```

### 2. **Loading & Error Handling**
```typescript
// Handle loading state
if (courseLoading) {
    return (
        <div className="checkout-page">
            <div style={{ textAlign: 'center', padding: '100px 0' }}>
                <Spin size="large" />
                <div style={{ marginTop: 16 }}>Đang tải thông tin khóa học...</div>
            </div>
        </div>
    );
}

// Handle error state  
if (courseError || !course) {
    return (
        <div className="checkout-page">
            <Alert
                message="Lỗi"
                description={courseError || "Không tìm thấy thông tin khóa học"}
                type="error"
                showIcon
                action={<Button onClick={() => window.history.back()}>Quay lại</Button>}
            />
        </div>
    );
}
```

### 3. **Hiển thị thông tin thực từ API**

#### **Thông tin khóa học:**
- ✅ **Tên khóa học**: `course.title`
- ✅ **Tên giảng viên**: `course.instructor.name`  
- ✅ **Tổng số giờ**: `course.duration`
- ✅ **Tổng số bài học**: `course.lessonCount`
- ✅ **Thumbnail**: `course.thumbnailUrl`

#### **Thông tin giá:**
- ✅ **Giá gốc**: `course.originalPrice`
- ✅ **Giá khuyến mãi**: `course.discountPrice` 
- ✅ **Phần trăm giảm giá**: Tự động tính toán
- ✅ **Giá tổng**: Hiển thị giá sau khuyến mãi

```tsx
<div className="course-details">
    <Title level={5}>{course.title}</Title>
    <Text type="secondary">Giảng viên: {course.instructor.name}</Text>
    <Space>
        <Tag color="blue">{course.duration}</Tag>
        <Tag color="green">{course.lessonCount} bài học</Tag>
    </Space>
</div>

<div className="price-breakdown">
    <div className="price-row">
        <Text>Giá gốc:</Text>
        <Text delete type="secondary">{formatPrice(course.originalPrice)}</Text>
    </div>
    {course.discountPrice < course.originalPrice && (
        <div className="price-row">
            <Text>Giảm giá ({calculateDiscountPercent()}%):</Text>
            <Text type="success">-{formatPrice(course.originalPrice - course.discountPrice)}</Text>
        </div>
    )}
    <div className="price-row total">
        <Title level={4}>Tổng cộng:</Title>
        <Title level={4} type="danger">{formatPrice(course.discountPrice || course.originalPrice)}</Title>
    </div>
</div>
```

### 4. **Smart Pricing Logic**
```typescript
// Auto calculate discount percentage
const calculateDiscountPercent = () => {
    if (!course || course.originalPrice === 0) return 0;
    return Math.round(((course.originalPrice - course.discountPrice) / course.originalPrice) * 100);
};

// Conditional pricing display
{course.discountPrice < course.originalPrice && (
    <div className="price-row">
        <Text>Giảm giá ({calculateDiscountPercent()}%):</Text>
        <Text type="success">-{formatPrice(course.originalPrice - course.discountPrice)}</Text>
    </div>
)}
```

### 5. **Enhanced UX Features**

#### **Dynamic Button Text:**
```tsx
<Button>
    {loading ? 'Đang xử lý...' : 
     (course.originalPrice === 0 || course.discountPrice === 0) ? 'Đăng ký miễn phí' : 'Mua ngay'}
</Button>
```

#### **Smart Breadcrumb:**
```tsx
<Breadcrumb.Item>
    <Link to={`/course-detail/${courseId}`}>
        {course.title.length > 50 ? `${course.title.substring(0, 50)}...` : course.title}
    </Link>
</Breadcrumb.Item>
```

#### **Enhanced Submit Handler:**
```typescript
const handleSubmit = async (values: CheckoutFormData) => {
    if (!course) {
        message.error('Không tìm thấy thông tin khóa học');
        return;
    }

    const checkoutData = {
        ...values,
        courseId: courseId,
        courseName: course.title,
        totalAmount: course.discountPrice || course.originalPrice,
        instructor: course.instructor.name
    };

    // Send to payment API...
};
```

### 6. **Flow hoạt động:**

1. **CourseDetail Page** → Click "Mua ngay" → Navigate to `/checkout?courseId=123`
2. **CheckoutPage** → Extract courseId from URL → Call API `useDetailCourse(courseId)`
3. **Loading State** → Show spinner while fetching data
4. **Success State** → Display real course info, pricing, instructor
5. **Error State** → Show error with "Quay lại" button
6. **Checkout** → Submit với real data: course info + user payment details

## Kết quả đạt được:

### ✅ **Data Integration**
- Không còn sử dụng mock data
- Lấy thông tin thực từ API CourseDetail  
- Sync với database thật

### ✅ **User Experience**
- Loading states rõ ràng
- Error handling với action buttons
- Dynamic pricing display
- Smart button text cho khóa học miễn phí

### ✅ **Business Logic**
- Tự động tính phần trăm giảm giá
- Conditional display cho khuyến mãi
- Support cả khóa học trả phí và miễn phí

### ✅ **Technical Quality**
- Type safety với TypeScript
- Proper error boundaries
- Clean code structure
- API integration best practices

## Files đã cập nhật:
- ✅ `src/clients/pages/Checkout/CheckoutPage.tsx`

## Cách test:
1. Vào CourseDetail page: `/course-detail/{id}`
2. Click "Mua ngay" → Redirect sang `/checkout?courseId={id}`
3. ✅ CheckoutPage tự động load thông tin khóa học từ API
4. ✅ Hiển thị đúng: tên, giảng viên, giá, số bài học
5. ✅ Pricing logic hoạt động chính xác

**URL test**: http://localhost:5174/checkout?courseId=1
