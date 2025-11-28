import { FaCogs, FaTools, FaSolarPanel, FaHotTub } from "react-icons/fa";

export default function Services() {
    return (
        <section className="bg-white py-20" dir="rtl">
            <div className="max-w-7xl mx-auto px-6 text-center">

                {/* عنوان الصفحة */}
                <h2 className="text-4xl font-bold mb-12 relative inline-block">
                    خدماتنا
                    <span className="block w-24 h-1 bg-gold mx-auto mt-3 rounded-full"></span>
                </h2>

                {/* كروت الخدمات */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                    {/* خدمة 1 */}
                    <div className="bg-white shadow-lg rounded-xl p-8 border border-gray-200
                                    hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">
                        <FaSolarPanel className="text-5xl text-gold mx-auto mb-4" />
                        <h3 className="text-2xl font-semibold mb-2">تركيب محطات طاقة شمسية</h3>
                        <p className="text-gray-600 text-lg">
                            تركيب كامل لمنظومات الطاقة الشمسية بجودة عالية وضمان ممتاز.
                        </p>
                    </div>

                    {/* خدمة 2 */}
                    <div className="bg-white shadow-lg rounded-xl p-8 border border-gray-200
                                    hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">
                        <FaHotTub className="text-5xl text-gold mx-auto mb-4" />
                        <h3 className="text-2xl font-semibold mb-2">تركيب سخانات شمسية</h3>
                        <p className="text-gray-600 text-lg">
                            تركيب أنظمة السخانات الشمسية للمنازل والمنشآت.
                        </p>
                    </div>

                    {/* خدمة 3 */}
                    <div className="bg-white shadow-lg rounded-xl p-8 border border-gray-200
                                    hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">
                        <FaCogs className="text-5xl text-gold mx-auto mb-4" />
                        <h3 className="text-2xl font-semibold mb-2">تصميم الأنظمة</h3>
                        <p className="text-gray-600 text-lg">
                            تصميم احترافي للأنظمة والمتطلبات الهندسية للطاقة الشمسية.
                        </p>
                    </div>

                    {/* خدمة 4 */}
                    <div className="bg-white shadow-lg rounded-xl p-8 border border-gray-200
                                    hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">
                        <FaTools className="text-5xl text-gold mx-auto mb-4" />
                        <h3 className="text-2xl font-semibold mb-2">صيانة الإنفرترات والبطاريات</h3>
                        <p className="text-gray-600 text-lg">
                            صيانة وتشخيص الأعطال وتحسين كفاءة النظام.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}
