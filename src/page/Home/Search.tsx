import React from 'react'
import { Form, Input, Row, Col, Button } from 'antd'

const Search: React.FC = () => {
  return (
    <Form>
      <Row gutter={24}>
        <Col span={8}>
          <Form.Item name="name" label="名称">
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="age" label="年龄">
            <Input />
          </Form.Item>
        </Col>
        <Col span={8} flex='auto'>
          <Button type="primary" htmlType="submit">查询</Button>
        </Col>
      </Row>
    </Form>
  )
}

export default Search