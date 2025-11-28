export default function About() {
    return (
        <section className="w-full min-h-screen bg-gray-50 flex justify-center items-start pt-40 pb-20 px-6">
            <div className="max-w-4xl w-full bg-white shadow-lg rounded-3xl p-10 text-right">

                {/* العنوان */}
                <h1 className="text-5xl font-extrabold text-black mb-6 border-b border-gray-300 pb-3">
                    من نحن
                </h1>

                {/* النص */}
                <p className="text-xl text-gray-700 leading-relaxed mb-6">
                    شركة <span className="font-bold text-gold">الهواري صن</span>
                    متخصصة في توريد وتركيب وصيانة محطات الطاقة الشمسية والسخانات الشمسية.
                    نمتلك خبرة واسعة في تنفيذ المشاريع السكنية والصناعية والزراعية.
                </p>

                <p className="text-xl text-gray-700 leading-relaxed">
                    هدفنا هو توفير حلول طاقة فعالة وعالية الجودة تناسب احتياجات العملاء
                    مع الالتزام بالمعايير الهندسية وأعلى درجات الأمان والجودة.
                </p>

            </div>
        </section>
    );
}
