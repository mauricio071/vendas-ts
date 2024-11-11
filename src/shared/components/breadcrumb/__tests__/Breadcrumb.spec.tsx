import { fireEvent, render } from '@testing-library/react';
import Breadcrumb, { ListBreadcrumb } from '../Breadcrumb';
import { BreadcrumbTestEnum } from '../enum/breadcrumbTestIdEnum';
import { useNavigate } from 'react-router-dom';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

const mockListBreadCrumb: ListBreadcrumb[] = [
  {
    name: 'nameMock',
  },
];

const mockListBreadCrumbWithNavigate: ListBreadcrumb[] = [
  {
    name: 'nameMock',
    navigateTo: 'navigateTo',
  },
];

describe('test breadcrumb', () => {
  it('should render success', () => {
    const { getByTestId } = render(<Breadcrumb listBreadcrumb={[]} />);

    expect(getByTestId(BreadcrumbTestEnum.CONTAINER)).toBeDefined();
  });

  it('should not render item if empty list', () => {
    const { queryAllByTestId } = render(<Breadcrumb listBreadcrumb={[]} />);

    expect(queryAllByTestId(BreadcrumbTestEnum.ITEM).length).toEqual(0);
  });

  it('should render item', () => {
    const { queryAllByTestId, getByText } = render(
      <Breadcrumb listBreadcrumb={mockListBreadCrumb} />,
    );

    expect(queryAllByTestId(BreadcrumbTestEnum.ITEM).length).toEqual(1);
    expect(queryAllByTestId(BreadcrumbTestEnum.CONTAINER_NAVIGATE).length).toEqual(0);
    expect(getByText(mockListBreadCrumb[0].name)).toBeDefined();
  });

  it('should render item with navigate', () => {
    const { queryAllByTestId } = render(
      <Breadcrumb listBreadcrumb={mockListBreadCrumbWithNavigate} />,
    );

    expect(queryAllByTestId(BreadcrumbTestEnum.CONTAINER_NAVIGATE).length).toEqual(1);
  });
});
