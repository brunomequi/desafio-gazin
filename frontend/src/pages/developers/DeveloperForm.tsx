import React, { useEffect, useState } from 'react';
import { Form, Input, Select, DatePicker, Button, message, Spin } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../utils/api';
import moment from 'moment';

const { Option } = Select;

const DeveloperForm: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [levels, setLevels] = useState<any[]>([]);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLevels = async () => {
      setLoadingData(true);
      try {
        const response = await api.get('/niveis');
        if (Array.isArray(response.data.data)) {
          setLevels(response.data.data);
        } else {
          throw new Error('Formato inesperado de resposta da API');
        }
      } catch (error) {
        message.error('Erro ao carregar níveis!');
      } finally {
        setLoadingData(false);
      }
    };

    fetchLevels();
  }, []);

  useEffect(() => {
    const fetchDeveloper = async () => {
      if (id) {
        setLoadingData(true);
        try {
          const response = await api.get(`/desenvolvedores/${id}`);
          const developer = response.data;
          form.setFieldsValue({
            ...developer,
            data_nascimento: moment(developer.data_nascimento),
          });
        } catch (error) {
          message.error('Erro ao carregar desenvolvedor!');
        } finally {
          setLoadingData(false);
        }
      }
    };

    fetchDeveloper();
  }, [id, form]);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const data = {
        ...values,
        data_nascimento: values.data_nascimento.format('YYYY-MM-DD'),
      };
      if (id) {
        await api.put(`/desenvolvedores/${id}`, data);
        message.success('Desenvolvedor atualizado com sucesso!');
      } else {
        await api.post('/desenvolvedores', data);
        message.success('Desenvolvedor cadastrado com sucesso!');
        form.resetFields();
      }
      navigate('/developers');
    } catch (error) {
      message.error('Erro ao salvar desenvolvedor!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Spin spinning={loadingData}>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item name="nivel_id" label="Nível" rules={[{ required: true, message: 'Por favor, selecione o nível!' }]}>
          <Select placeholder="Selecione um nível" loading={loadingData} disabled={loadingData}>
            {levels.map((level: any) => (
              <Option key={level.id} value={level.id}>
                {level.nivel}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="nome" label="Nome" rules={[{ required: true, message: 'Por favor, insira o nome do desenvolvedor!' }]}>
          <Input disabled={loadingData} />
        </Form.Item>
        <Form.Item name="sexo" label="Sexo" rules={[{ required: true, message: 'Por favor, selecione o sexo!' }]}>
          <Select placeholder="Selecione o sexo" disabled={loadingData}>
            <Option value="M">Masculino</Option>
            <Option value="F">Feminino</Option>
          </Select>
        </Form.Item>
        <Form.Item name="data_nascimento" label="Data de Nascimento" rules={[{ required: true, message: 'Por favor, insira a data de nascimento!' }]}>
          <DatePicker disabled={loadingData} />
        </Form.Item>
        <Form.Item name="hobby" label="Hobby" rules={[{ required: true, message: 'Por favor, insira o hobby!' }]}>
          <Input disabled={loadingData} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} disabled={loadingData}>
            {id ? 'Atualizar Desenvolvedor' : 'Cadastrar Desenvolvedor'}
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default DeveloperForm;
