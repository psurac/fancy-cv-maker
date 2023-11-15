import { FC, useEffect, useState } from "react";

const ImageUploader: FC<React.Dispatch<React.SetStateAction<string>>> = (setImageURL) => {
    const [image, setImage] = useState<File>();

    useEffect(() => {
        if (image && !image.type.startsWith('image/')) {
            console.log("Failure in image loading");
            return;
        }
        image && setImageURL(URL.createObjectURL(image));
    }, [image]);
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.files && setImage(e.target.files[0]);
    }
    return (
        <input type="file" accept="image/*" onChange={onChange} />
    );
};

export default ImageUploader;