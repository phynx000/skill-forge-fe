import { Avatar } from 'antd';
import "./logo.scss"

const Logo = () => {
    return (
        <>
            <div className="">
                <a href={"/"} >
                    <Avatar
                        size={{ xs: 60, sm: 80, md: 80, lg: 80, xl: 80, xxl: 80 }}
                        src="../../../../public/logo-skill-forge.png"
                    />
                </a>

            </div >
        </>);
}


export default Logo;