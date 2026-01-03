
import React from "react";

export default function RequestCard({ request, onAction }) {
  const {
    bloodGroup,
    location,
    urgency,
    status,
    requestedBy,
    createdAt,
  } = request;

  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white space-y-2">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">
          Blood Group: {bloodGroup}
        </h3>
        <span className={`text-sm font-medium px-2 py-1 rounded 
          ${status === "pending" ? "bg-yellow-100 text-yellow-700" :
            status === "accepted" ? "bg-blue-100 text-blue-700" :
            "bg-green-100 text-green-700"}`}>
          {status}
        </span>
      </div>

      <p className="text-sm text-gray-600">📍 {location}</p>
      <p className="text-sm text-gray-600">Urgency: {urgency}</p>
      <p className="text-xs text-gray-400">
        Requested by: {requestedBy}
      </p>
      <p className="text-xs text-gray-400">
        Created: {new Date(createdAt).toLocaleDateString()}
      </p>

      {onAction && (
        <button
          onClick={() => onAction(request)}
          className="mt-2 text-sm text-white bg-red-600 px-3 py-1 rounded hover:bg-red-700"
        >
          Take Action
        </button>
      )}
    </div>
  );
}
