import { fireEvent, render } from '@testing-library/react';
import InputMoney from '../InputMoney';
import { InputMoneyTestId } from '../enum/inputMoneyTestIdEnum';

describe('test InputMoney', () => {
  it('should render input', () => {
    const mockOnchange = jest.fn();
    const { getByTestId } = render(<InputMoney value={0} onChange={mockOnchange} />);
    const input = getByTestId(InputMoneyTestId.INPUT);

    expect(input).toBeDefined();
  });

  it('should initial value', () => {
    const mockOnchange = jest.fn();
    const { getByTestId } = render(<InputMoney value={0} onChange={mockOnchange} />);
    const input = getByTestId(InputMoneyTestId.INPUT);

    fireEvent.change(input, { target: { value: '0,00' } });

    expect(input).toHaveAttribute('value', '0,00');
  });
});
