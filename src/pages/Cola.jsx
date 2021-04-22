import React, { useContext, useEffect, useState } from 'react'
import { Card, Col, Divider, List, Row, Tag, Typography } from 'antd';
import { useOcultarMenu } from '../hooks/useOcultarMenu';
import { SocketContext } from '../context/SocketContext';
import { getUltimos } from '../helpers/getUltimos';


const { Title, Text } = Typography

const { Item } = List


export const Cola = () => {

    const { socket } = useContext(SocketContext)

    const [ticket, setTicket] = useState([])


    useEffect(() => {

        socket.on('ticket-asignado', (asignados) => {
            setTicket(asignados)
        })
        return () => {
            socket.off('ticket-asignado')
        }
    }, [socket])

    useEffect(() => {
        getUltimos().then(setTicket)
    }, [])

    useOcultarMenu(true)
    return (
        <>
            <Title level={1}>Atendiendo al Cliente</Title>
            <Row>
                <Col span={12} >
                    <List
                        dataSource={ticket.slice(0, 2)}
                        renderItem={item => (
                            <Item>
                                <Card
                                    style={{ width: 300, marginTop: 16 }}
                                    actions={[
                                        <Tag color="volcano">{item.agente}</Tag>,
                                        <Tag color="magenta">Escritorio: {item.escritorio}</Tag>,
                                    ]}
                                >
                                    <Title>No. {item.numero}</Title>
                                </Card>
                            </Item>
                        )}
                    />

                </Col>
                <Col span={12} >
                    <Divider>Historial</Divider>
                    <List
                        dataSource={ticket.slice(0, 3)}
                        renderItem={item => (
                            <Item>
                                <Item.Meta
                                    title={`Ticket No. ${item.numero}`}
                                    description={
                                        <>
                                            <Text type="secondary">En el escritorio: </Text>
                                            <Tag color="magenta">{item.escritorio}</Tag>

                                            <Text type="secondary">Agente: </Text>
                                            <Tag color="volcano">{item.agente}</Tag>
                                        </>
                                    }

                                />
                            </Item>
                        )}
                    >

                    </List>

                </Col>

            </Row>
        </>
    )
}
