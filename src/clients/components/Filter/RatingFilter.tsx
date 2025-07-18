// filepath: e:\Project\SkillForge\fe\skill-forge-fe\skillforge-ui\src\clients\components\Filter\RatingFilter.tsx
import React from 'react';
import { Radio, Rate } from 'antd';

interface RatingFilterProps {
  value: number;
  onChange: (value: number) => void;
}

export const RatingFilter: React.FC<RatingFilterProps> = ({ value, onChange }) => {
  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Radio
        checked={value === 1}
        onChange={() => onChange(1)}
      >
        <Rate disabled defaultValue={1} />
      </Radio>
    </div>
  );
};

// Hoặc tạo component tổng quát hơn
export const RatingFilterItem: React.FC<{ rating: number; selected: number; onSelect: (rating: number) => void }> = ({ 
  rating, 
  selected, 
  onSelect 
}) => (
  <div onClick={(e) => e.stopPropagation()}>
    <Radio
      checked={selected === rating}
      onChange={() => onSelect(rating)}
    >
      <Rate disabled defaultValue={rating} />
    </Radio>
  </div>
);