import axios from "axios";
import React, { useEffect, useState } from "react";

const SetAvtar = () => {
  const [avatars, setAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const api = "https://api.multiavatar.com";

  useEffect(() => {
    const fetchAvatars = async () => {
      const data = [];
      for (let i = 0; i < 4; i++) {
        try {
          const response = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`, {
            responseType: "text" // Ensures response is treated as text
          });
          data.push(btoa(response.data)); // Convert SVG text to base64
        } catch (error) {
          console.error("Error fetching avatar:", error);
        }
      }
      setAvatars(data);
    };

    fetchAvatars();
  }, [api]);

  return (
    <div>
      <h1>Pick an Avatar</h1>
      <div className="avatars">
        {avatars.map((item, index) => (
          <div
            key={index}
            className={`avatar ${selectedAvatar === index ? "selected" : ""}`}
            onClick={() => setSelectedAvatar(index)}
          >
            <img src={`data:image/svg+xml;base64,${item}`} alt="avatar" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SetAvtar;
