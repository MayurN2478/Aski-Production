"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

type PortfolioImage = {
  id: string;
  title: string;
  category: string;
  image_url: string;
};

export default function AdminPage() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Weddings");
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<PortfolioImage[]>([]);

  const fetchImages = async () => {
    const { data, error } = await supabase
      .from("portfolio_images")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setImages(data);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const deleteImage = async (
    id: string,
    imageUrl: string
  ) => {
    const confirmed = window.confirm(
      "Delete this image?"
    );

    if (!confirmed) return;

    try {
      console.log("Deleting image:", imageUrl);

      const fileName = decodeURIComponent(
        imageUrl.split("/").pop() || ""
      );

      console.log("File Name:", fileName);

      const { error: storageError } =
        await supabase.storage
          .from("portfolio-images")
          .remove([fileName]);

      console.log(
        "Storage Delete Error:",
        storageError
      );

      const { error: dbError } = await supabase
        .from("portfolio_images")
        .delete()
        .eq("id", id);

      console.log(
        "Database Delete Error:",
        dbError
      );

      if (storageError) throw storageError;
      if (dbError) throw dbError;

      await fetchImages();

      alert("Image deleted successfully");
    } catch (err: any) {
      console.error("DELETE ERROR:", err);

      alert(
        err?.message ||
        JSON.stringify(err)
      );
    }
  };
  const uploadImage = async () => {
    if (!file) {
      alert("Please select an image");
      return;
    }

    try {
      setLoading(true);

      const fileName = `${Date.now()}-${file.name}`;

      const { error: uploadError } = await supabase.storage
        .from("portfolio-images")
        .upload(fileName, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage
        .from("portfolio-images")
        .getPublicUrl(fileName);

      const imageUrl = data.publicUrl;

      const { error: dbError } = await supabase
        .from("portfolio_images")
        .insert([
          {
            title,
            category,
            image_url: imageUrl,
          },
        ]);

      if (dbError) {
        throw dbError;
      }

      alert("Image uploaded successfully");

      await fetchImages();

      setTitle("");
      setFile(null);
    } catch (err: any) {
        console.error("UPLOAD ERROR:", err);

        alert(
            err?.message ||
            JSON.stringify(err) ||
            "Upload failed"
        );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-20 px-6">
      <h1 className="text-4xl font-bold mb-10">
        Portfolio Admin
      </h1>

      <div className="space-y-6">

        <input
          type="text"
          placeholder="Image Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-3 rounded"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border border-zinc-700 bg-black text-white p-3 rounded"
        >
          <option>Weddings</option>
          <option>Pre-Wedding</option>
          <option>Naming Ceremony</option>
          <option>Maternity</option>
          <option>Portraits</option>
        </select>

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setFile(e.target.files?.[0] || null)
          }
        />

        <button
          onClick={uploadImage}
          disabled={loading}
          className="bg-black text-white px-6 py-3 rounded"
        >
          {loading ? "Uploading..." : "Upload Image"}
        </button>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">
          Uploaded Images
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {images.map((img) => (
            <div
              key={img.id}
              className="border rounded-lg overflow-hidden"
            >
              <img
                src={img.image_url}
                alt={img.title}
                className="w-full h-56 object-cover"
              />

              <div className="p-4">
                <h3 className="font-semibold">
                  {img.title}
                </h3>

                <p className="text-sm text-gray-500">
                  {img.category}
                </p>

                <button
                  onClick={() =>
                    deleteImage(
                      img.id,
                      img.image_url
                    )
                  }
                  className="mt-3 bg-red-600 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}