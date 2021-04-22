import React, { useContext, useState } from 'react'
import { Button, Col, Row, Typography } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'
import { useOcultarMenu } from '../hooks/useOcultarMenu'
import { SocketContext } from '../context/SocketContext'


const { Title, Text } = Typography


export const CrearTicket = () => {

    const { socket } = useContext(SocketContext)

    const [ticket, setTicket] = useState(null)

    const nuevoTicket = () => {
        socket.emit('solicitar-ticket', null, (ticket) => {
            setTicket(ticket)
        })

    }

    useOcultarMenu(true)
    return (
        <>
            <Row>
                <Col span={22}>
                    <Title
                        level={3}
                        align="center"
                    >
                        Presione el botón para un nuevo ticket
                    </Title>
                </Col>
                <Col span={22} align="center">
                    <Button
                        type="primary"
                        size="large"
                        icon={<DownloadOutlined />}
                        shape="round"
                        onClick={nuevoTicket}
                    >
                        Nuevo Ticket
                    </Button>
                </Col>
            </Row>

            {
                ticket &&
                (
                    <Row style={{ marginTop: 100 }}>
                        <Col span={22} align="center">
                            <Text>Su número</Text>
                        </Col>
                        <Col span={22} align="center">
                            <Title
                                type="success"
                                style={{ fontSize: 55 }}

                            >
                                {ticket.numero}
                            </Title>
                        </Col>
                    </Row>
                )
            }

        </>
    )
}
