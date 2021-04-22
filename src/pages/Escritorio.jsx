import React, { useContext, useState } from 'react'
import { Button, Col, Divider, Row, Typography } from 'antd'
import { CloseCircleOutlined, RightOutlined } from '@ant-design/icons'
import { useOcultarMenu } from '../hooks/useOcultarMenu'

import { getUsuarioStorage } from '../helpers/getUsuarioStorage'
import { useHistory, Redirect } from 'react-router'
import { SocketContext } from '../context/SocketContext'

const { Title, Text } = Typography

export const Escritorio = () => {

    const history = useHistory()
    const { socket } = useContext(SocketContext)
    const [ticket, setTicket] = useState(null)

    useOcultarMenu(false)
    const [usuario] = useState(getUsuarioStorage())

    const salirSesion = () => {
        localStorage.clear();
        history.replace('./ingresar')

    }

    const siguienteTicket = () => {

        socket.emit('siguiente-ticket-agente', usuario, (ticket) => {
            setTicket(ticket)
        })
    }



    if (!usuario.agente || !usuario.escritorio) {
        return <Redirect to="/ingresar" />
    }


    return (

        <>
            <Row>
                <Col span={18} >
                    <Title> {usuario.agente} </Title>
                    <Text> Ud esta trabajando en el escritorio: </Text>
                    <Text
                        type="success"
                        style={{ fontSize: 20 }}
                    >
                        {usuario.escritorio}
                    </Text>
                </Col>

                <Col span={6} align="right" >
                    <Button
                        onClick={salirSesion}
                        type="danger"
                        shape="round"
                    >
                        <CloseCircleOutlined />
                    Salir

                 </Button>
                </Col>


                <Divider />

                {
                    ticket && (
                        <Col span={18} >

                            <Text> Está atendiendo el ticket: </Text>
                            <Text
                                type="danger"
                                level={2}
                                style={{ fontSize: 30 }}

                            >
                                {ticket.numero}
                            </Text>
                        </Col>
                    )
                }

                <Col span={6} align="right" >
                    <Button
                        onClick={siguienteTicket}
                        type="primary"
                        shape="round"

                    >
                        <RightOutlined />
                    Siguiente ticket

                 </Button>
                </Col>
            </Row>
        </>
    )
}
