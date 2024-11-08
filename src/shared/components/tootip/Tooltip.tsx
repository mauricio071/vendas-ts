import { ReactNode } from 'react';
import { ContainerExternal, ContainerTooltip } from './tooltip.style';
import { Tooltip as TooltipAntd } from 'antd';

interface TooltipPorps {
  children: ReactNode;
  tooltip?: ReactNode;
  title?: string;
}

function Tooltip({ children, tooltip, title }: TooltipPorps) {
  if (title) {
    <TooltipAntd title={title}>{children}</TooltipAntd>;
  }

  return (
    <ContainerTooltip>
      <ContainerExternal>{tooltip}</ContainerExternal>
      {children}
    </ContainerTooltip>
  );
}

export default Tooltip;
