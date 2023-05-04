import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Footer from "../LandingPage/components/Footer";
import Navbar from "../LandingPage/components/Navbar";
// import BookingWidget from "./BookingWidget";

export default function SingleRoomPage() {
  //const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [showAllPhotos, SetAllPhotos] = useState(false);
  useEffect(() => {
    // if (!id) return;
    // axios.get("/home-place/" + id).then(({ data }) => {
    //   setPlace(data);
    // });
  }, []);
  if (showAllPhotos) {
    return (
      <div className="absolute bg-gray-100 inset-0 text-black mx-auto">
        <div className="mt-4 p-2 grid gap-2 mx-auto   bg-gray-100">
          <div>
            <h2 className="text-3xl">title</h2>
            <button
              onClick={() => SetAllPhotos(false)}
              className="fixed p-3  bg-gray-500 flex gap-1 text-white top-1 right-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          {/* {place.photos.length > 0 &&
            place.photos.map((photo) => ("*/}
          <div className="w-full">
            <img
              src={`https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cm9vbXN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60`}
              alt=""
              className="w-full aspect-auto"
            />
          </div>
          <div>
            <img
              src={`https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cm9vbXN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60`}
              alt=""
            />
          </div>
        </div>
      </div>
    );
  }
  //   if (!room) return;
  return (
    <div className="bg-white">
      <Navbar />
      <div className="mt-4 bg-gray-100 px-8 pt-4">
        <h1 className="text-2xl font-bold">title</h1>
        <a
          className=" mt-2 flex gap-1  font-semibold underline"
          target="_blank"
          // href={"https://maps.google.com/?q=" + place.address}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
            />
          </svg>
          second floor
        </a>

        <div className="relative">
          <div className="rounded-2xl grid gap-2 grid-cols-1 md:grid-cols-[2fr_1fr] mt-2 overflow-hidden">
            <div className="">
              <img
                className="aspect-square object-cover w-full transition duration-500 ease-in-out"
                src={`https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cm9vbXN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60`}
                alt="First Image"
              />
            </div>
            <div className="overflow-hidden">
              <div>
                <img
                  className="aspect-square object-cover transition duration-500 ease-in-out"
                  src={`https://images.unsplash.com/photo-1562663474-6cbb3eaa4d14?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cm9vbXN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60`}
                  alt="Second Image"
                />
              </div>
              <div className="relative top-2">
                <img
                  className="aspect-square object-cover transition duration-500 ease-in-out"
                  src={`https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cm9vbXN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60`}
                  alt="Third Image"
                />
              </div>
            </div>
          </div>

          <button
            onClick={() => SetAllPhotos(true)}
            className="absolute bottom-1 right-1 p-2 bg-white rounded-xl shadow flex gap-1 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
            show more photos
          </button>
        </div>

        {/* <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] mt-4 gap-4">
        <div>
          <div className="my-2">
            <h2 className="font-semibold text-xl">description</h2>
            <p>{room.description}</p>
          </div>
          <p>check-in: {place.checkIn}</p>
          <p>check-out: {place.checkOut}</p>
          <p>maximum guests: {place.maxGuest}</p>
        </div>
        <div>
          <BookingWidget place={room} />
        </div>
      </div> */}

        <div className="bg-white -mx-8 px-6 mt-4 border-t">
          <div className="font-semibold text-xl">Extra info</div>
          <div>sgdubpibfapipiugeurubpib</div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
