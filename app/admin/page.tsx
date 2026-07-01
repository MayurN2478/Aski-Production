"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

type PortfolioImage = {
  id: string;
  title: string;
  category: string;
  image_url: string;
};

type PortfolioVideo = {
  id: string;
  title: string;
  thumbnail_url: string;
  video_url: string;
};

export default function AdminPage() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Weddings");
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<PortfolioImage[]>([]);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [videos, setVideos] = useState<PortfolioVideo[]>([]);
  
  const fetchImages = async () => {
    const { data, error } = await supabase
      .from("portfolio_images")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setImages(data);
    }
  };

  const fetchVideos = async () => {
    const { data, error } = await supabase
      .from("portfolio_videos")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setVideos(data);
    }
  };

  useEffect(() => {
    fetchImages();
    fetchVideos();
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

  const deleteVideo = async (
    id: string,
    thumbnailUrl: string,
    videoUrl: string
  ) => {
    const confirmed = window.confirm(
      "Delete this video?"
    );

    if (!confirmed) return;

    try {
      // Thumbnail file name
      const thumbnailName = decodeURIComponent(
        thumbnailUrl.split("/").pop() || ""
      );

      // Video file name
      const videoName = decodeURIComponent(
        videoUrl.split("/").pop() || ""
      );

      // Delete thumbnail
      const { error: thumbError } = await supabase.storage
        .from("portfolio-videos")
        .remove([thumbnailName]);

      if (thumbError) throw thumbError;

      // Delete video
      const { error: videoError } = await supabase.storage
        .from("portfolio-videos")
        .remove([videoName]);

      if (videoError) throw videoError;

      // Delete database row
      const { error: dbError } = await supabase
        .from("portfolio_videos")
        .delete()
        .eq("id", id);

      if (dbError) throw dbError;

      await fetchVideos();

      alert("Video deleted successfully");
    } catch (err: any) {
      console.error(err);
      alert(err.message);
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

  const uploadVideo = async () => {
    if (!thumbnailFile || !videoFile) {
      alert("Please select both thumbnail and video");
      return;
    }

    try {
      setLoading(true);

      // Upload Thumbnail
      const thumbnailName = `${Date.now()}-${thumbnailFile.name}`;

      const { error: thumbError } = await supabase.storage
        .from("portfolio-videos")
        .upload(`thumbnails/${thumbnailName}`, thumbnailFile);

      if (thumbError) {
        console.error("Thumbnail Upload Error:", thumbError);
        alert(`Thumbnail Upload Error:\n${thumbError.message}`);
        return;
      }

      const { data: thumbData } = supabase.storage
        .from("portfolio-videos")
        .getPublicUrl(`thumbnails/${thumbnailName}`);

      // Upload Video
      const videoName = `${Date.now()}-${videoFile.name}`;

      const { error: videoError } = await supabase.storage
        .from("portfolio-videos")
        .upload(`videos/${videoName}`, videoFile);

      if (videoError) {
        console.error("Video Upload Error:", videoError);
        alert(`Video Upload Error:\n${videoError.message}`);
        return;
      }

      const { data: videoData } = supabase.storage
        .from("portfolio-videos")
        .getPublicUrl(`videos/${videoName}`);

      // Save to Database
      const { error: dbError } = await supabase
        .from("portfolio_videos")
        .insert([
          {
            title,
            thumbnail_url: thumbData.publicUrl,
            video_url: videoData.publicUrl,
          },
        ]);

      if (dbError) {
        console.error("Database Error:", dbError);
        alert(`Database Error:\n${dbError.message}`);
        return;
      }

      alert("Video uploaded successfully");

      await fetchVideos();

      setTitle("");
      setThumbnailFile(null);
      setVideoFile(null);
    } catch (err: any) {
      console.error(err);

      alert(err.message || "Video upload failed");
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
            placeholder={category === "Video" ? "Video Title" : "Image Title"}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-white dark:bg-[#0b0b0b] border border-black/10 dark:border-white/10 rounded-xl px-5 py-4 text-black dark:text-white placeholder:text-zinc-900 dark:placeholder:text-zinc-100 outline-none focus:border-[#c8a36b]"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-white dark:bg-[#0b0b0b] border border-black/10 dark:border-white/10 rounded-xl px-5 py-4 text-black dark:text-white outline-none focus:border-[#c8a36b]"
          >
            <optgroup label="Images">
              <option value="Weddings">Weddings</option>
              <option value="Pre-Wedding">Pre-Wedding</option>
              <option value="Naming Ceremony">Naming Ceremony</option>
              <option value="Maternity">Maternity</option>
              <option value="Portraits">Portraits</option>
            </optgroup>

            <optgroup label="Videos">
              <option value="Video">Video</option>
            </optgroup>
          </select>

          {category !== "Video" ? (
            <>
              <div>
                <label className="block mb-2 text-sm font-medium text-black dark:text-white">
                  Portfolio Image
                </label>

                <label
                  htmlFor="file-upload"
                  className="flex items-center justify-center w-full h-32 border-2 border-dashed bg-white dark:bg-[#0b0b0b] border-zinc-300 dark:border-[#262626] rounded-xl cursor-pointer hover:border-[#c8a36b] hover:bg-zinc-50 dark:hover:bg-[#111111] transition-all duration-300"
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
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
              </div>

              <button
                onClick={uploadImage}
                disabled={loading}
                className="w-full bg-[#c8a36b] hover:bg-[#d8b27b] disabled:opacity-50 disabled:cursor-not-allowed text-black font-semibold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {loading ? "Uploading..." : "Upload Image"}
              </button>
            </>
          ) : (
            <>
              {/* Thumbnail */}
              <div>
                <label className="block mb-2 text-sm font-medium text-black dark:text-white">
                  Video Thumbnail
                </label>

                <label
                  htmlFor="thumbnail-upload"
                  className="flex items-center justify-center w-full h-32 border-2 border-dashed bg-white dark:bg-[#0b0b0b] border-zinc-300 dark:border-[#262626] rounded-xl cursor-pointer hover:border-[#c8a36b] hover:bg-zinc-50 dark:hover:bg-[#111111] transition-all duration-300"
                >
                  <div className="text-center">
                    <div className="text-4xl mb-3">🖼️</div>

                    <p className="font-semibold text-black dark:text-white">
                      {thumbnailFile ? thumbnailFile.name : "Choose Video Thumbnail"}
                    </p>

                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
                      Click here to browse files
                    </p>
                  </div>
                </label>

                <input
                  id="thumbnail-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
                />
              </div>

              {/* Video */}
              <div>
                <label className="block mb-2 text-sm font-medium text-black dark:text-white">
                  Portfolio Video
                </label>

                <label
                  htmlFor="video-upload"
                  className="flex items-center justify-center w-full h-32 border-2 border-dashed bg-white dark:bg-[#0b0b0b] border-zinc-300 dark:border-[#262626] rounded-xl cursor-pointer hover:border-[#c8a36b] hover:bg-zinc-50 dark:hover:bg-[#111111] transition-all duration-300"
                >
                  <div className="text-center">
                    <div className="text-4xl mb-3">🎥</div>

                    <p className="font-semibold text-black dark:text-white">
                      {videoFile ? videoFile.name : "Choose Portfolio Video"}
                    </p>

                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
                      Click here to browse files
                    </p>
                  </div>
                </label>

                <input
                  id="video-upload"
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                />
              </div>

              <button
                onClick={uploadVideo}
                disabled={loading}
                className=" w-full bg-[#c8a36b] hover:bg-[#d8b27b] disabled:opacity-50 disabled:cursor-not-allowed text-black font-semibold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {loading ? "Uploading..." : "Upload Video"}
              </button>
            </>
          )}
        </div>

        {/* ====================== Images ====================== */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8">
            Images
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {images.map((image) => (
              <div
                key={image.id}
                className="bg-white dark:bg-[#090909] rounded-2xl overflow-hidden border border-black/10 dark:border-white/10"
              >
                <img
                  src={image.image_url}
                  alt={image.title}
                  className="w-full h-60 object-cover"
                />

                <div className="p-4">
                  <h3 className="font-bold text-lg">
                    {image.title}
                  </h3>

                  <p className="text-sm text-zinc-500 mb-4">
                    {image.category}
                  </p>

                  <button
                    onClick={() =>
                      deleteImage(image.id, image.image_url)
                    }
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="my-20 border-t border-zinc-300 dark:border-zinc-800"></div>

        {/* ====================== Videos ====================== */}
        <div>
          <h2 className="text-3xl font-bold mb-8">
            Videos
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {videos.map((video) => (
              <div
                key={video.id}
                className="bg-white dark:bg-[#090909] rounded-2xl overflow-hidden border border-black/10 dark:border-white/10"
              >
                <img
                  src={video.thumbnail_url}
                  alt={video.title}
                  className="w-full h-66 object-cover"
                />

                <div className="p-4">
                  <h3 className="font-bold text-lg">
                    {video.title}
                  </h3>

                  <video
                    src={video.video_url}
                    controls
                    className="w-full mt-4 rounded-lg"
                  />

                  <button
                    onClick={() =>
                      deleteVideo(
                        video.id,
                        video.thumbnail_url,
                        video.video_url
                      )
                    }
                    className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg"
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