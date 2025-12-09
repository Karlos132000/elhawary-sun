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
                                    navigation
                                    pagination={{ clickable: true }}
                                    modules={[Navigation, Pagination]}
                                    className="w-full h-[220px] md:h-[250px] bg-gray-200 overflow-hidden"
                                >
                                    {project.images?.map((img, i) => (
                                        <SwiperSlide key={i}>
                                            <img
                                                src={img}
                                                className="w-full h-full object-cover"
                                                alt={project.title + i}
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
