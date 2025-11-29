import { FaSun, FaWater, FaTools } from "react-icons/fa";

import solarSystemImg from "../assets/services/solar-system.jpg";
import solarHeaterImg from "../assets/services/solar-water-heater.jpg";
import maintenanceImg from "../assets/services/solar-maintenance.jpg";

export default function Services() {
    return (
        <section className="py-20 bg-gray-50" dir="rtl">
            <div className="max-w-7xl mx-auto px-6">

                <h2 className="text-3xl font-bold text-center text-gold mb-12">
                    أهم خدماتنا
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

                    {/* 1 */}
                    <div className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition">
                        <img src={solarSystemImg} className="h-56 w-full object-cover" />
                        <div className="p-5">
                            <div className="flex items-center gap-3 mb-2">
                                <FaSun className="text-gold text-2xl" />
                                <h3 className="text-xl font-bold">محطات الطاقة الشمسية</h3>
                            </div>
                            <p className="text-gray-600 text-sm">
                                تصميم وتوريد وتنفيذ محطات طاقة شمسية عالية الكفاءة.
                            </p>
                        </div>
                    </div>

                    {/* 2 */}
                    <div className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition">
                        <img src={solarHeaterImg} className="h-56 w-full object-cover" />
                        <div className="p-5">
                            <div className="flex items-center gap-3 mb-2">
                                <FaWater className="text-blue-500 text-2xl" />
                                <h3 className="text-xl font-bold">سخانات الطاقة الشمسية</h3>
                            </div>
                            <p className="text-gray-600 text-sm">
                                توريد وتركيب سخانات شمسية عالية الجودة.
                            </p>
                        </div>
                    </div>

                    {/* 3 */}
                    <div className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition">
                        <img src={maintenanceImg} className="h-56 w-full object-cover" />
                        <div className="p-5">
                            <div className="flex items-center gap-3 mb-2">
                                <FaTools className="text-gray-700 text-2xl" />
                                <h3 className="text-xl font-bold">الصيانة والدعم الفني</h3>
                            </div>
                            <p className="text-gray-600 text-sm">
                                صيانة دورية – تنظيف – متابعة أداء – تشخيص أعطال.
                            </p>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
}
