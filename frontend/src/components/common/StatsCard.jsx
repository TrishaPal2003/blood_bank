
import React from "react";

export default function StatsCard({ title, value, subtitle }) {
  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm">
      <h4 className="text-sm text-gray-500">{title}</h4>
      <p className="text-2xl font-bold mt-1">{value}</p>
      {subtitle && (
        <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
      )}
    </div>
  );
}
