import React, { useEffect, useState } from 'react';
import { Space, Table, Button, message, Modal } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { api } from '../../utils/api';

interface DeveloperType {
  id: number;
  key: string;
  nome: string;
  sexo: string;
  idade: number;
  hobby: string;
  nivel: string;
}

const DevelopersPage = () => {
  const [data, setData] = useState<DeveloperType[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const navigate = useNavigate();

  const fetchDevelopers = async (page = 1, pageSize = 10, sortBy?: string, sortOrder?: string) => {
    setLoading(true);
    try {
      const response = await api.get('/desenvolvedores', {
        params: {
          page,
          per_page: pageSize,
          sort_by: sortBy,
          sort_order: sortOrder,
        },
      });
      const { data, meta } = response.data;
      setData(
        data.map((dev: any) => ({
          id: dev.id,
          key: dev.id.toString(),
          nome: dev.nome,
          sexo: dev.sexo,
          idade: dev.idade,
          hobby: dev.hobby,
          nivel: dev.nivel.nivel,
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

  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    const { field, order } = sorter;
    const sortOrder = order === 'descend' ? 'desc' : 'asc';
    fetchDevelopers(pagination.current, pagination.pageSize, field, sortOrder);
  };

  const handleAddDeveloper = () => {
    navigate('/developers/create');
  };

  const handleEditDeveloper = (id: number) => {
    navigate(`/developers/edit/${id}`);
  };

  const handleDeleteDeveloper = async (id: number) => {
    Modal.confirm({
      title: 'Confirmar exclusão',
      content: 'Tem certeza que deseja excluir este desenvolvedor?',
      okText: 'Sim',
      cancelText: 'Cancelar',
      onOk: async () => {
        try {
          await api.delete(`/desenvolvedores/${id}`);
          message.success('Desenvolvedor excluído com sucesso!');
          fetchDevelopers();
        } catch (error) {
          message.error('Erro ao excluir desenvolvedor!');
        }
      },
    });
  };

  const columns = [
    {
      title: 'Nome',
      dataIndex: 'nome',
      key: 'nome',
      sorter: (a: any, b: any) => a.nome.localeCompare(b.nome),
    },
    {
      title: 'Sexo',
      dataIndex: 'sexo',
      key: 'sexo',
      sorter: (a: any, b: any) => a.sexo.localeCompare(b.sexo),
    },
    {
      title: 'Idade',
      dataIndex: 'idade',
      key: 'idade',
      sorter: (a: any, b: any) => a.idade - b.idade,
    },
    {
      title: 'Hobby',
      dataIndex: 'hobby',
      key: 'hobby',
      sorter: (a: any, b: any) => a.hobby.localeCompare(b.hobby),
    },
    {
      title: 'Nível',
      dataIndex: 'nivel',
      key: 'nivel',
      sorter: (a: any, b: any) => a.nivel.localeCompare(b.nivel),
    },
    {
      title: 'Ações',
      key: 'action',
      render: (text: any, record: DeveloperType) => (
        <Space size="middle">
          <Button type="primary" icon={<EditOutlined />} onClick={() => handleEditDeveloper(record.id)}>
            Editar
          </Button>
          <Button danger icon={<DeleteOutlined />} onClick={() => handleDeleteDeveloper(record.id)}>
            Excluir
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={handleAddDeveloper}>
        Cadastrar Desenvolvedor
      </Button>
      <br /> <br />
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
