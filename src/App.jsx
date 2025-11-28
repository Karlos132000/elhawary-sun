import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRouter from "./router/AppRouter";

export default function App() {
    return (
        <div className="flex flex-col min-h-screen">

            {/* NAVBAR */}
            <header>
                <Navbar />
            </header>

            {/* PAGES */}
            <main className="flex-grow pt-20">
                <AppRouter />
            </main>

            {/* FOOTER */}
            <footer>
                <Footer />
            </footer>
        </div>
    );
}
