import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  SettingOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

import type { MenuProps } from "antd";
import { Menu, Space, Button } from "antd";
import SearchBar from "../components/Search/SearchInput";
import Logo from "../components/Logo/Logo";
import AuthButtons from "../../components/Button/AuthButton";
import UserAvatar from "../components/User/User";
import { useRef } from 'react';
import MenuSideBar from "../components/Menu/MenuSideBar";
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
    label: "Khám Phá",
    key: "SubMenu",
    icon: <SettingOutlined />,
    children: [
      {
        type: "group",
        label: "Item 1",
        children: [
          { label: "Option 1", key: "setting:1" },
          { label: "Option 2", key: "setting:2" },
        ],
      },
      {
        type: "group",
        label: "Item 2",
        children: [
          { label: "Option 3", key: "setting:3" },
          { label: "Option 4", key: "setting:4" },
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
  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };


  const sidebarRef = useRef<MenuSideBarRef>(null);

  const handleOpenSidebar = () => {
    sidebarRef.current?.showDrawer();
  };


  return (
    <>
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
    </>
  );
}
