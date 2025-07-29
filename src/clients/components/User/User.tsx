import { Avatar, Badge } from 'antd';
import { UserOutlined, TeamOutlined, BookOutlined } from '@ant-design/icons';
import { SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';
import { useNavigate } from 'react-router-dom';



const UserAvatar = () => {
    const navigate = useNavigate();

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
            default:
                break;
        }
    };

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: 'My Account',
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