import { Card, Form, Input, Spin, message } from 'antd'
import axios from 'axios'
import { useRouter } from 'next/router'
import { Button } from 'pink-lava-ui'
import { useState } from 'react'

export default function PageLogin() {
  const [showLoader, setShowLoader] = useState(false)
  const [form] = Form.useForm()
  const router = useRouter()

  const onFinish = (values: any) => {
    setShowLoader(true)
    axios
      .post('https://sfa-dev.nabatisnack.co.id:8080', values)
      .then((res) => {
        router.replace('/')
      })
      .catch((error) => {
        if (error.response) {
          message.error(error.response.data.data.message)
        } else {
          message.error(error.message)
        }
        setShowLoader(false)
      })
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <>
      <Card style={{ width: 600 }}>
        <Spin spinning={showLoader}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <h2>Welcome Back!</h2>
            <p>login to enter dashboard</p>
            <Form
              form={form}
              name="basic"
              // labelCol={{ span: 8 }}
              // wrapperCol={{ span: 16 }}
              style={{ width: '100%' }}
              layout="vertical"
              requiredMark={false}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Username"
                name="phone_number"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input placeholder="Type your NIK, Email, Phone Number" />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password placeholder="Type your password" />
              </Form.Item>
              <div style={{ display: 'flex', justifyContent: 'end' }}>
                <a href="">Forgot password</a>
              </div>
              <Form.Item>
                <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                  Login
                </Button>
              </Form.Item>
            </Form>

            <span>
              New user? <a>Create an account</a>
            </span>
          </div>
        </Spin>
      </Card>
    </>
  )
}
