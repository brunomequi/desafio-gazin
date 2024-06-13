import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { api } from '../../utils/api';

const LevelForm: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: { nivel: string }) => {
    setLoading(true);
    try {
      await api.post('/niveis', values);
      message.success('Nível cadastrado com sucesso!');
      form.resetFields();
    } catch (error) {
      message.error('Erro ao cadastrar nível!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item name="nivel" label="Nome do Nível" rules={[{ required: true, message: 'Por favor, insira o nome do nível!' }]}>
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Cadastrar Nível
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LevelForm;
