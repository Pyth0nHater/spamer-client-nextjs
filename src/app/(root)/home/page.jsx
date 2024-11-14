'use client'

import { useEffect, useState } from "react";
import ProfileButton from "@/app/components/ProfileButton/ProfileButton";

const HomePage = () => {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/profiles?chatId=819850346');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProfiles(data);
      } catch (error) {
        console.error('Error fetching profiles:', error);
      }
    };

    fetchProfiles();
  }, []);

  return (
    <div className="mt-4">
      <button className="ml-10 bg-black hover:bg-white text-black-700 font-semibold hover:text-black py-1 px-4 border border-white hover:border-transparent rounded">
        add
      </button>
      {profiles.map((profile, index) => (
        <ProfileButton key={index} username={profile.instagram} />
      ))}
    </div>
  );
};

export default HomePage;
