import { Alert, Button, Card, Layout, Space, Typography } from 'antd';
import { useState } from 'react';

const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;

export function App() {
  const [statusMessage, setStatusMessage] = useState('Not connected yet');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const checkBackendConnection = async () => {
    setLoading(true);
    setError(null);

    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
      const response = await fetch(`${apiBaseUrl}/health/ready`);

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = (await response.json()) as { status?: string; probe?: string };
      setStatusMessage(
        `Backend ${data.probe ?? 'readiness'} probe responded with status: ${data.status ?? 'unknown'}`,
      );
    } catch (requestError) {
      const message =
        requestError instanceof Error ? requestError.message : 'Unknown request error';
      setError(message);
      setStatusMessage('Connection failed');
    } finally {
      setLoading(false);
    }
  };

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
            <Paragraph>
              API URL from env: <code>{import.meta.env.VITE_API_BASE_URL}</code>
            </Paragraph>
            <Button loading={loading} onClick={checkBackendConnection} type="primary">
              Test Backend Connection
            </Button>
            <Alert
              message={statusMessage}
              showIcon
              type={error ? 'error' : 'success'}
            />
          </Space>
        </Card>
      </Content>
    </Layout>
  );
}
