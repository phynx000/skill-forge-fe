import React from 'react';
import { Menu } from 'antd';
import { useListFilter } from '../../../hooks/useListFilter';
import { createFilterItems } from '../Filter/Configuration';

const App: React.FC = () => {
  const {
    stateOpenKeys,
    ratingValue,
    setRatingValue,
    onOpenChange,
  } = useListFilter();

  const items = createFilterItems(ratingValue, setRatingValue);

  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={['231']}
      openKeys={stateOpenKeys}
      onOpenChange={onOpenChange}
      style={{ width: 256 }}
      items={items}
    />
  );
};

export default App;