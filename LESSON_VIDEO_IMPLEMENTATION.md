# Triển khai chức năng Video Player với HLS cho CourseDetail và Player

## Những gì đã được triển khai:

### 1. API Service mới (`lessonApi.ts`)
- **Endpoint**: `/api/v1/play-course/lesson/{id}`
- **Chức năng**: Lấy thông tin chi tiết của lesson bao gồm videoUrl HLS
- **Response format**: 
```json
{
  "statusCode": 200,
  "error": null,
  "message": "Call api Success",
  "data": {
    "id": 253,
    "title": "Bài 2: Hello World",
    "sectionId": 52,
    "orderIndex": 2,
    "videoUrl": "https://vz-126a59be-720.b-cdn.net/...",
    "completed": false
  }
}
```

### 2. Types mới (`lesson.ts`)
- **LessonDetail**: Interface cho data lesson
- **LessonApiResponse**: Interface cho API response

### 3. Hook mới (`useLessonDetail.ts`)
- **useLessonDetail**: Hook để fetch lesson detail theo ID
- **State management**: loading, error, data
- **Auto fetch**: Tự động fetch khi lessonId thay đổi

### 4. Cập nhật CoursePlayerPage
- **Integration**: Sử dụng useLessonDetail hook
- **Dynamic loading**: Load video khi click vào lesson
- **Auto play**: Video tự động phát khi lesson được chọn
- **Loading states**: Hiển thị loading cho cả course và lesson
- **Error handling**: Xử lý lỗi cho cả course và lesson
- **Video key**: Force re-mount VideoPlayer khi lesson thay đổi

### 5. Cập nhật CourseDetail Page
- **Preview functionality**: Click vào lesson để preview video
- **Modal display**: Video hiển thị trong Modal
- **Interactive UI**: 
  - Hover effects trên lesson items
  - Play icon và "Xem trước" text
  - Responsive modal (80% width)
- **Loading states**: Loading spinner khi fetch lesson detail
- **Auto play**: Video preview tự động phát

### 6. UI/UX Improvements
- **Hover effects**: Lesson items có hover state
- **Play icons**: Visual indicators cho video lessons
- **Responsive design**: Modal responsive trên các màn hình
- **Auto destroy**: Modal destroy content khi đóng để save memory

## Cách hoạt động:

### CourseDetail Page:
1. User xem danh sách lessons trong course
2. Click vào lesson item → Gọi API `/play-course/lesson/{id}`
3. Mở Modal với VideoPlayer và HLS video
4. Video tự động phát (autoPlay=true)

### CoursePlayer Page:  
1. User vào trang học → Load course sections/lessons
2. Click vào lesson trong sidebar → Gọi API `/play-course/lesson/{id}`
3. VideoPlayer component reload với video URL mới
4. Video tự động phát với HLS stream

## Features chính:
- ✅ **HLS Support**: Hỗ trợ streaming video HLS
- ✅ **Auto Play**: Tự động phát khi click lesson
- ✅ **Responsive**: UI responsive trên mobile/desktop
- ✅ **Loading States**: Loading indicators rõ ràng
- ✅ **Error Handling**: Xử lý lỗi network/API
- ✅ **Memory Efficient**: Destroy components khi không cần
- ✅ **SEO Friendly**: Proper component structure

## Các file đã được chỉnh sửa:
1. `src/types/lesson.ts` - Mới
2. `src/services/lessonApi.ts` - Cập nhật
3. `src/hooks/useLessonDetail.ts` - Mới  
4. `src/clients/pages/Player/CoursePlayerPage.tsx` - Cập nhật
5. `src/clients/pages/CrudCourse/CourseDetail.tsx` - Cập nhật
6. `src/clients/pages/CrudCourse/CourseDetail.scss` - Cập nhật

## Chạy ứng dụng:
```bash
npm run dev
```
Server: http://localhost:5174/
