import { Link } from "react-router-dom";
import "./AuthButton.scss"

const AuthButtons = () => {
    return (
        <div className="flex items-center gap-4 ">
            <Link
                to="/login"
                className="px-4 py-2 rounded bg-fuchsia-600 text-white hover:bg-blue-600 transition text-auth"
            >
                <span className="text-auth">Đăng nhập</span>
            </Link>
            <Link
                to="/register"
                className="px-4 py-2 rounded border border-fuchsia-600 text-fuchsia-600 hover:bg-blue-50 transition"
            >
                <span className="text-auth">Đăng ký</span>
            </Link>
        </div>
    );
};

export default AuthButtons;