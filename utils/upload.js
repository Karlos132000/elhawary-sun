import { UploadWidget } from "@bytescale/upload-widget";

const options = {
    apiKey: "public_G22nj4cEW84tCy5gbeCJ5n73NDzH",
    maxFileCount: 1,
    mimeTypes: ["image/*", "application/pdf"],
};

export function uploadFile() {
    return new Promise((resolve) => {
        UploadWidget.open(options).then((files) => {
            if (!files || files.length === 0) {
                resolve(null); // لا ترجع error أبدًا
            } else {
                resolve(files[0].fileUrl); // رابط الملف
            }
        });
    });
}
