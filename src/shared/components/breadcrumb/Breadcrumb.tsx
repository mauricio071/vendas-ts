import { Breadcrumb as BreadcrumbAntd } from 'antd';
import { BreadcrumbTestEnum } from './enum/breadcrumbTestIdEnum';

export interface ListBreadcrumb {
  name: string;
  navigateTo?: string;
}

interface BreadcrumbProps {
  listBreadcrumb: ListBreadcrumb[];
}

function Breadcrumb({ listBreadcrumb }: BreadcrumbProps) {
  return (
    <BreadcrumbAntd data-testid={BreadcrumbTestEnum.CONTAINER}>
      {listBreadcrumb.map((breadcrumb, index) => (
        <BreadcrumbAntd.Item data-testid={BreadcrumbTestEnum.ITEM} key={`breadcrumb_${index}`}>
          {breadcrumb.navigateTo ? (
            <a
              data-testid={BreadcrumbTestEnum.CONTAINER_NAVIGATE}
              href={breadcrumb.navigateTo || ''}
            >
              {breadcrumb.name}
            </a>
          ) : (
            breadcrumb.name
          )}
        </BreadcrumbAntd.Item>
      ))}
    </BreadcrumbAntd>
  );
}

export default Breadcrumb;
