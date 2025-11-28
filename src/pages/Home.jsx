import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import Services from "../components/Services.jsx";

export default function Home() {
    return (
        <>
            <Navbar />
            <div className="pt-20">
                <Hero />
                <Services />

            </div>
        </>
    );
}
