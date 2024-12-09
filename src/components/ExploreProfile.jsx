import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../constants";
import { useParams } from "react-router-dom";

const ExploreProfile = () => {
  const { id } = useParams();
  const [profileData, setProfileData] = useState({});

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(BASE_URL + `/explore/profile/${id}`, {
        withCredentials: true,
      });
      setProfileData(res.data);
    } catch (err) {}
  };

  const {firstName, lastName, age, gender, photoUrl, skills, about} = profileData || {};

  return(
    <div className="container flex flex-col justify-center mt-2">
         <div className="body flex m-10 flex-col">
            <p>Name: {firstName + " " + lastName}</p>
            <p>Age: {age}</p>
            <p>About: {about}</p>
            <p>Skills: {skills}</p>
         </div>
    </div>
  );
};

export default ExploreProfile;
