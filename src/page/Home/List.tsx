import React from 'react'
import { Table } from 'antd'
import { columns } from './columns'

const List: React.FC = () => {
  return (
    <Table columns={columns} />
  )
}

export default List