import { Spin, SpinProps } from 'antd';

function Loading({ ...props }: SpinProps) {
  return <Spin {...props} />;
}

export default Loading;
