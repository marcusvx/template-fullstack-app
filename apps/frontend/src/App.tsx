import { Button, Card, Layout, Space, Typography } from 'antd';

const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;

export function App() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header>
        <Title style={{ color: '#fff', margin: 0 }} level={4}>
          template Scaffold
        </Title>
      </Header>
      <Content style={{ padding: 24 }}>
        <Card>
          <Space direction="vertical" size="middle">
            <Title level={3}>React + Vite + Ant Design</Title>
            <Paragraph>
              This frontend app is ready to connect with the NestJS API in
              <code>apps/backend</code>.
            </Paragraph>
            <Button type="primary">Start Building</Button>
          </Space>
        </Card>
      </Content>
    </Layout>
  );
}
