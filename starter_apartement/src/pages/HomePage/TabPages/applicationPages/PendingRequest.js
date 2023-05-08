import React, { useEffect, useState } from "react";
import Request from "./Request";
import {
  getAcceptedRequests,
  getAllRequests,
} from "../../../../services/managerService";
const PendingRequest = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    getAllRequests().then((data) => {
      setRequests(data.data);
    });
  }, []);
  return (
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
      {requests.length > 0 &&
        requests.map(
          (request) =>
            request.status === "pending" && (
              <Request data={request} isPending={true} />
            )
        )}
    </div>
  );
};

export default PendingRequest;
