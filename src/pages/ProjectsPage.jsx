import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

import { Link } from "react-router-dom";

/* Swiper */
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function ProjectsPage() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "projects"), (snap) => {
            setProjects(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        });
        return unsub;
    }, []);

    return (
        <div className="pt-20 pb-20 bg-gray-50" dir="rtl">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-center text-gold mb-10">مشاريعنا</h1>

                <div className="grid md:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <Link to={`/project/${project.id}`} key={project.id}>
                            <div className="bg-white shadow rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition">

                                {/* ⭐ سلايدر الصور */}
                                <Swiper
                                    modules={[Navigation, Pagination]}
                                    navigation={false}
                                    pagination={{ clickable: true }}

                                    // ⭐ أهم جزء: إجبار ارتفاع السلايدر على أندرويد
                                    style={{ width: "100%", height: "230px" }}
                                    className="bg-gray-200 overflow-hidden rounded-lg"
                                >
                                    {project.images?.map((img, i) => (
                                        <SwiperSlide key={i}
                                                     style={{
                                                         width: "100%",
                                                         height: "230px",     // ⭐ لازم يتكرر هنا أيضاً
                                                         overflow: "hidden",
                                                     }}
                                        >
                                            <img
                                                src={img}
                                                alt={project.title + i}
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "cover",
                                                    display: "block", // ⭐ يصلح مشكلة Android rendering
                                                }}
                                                onError={(e) => {
                                                    e.target.src = "/fallback.jpg"; // في حالة أي خطأ مستقبلي
                                                }}
                                            />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>



                                <div className="p-4 text-center">
                                    <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                                    <p className="text-gray-600">
                                        {project.description?.substring(0, 60)}...
                                    </p>
                                </div>

                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
