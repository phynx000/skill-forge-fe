import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  HomeOutlined,
  SettingOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";

import type { MenuProps } from "antd";
import { Menu, Space, Button, Row } from "antd";
import SearchBar from "../components/Search/SearchInput";
import Logo from "../components/Logo/Logo";
import AuthButtons from "../../components/Button/AuthButton";
import UserAvatar from "../components/User/User";
import { useRef } from 'react';
import MenuSideBar from "../components/Menu/MenuSideBar";
import CategoryMenu from "../components/Menu/CategoryMenu";
import type { MenuSideBarRef } from "../components/Menu/MenuSideBar";




type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    label: (
      <Link to={"/"}>
        <span>Home</span>
      </Link>
    ),
    key: "home",
    icon: <HomeOutlined />,
  },
  {
    label: (
      <Link to={"/profile"}>
        <span>Profile</span>
      </Link>
    ),
    key: "profile",
    icon: <UserOutlined />,
  },
  {
    label: "Khám Phá",
    key: "SubMenu",
    icon: <SettingOutlined />,
    children: [
      {
        type: "group",
        label: "Khóa học",
        children: [
          {
            label: (
              <Link to="/list-course">
                <span>Tất cả khóa học</span>
              </Link>
            ),
            key: "all-courses"
          },
          {
            label: (
              <Link to="/course/1/learn">
                <span>Demo Course Player</span>
              </Link>
            ),
            key: "demo-player"
          },
          {
            label: (
              <Link to="/create-course">
                <span>Tạo khóa học</span>
              </Link>
            ),
            key: "create-course"
          },
          {
            label: (
              <Link to="/checkout">
                <span>🛒 Thanh toán</span>
              </Link>
            ),
            key: "checkout"
          },
        ],
      },
      {
        type: "group",
        label: "Profile",
        children: [
          {
            label: (
              <Link to="/profile">
                <span>Chọn Profile</span>
              </Link>
            ),
            key: "profile-select"
          },
          {
            label: (
              <Link to="/profile/student/1">
                <span>Student Profile</span>
              </Link>
            ),
            key: "student-profile"
          },
        ],
      },
    ],
  },
  {
    key: "alipay",
    label: (
      <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
        Navigation Four - Link
      </a>
    ),
  },
];

export default function AppHeader() {
  const [current, setCurrent] = useState("home");
  const navigate = useNavigate();

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  const sidebarRef = useRef<MenuSideBarRef>(null);

  const handleOpenSidebar = () => {
    sidebarRef.current?.showDrawer();
  };

  // Xử lý khi click vào category
  const handleCategoryClick = (categoryId: string, categoryName: string) => {
    console.log('Navigate to category:', { categoryId, categoryName });
    // Navigate to course list with category filter
    navigate(`/list-course?category=${categoryId}`);
  };

  return (
    <>
      <div className="app-header-container">
        {/* Main Header */}
        <div className="flex items-center place-content-between app-header">
          <div className="lg:flex hidden items-center gap-4">
            <Logo />
            <Menu
              onClick={onClick}
              selectedKeys={[current]}
              mode="horizontal"
              items={items}
            />
            <SearchBar />
          </div>

          <div className="lg:flex hidden items-center">
            <AuthButtons />
            <UserAvatar />
          </div>

          {/* mobile */}
          <div className="lg:hidden flex items-center gap-4 place-content-between mobile-header-content">
            <Button onClick={handleOpenSidebar} className="lg:hidden flex">☰</Button>
            <Logo />
            <Space>
              <SearchOutlined />
              <ShoppingCartOutlined />
            </Space>
            {/* Modal được gọi qua ref */}
            {/* Sidebar ẩn, sẽ trượt ra khi gọi hàm */}
            <MenuSideBar ref={sidebarRef} />
          </div>
        </div>

        {/* Category Menu Bar - chỉ hiển thị trên desktop */}
        <div className="lg:block hidden">
          <Row justify="center" align="middle" style={{ minHeight: '50px' }}>
            <CategoryMenu onCategoryClick={handleCategoryClick} />
          </Row>
        </div>
      </div>
    </>
  );
}
