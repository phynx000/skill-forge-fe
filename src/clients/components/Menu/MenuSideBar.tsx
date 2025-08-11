import { Drawer, Menu, Button, Divider } from "antd";
import { useState, forwardRef, useImperativeHandle } from "react";
import { AppstoreOutlined, HomeOutlined, UserOutlined, LoginOutlined, LogoutOutlined, UserAddOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Link } from "react-router-dom";
import { useAuth } from "../../../contexts/authcontext";

type MenuItem = Required<MenuProps>['items'][number];

export type MenuSideBarRef = {
    showDrawer: () => void;
};

const MenuSideBar = forwardRef<MenuSideBarRef>((_, ref) => {
    const [open, setOpen] = useState(false);
    const { isAuthenticated, user, logout } = useAuth();

    const showDrawer = () => setOpen(true);
    const closeDrawer = () => setOpen(false);

    useImperativeHandle(ref, () => ({
        showDrawer,
    }));

    const handleLogout = () => {
        logout();
        closeDrawer();
    };

    // Menu items cho authenticated users
    const authenticatedItems: MenuItem[] = [
        {
            key: 'home',
            icon: <HomeOutlined />,
            label: (
                <Link to="/" onClick={closeDrawer}>
                    Trang chủ
                </Link>
            )
        },
        {
            key: 'profile',
            icon: <UserOutlined />,
            label: (
                <Link to="/profile" onClick={closeDrawer}>
                    Profile
                </Link>
            )
        },
        {
            key: 'courses',
            icon: <AppstoreOutlined />,
            label: 'Khóa học',
            children: [
                {
                    key: 'all-courses',
                    label: (
                        <Link to="/list-course" onClick={closeDrawer}>
                            Tất cả khóa học
                        </Link>
                    )
                },
                {
                    key: 'my-courses',
                    label: 'Khóa học của tôi'
                },
                {
                    key: 'create-course',
                    label: (
                        <Link to="/create-course" onClick={closeDrawer}>
                            Tạo khóa học
                        </Link>
                    )
                },
            ],
        },
        {
            key: 'settings',
            icon: <SettingOutlined />,
            label: 'Cài đặt',
        },
    ];

    // Menu items cho unauthenticated users
    const unauthenticatedItems: MenuItem[] = [
        {
            key: 'home',
            icon: <HomeOutlined />,
            label: (
                <Link to="/" onClick={closeDrawer}>
                    Trang chủ
                </Link>
            )
        },
        {
            key: 'courses',
            icon: <AppstoreOutlined />,
            label: (
                <Link to="/list-course" onClick={closeDrawer}>
                    Khóa học
                </Link>
            )
        },
        {
            key: 'auth-divider',
            type: 'divider',
        },
        {
            key: 'login',
            icon: <LoginOutlined />,
            label: (
                <Link to="/login" onClick={closeDrawer}>
                    Đăng nhập
                </Link>
            )
        },
        {
            key: 'register',
            icon: <UserAddOutlined />,
            label: (
                <Link to="/register" onClick={closeDrawer}>
                    Đăng ký
                </Link>
            )
        },
    ];

    const items = isAuthenticated ? authenticatedItems : unauthenticatedItems;

    const [stateOpenKeys, setStateOpenKeys] = useState(['courses']);

    const onOpenChange: MenuProps['onOpenChange'] = (openKeys) => {
        setStateOpenKeys(openKeys);
    };

    return (
        <Drawer
            title=""
            placement="left"
            onClose={closeDrawer}
            open={open}
            width={280}
        >
            <div>
                {/* User Info Section */}
                {isAuthenticated && user && (
                    <div style={{ padding: '16px 0', textAlign: 'center' }}>
                        <UserOutlined style={{ fontSize: '24px', marginBottom: '8px' }} />
                        <div style={{ fontWeight: 'bold' }}>{user.fullName}</div>
                        <div style={{ color: '#666', fontSize: '12px' }}>{user.email}</div>
                        <Divider />
                    </div>
                )}

                <Menu
                    mode="inline"
                    defaultSelectedKeys={['home']}
                    openKeys={stateOpenKeys}
                    onOpenChange={onOpenChange}
                    style={{ width: '100%', border: 'none' }}
                    items={items}
                />

                {/* Logout Button for authenticated users */}
                {isAuthenticated && (
                    <div style={{ padding: '16px' }}>
                        <Divider />
                        <Button
                            type="primary"
                            danger
                            icon={<LogoutOutlined />}
                            onClick={handleLogout}
                            block
                        >
                            Đăng xuất
                        </Button>
                    </div>
                )}
            </div>
        </Drawer>
    );
});

export default MenuSideBar;
