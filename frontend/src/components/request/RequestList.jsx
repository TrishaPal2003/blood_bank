// // pages/requests/RequestList.jsx
// import React, { useEffect, useState } from "react";
// import RequestCard from "../../components/request/ RequestCard.jsx";
// // import Pagination from "../../components/common/Pagination";
// import API from "../../services/api";

// export default function RequestList() {
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
// //   const [page, setPage] = useState(1);
// //   const [totalPages, setTotalPages] = useState(1);

//   useEffect(() => {
//     fetchRequests();
//   }, )
// //   [page]);

//   const fetchRequests = async () => {
//     try {
//       setLoading(true);

//       // Example API: /requests?page=1
//     //   const res = await API.get(`/requests?page=${page}`);
//     const res = await API.get(`http://127.0.0.1:8000/api/posts/requests/`);

//       setRequests(res.data.results);
//     //   setTotalPages(res.data.total_pages);
//     } catch (error) {
//       console.error("Failed to fetch requests", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAction = (request) => {
//     console.log("Action clicked for:", request.id);
//     // accept / view / approve logic later
//   };

//   if (loading) {
//     return (
//       <div className="text-center mt-10 text-gray-500">
//         Loading blood requests...
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-5xl mx-auto px-4 py-6">
//       <h1 className="text-2xl font-bold mb-6">
//         Blood Requests
//       </h1>

//       {requests.length === 0 ? (
//         <div className="text-center text-gray-500">
//           No blood requests found.
//         </div>
//       ) : (
//         <div className="grid gap-4">
//           {requests.map((request) => (
//             <RequestCard
//               key={request.id}
//               request={request}
//               onAction={handleAction}
//             />
//           ))}
//         </div>
//       )}

//       {/* <Pagination
//         currentPage={page}
//         totalPages={totalPages}
//         onPageChange={setPage}
//       /> */}
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import RequestCard from "../../components/request/ RequestCard.jsx";
import API from "../../services/api";

export default function RequestList() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
  try {
    setLoading(true);
    const res = await API.get("/posts/requests/");
    console.log(res.data); // debug
    setRequests(res.data || []); // <- fixed
  } catch (error) {
    console.error("Failed to fetch requests", error);
  } finally {
    setLoading(false);
  }
};


  const handleAction = (request) => {
    console.log("Action clicked for:", request.id);
    // future: accept / contact / approve
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Blood Requests
        </h1>
        <p className="text-sm text-gray-500 mt-1 md:mt-0">
          Total requests: {requests.length}
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-16 text-gray-500">
          Loading blood requests...
        </div>
      )}

      {/* Empty State */}
      {!loading && requests.length === 0 && (
        <div className="text-center py-16 text-gray-500">
          No active blood requests at the moment.
        </div>
      )}

      {/* Request List */}
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

      {/* Pagination comes here later */}
    </div>
  );
}

