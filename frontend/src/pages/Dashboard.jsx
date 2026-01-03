import React, { useEffect, useState } from "react";
import StatsCard from "../components/common/StatsCard.jsx";
import RequestCard from "../components/request/ RequestCard.jsx";
import API from "../services/api";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await API.get("/dashboard");
      setData(res.data);
    } catch (err) {
      console.error("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="p-4">Loading dashboard...</p>;
  if (!data) return <p className="p-4">No data available</p>;

  const {
    user,
    canDonate,
    hasActiveRequest,
    activeRequests,
    matchingRequests,
    stats,
  } = data;

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold">
          Welcome, {user.name}
        </h1>
        <p className="text-gray-600">
          Blood Group: {user.bloodGroup} · Location: {user.location}
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard title="Total Donations" value={stats.totalDonations} />
        <StatsCard title="Total Requests" value={stats.totalRequests} />
        <StatsCard
          title="Donation Status"
          value={canDonate ? "Eligible" : "Not Eligible"}
        />
      </div>

      {/* ACTION CENTER */}
      <div className="flex gap-4">
        <button className="bg-red-600 text-white px-4 py-2 rounded">
          Request Blood
        </button>

        <button className="border border-red-600 text-red-600 px-4 py-2 rounded">
          Mark Available to Donate
        </button>
      </div>

      {/* MY ACTIVE REQUESTS */}
      {hasActiveRequest && (
        <section>
          <h2 className="text-xl font-semibold mb-3">
            My Active Requests
          </h2>

          <div className="grid gap-4">
            {activeRequests.map((req) => (
              <RequestCard key={req.id} request={req} />
            ))}
          </div>
        </section>
      )}

      {/* MATCHING REQUESTS (DONATION OPPORTUNITY) */}
      {canDonate && matchingRequests.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-3">
            Requests You Can Help With
          </h2>

          <div className="grid gap-4">
            {matchingRequests.map((req) => (
              <RequestCard
                key={req.id}
                request={req}
                onAction={() => console.log("Accept request", req.id)}
              />
            ))}
          </div>
        </section>
      )}

      {/* HOSPITAL EXTRA SECTION */}
      {user.isHospital && (
        <section>
          <h2 className="text-xl font-semibold mb-3">
            Hospital Overview
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <StatsCard title="Open Requests" value={activeRequests.length} />
            <StatsCard title="Available Donors" value={42} />
          </div>
        </section>
      )}
    </div>
  );
}
