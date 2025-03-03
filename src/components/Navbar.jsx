import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaLaptopMedical } from "react-icons/fa";
import { MdMenu, MdOutlineShoppingCart } from "react-icons/md";
import ResponsiveMenu from "./ResponsiveMenu";

export default function Navigation() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const token =
        localStorage.getItem("patienttoken") ||
        localStorage.getItem("doctortoken") ||
        localStorage.getItem("verifiertoken") ||
        localStorage.getItem("admintoken");

    const NavbarMenu = [
        {
            id: 1,
            title: "Home",
            link: "/"
        },
        {
            id: 2,
            title: "Video Call",
            link: "/"
        },
        {
            id: 3,
            title: "Book Appointment",
            link: "/book-appointment"
        },
        {
            id: 4,
            title: "About",
            link: "/"
        },
        {
            id: 5,
            title: "Contact",
            link: "/"
        },
    ]

    useEffect(() => {
        if (token) {
            const fetchUserProfile = async () => {
                try {
                    const response = await fetch("http://localhost:8080/patient/get", {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setUser(data);
                        setLoading(false);
                    } else if (response.status === 401 || response.status === 403) {
                        localStorage.removeItem("token");
                        setUser(null);
                        setLoading(false);
                        navigate("/login");
                    } else {
                        setLoading(false);
                        setUser(null);
                        return (
                            <div>
                                <p>Failed to fetch user profile. Please log in.</p>
                                <button onClick={() => (window.location.href = "/login")}>
                                    Login
                                </button>
                            </div>
                        );
                    }
                } catch (error) {
                    setError(error.message);
                    setLoading(false);
                }
            };

            fetchUserProfile();
        } else {
            setLoading(false);
        }
    }, [token, navigate]);

    const handleNavigation = (e) => {
        if (!currentUser) {
            e.preventDefault();
            toast.error("Please log in first", { autoClose: 2000 });
            navigate("/login");
            return;
        }

        switch (currentUser.role) {
            case "USER":
                // Allow navigation to "My Assessments"
                break;
            case "TUTOR":
                navigate("/tutor_dashboard");
                break;
            case "ADMIN":
                navigate("/admin_dashboard");
                break;
            default:
                e.preventDefault();
                toast.error("Unauthorized access", { autoClose: 2000 });
                navigate("/login");
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const handleLogout = () => {
        const tokenKey = ["patienttoken", "doctortoken", "verifiertoken", "admintoken"].find(key => localStorage.getItem(key));
        if (tokenKey) localStorage.removeItem(tokenKey);
        window.location.reload();
    };

    return (
        <>
            <nav>
                <div className="flex justify-between items-center py-4 bg-back px-5 md:px-14">

                    {/* Logo Section */}
                    <div className="text-2xl flex items-center gap-2 font-bold uppercase">
                        <p className="text-primary">Health</p>
                        <p className="text-secondary">Buddy</p>
                        <FaLaptopMedical className="text-primary" />
                    </div>

                    {/* Menu Section */}
                    <div className="hidden md:block">
                        <ul className="flex items-center gap-6 text-gray-600">
                            {NavbarMenu.map((menu) => (
                                <li key={menu.id} className="text-md">
                                    <a href={menu.link} className="inline-block py-1 px-3 text-primary hover:text-secondary hover:shadow-[0_3px_0_-1px_#ef4444] font-semibold">{menu.title}</a>
                                </li>
                            ))}
                            <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                                {token ? (
                                    <div className="flex items-center">
                                        <div className="mx-5">
                                            <a
                                                href="/"
                                                onClick={handleLogout}
                                                className="text-white bg-red-700 hover:bg-secondary focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center"
                                            >
                                                Logout
                                            </a>
                                        </div>
                                    </div>
                                ) : (
                                    <a
                                        href="/login"
                                        className="text-white bg-primary hover:bg-secondary focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center"
                                    >
                                        Login
                                    </a>
                                )}
                            </div>
                        </ul>
                    </div>

                    {/* Mobile Menu */}
                    <div className="md:hidden flex" onClick={() => setOpen(!open)}>
                        <MdMenu className="text-4xl text-primary" />
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Selection */}
            <ResponsiveMenu open={open} />
        </>
    );
}