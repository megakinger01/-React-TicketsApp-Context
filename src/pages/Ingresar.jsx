import React, { useState } from 'react'
import { Form, Input, Button, InputNumber, Typography, Divider } from 'antd';
import { SaveOutlined } from '@ant-design/icons'
import { Redirect, useHistory } from 'react-router';
import { useOcultarMenu } from '../hooks/useOcultarMenu';
import { getUsuarioStorage } from '../helpers/getUsuarioStorage';



const { Title, Text } = Typography

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

export const Ingresar = () => {

    const history = useHistory()

    const [usuario] = useState(getUsuarioStorage())
    // console.log(usuario);

    useOcultarMenu(false)

    const onFinish = ({ agente, escritorio }) => {
        // console.log('Success:', agente , escritorio );

        localStorage.setItem('agente', agente)
        localStorage.setItem('escritorio', escritorio)

        history.push('./escritorio')
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    if (usuario.agente && usuario.escritorio) {
        return <Redirect to="/escritorio" />
    }

    return (
        <>
            <Title>Ingresar</Title>
            <Text> Por favor ingrese su nombre y escritorio</Text>
            <Divider />
            <Form
                {...layout}
                name="basic"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Agente"
                    name="agente"
                    rules={[
                        {
                            required: true,
                            message: 'Ingrese su nombre!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="escritorio"
                    name="escritorio"
                    rules={[
                        {
                            required: true,
                            message: 'Ingrese su escritorio!',
                        },
                    ]}
                >
                    <InputNumber />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        shape="round"

                    >
                        <SaveOutlined />
                    Ingresar
        </Button>
                </Form.Item>
            </Form>
        </>
    )
}
