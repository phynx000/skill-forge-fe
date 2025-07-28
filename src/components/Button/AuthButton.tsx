import { Link } from "react-router-dom";
import "./AuthButton.scss"

const AuthButtons = () => {
    return (
        <div className="flex items-center gap-4 auth-buttons">
            <Link
                to="/login"
                className="px-4 py-2 rounded text-white transition text-auth auth-login-btn"
                style={{ backgroundColor: '#c800de' }}
            >
                <span className="text-auth">Đăng nhập</span>
            </Link>
            <Link
                to="/register"
                className="px-4 py-2 rounded border transition text-auth auth-register-btn"
                style={{ borderColor: '#c800de', color: '#c800de' }}
            >
                <span className="text-auth">Đăng ký</span>
            </Link>
        </div>
    );
};

export default AuthButtons;