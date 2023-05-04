import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Footer from "../LandingPage/components/Footer";
import Navbar from "../LandingPage/components/Navbar";
export default function AvalableRooms() {
  const [Rooms, setRooms] = useState([]);
  useEffect(() => {
    axios.get("/home-place").then(({ data }) => {
      setRooms([...data]);
    });
  }, []);
  return (
    <div className="bg-white mx-auto">
      <Navbar />
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8 mt-4 p-4">
        {/* {Rooms.length > 0 &&
        Rooms.map((room) => (
            {`/place/${room._id}`} key={room._id} 
            {"http://127.0.0.1:4000/uploads/" + place.photos[0]}*/}
        <Link to={"/rooms"}>
          <div className="flex mb-2">
            <img
              className="rounded-2xl object-cover aspect-square"
              src={
                "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cm9vbXN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
              }
            />
          </div>
          <h2 className="font-bold">second floor</h2>
          <h3 className="text-sm truncate text-gray-500">
            living room and 2 bed rooms
          </h3>

          <div className="mt-1">
            <span className="font-bold">$700</span> per month
          </div>
        </Link>
        <Link>
          <div className="flex mb-2">
            <img
              className="rounded-2xl object-cover aspect-square"
              src={
                "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cm9vbXN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
              }
            />
          </div>
          <h2 className="font-bold">second floor</h2>
          <h3 className="text-sm truncate text-gray-500">
            living room and 2 bed rooms
          </h3>

          <div className="mt-1">
            <span className="font-bold">$700</span> per month
          </div>
        </Link>
        <Link>
          <div className="flex mb-2">
            <img
              className="rounded-2xl object-cover aspect-square"
              src={
                "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cm9vbXN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
              }
            />
          </div>
          <h2 className="font-bold">second floor</h2>
          <h3 className="text-sm truncate text-gray-500">
            living room and 2 bed rooms
          </h3>

          <div className="mt-1">
            <span className="font-bold">$700</span> per month
          </div>
        </Link>
        <Link>
          <div className="flex mb-2">
            <img
              className="rounded-2xl object-cover aspect-square"
              src={
                "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cm9vbXN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
              }
            />
          </div>
          <h2 className="font-bold">second floor</h2>
          <h3 className="text-sm truncate text-gray-500">
            living room and 2 bed rooms
          </h3>

          <div className="mt-1">
            <span className="font-bold">$700</span> per month
          </div>
        </Link>
        <Link>
          <div className="flex mb-2">
            <img
              className="rounded-2xl object-cover aspect-square"
              src={
                "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cm9vbXN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
              }
            />
          </div>
          <h2 className="font-bold">second floor</h2>
          <h3 className="text-sm truncate text-gray-500">
            living room and 2 bed rooms
          </h3>

          <div className="mt-1">
            <span className="font-bold">$700</span> per month
          </div>
        </Link>
      </div>
      <Footer />
    </div>
  );
}
