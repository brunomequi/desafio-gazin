import React, { useEffect, useState } from 'react';
import { Space, Table, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { api } from '../../utils/api';

interface DeveloperType {
  key: string;
  nome: string;
  sexo: string;
  idade: number;
  hobby: string;
}

const columns = [
  {
    title: 'Nome',
    dataIndex: 'nome',
    key: 'nome',
  },
  {
    title: 'Sexo',
    dataIndex: 'sexo',
    key: 'sexo',
  },
  {
    title: 'Idade',
    dataIndex: 'idade',
    key: 'idade',
  },
  {
    title: 'Hobby',
    dataIndex: 'hobby',
    key: 'hobby',
  },
];

const DevelopersPage = () => {
  const [data, setData] = useState<DeveloperType[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const navigate = useNavigate(); // Use useNavigate hook

  const fetchDevelopers = async (page = 1, pageSize = 10) => {
    setLoading(true);
    try {
      const response = await api.get('/desenvolvedores', {
        params: {
          page,
          per_page: pageSize,
        },
      });
      const { data, meta } = response.data;
      setData(
        data.map((dev: any) => ({
          key: dev.id,
          nome: dev.nome,
          sexo: dev.sexo,
          idade: dev.idade,
          hobby: dev.hobby,
        }))
      );
      setPagination({
        current: meta.current_page,
        pageSize: meta.per_page,
        total: meta.total,
      });
    } catch (error) {
      message.error('Erro ao carregar desenvolvedores!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevelopers();
  }, []);

  const handleTableChange = (pagination: any) => {
    fetchDevelopers(pagination.current, pagination.pageSize);
  };

  const handleAddDeveloper = () => {
    navigate('/developers/create'); // Programmatically navigate to create route
  };

  return (
    <div>
      <Button type="primary" onClick={handleAddDeveloper}>
        Cadastrar Desenvolvedor
      </Button>
      <br /> <br /> {/* Add spacing for better layout */}
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
        }}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default DevelopersPage;
