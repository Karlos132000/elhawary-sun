export default function AboutPage() {
    return (
        <section className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-24 px-6 flex justify-center" dir="rtl">

            <div className="max-w-4xl bg-white shadow-2xl rounded-3xl p-12 text-center transform transition-all duration-700 hover:shadow-[0_0_25px_rgba(0,0,0,0.15)] animate-fadeIn">

                {/* أيقونة فوق العنوان */}
                <div className="flex justify-center mb-4">
                    <span className="text-gold text-5xl">☀️</span>
                </div>

                {/* عنوان */}
                <h2 className="text-5xl font-extrabold text-gray-900 mb-4">
                    من نحن
                </h2>

                <div className="w-28 h-1 bg-gold mx-auto mb-8 rounded-full"></div>

                {/* فقرة 1 */}
                <p className="text-xl leading-loose text-gray-800 mb-6">
                    شركة <span className="text-gold font-bold">الهواري صن</span> متخصصة في
                    توريد وتركيب وصيانة محطات الطاقة الشمسية والسخانات الشمسية.
                    نمتلك خبرة واسعة في تنفيذ المشاريع السكنية والصناعية والزراعية.
                </p>

                {/* فقرة 2 */}
                <p className="text-xl leading-loose text-gray-800">
                    هدفنا هو توفير حلول طاقة فعّالة وعالية الجودة تلائم احتياجات العملاء
                    مع الالتزام بالمعايير الهندسية وأعلى درجات الأمان والجودة.
                </p>
            </div>
        </section>
    );
}
