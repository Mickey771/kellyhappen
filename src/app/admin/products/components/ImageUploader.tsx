"use client";

import { useState, DragEvent, ChangeEvent } from "react";
import UploadIcon from "@/assets/UploadIcon";
import Image from "next/image";

const ImageUploader = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleFile = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    } else {
      alert("Only image files are allowed.");
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="relative w-full h-35 border border-[#E5E7E8] rounded-sm flex flex-col items-center justify-center text-gray-500 cursor-pointer hover:border-gray-400"
    >
      {!imageUrl ? (
        <>
          <UploadIcon />
          <input
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </>
      ) : (
        <Image
          src={imageUrl}
          alt="Uploaded"
          className="w-full h-full object-cover rounded-sm"
          width={400}
          height={200}
        />
      )}
    </div>
  );
};

export default ImageUploader;
