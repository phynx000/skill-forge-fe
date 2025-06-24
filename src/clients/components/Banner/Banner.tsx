import { Layout, theme } from 'antd';


const BannerHomePage = () => {
    const { Content } = Layout;
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (<div className="home-top-content">
        <Layout style={{ padding: '24px 24px 24px' }}>

            <div>
                <Content
                    style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 400,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    Banner ở đây
                </Content>
            </div>


        </Layout>
    </div>)

}

export default BannerHomePage;