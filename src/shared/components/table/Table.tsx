import { TableProps, Table as TableAntD } from 'antd';

function Table<RecordType extends object = any>({ ...props }: TableProps<RecordType>) {
  return <TableAntD {...props} />;
}

export default Table;
