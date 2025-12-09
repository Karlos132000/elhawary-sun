import { FaPhoneAlt, FaWhatsapp, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";

export default function Contact() {
    return (
        <section className="min-h-screen bg-gray-50 flex justify-center items-start pt-32 px-4">
            <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-3xl" dir="rtl">

                <h2 className="text-4xl font-bold text-center mb-6 border-b-4 border-gray-200 pb-2">
                    تواصل معنا
                </h2>

                <div className="space-y-8 text-xl font-semibold text-gray-800">

                    <p className="flex items-center gap-3">
                        <FaPhoneAlt className="text-pink-600 text-2xl" />
                        <span>رقم الهاتف:</span>
                        <span className="text-gray-700 font-normal">01271361380</span>
                    </p>

                    <p className="flex items-center gap-3">
                        <FaWhatsapp className="text-green-600 text-3xl" />
                        <span>واتساب:</span>
                        <span className="text-gray-700 font-normal">01001993667</span>
                    </p>

                    <p className="flex items-center gap-3">
                        <FaMapMarkerAlt className="text-red-600 text-3xl" />
                        <span>العنوان:</span>
                        <span className="text-gray-700 font-normal">مصر - المنيا</span>
                    </p>

                    <p className="flex items-center gap-3">
                        <FaEnvelope className="text-blue-600 text-2xl" />
                        <span>البريد الإلكتروني:</span>
                        <span className="text-gray-700 font-normal">elhawarysun@gmail.com</span>
                    </p>

                </div>
            </div>
        </section>
    );
}
