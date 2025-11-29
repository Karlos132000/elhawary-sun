import heroImg from "../assets/hero2.jpg";

export default function Hero() {
    return (
        <section className="relative h-screen flex items-center justify-center text-center text-white">

            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${heroImg})` }}
            ></div>

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Content */}
            <div className="relative z-10 px-4 max-w-3xl">
                <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight drop-shadow-lg">
                    الهواري صن للطاقة الشمسية
                </h1>

                <p className="text-2xl md:text-3xl mb-10 opacity-95 drop-shadow-md">
                    توريد – تركيب – صيانة محطات وسخانات الطاقة الشمسية
                </p>

                <a
                    href="/quote"
                    className="bg-gold px-10 py-4 rounded-xl text-black font-bold text-2xl shadow-xl hover:scale-105 transition duration-300"
                >
                    اطلب عرض سعر الآن
                </a>
            </div>
        </section>
    );
}
