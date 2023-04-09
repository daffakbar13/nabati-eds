import { Card, Form, Input, Spin, message } from 'antd'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Button, Text, Spacer, Layout } from 'pink-lava-ui'
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
    <Layout
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: 'linear-gradient(180deg, #FFFFFF 18.39%, #D5FAFD 150.89%)',
      }}
    >
      <Image src={'/eds/icons/logo-nabati-blue.svg'} width={200} height={200} />

      <Card
        style={{
          width: 450,
          borderRadius: 24,
          boxShadow: '0px 4px 16px rgba(170, 170, 170, 0.15)',
          padding: 15,
        }}
      >
        <Spin spinning={showLoader}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Text variant={'h4'}>Welcome Back!</Text>
            <p>login to enter dashboard</p>
            <Form
              form={form}
              name="basic"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              style={{ width: '100%' }}
              layout="vertical"
              requiredMark={false}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Spacer size={30} />
              <Form.Item
                style={{ marginBottom: 0, paddingBottom: 0, fontWeight: 'bolder' }}
                label="Username"
                name="phone_number"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input
                  style={{ borderRadius: 8, border: '1px solid #AAAAAA', padding: 10 }}
                  placeholder="Type your NIK, Email, Phone Number"
                />
              </Form.Item>

              <Spacer size={20} />
              <Form.Item
                style={{ marginBottom: 0, paddingBottom: 0, fontWeight: 'bolder' }}
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password
                  style={{ borderRadius: 8, border: '1px solid #AAAAAA', padding: 10 }}
                  placeholder="Type your password"
                />
              </Form.Item>
              <Spacer size={10} />

              <div style={{ display: 'flex', justifyContent: 'end' }}>
                <a style={{ color: '#EB008B' }} href="">
                  Forgot password
                </a>
              </div>
              <Spacer size={30} />
              <Form.Item>
                <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                  Login
                </Button>
              </Form.Item>
            </Form>

            <span>
              New user? <a style={{ color: '#EB008B' }}>Create an account</a>
            </span>
          </div>
        </Spin>
      </Card>

      {/* <Spacer size={40} />
      <div style={{ position: 'absolute', bottom: 0 }}>
        <Image src={'/eds/icons/footer-login-dark.svg'} layout="fill" />
        <Image src={'/eds/icons/footer-login-light.svg'} layout="fill" />
      </div> */}
    </Layout>
  )
}
