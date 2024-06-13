import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';

const { Content, Sider } = Layout;

const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();

  return (
    <Layout style={{ background: colorBgContainer, borderRadius: borderRadiusLG, height: '100vh' }}>
      <Sider style={{ background: colorBgContainer, padding: '24px 0' }} width={200}>
        <Menu
          mode='inline'
          defaultSelectedKeys={['levels']}
          defaultOpenKeys={['levels']}
          style={{ height: '100%' }}
          items={[
            {
              key: 'levels',
              icon: <UserOutlined />,
              label: 'Níveis',
              onClick: () => {
                navigate('/levels');
              },
            },
            {
              key: 'developers',
              icon: <UserOutlined />,
              label: 'Desenvolvedores',
              onClick: () => {
                navigate('/developers');
              },
            },
          ]}
        />
      </Sider>
      <Content style={{ padding: '24px' }}>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default App;
