import React, { useEffect, useState } from 'react';
import { Space, Table, Button, message, Modal } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { api } from '../../utils/api';
import { LevelsResponse, Level } from './types';

const LevelsPage = () => {
  const [levels, setLevels] = useState<Level[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const navigate = useNavigate();

  const fetchLevels = async (page = 1, pageSize = 10, sortBy?: string, sortOrder?: string) => {
    setLoading(true);
    try {
      const response = await api.get<LevelsResponse>('/niveis', {
        params: {
          page,
          per_page: pageSize,
          sort_by: sortBy,
          sort_order: sortOrder,
        },
      });
      const { data, meta } = response.data;
      setLevels(
        data.map((level) => ({
          ...level,
          key: level.id.toString(),
        }))
      );
      setPagination({
        current: meta.current_page,
        pageSize: meta.per_page,
        total: meta.total,
      });
    } catch (error) {
      message.error('Erro ao carregar níveis!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLevels();
  }, []);

  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    const { field, order } = sorter;
    const sortOrder = order === 'descend' ? 'desc' : 'asc';
    fetchLevels(pagination.current, pagination.pageSize, field, sortOrder);
  };

  const handleAddLevel = () => {
    navigate('/levels/create');
  };

  const handleEditLevel = (id: number) => {
    navigate(`/levels/edit/${id}`);
  };

  const handleDeleteLevel = async (id: number) => {
    Modal.confirm({
      title: 'Confirmar exclusão',
      content: 'Tem certeza que deseja excluir este nível?',
      okText: 'Sim',
      cancelText: 'Cancelar',
      onOk: async () => {
        try {
          await api.delete(`/niveis/${id}`);
          message.success('Nível excluído com sucesso!');
          fetchLevels(); 
        } catch (error) {
          message.error('Erro ao excluir nível!');
        }
      },
    });
  };

  const columns = [
    {
      title: 'Nível',
      dataIndex: 'nivel',
      key: 'nivel',
      sorter: (a: any, b: any) => a.nivel.localeCompare(b.nivel),
    },
    {
      title: 'Desenvolvedores',
      dataIndex: 'developers_count',
      key: 'developers_count',
      sorter: (a: any, b: any) => a.developers_count - b.developers_count,
    },
    {
      title: 'Ações',
      key: 'action',
      render: (text: any, record: Level) => (
        <Space size="middle">
          <Button type="primary" icon={<EditOutlined />} onClick={() => handleEditLevel(record.id)}>
            Editar
          </Button>
          <Button danger icon={<DeleteOutlined />} onClick={() => handleDeleteLevel(record.id)}>
            Excluir
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={handleAddLevel}>
        Cadastrar Nível
      </Button>
      <br /> <br />
      <Table
        columns={columns}
        dataSource={levels}
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

export default LevelsPage;
