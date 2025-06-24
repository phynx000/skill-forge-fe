import { Avatar, Badge } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';



const UserAvatar = () => {

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
            key: '2',
            label: 'Profile',
            extra: '⌘P',
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
                <Dropdown menu={{ items }}>
                    <a onClick={(e) => e.preventDefault()}>
                        <Avatar shape="square" icon={<UserOutlined />} />
                    </a>
                </Dropdown>

            </Badge>
        </div>
    );
}

export default UserAvatar;