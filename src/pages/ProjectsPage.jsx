import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { Link } from "react-router-dom";

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
        <div className="pt-24 pb-20 bg-gray-100 min-h-screen" dir="rtl">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-center text-gold mb-10">
                    مشاريعنا
                </h1>

                <div className="grid md:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <Link to={`/project/${project.id}`} key={project.id}>
                            <div className="bg-white shadow rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition">

                                {/* ⭐ سلايدر يعمل 100% بدون Lazy */}
                                <Swiper
                                    modules={[Navigation, Pagination]}
                                    pagination={{ clickable: true }}
                                    navigation={false}
                                    className="w-full aspect-[4/3] bg-gray-200"
                                >
                                    {project.images?.map((img, i) => (
                                        <SwiperSlide key={i}>
                                            <img
                                                src={img}
                                                alt={project.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>

                                <div className="p-4 text-center">
                                    <h3 className="text-2xl font-bold">{project.title}</h3>
                                    <p className="text-gray-600 mt-2">
                                        {project.description?.substring(0, 80)}...
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
