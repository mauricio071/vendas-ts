import { convertNumberToMoney } from '../money';

describe('money', () => {
  it('should return cents', () => {
    const returnValue = convertNumberToMoney(534.34);

    expect(returnValue).toContain('R$');
    expect(returnValue).toContain('534,34');
  });

  it('should return integer', () => {
    const returnValue = convertNumberToMoney(600);

    expect(returnValue).toContain('R$');
    expect(returnValue).toContain('600,00');
  });

  it('should return thousand', () => {
    const returnValue = convertNumberToMoney(45635.23);

    expect(returnValue).toContain('R$');
    expect(returnValue).toContain('45.635,23');
  });
});
