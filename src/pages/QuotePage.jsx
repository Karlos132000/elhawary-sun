export default function QuotePage() {
    return (
        <section className="min-h-screen bg-gray-50 py-20 px-4" dir="rtl">
            <h2 className="text-center text-4xl font-bold text-gold mb-10">
                اطلب عرض سعر
            </h2>

            <form
                action="https://formspree.io/f/mangaqag"
                method="POST"
                className="max-w-3xl mx-auto bg-white p-10 rounded-3xl shadow-xl space-y-6"
            >
                <input
                    type="text"
                    name="name"
                    placeholder="الاسم"
                    required
                    className="w-full border border-gray-300 rounded-xl p-4"
                />

                <input
                    type="text"
                    name="phone"
                    placeholder="رقم الهاتف"
                    required
                    className="w-full border border-gray-300 rounded-xl p-4"
                />

                <input
                    type="text"
                    name="city"
                    placeholder="المحافظة"
                    required
                    className="w-full border border-gray-300 rounded-xl p-4"
                />

                <textarea
                    name="system"
                    placeholder="نوع النظام المطلوب (محطة – سخان – بطاريات…)"
                    required
                    className="w-full border border-gray-300 rounded-xl p-4 h-32"
                ></textarea>

                <button
                    type="submit"
                    className="w-full bg-gold text-black font-bold py-4 rounded-xl hover:scale-105 transition"
                >
                    إرسال الطلب
                </button>
            </form>
        </section>
    );
}
