// src/pages/Dashboard.jsx
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className="flex flex-col items-center justify-center h-[70vh]">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      {userInfo ? (
        <p className="text-lg">Welcome, {userInfo.name} 🎉</p>
      ) : (
        <p className="text-lg text-red-500">No user info found.</p>
      )}
    </div>
  );
};

export default Dashboard;
