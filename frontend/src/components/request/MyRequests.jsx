import React, { useEffect, useState } from "react";
import RequestCard from "../../components/request/ RequestCard.jsx";
import API from "../../services/api";

export default function MyRequests({ userId }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyRequests();
  }, [userId]);

  const fetchMyRequests = async () => {
  if (!userId) return;

  try {
    setLoading(true);
    const res = await API.get(`/posts/requests/${userId}/`);
    console.log(res.data); // debug
    // If response is a single object, wrap it in an array
    const data = Array.isArray(res.data) ? res.data : [res.data];
    setRequests(data);
  } catch (error) {
    console.error("Failed to fetch my requests", error);
    setRequests([]);
  } finally {
    setLoading(false);
  }
};

  const handleAction = (request) => {
    console.log("Action clicked for:", request.id);
    // future: cancel / edit request
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          My Blood Requests
        </h1>
        <p className="text-sm text-gray-500 mt-1 md:mt-0">
          Total requests: {requests.length}
        </p>
      </div>

      {loading && (
        <div className="text-center py-16 text-gray-500">
          Loading your requests...
        </div>
      )}

      {!loading && requests.length === 0 && (
  <div className="text-center py-16 text-gray-500">
    You have no blood requests.
  </div>
)}

{!loading && requests.length > 0 && (
  <div className="grid gap-4">
    {requests.map((request) => (
      <RequestCard
        key={request.id}
        request={request}
        onAction={handleAction}
      />
    ))}
  </div>
)}

    </div>
  );
}
