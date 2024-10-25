import Compressor from "compressorjs";
import { PostSubmitionObject } from "../types";
import { useRef, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";

export default function ImageInput({
  setNewPet,
}: {
  setNewPet: React.Dispatch<
    React.SetStateAction<PostSubmitionObject>
  >;
}) {
  const [imgPreview, setImgPreview] = useState("");
  const [fileError, SetFileError] = useState("");
  const inputRef = useRef(null);
  //react drop zone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onImageChange,
    maxFiles: 1,
    accept: { "image/*": [] },
  });

  function setPreview(file: File) {
    if (!file) return;
    const reader = new FileReader();

    reader.readAsDataURL(file!);
    reader.onload = () => {
      setImgPreview(reader.result as string);
    };
  }
  async function onImageChange(
    files: File[] | null,
    rejectedFiles?: FileRejection[] | null
  ) {
    if (!files) return;
    if (rejectedFiles?.length) {
      SetFileError(rejectedFiles[0].errors[0].message);
      return;
    }
    const file = files[0];
    const fileSize = file.size / 1000 / 1000;

    console.log("starting image compression");
    new Compressor(file, {
      mimeType: "image/webp",
      quality: fileSize > 3 ? 0.5 : fileSize > 1 ? 0.7 : 0.8,
      strict: true,
      success(result: File) {
        if (result.size / 1000 / 1000 > 2.9) {
          SetFileError("image is too large");
          return;
        }

        SetFileError("");
        setNewPet(newPet => {
          return { ...newPet, image: result };
        });
        console.log(inputRef.current);

        setPreview(result);
        console.log(
          "size before: ",
          file.size / 1000 / 1000 + "mb",
          "size after: ",
          result.size / 1000 / 1000 + "mb"
        );
      },
      error() {
        setNewPet(newPet => {
          return { ...newPet, image: file };
        });
        setPreview(file);
      },
    });
  }

  return (
    <label aria-label="image" {...getRootProps()}>
      <input
        ref={inputRef}
        {...getInputProps({
          name: "image",
        })}
      />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
      <img
        className="mt-4 h-[250px] w-[320px] rounded-sm bg-slate-200 object-cover object-center sm:w-[400px]"
        src={imgPreview}
        alt=""
      />
      <button
        type="button"
        onClick={e => {
          e.stopPropagation();
          setImgPreview("");
          setNewPet(newPet => {
            return { ...newPet, image: null };
          });
        }}
        className="border border-black"
      >
        remove image
      </button>
      <div className="text-xl text-red-800">{fileError}</div>
    </label>
  );
}
