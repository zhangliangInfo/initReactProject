import React from 'react'
import { Table } from 'antd'
import { columns } from './columns'
import s from './style.module.less'

const List: React.FC = () => {
  return (
    <>
      <div className={s.test}>列表数据</div>
      <Table columns={columns} />
    </>
  )
}

export default List