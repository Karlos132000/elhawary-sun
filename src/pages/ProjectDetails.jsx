import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function ProjectDetails() {
    const { id } = useParams();
    const [project, setProject] = useState(null);

    useEffect(() => {
        const load = async () => {
            const ref = doc(db, "projects", id);
            const snap = await getDoc(ref);
            if (snap.exists()) setProject(snap.data());
        };
        load();
    }, [id]);

    if (!project) return <div className="text-center p-20">جار التحميل...</div>;

    return (
        <div className="p-10 max-w-5xl mx-auto" dir="rtl">
            <h1 className="text-4xl font-bold text-gold mb-8 text-center">
                {project.title}
            </h1>

            {/* ⭐ سلايدر كبير جداً */}
            <Swiper
                navigation
                pagination={{ clickable: true }}
                modules={[Navigation, Pagination]}
                className="w-full h-[550px] mb-10 rounded-lg overflow-hidden bg-black/10"
            >
                {project.images?.map((img, i) => (
                    <SwiperSlide key={i} className="flex justify-center items-center">
                        <img
                            src={img}
                            className="w-full h-[550px] object-contain rounded-lg"
                            alt={"slide-" + i}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            <p className="text-lg text-gray-800 leading-8 mt-5 text-center">
                {project.description}
            </p>
        </div>
    );
}
