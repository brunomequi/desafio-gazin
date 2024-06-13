import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message, Spin } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../utils/api';

const LevelForm: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLevel = async () => {
      if (id) {
        setLoadingData(true);
        try {
          const response = await api.get(`/niveis/${id}`);
          const level = response.data;
          form.setFieldsValue(level);
        } catch (error) {
          message.error('Erro ao carregar nível!');
        } finally {
          setLoadingData(false);
        }
      }
    };

    fetchLevel();
  }, [id, form]);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      if (id) {
        await api.put(`/niveis/${id}`, values);
        message.success('Nível atualizado com sucesso!');
      } else {
        await api.post('/niveis', values);
        message.success('Nível cadastrado com sucesso!');
        form.resetFields();
      }
      navigate('/levels');
    } catch (error) {
      message.error('Erro ao salvar nível!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Spin spinning={loadingData}>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          name="nivel"
          label="Nome do Nível"
          rules={[{ required: true, message: 'Por favor, insira o nome do nível!' }]}
        >
          <Input disabled={loadingData} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} disabled={loadingData}>
            {id ? 'Atualizar Nível' : 'Cadastrar Nível'}
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default LevelForm;
