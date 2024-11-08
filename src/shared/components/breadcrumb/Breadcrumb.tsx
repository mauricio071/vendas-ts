import { Breadcrumb as BreadcrumbAntd } from 'antd';

export interface ListBreadcrumb {
  name: string;
  navigateTo?: string;
}

interface BreadcrumbProps {
  listBreadcrumb: ListBreadcrumb[];
}

function Breadcrumb({ listBreadcrumb }: BreadcrumbProps) {
  return (
    <BreadcrumbAntd>
      {listBreadcrumb.map((breadcrumb, index) => (
        <BreadcrumbAntd.Item key={`breadcrumb_${index}`}>
          {breadcrumb.navigateTo ? (
            <a href={breadcrumb.navigateTo || ''}>{breadcrumb.name}</a>
          ) : (
            breadcrumb.name
          )}
        </BreadcrumbAntd.Item>
      ))}
    </BreadcrumbAntd>
  );
}

export default Breadcrumb;
