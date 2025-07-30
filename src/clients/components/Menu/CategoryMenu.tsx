import React from 'react';
import { Dropdown, Spin } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import type { SubCategory } from '../../../types/category';
import { useCategory } from '../../../hooks/useCategory';
import './CategoryMenu.scss';
import { useNavigate } from 'react-router-dom';


interface CategoryMenuProps {
    onCategoryClick?: (categoryId: string, categoryName: string) => void;
    useMockData?: boolean;
}

const CategoryMenu: React.FC<CategoryMenuProps> = ({
    onCategoryClick,
    useMockData = false // Mặc định sử dụng mock data trong development
}) => {
    const { categories, loading } = useCategory(useMockData);
    const navigate = useNavigate();

    // Tạo menu items cho subcategories
    const createSubMenuItems = (subCategories: SubCategory[]): MenuProps['items'] => {
        return subCategories.map((subCategory) => ({
            key: `sub-${subCategory.id}`,
            label: (
                <div className="category-menu-item">
                    <span className="category-name">{subCategory.name}</span>
                    <span className="category-description">{subCategory.description}</span>
                </div>
            ),
            children: subCategory.subCategories.length > 0
                ? createSubMenuItems(subCategory.subCategories)
                : undefined,
        }));
    };

    // Xử lý click menu item
    const handleMenuClick = (categoryId: string, categoryName: string) => {
        console.log('Selected category:', { categoryId, categoryName });

        // Gọi callback function nếu được provide
        if (onCategoryClick) {
            onCategoryClick(categoryId, categoryName);
        }

        // Navigate to category page với categoryId
        navigate(`/list-course?category=${categoryId}`);
    };

    // Xử lý click "Tất cả khóa học"
    const handleViewAllCourses = () => {
        console.log('Navigate to all courses');
        // Navigate to all courses page không có categoryId
        navigate('/list-course');
    };

    // Helper function để tìm category theo ID
    const findCategoryById = (categories: SubCategory[], id: number): SubCategory | null => {
        for (const category of categories) {
            if (category.id === id) {
                return category;
            }
            if (category.subCategories.length > 0) {
                const found = findCategoryById(category.subCategories, id);
                if (found) return found;
            }
        }
        return null;
    };

    if (loading) {
        return (
            <div className="category-menu-loading">
                <Spin size="small" />
                <span>Đang tải danh mục...</span>
            </div>
        );
    }

    return (
        <div className="category-menu-container">
            <div className="category-menu-wrapper">
                {/* Nút "Tất cả khóa học" */}
                <div
                    className="category-menu-item-root category-menu-item-all"
                    onClick={handleViewAllCourses}
                >
                    <span className="category-name">Tất cả khóa học</span>
                </div>

                {categories.map((category) => {
                    const hasSubCategories = category.subCategories.length > 0;

                    if (hasSubCategories) {
                        // Render dropdown cho category có subcategories
                        const dropdownMenu: MenuProps = {
                            items: createSubMenuItems(category.subCategories),
                            onClick: ({ key }) => {
                                const categoryId = key.replace('sub-', '');
                                const selectedCategory = findCategoryById(category.subCategories, parseInt(categoryId));
                                if (selectedCategory) {
                                    handleMenuClick(categoryId, selectedCategory.name);
                                }
                            },
                        };

                        return (
                            <Dropdown
                                key={category.id}
                                menu={dropdownMenu}
                                trigger={['hover']}
                                placement="bottomLeft"
                                overlayClassName="category-dropdown-overlay"
                            >
                                <div
                                    className="category-menu-item-root"
                                    onClick={() => handleMenuClick(category.id.toString(), category.name)}
                                >
                                    {/* <AppstoreOutlined className="category-icon" /> */}
                                    <span className="category-name">{category.name}</span>
                                    <DownOutlined className="dropdown-icon" />
                                </div>
                            </Dropdown>
                        );
                    } else {
                        // Render button đơn giản cho category không có subcategories
                        return (
                            <div
                                key={category.id}
                                className="category-menu-item-root category-menu-item-simple"
                                onClick={() => handleMenuClick(category.id.toString(), category.name)}
                            >
                                {/* <AppstoreOutlined className="category-icon" /> */}
                                <span className="category-name">{category.name}</span>
                            </div>
                        );
                    }
                })}
            </div>
        </div>
    );
};

export default CategoryMenu;