"use client";

import { useState, useEffect } from "react";

const GoogleMap = () => {
  const [mapUrl, setMapUrl] = useState("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56358.835472782!2d94.2152646!3d27.3752187!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3740e69882958371%3A0x6b699a77864c0901!2sGogamukh%2C%20Assam!5e0!3m2!1sen!2sin!4v1714498000000!5m2!1sen!2sin");

  useEffect(() => {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    const fetchSettings = async () => {
      try {
        const res = await fetch(`${apiBase}/api/settings`);
        if (res.ok) {
          const data = await res.json();
          if (data.googleMapsUrl) setMapUrl(data.googleMapsUrl);
        }
      } catch (err) { console.error("Map settings fetch failed, using default."); }
    };
    fetchSettings();
  }, []);

  return (
    <div className="w-full h-[400px] rounded-[2rem] overflow-hidden border border-slate-800 glass">
      <iframe
        src={mapUrl}
        width="100%"
        height="100%"
        style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default GoogleMap;
