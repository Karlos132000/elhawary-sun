import heroImg from "../assets/img.png";

export default function Hero() {
    return (
        <section className="relative h-[90vh] flex items-center justify-center text-center text-white overflow-hidden">

            {/* Background Image */}
            <div className="absolute inset-0">
                <img
                    src={heroImg}
                    alt="Solar Panels"
                    className="w-full h-full object-cover brightness-[0.75]"
                />
            </div>

            {/* Dark Overlay for clarity */}
            <div className="absolute inset-0 bg-black/30"></div>

            {/* Content */}
            <div className="relative z-10 px-6 animate-fadeIn">
                <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-xl">
                    الهواري صن للطاقة الشمسية
                </h1>

                <p className="text-lg md:text-2xl mb-8 opacity-95 drop-shadow">
                    توريد – تركيب – صيانة محطات وسخانات الطاقة الشمسية
                </p>

                <a
                    href="/quote"
                    className="bg-gold px-10 py-3 rounded-xl text-black font-bold text-lg shadow-md hover:bg-yellow-500 transition transform hover:scale-105"
                >
                    اطلب عرض سعر
                </a>
            </div>
        </section>
    );
}
