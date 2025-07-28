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