import Tooltip from '../../../shared/components/tootip/Tooltip';
import { ProductType } from '../../../shared/types/ProductTypes';
import { ImageProduct } from '../styles/tooltipImage.style';

interface TooltipImageProps {
  product: ProductType;
}

function TooltipImage({ product }: TooltipImageProps) {
  return (
    <Tooltip tooltip={<ImageProduct src={product.image} alt={product.image} />}>
      <span>{product.id}</span>
    </Tooltip>
  );
}

export default TooltipImage;
