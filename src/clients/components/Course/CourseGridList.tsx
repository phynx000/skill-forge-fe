import React, { useState, useMemo } from 'react';
import { Row, Col, Pagination, Select, Space, Typography, Button } from 'antd';
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';
import CourseCard from './CourseCard';
import CourseListItem from './CourseListItem';
import type { CourseData } from './CourseCard';
import './CourseCard.scss';
import { useCourse } from '../../../hooks/useCourse';

const { Text } = Typography;
const { Option } = Select;

// Mock data cho các khóa học
const mockCourseData: CourseData[] = [
    {
        id: '1',
        title: 'Complete React Developer Course 2024 - Redux, TypeScript, NextJS',
        instructor: 'Nguyễn Văn A',
        instructorAvatar: 'https://i.pravatar.cc/40?img=1',
        price: 1299000,
        originalPrice: 2599000,
        rating: 4.7,
        reviewCount: 15420,
        studentCount: 89500,
        thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop',
        duration: '52 giờ',
        level: 'Intermediate',
        isBestseller: true,
    },
    {
        id: '2',
        title: 'The Complete JavaScript Course 2024: From Zero to Expert!',
        instructor: 'Trần Thị B',
        instructorAvatar: 'https://i.pravatar.cc/40?img=2',
        price: 999000,
        originalPrice: 1899000,
        rating: 4.8,
        reviewCount: 32100,
        studentCount: 156000,
        thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=300&fit=crop',
        duration: '69 giờ',
        level: 'Beginner',
        isBestseller: true,
    },
    {
        id: '3',
        title: 'Python for Data Science and Machine Learning Bootcamp',
        instructor: 'Lê Văn C',
        instructorAvatar: 'https://i.pravatar.cc/40?img=3',
        price: 1599000,
        rating: 4.6,
        reviewCount: 8750,
        studentCount: 42300,
        thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=300&fit=crop',
        duration: '43 giờ',
        level: 'Intermediate',
        isNew: true,
    },
    {
        id: '4',
        title: 'Modern CSS Grid, Flexbox & Sass: Create Amazing Websites',
        instructor: 'Phạm Thị D',
        instructorAvatar: 'https://i.pravatar.cc/40?img=4',
        price: 799000,
        originalPrice: 1599000,
        rating: 4.5,
        reviewCount: 12400,
        studentCount: 67800,
        thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
        duration: '28 giờ',
        level: 'Beginner',
    },
    {
        id: '5',
        title: 'Node.js, Express, MongoDB & More: The Complete Bootcamp',
        instructor: 'Hoàng Văn E',
        instructorAvatar: 'https://i.pravatar.cc/40?img=5',
        price: 1399000,
        originalPrice: 2799000,
        rating: 4.7,
        reviewCount: 19200,
        studentCount: 73500,
        thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop',
        duration: '42 giờ',
        level: 'Advanced',
        isBestseller: true,
    },
    {
        id: '6',
        title: 'Complete Guide to Flutter Development with Dart',
        instructor: 'Vũ Thị F',
        instructorAvatar: 'https://i.pravatar.cc/40?img=6',
        price: 1199000,
        rating: 4.4,
        reviewCount: 6800,
        studentCount: 28900,
        thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop',
        duration: '48 giờ',
        level: 'Intermediate',
        isNew: true,
    },
    {
        id: '7',
        title: 'AWS Certified Solutions Architect Professional 2024',
        instructor: 'Đặng Văn G',
        instructorAvatar: 'https://i.pravatar.cc/40?img=7',
        price: 1899000,
        originalPrice: 3599000,
        rating: 4.8,
        reviewCount: 11500,
        studentCount: 34200,
        thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop',
        duration: '65 giờ',
        level: 'Advanced',
    },
    {
        id: '8',
        title: 'Digital Marketing Masterclass: Get Your First 1000 Customers',
        instructor: 'Bùi Thị H',
        instructorAvatar: 'https://i.pravatar.cc/40?img=8',
        price: 899000,
        originalPrice: 1799000,
        rating: 4.6,
        reviewCount: 9300,
        studentCount: 51600,
        thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
        duration: '32 giờ',
        level: 'Beginner',
    },
    {
        id: '9',
        title: 'Complete Photoshop CC Course: From Beginner to Advanced',
        instructor: 'Ngô Văn I',
        instructorAvatar: 'https://i.pravatar.cc/40?img=9',
        price: 699000,
        rating: 4.3,
        reviewCount: 7200,
        studentCount: 39800,
        thumbnail: 'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=400&h=300&fit=crop',
        duration: '25 giờ',
        level: 'Beginner',
        isNew: true,
    },
];

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
    const { courses, loading, meta } = useCourse(currentPage, pageSize);


    const handlePageChange = (page: number, size?: number) => {
        setCurrentPage(page);
        if (size) setPageSize(size);
    };

    const handleSortChange = (value: SortOption) => {
        setSortBy(value);
        // Implement sorting logic here
    };

    const filteredCourses = useMemo(() => {
        const courses = [...mockCourseData];
        switch (filterType) {
            case 'popular':
                // Popular: Bestsellers with high student count
                return courses
                    .filter(c => c.isBestseller)
                    .sort((a, b) => b.studentCount - a.studentCount);
            case 'featured':
                // Featured: High rating and good review count
                return courses
                    .filter(c => c.rating >= 4.7)
                    .sort((a, b) => b.reviewCount - a.reviewCount);
            case 'new':
                return courses.filter(c => c.isNew);
            case 'all':
            default:
                return courses;
        }
    }, [filterType]);

    const getSortedCourses = () => {
        const sortedCourses = [...filteredCourses];

        switch (sortBy) {
            case 'rating':
                return sortedCourses.sort((a, b) => b.rating - a.rating);
            case 'price-low':
                return sortedCourses.sort((a, b) => a.price - b.price);
            case 'price-high':
                return sortedCourses.sort((a, b) => b.price - a.price);
            case 'newest':
                // For demo purposes, prioritize "new" courses
                return sortedCourses.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
            default:
                // Default relevance order (bestsellers first)
                return sortedCourses.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
        }
    };

    const sortedCourses = getSortedCourses();
    const startIndex = (currentPage - 1) * pageSize;
    const paginatedCourses = sortedCourses.slice(startIndex, startIndex + pageSize);

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
                            {sortedCourses.length.toLocaleString()} khóa học
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
            {viewMode === 'grid' ? (
                <Row gutter={[16, 24]} className="course-grid">
                    {paginatedCourses.map((course) => (
                        <Col key={course.id} {...getGridCols()}>
                            <CourseCard
                                course={course}
                            />
                        </Col>
                    ))}
                </Row>
            ) : (
                <div className="course-list">
                    {paginatedCourses.map((course) => (
                        <CourseListItem
                            key={course.id}
                            course={course}
                        />
                    ))}
                </div>
            )}

            {/* Pagination */}
            {showControls && (
                <Row justify="center" style={{ marginTop: 32 }}>
                    <Pagination
                        current={currentPage}
                        total={sortedCourses.length}
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