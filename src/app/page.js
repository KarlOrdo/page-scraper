"use client";

import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [scrapedText, setScrapedText] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("api/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url }),
      });
      const data = await response.json();
      setScrapedText(data.filteredHTML);
    } catch (e) {
      window.alert(e?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-gray-900 w-full min-h-screen flex flex-col gap-y-5 items-center justify-center p-40">
      <h1 className="text-4xl font-extrabold shadow-2xl uppercase text-zinc-400">
        Page scraper
      </h1>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setUrl(e.target.value)}
          placeholder="URL to scrape"
          className="input p-2 bg-zinc-400 "
        />
        <button
          type="submit"
          className="bg-zinc-400 hover:bg-zinc-500 hover:cursor-pointer font-bold p-2 ml-2"
        >
          {loading ? "..." : "SCRAPE"}
        </button>
      </form>

      {scrapedText && (
        <div className="bg-gray-400 p-6 rounded-sm">
          {scrapedText.map((item, index) => {
            return (
              <p className="" key={index}>
                {item}
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
}
