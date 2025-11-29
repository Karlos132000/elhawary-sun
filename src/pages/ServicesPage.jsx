import { FaSun, FaTools, FaWater } from "react-icons/fa";

// استدعاء الصور من داخل المشروع
import solarSystemImg from "../assets/services/solar-system.jpg";
import solarHeaterImg from "../assets/services/solar-water-heater.jpg";
import maintenanceImg from "../assets/services/solar-maintenance.jpg";

export default function ServicesPage() {
    return (
        <section className="py-20 bg-gray-50" dir="rtl">
            <div className="max-w-7xl mx-auto px-6">

                <h1 className="text-4xl font-bold text-center text-gold mb-10">
                    خدمات شركة الهواري صن للطاقة الشمسية
                </h1>

                <p className="text-center text-gray-700 max-w-3xl mx-auto mb-16 leading-relaxed">
                    نقدم أفضل حلول الطاقة الشمسية في مصر بجودة عالية وخبرة طويلة
                    في التنفيذ والصيانة. إليك خدماتنا الأساسية:
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">

                    {/* Service 1 */}
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition">
                        <img
                            src={solarSystemImg}
                            className="w-full h-64 object-cover"
                            alt="محطات الطاقة الشمسية"
                        />
                        <div className="p-6">
                            <div className="flex items-center gap-3 mb-3">
                                <FaSun className="text-gold text-3xl" />
                                <h2 className="text-2xl font-bold">محطات الطاقة الشمسية</h2>
                            </div>

                            <p className="text-gray-700 leading-relaxed">
                                تصميم وتوريد وتنفيذ محطات شمسية عالية الكفاءة للمنازل، المزارع
                                والمشروعات الصناعية. نستخدم ألواح وإنفرترات معتمدة بضمانات قوية.
                            </p>

                            <a
                                href="/quote"
                                className="block mt-5 bg-gold py-2 rounded-lg text-center font-bold hover:opacity-90"
                            >
                                اطلب الخدمة
                            </a>
                        </div>
                    </div>

                    {/* Service 2 */}
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition">
                        <img
                            src={solarHeaterImg}
                            className="w-full h-64 object-cover"
                            alt="سخانات الطاقة الشمسية"
                        />
                        <div className="p-6">
                            <div className="flex items-center gap-3 mb-3">
                                <FaWater className="text-blue-500 text-3xl" />
                                <h2 className="text-2xl font-bold">سخانات الطاقة الشمسية</h2>
                            </div>

                            <p className="text-gray-700 leading-relaxed">
                                توريد وتركيب سخانات شمسية بأنواع متعددة. نوفر أفضل الأنظمة
                                لتوفير المياه الساخنة طوال العام مع تقليل فاتورة الكهرباء.
                            </p>

                            <a
                                href="/quote"
                                className="block mt-5 bg-gold py-2 rounded-lg text-center font-bold hover:opacity-90"
                            >
                                اطلب الخدمة
                            </a>
                        </div>
                    </div>

                    {/* Service 3 */}
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition">
                        <img
                            src={maintenanceImg}
                            className="w-full h-64 object-cover"
                            alt="الصيانة والدعم الفني"
                        />
                        <div className="p-6">
                            <div className="flex items-center gap-3 mb-3">
                                <FaTools className="text-gray-700 text-3xl" />
                                <h2 className="text-2xl font-bold">الصيانة والدعم الفني</h2>
                            </div>

                            <p className="text-gray-700 leading-relaxed">
                                صيانة دورية، تنظيف الألواح الشمسية، متابعة الأداء،
                                وتشخيص الأعطال واستبدال القطع التالفة لضمان أفضل إنتاجية للنظام.
                            </p>

                            <a
                                href="/quote"
                                className="block mt-5 bg-gold py-2 rounded-lg text-center font-bold hover:opacity-90"
                            >
                                اطلب الخدمة
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
