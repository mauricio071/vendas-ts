import { SelectProps as SelectPropsAntd, Select as SelectAntd } from 'antd';
import { BoxSelect, TitleSelect } from './select.styles';
import { SelectTestId } from './enum/selectTestIdEnum';

interface SelectProps extends SelectPropsAntd {
  title?: string;
  margin?: string;
}

function Select({ title, margin, ...props }: SelectProps) {
  return (
    <BoxSelect data-testid={SelectTestId.CONTAINER} style={{ margin }}>
      {title && <TitleSelect data-testid={SelectTestId.TITLE}>{title}:</TitleSelect>}
      <SelectAntd data-testid={SelectTestId.SELECT_ANTD} {...props} style={{ width: '100%' }} />
    </BoxSelect>
  );
}

export default Select;
