import { Avatar, Badge } from 'antd';
import { UserOutlined, TeamOutlined, BookOutlined, LogoutOutlined } from '@ant-design/icons';
import { SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/authcontext';

const UserAvatar = () => {
    const navigate = useNavigate();
    const { isAuthenticated, user, logout } = useAuth();

    // Chỉ hiển thị avatar khi đã đăng nhập
    if (!isAuthenticated || !user) {
        return null;
    }

    const handleMenuClick = ({ key }: { key: string }) => {
        switch (key) {
            case 'profile-select':
                navigate('/profile');
                break;
            case 'student-profile':
                navigate('/profile/student/1');
                break;
            case 'instructor-profile':
                navigate('/profile/instructor/1');
                break;
            case 'logout':
                logout();
                break;
            default:
                break;
        }
    };

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: `${user.fullName}`,
            disabled: true,
        },
        {
            type: 'divider',
        },
        {
            key: 'profile-select',
            label: 'Chọn loại Profile',
            icon: <UserOutlined />,
        },
        {
            key: 'student-profile',
            label: 'Student Profile',
            icon: <BookOutlined />,
        },
        {
            key: 'instructor-profile',
            label: 'Instructor Profile',
            icon: <TeamOutlined />,
        },
        {
            type: 'divider',
        },
        {
            key: '3',
            label: 'Billing',
            extra: '⌘B',
        },
        {
            key: '4',
            label: 'Settings',
            icon: <SettingOutlined />,
            extra: '⌘S',
        },
        {
            type: 'divider',
        },
        {
            key: 'logout',
            label: 'Đăng xuất',
            icon: <LogoutOutlined />,
            danger: true,
        },
    ];

    return (
        <div className="user-avatar ml-5 mr-1">
            <Badge count={1}>
                <Dropdown menu={{ items, onClick: handleMenuClick }}>
                    <a onClick={(e) => e.preventDefault()}>
                        <Avatar shape="square" icon={<UserOutlined />} />
                    </a>
                </Dropdown>
            </Badge>
        </div>
    );
}

export default UserAvatar;