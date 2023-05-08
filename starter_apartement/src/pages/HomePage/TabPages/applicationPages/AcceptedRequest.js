import React, { useEffect, useState } from "react";
import Request from "./Request";
import {
  getAcceptedRequests,
  getAllRequests,
} from "../../../../services/managerService";
const AcceptedRequest = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    getAcceptedRequests().then((data) => {
      setRequests(data.data);
    });
  }, []);
  return (
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
      {requests.length > 0 &&
        requests.map(
          (request) =>
            request.status === "accepted" && (
              <Request data={request} isPending={false} />
            )
        )}
    </div>
  );
};

export default AcceptedRequest;
