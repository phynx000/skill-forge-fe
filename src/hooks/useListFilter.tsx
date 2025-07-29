import { useState } from 'react';
import type { MenuProps } from 'antd';

export const useListFilter = () => {
    const [stateOpenKeys, setStateOpenKeys] = useState(['2', '23']);
    const [ratingValue, setRatingValue] = useState(1);

    const onOpenChange: MenuProps['onOpenChange'] = (openKeys) => {
        if (!openKeys) {
            setStateOpenKeys([]);
            return;
        }

        const currentOpenKey = openKeys.find((key) => stateOpenKeys.indexOf(key) === -1);

        if (currentOpenKey !== undefined) {
            setStateOpenKeys(openKeys);
        } else {
            setStateOpenKeys(openKeys);
        }
    };

    return {
        stateOpenKeys,
        ratingValue,
        setRatingValue,
        onOpenChange,
    };
};