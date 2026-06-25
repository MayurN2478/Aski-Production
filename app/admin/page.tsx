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

      <div className=" space-y-6 bg-white dark:bg-[#090909] border border-black/10 dark:border-white/10 rounded-3xl p-8">

        <input
          type="text"
          placeholder="Image Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className=" w-full bg-white dark:bg-[#0b0b0b] border border-black/10 dark:border-white/10 rounded-xl px-5 py-4 text-black dark:text-white placeholder:text-zinc-900 dark:placeholder:text-zinc-100 outline-none focus:border-[#c8a36b]"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className=" w-full bg-white dark:bg-[#0b0b0b] border border-black/10 dark:border-white/10 rounded-xl px-5 py-4 text-black dark:text-white outline-none focus:border-[#c8a36b]"
        >
          <option>Weddings</option>
          <option>Pre-Wedding</option>
          <option>Naming Ceremony</option>
          <option>Maternity</option>
          <option>Portraits</option>
        </select>

        <div>
          <label className="block mb-2 text-sm font-medium text-black dark:text-white">
            Portfolio Image
          </label>

          <label
            htmlFor="file-upload"
            className=" flex items-center justify-center w-full h-32 border-2 border-dashed bg-white dark:bg-[#0b0b0b] border-zinc-300 dark:border-[#262626] rounded-xl cursor-pointer hover:border-[#c8a36b] hover:bg-zinc-50 dark:hover:bg-[#111111] transition-all duration-300"
          >
            <div className="text-center">
              <div className="text-4xl mb-3">📸</div>

              <p className="font-semibold text-black dark:text-white">
                {file ? file.name : "Choose Portfolio Image"}
              </p>

              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
                Click here to browse files
              </p>
            </div>
          </label>

          <input
            id="file-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) =>
              setFile(e.target.files?.[0] || null)
            }
          />
        </div>

        <button
          onClick={uploadImage}
          disabled={loading}
          className="
            w-full
            bg-[#c8a36b]
            hover:bg-[#d8b27b]
            disabled:opacity-50
            disabled:cursor-not-allowed
            text-black
            font-semibold
            py-4
            rounded-xl
            transition-all
            duration-300
            shadow-lg
            hover:shadow-xl
          "
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
              className=" bg-white dark:bg-[#0b0b0b] border border-black/10 dark:border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#c8a36b]"
            >
              <img
                src={img.image_url}
                alt={img.title}
                className="w-full h-56 object-cover"
              />

              <div className="p-4">
                <h3 className="font-bold text-black dark:text-white">
                  {img.title}
                </h3>

                <p className="text-sm text-white-500">
                  {img.category}
                </p>

                <button
                  onClick={() =>
                    deleteImage(
                      img.id,
                      img.image_url
                    )
                  }
                  className=" mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition-colors"
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