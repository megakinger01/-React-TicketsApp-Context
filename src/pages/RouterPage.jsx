import React, { useContext } from 'react'
import { Layout, Menu } from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';

import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import { UiContext } from '../context/UiContext'
import { Ingresar } from './Ingresar';
import { Cola } from './Cola';
import { CrearTicket } from './CrearTicket';
import { Escritorio } from './Escritorio';

const { Header, Content, Footer, Sider } = Layout;

export const RouterPage = () => {

    const { ocultar } = useContext(UiContext)
    return (
        <Router>
            <Layout style={{ height: '100vh' }}>
                <Sider
                    breakpoint="lg"
                    hidden={ocultar}
                >
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['2']}>
                        <Menu.Item key="1" icon={<UserOutlined />}>
                            <Link to="/ingresar">
                                Ingresar
                        </Link>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                            <Link to="/cola">
                                Cola
                        </Link>

                        </Menu.Item>
                        <Menu.Item key="3" icon={<UploadOutlined />}>
                            <Link to="/crearticket">
                                Crear ticket
                        </Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
                    <Content style={{ margin: '24px 16px 0' }}>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 500 }}>
                            <Switch>
                                <Route path="/ingresar" component={Ingresar} />
                                <Route path="/cola" component={Cola} />
                                <Route path="/crearticket" component={CrearTicket} />
                                <Route path="/escritorio" component={Escritorio} />
                                <Redirect to="/ingresar" />
                            </Switch>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2021 Pedro App React </Footer>
                </Layout>
            </Layout>
        </Router>


    )

}
