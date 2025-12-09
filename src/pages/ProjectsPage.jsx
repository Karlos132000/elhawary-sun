import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { Link } from "react-router-dom";

export default function ProjectsPage() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "projects"), (snap) => {
            setProjects(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        });
        return unsub;
    }, []);

    return (
        <div className="pt-24 pb-20 bg-gray-50" dir="rtl">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-center text-gold mb-10">
                    مشاريعنا
                </h1>

                <div className="grid md:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <Link to={`/project/${project.id}`} key={project.id}>
                            <div className="bg-white rounded-xl shadow overflow-hidden hover:scale-105 transition cursor-pointer">

                                {/* ✅ صورة ثابتة بدل Swiper – أول صورة من المشروع */}
                                <div className="w-full h-52 md:h-64 bg-gray-200 overflow-hidden">
                                    {project.images && project.images.length > 0 ? (
                                        <img
                                            src={project.images[0]}
                                            alt={project.title}
                                            className="w-full h-full object-cover block"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
                                            لا توجد صورة متاحة
                                        </div>
                                    )}
                                </div>

                                <div className="p-4 text-center">
                                    <h3 className="text-2xl font-bold">
                                        {project.title}
                                    </h3>
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
