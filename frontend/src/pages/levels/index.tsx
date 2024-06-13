import { Space, Table, Button } from 'antd';
import type { TableProps } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { api } from '../../utils/api';
import { LevelsResponse, Level } from './types';

const columns: TableProps<Level>['columns'] = [
  {
    title: 'Nível',
    dataIndex: 'nivel',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size='middle'>
        <a>Editar</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const LevelsPage = () => {
  const [response, setResponse] = useState<LevelsResponse>({} as LevelsResponse);
  const navigate = useNavigate(); // Use useNavigate hook

  const { data = [], meta } = response;

  useEffect(() => {
    api.get<LevelsResponse>('/niveis').then((response) => {
      setResponse(response.data);
    });
  }, []);

  const handleAddLevel = () => {
    navigate('/levels/create'); // Programmatically navigate to create route
  };

  return (
    <div>
      <Button type="primary" onClick={handleAddLevel}>
        Cadastrar Nível
      </Button>
      <br /> <br /> {/* Add spacing for better layout */}
      <Table columns={columns} dataSource={data} rowKey="id" />
    </div>
  );
};

export default LevelsPage;
