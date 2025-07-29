import React, { useState, useMemo } from 'react';
import { Row, Col, Pagination, Select, Space, Typography, Button, Spin } from 'antd';
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';
import CourseCard from './CourseCard';
import CourseListItem from './CourseListItem';
import type { CourseData } from './CourseCard';
import './CourseCard.scss';
import type { Course } from '../../../types/course';
import { useCourse } from '../../../hooks/useCourse';

const { Text } = Typography;
const { Option } = Select;

// Hàm chuyển đổi dữ liệu từ API sang định dạng của CourseData
const mapCourseApiToCourseData = (apiCourse: Course): CourseData => ({
    id: apiCourse.id.toString(),
    title: apiCourse.title,
    instructor: apiCourse.instructorName,
    instructorAvatar: 'https://i.pravatar.cc/40', // Placeholder
    price: apiCourse.price * 1000, // Giả sử giá từ API là đơn vị nghìn đồng
    // originalPrice: apiCourse.originalPrice, // Thêm nếu có trong API
    rating: 4.5, // Placeholder
    reviewCount: 100, // Placeholder
    studentCount: 500, // Placeholder
    thumbnail: apiCourse.thumbnailUrl || `https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=300&fit=crop`, // Placeholder
    duration: `${apiCourse.numberOfLessons} bài học`,
    level: 'Beginner', // Placeholder
    // isBestseller: apiCourse.isBestseller, // Thêm nếu có
    // isNew: apiCourse.isNew, // Thêm nếu có
});


type ViewMode = 'grid' | 'list';
type SortOption = 'relevance' | 'rating' | 'newest' | 'price-low' | 'price-high';
type FilterType = 'all' | 'popular' | 'featured' | 'new';

interface CourseGridListProps {
    filterType?: FilterType;
    showControls?: boolean;
}

const CourseGridList: React.FC<CourseGridListProps> = ({
    filterType = 'all',
    showControls = true
}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(showControls ? 12 : 8);
    const [viewMode, setViewMode] = useState<ViewMode>('grid');
    const [sortBy, setSortBy] = useState<SortOption>('relevance');

    // ********
    const { courses: apiResponse, loading, meta } = useCourse(currentPage, pageSize);

    const handlePageChange = (current: number, size?: number) => {
        setCurrentPage(current);
        if (size) setPageSize(size);
    };

    const handleSortChange = (value: SortOption) => {
        setSortBy(value);
        // Implement sorting logic here
    };

    const processedCourses = useMemo(() => {
        if (!apiResponse?.data?.results) {
            return [];
        }
        // Chuyển đổi dữ liệu API
        const mapped = apiResponse.data.results.map(mapCourseApiToCourseData);

        // Áp dụng sắp xếp (client-side)
        const sorted = [...mapped];
        switch (sortBy) {
            case 'rating':
                return sorted.sort((a, b) => b.rating - a.rating);
            case 'price-low':
                return sorted.sort((a, b) => a.price - b.price);
            case 'price-high':
                return sorted.sort((a, b) => b.price - a.price);
            case 'newest':
                return sorted.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
            default: // relevance
                return sorted.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
        }
    }, [apiResponse, sortBy]);

    const getGridCols = () => {
        return {
            xs: 12,  // 2 columns on mobile
            sm: 12,  // 2 columns on small tablets
            md: 8,   // 3 columns on tablets
            lg: 6,   // 4 columns on desktop
            xl: 6,   // 4 columns on large desktop
            xxl: showControls ? 4 : 6,  // 6 or 4 columns
        };
    };


    return (
        <div className="course-list-container">
            {/* Header with course count and controls */}
            {showControls && (
                <div className="course-list-header">
                    <div>
                        <Text className="course-count">
                            {meta ? `${meta.totalItems.toLocaleString()} khóa học` : 'Đang tải...'}
                        </Text>
                    </div>

                    <Space size="middle">
                        <span>Sắp xếp theo:</span>
                        <Select
                            value={sortBy}
                            onChange={handleSortChange}
                            style={{ width: 150 }}
                        >
                            <Option value="relevance">Liên quan nhất</Option>
                            <Option value="rating">Đánh giá cao nhất</Option>
                            <Option value="newest">Mới nhất</Option>
                            <Option value="price-low">Giá thấp đến cao</Option>
                            <Option value="price-high">Giá cao đến thấp</Option>
                        </Select>

                        <div className="view-options">
                            <Button
                                type={viewMode === 'grid' ? 'primary' : 'default'}
                                icon={<AppstoreOutlined />}
                                onClick={() => setViewMode('grid')}
                                size="small"
                            />
                            <Button
                                type={viewMode === 'list' ? 'primary' : 'default'}
                                icon={<BarsOutlined />}
                                onClick={() => setViewMode('list')}
                                size="small"
                            />
                        </div>
                    </Space>
                </div>
            )}

            {/* Course Grid/List */}
            {loading ? (
                <Row justify="start" align="middle" style={{ minHeight: '300px' }}>
                    <Spin size="large" />
                </Row>
            ) : viewMode === 'grid' ? (
                <Row gutter={[16, 24]} className="course-grid">
                    {processedCourses.map((course) => (
                        <Col key={course.id} {...getGridCols()}>
                            <CourseCard
                                course={course}
                            />
                        </Col>
                    ))}
                </Row>
            ) : (
                <div className="course-list">
                    {processedCourses.map((course) => (
                        <CourseListItem
                            key={course.id}
                            course={course}
                        />
                    ))}
                </div>
            )}

            {/* Pagination */}
            {showControls && meta && meta.totalItems > 0 && (
                <Row justify="center" style={{ marginTop: 32 }}>
                    <Pagination
                        current={currentPage}
                        total={meta.totalItems}
                        pageSize={pageSize}
                        showSizeChanger={showControls}
                        showQuickJumper={showControls}
                        showTotal={(total, range) =>
                            `${range[0]}-${range[1]} của ${total} khóa học`
                        }
                        onChange={handlePageChange}
                        pageSizeOptions={['8', '12', '16', '24']}
                    />
                </Row>
            )}
        </div>
    );
};

export default CourseGridList;