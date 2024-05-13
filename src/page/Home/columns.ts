import type { ColumnProps } from 'antd/lib/table'

type RecordType = {
  name: string
  age: number
}

export const columns: ColumnProps<RecordType>[] = [
  {
    title: '名称',
    dataIndex: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
  },
]