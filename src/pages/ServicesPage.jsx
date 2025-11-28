import Navbar from "../components/Navbar.jsx";
import Services from "../components/Services.jsx";

export default function ServicesPage() {
    return (
        <>
            <Navbar />
            <div className="pt-20">
                <Services />
            </div>
        </>
    );
}
