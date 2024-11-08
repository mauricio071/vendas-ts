import { Tag } from 'antd';
import { CategoryType } from '../../../shared/types/CategoryType';

interface CategoryColumnProps {
  category?: CategoryType;
}

const colors: string[] = [
  'magenta',
  'red',
  'volcano',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'blue',
  'geekblue',
  'purple',
];

function CategoryColumn({ category }: CategoryColumnProps) {
  if (!category) {
    return null;
  }
  const currentColor = colors[category.id] || colors[0];

  return <Tag color={currentColor}>green</Tag>;
}

export default CategoryColumn;
