import { Input as InputAntd, InputProps as InputPropsAntd } from 'antd';
import { BoxInput, TitleInput } from './input.styles';
import { InputTestIdEnum } from './enum/inputTestIdEnum';

export interface InputProps extends InputPropsAntd {
  title?: string;
  margin?: string;
}

function Input({ title, margin, ...props }: InputProps) {
  return (
    <BoxInput data-testid={InputTestIdEnum.BOX_INPUT} style={{ margin }}>
      {title && <TitleInput data-testid={InputTestIdEnum.INPUT_TITLE}>{title}:</TitleInput>}
      <InputAntd {...props} />
    </BoxInput>
  );
}

export default Input;
