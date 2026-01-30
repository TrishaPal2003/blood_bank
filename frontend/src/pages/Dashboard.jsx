import React, { useEffect, useState } from "react";
import StatsCard from "../components/common/StatsCard.jsx";
import API from "../services/api";
import RequestCard from "../components/request/ RequestCard";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await API.get("/users/dashboard/");
      setData(res.data);
      setError(null);
    } catch (err) {
      console.error(
        "Failed to load dashboard:",
        err.response?.status,
        err.response?.data || err.message
      );
      setError("Failed to load dashboard. See console for details.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="p-4">Loading dashboard...</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;
  if (!data) return <p className="p-4">No data available</p>;

  const { dashboard, stats = {}, activeRequests = [], matchingRequests = [] } = data;

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-1 mt-20">{dashboard.message}</h1>
          <p className="text-gray-600">
            Role: {dashboard.role}
          </p>
        </div>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard title="Total Donations" value={stats.totalDonations || 0} />
        <StatsCard title="Total Requests" value={stats.totalRequests || 0} />
        <StatsCard
          title="Donation Status"
          value={stats.canDonate ? "Eligible" : "Not Eligible"}
        />
      </div>

      {/* ACTION CENTER */}
      <div className="flex flex-wrap gap-4 mt-4">
        {dashboard.controls.includes("request_blood") && (
          <button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition">
            Request Blood
          </button>
        )}
        {dashboard.controls.includes("donate_blood") && (
          <button className="border border-red-600 text-red-600 px-6 py-2 rounded-lg hover:bg-red-50 transition">
            Donate Blood
          </button>
        )}
      </div>

      {/* MY ACTIVE REQUESTS */}
      {activeRequests.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-4">My Active Requests</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeRequests.map((req) => (
              <RequestCard key={req.id} request={req} />
            ))}
          </div>
        </section>
      )}

      {/* MATCHING REQUESTS */}
      {matchingRequests.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-4">Requests You Can Help With</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {matchingRequests.map((req) => (
              <RequestCard key={req.id} request={req} />
            ))}
          </div>
        </section>
      )}

      {/* HOSPITAL VIEW */}
      {dashboard.role === "hospital" && (
        <section>
          <h2 className="text-2xl font-semibold mb-4">Hospital Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <StatsCard title="Open Requests" value={activeRequests.length} />
            <StatsCard title="Available Donors" value={stats.availableDonors || 0} />
          </div>
        </section>
      )}

    </div>
  );
}
