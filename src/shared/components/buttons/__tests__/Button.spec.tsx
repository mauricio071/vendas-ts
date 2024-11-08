import { render, screen } from '@testing-library/react';
import Button from '../button/Button';

const TEXT_MOCK = 'TEXT_MOCK';
const MARGIN = '23px';
const TEST_ID = 'TEST_ID';
describe('Test Button', () => {
  beforeEach(() => {
    render(
      <Button data-testid={TEST_ID} margin={MARGIN}>
        {TEXT_MOCK}
      </Button>,
    );
  });

  it('should render', () => {
    expect(screen.getByText(TEXT_MOCK)).toBeDefined();
  });

  it('should render with margin', () => {
    expect(screen.getByTestId(TEST_ID)).toHaveAttribute('style', `margin: ${MARGIN};`);
  });
});
