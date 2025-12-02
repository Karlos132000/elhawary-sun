import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
    collection,
    addDoc,
    deleteDoc,
    doc,
    onSnapshot,
    serverTimestamp,
    updateDoc,
} from "firebase/firestore";

// ⭐ رفع صورة لـ imgbb
const uploadImageToImgbb = async (file) => {
    const apiKey = import.meta.env.VITE_IMGBB_KEY;

    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: formData,
    });

    const data = await res.json();

    if (!data.success) throw new Error("Upload failed");

    return data.data.url;
};

export default function AdminProjects() {
    const [projects, setProjects] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imagesFiles, setImagesFiles] = useState([]);
    const [uploading, setUploading] = useState(false);

    // ⭐ للتعديل
    const [editingProject, setEditingProject] = useState(null);

    // تحميل المشاريع
    useEffect(() => {
        const unsub = onSnapshot(collection(db, "projects"), (snap) => {
            setProjects(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        });
        return unsub;
    }, []);

    // ⭐ إضافة مشروع
    const addProject = async (e) => {
        e.preventDefault();

        if (!title || !description || imagesFiles.length === 0) {
            alert("املأ كل البيانات");
            return;
        }

        try {
            setUploading(true);

            const uploadedImages = [];
            for (const file of imagesFiles) {
                const url = await uploadImageToImgbb(file);
                uploadedImages.push(url);
            }

            await addDoc(collection(db, "projects"), {
                title,
                description,
                images: uploadedImages,
                createdAt: serverTimestamp(),
            });

            setTitle("");
            setDescription("");
            setImagesFiles([]);
            alert("✔ تم إضافة المشروع");

        } catch (err) {
            console.error(err);
            alert("❌ خطأ أثناء الرفع");
        } finally {
            setUploading(false);
        }
    };

    // ⭐ حذف مشروع
    const deleteProject = async (id) => {
        if (!confirm("هل تريد حذف المشروع؟")) return;
        await deleteDoc(doc(db, "projects", id));
    };

    // ⭐ بدء التعديل
    const startEditProject = (project) => {
        setEditingProject({ ...project, newImages: [] });
    };

    // ⭐ حذف صورة من المشروع
    const removeImage = (index) => {
        const updated = editingProject.images.filter((_, i) => i !== index);
        setEditingProject({ ...editingProject, images: updated });
    };

    // ⭐ حفظ التعديلات
    const saveEditProject = async () => {
        try {
            let newImagesUrls = [];

            if (editingProject.newImages?.length > 0) {
                for (const file of editingProject.newImages) {
                    const url = await uploadImageToImgbb(file);
                    newImagesUrls.push(url);
                }
            }

            const updatedImages = [
                ...editingProject.images,
                ...newImagesUrls,
            ];

            await updateDoc(doc(db, "projects", editingProject.id), {
                title: editingProject.title,
                description: editingProject.description,
                images: updatedImages,
            });

            alert("✔ تم حفظ التعديلات");
            setEditingProject(null);

        } catch (err) {
            console.error(err);
            alert("❌ حدث خطأ أثناء حفظ التعديلات");
        }
    };

    return (
        <div className="flex-1 p-10 bg-gray-50 min-h-screen" dir="rtl">
            <h1 className="text-3xl font-bold mb-6 text-gold">📸 إدارة المشاريع</h1>

            {/* إضافة مشروع */}
            <form
                onSubmit={addProject}
                className="bg-white p-5 shadow rounded-xl mb-10 max-w-xl"
            >
                <h2 className="text-xl font-bold mb-4">إضافة مشروع</h2>

                <input
                    type="text"
                    placeholder="عنوان المشروع"
                    className="w-full p-3 border rounded mb-3"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <textarea
                    placeholder="وصف المشروع"
                    className="w-full p-3 border rounded mb-3"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                />

                <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="w-full p-3 border rounded mb-3"
                    onChange={(e) => setImagesFiles([...e.target.files])}
                />

                <button
                    className="bg-gold text-black px-4 py-2 rounded font-bold"
                    disabled={uploading}
                >
                    {uploading ? "جار الرفع..." : "إضافة"}
                </button>
            </form>

            {/* قائمة المشاريع */}
            <div className="grid md:grid-cols-3 gap-6">
                {projects.map((p) => (
                    <div key={p.id} className="bg-white shadow rounded-xl p-4">
                        <h3 className="font-bold text-xl mb-2">{p.title}</h3>
                        <p className="text-gray-600 mb-3">{p.description}</p>

                        {/* عرض أول صورة */}
                        {p.images?.length > 0 && (
                            <img
                                src={p.images[0]}
                                className="w-full h-48 object-cover rounded mb-3"
                            />
                        )}

                        <div className="flex gap-3">
                            <button
                                className="bg-blue-500 text-white px-4 py-1 rounded"
                                onClick={() => startEditProject(p)}
                            >
                                تعديل
                            </button>

                            <button
                                className="bg-red-500 text-white px-4 py-1 rounded"
                                onClick={() => deleteProject(p.id)}
                            >
                                حذف
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* ⭐ نافذة التعديل */}
            {editingProject && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-xl w-[500px] max-h-[90vh] overflow-y-auto">

                        <h2 className="text-2xl font-bold mb-4">تعديل المشروع</h2>

                        <input
                            type="text"
                            className="w-full p-3 border rounded mb-3"
                            value={editingProject.title}
                            onChange={(e) =>
                                setEditingProject({ ...editingProject, title: e.target.value })
                            }
                        />

                        <textarea
                            className="w-full p-3 border rounded mb-3"
                            rows="4"
                            value={editingProject.description}
                            onChange={(e) =>
                                setEditingProject({
                                    ...editingProject,
                                    description: e.target.value
                                })
                            }
                        />

                        <p className="font-semibold mb-2">الصور الحالية:</p>
                        <div className="grid grid-cols-2 gap-3 mb-4">
                            {editingProject.images?.map((img, index) => (
                                <div key={index} className="relative">
                                    <img src={img} className="w-full h-32 object-cover rounded" />
                                    <button
                                        className="absolute top-1 left-1 bg-red-600 text-white text-xs px-2 py-1 rounded"
                                        onClick={() => removeImage(index)}
                                    >
                                        حذف
                                    </button>
                                </div>
                            ))}
                        </div>

                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(e) =>
                                setEditingProject({
                                    ...editingProject,
                                    newImages: Array.from(e.target.files),
                                })
                            }
                            className="mb-4"
                        />

                        <div className="flex justify-between mt-4">
                            <button
                                className="bg-gray-400 px-4 py-2 rounded"
                                onClick={() => setEditingProject(null)}
                            >
                                إلغاء
                            </button>

                            <button
                                className="bg-gold px-4 py-2 rounded"
                                onClick={saveEditProject}
                            >
                                حفظ التعديلات
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}
