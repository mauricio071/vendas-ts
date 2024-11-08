import { ButtonProps } from 'antd';
import { ButtonAntd } from './button.styles';

interface ButtonCurrentProps extends ButtonProps {
  margin?: string;
}

function Button({ margin, ...props }: ButtonCurrentProps) {
  return <ButtonAntd style={{ margin }} {...props} />;
}

export default Button;
