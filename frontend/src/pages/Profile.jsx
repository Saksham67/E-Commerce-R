
// src/pages/Profile.jsx
import { useEffect, useState } from "react";
import { fetchProfile } from "../api/axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { token } = useSelector((state) => state.auth);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const getProfile = async () => {
      try {
        const { data } = await fetchProfile();
        setProfile(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch profile");
      }
    };

    getProfile();
  }, [token, navigate]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!profile) return <p>Loading profile...</p>;

  return (
    <div className="max-w-md mx-auto p-6 border rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
      <p><strong>Name:</strong> {profile.name}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Phone:</strong> {profile.phone || "N/A"}</p>
      <p><strong>Address:</strong> {profile.address || "N/A"}</p>
      <p><strong>Role:</strong> {profile.role}</p>
    </div>
  );
}

export default Profile;
