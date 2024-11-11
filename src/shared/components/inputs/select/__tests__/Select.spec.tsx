import { render } from '@testing-library/react';
import Select from '../Select';
import { SelectTestId } from '../enum/selectTestIdEnum';

const mockTitle = 'mockTitle';
const mockMargin = '0px 0px 16px 0px';

describe('Test Select', () => {
  it('should render select', () => {
    const { getByTestId } = render(<Select />);

    expect(getByTestId(SelectTestId.CONTAINER)).toBeDefined();
    expect(getByTestId(SelectTestId.SELECT_ANTD)).toBeDefined();
  });

  it('should not render title if empty', () => {
    const { queryByText } = render(<Select />);

    expect(queryByText(mockTitle)).toBeNull();
  });

  it('should render title', () => {
    const { queryAllByTestId, queryByText } = render(<Select title={mockTitle} />);

    expect(queryAllByTestId(SelectTestId.TITLE)).toBeDefined();
    expect(queryByText(mockTitle)).toBeDefined();
  });

  it('should render props margin', () => {
    const { getByTestId } = render(<Select margin={mockMargin} />);

    expect(getByTestId(SelectTestId.CONTAINER)).toHaveAttribute('style', `margin: ${mockMargin};`);
  });
});
