import { UploadWidget } from "@bytescale/upload-widget";

// 🔥 دالة لضغط الصور قبل رفعها عبر Canvas
function compressImage(file, maxWidth = 1200, quality = 0.7) {
    return new Promise((resolve) => {
        const img = new Image();

        img.onload = () => {
            const canvas = document.createElement("canvas");
            const ratio = img.width / img.height;

            canvas.width = maxWidth;
            canvas.height = maxWidth / ratio;

            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            canvas.toBlob(
                (blob) => resolve(blob),
                "image/jpeg",
                quality
            );
        };

        img.src = URL.createObjectURL(file);
    });
}

const options = {
    apiKey: "public_G22nj4cEW84tCy5gbeCJ5n73NDzH",
    maxFileCount: 1,
    mimeTypes: ["image/*", "application/pdf"],
};

// ⭐ النسخة المحسّنة بدون async داخل Promise
export function uploadFile() {
    return new Promise((resolve) => {
        UploadWidget.open(options).then((files) => {
            if (!files || files.length === 0) {
                return resolve(null);
            }

            const originalFile = files[0].originalFile;

            // لو PDF → نرفعه مباشرة
            if (!originalFile.type.startsWith("image/")) {
                return UploadWidget.upload({
                    apiKey: options.apiKey,
                    file: originalFile,
                }).then((uploaded) => resolve(uploaded.fileUrl));
            }

            // لو صورة → نضغطها ثم نرفعها
            compressImage(originalFile).then((compressedBlob) => {
                UploadWidget.upload({
                    apiKey: options.apiKey,
                    file: compressedBlob,
                }).then((uploaded) => resolve(uploaded.fileUrl));
            });
        });
    });
}
