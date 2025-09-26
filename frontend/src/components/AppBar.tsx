import { useNavigate } from "react-router-dom";

export default function AppBar() {
    const navigate = useNavigate();
    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md py-4 px-6 flex items-center justify-between">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate("/")}>
                <img
                    className="w-15 h-15"
                    src="//images.ctfassets.net/2rrb5ka4jpe4/7BI7hqgNS8lfW3j277vflZ/96e8cce679b5e6703440964f8be9cb65/Logo_3_.svg"
                    alt="Verto Quiz Logo"
                />
                <h1 className="text-2xl font-bold text-gray-800">Quiz</h1>
            </div>
            <nav className="space-x-4">
                <a
                    href="/"
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                    Home
                </a>
            </nav>
        </header>
    );
}
