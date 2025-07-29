
import type { MenuProps } from 'antd';
import { RatingFilterItem } from './RatingFilter';

type MenuItem = Required<MenuProps>['items'][number];

type FilterConfig = {
    key: string;
    label: string;
    children: (ratingValue: number, setRatingValue: (v: number) => void) => MenuItem[];
};


export const createFilterItems = (
    ratingValue: number,
    setRatingValue: (value: number) => void
): MenuItem[] => {
    return filterConfigs.map(config => ({
        key: config.key,
        label: config.label,
        children: config.children(ratingValue, setRatingValue)
    }));
};


export const filterConfigs: FilterConfig[] = [
    {
        key: 'rating',
        label: 'Xếp hạng',
        children: (ratingValue, setRatingValue) =>
            Array.from({ length: 5 }, (_, i) => ({
                key: `rating-${i + 1}`,
                label: (
                    <RatingFilterItem
                        rating={i + 1}
                        selected={ratingValue}
                        onSelect={setRatingValue}
                    />
                )
            }))
    },
    {
        key: 'price',
        label: 'Giá cả',
        children: () => [
            { key: 'price-low', label: 'Dưới 500k' },
            { key: 'price-mid', label: '500k - 1 triệu' },
            { key: 'price-high', label: 'Trên 1 triệu' }
        ]
    },
    {
        key: 'duration',
        label: 'Thời lượng',
        children: () => [
            { key: 'short', label: 'Dưới 2 giờ' },
            { key: 'medium', label: '2 - 5 giờ' },
            { key: 'long', label: 'Trên 5 giờ' }
        ]
    },
    {
        key: 'level',
        label: 'Cấp độ',
        children: () => [
            { key: 'beginner', label: 'Dành cho người mới' },
            { key: 'intermediate', label: 'Trung cấp' },
            { key: 'advanced', label: 'Nâng cao' }
        ]
    },
    {
        key: 'language',
        label: 'Ngôn ngữ',
        children: () => [
            { key: 'vietnamese', label: 'Tiếng Việt' },
            { key: 'english', label: 'Tiếng Anh' },
            { key: 'other', label: 'Ngôn ngữ khác' }
        ]
    }

];
