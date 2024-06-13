import React, { useEffect, useState } from 'react';
import { Form, Input, Select, DatePicker, Button, message } from 'antd';
import axios from 'axios';
import { api } from '../../utils/api';

const { Option } = Select;

const DeveloperForm: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [levels, setLevels] = useState<any[]>([]);  // Inicialize levels como um array vazio

  useEffect(() => {
    const fetchLevels = async () => {
      try {
        const response = await api.get('/niveis');
        console.log('Teste',response);
        if (Array.isArray(response.data.data)) {
          setLevels(response.data.data);
        } else {
          throw new Error('Formato inesperado de resposta da API');
        }
      } catch (error) {
        message.error('Erro ao carregar níveis!');
      }
    };

    fetchLevels();
  }, []);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const data = {
        ...values,
        data_nascimento: values.data_nascimento.format('YYYY-MM-DD'),
      };
      await api.post('/desenvolvedores', data);
      message.success('Desenvolvedor cadastrado com sucesso!');
      form.resetFields();
    } catch (error) {
      message.error('Erro ao cadastrar desenvolvedor!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item name="nivel_id" label="Nível" rules={[{ required: true, message: 'Por favor, selecione o nível!' }]}>
        <Select placeholder="Selecione um nível" loading={levels.length === 0}>
          {levels.map((level: any) => (
            <Option key={level.id} value={level.id}>
              {level.nivel}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="nome" label="Nome" rules={[{ required: true, message: 'Por favor, insira o nome do desenvolvedor!' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="sexo" label="Sexo" rules={[{ required: true, message: 'Por favor, selecione o sexo!' }]}>
        <Select placeholder="Selecione o sexo">
          <Option value="M">Masculino</Option>
          <Option value="F">Feminino</Option>
        </Select>
      </Form.Item>
      <Form.Item name="data_nascimento" label="Data de Nascimento" rules={[{ required: true, message: 'Por favor, insira a data de nascimento!' }]}>
        <DatePicker />
      </Form.Item>
      <Form.Item name="hobby" label="Hobby" rules={[{ required: true, message: 'Por favor, insira o hobby!' }]}>
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Cadastrar Desenvolvedor
        </Button>
      </Form.Item>
    </Form>
  );
};

export default DeveloperForm;
