import React from "react";
import { StarIcon } from "@heroicons/react/outline";

const RoomCard = ({image, title, description, price, rating }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-gray-700 h-40 md:h-48 lg:h-56">
        <img
          className="h-full w-full object-cover"
          src={image}
          alt="Room"
        />
      </div>
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        <p className="mt-2 text-gray-600">{description}</p>
        <p className="mt-4 text-gray-800 font-semibold">${price}/month</p>
        <div className="mt-2 flex items-center text-yellow-400">
          {Array.from({ length: rating }).map((_, i) => (
            <StarIcon key={i} className="h-5 w-5 mr-1" />
          ))}
          {Array.from({ length: 5 - rating }).map((_, i) => (
            <StarIcon
              key={i}
              className="h-5 w-5 mr-1 text-gray-400"
              fill="none"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const BestRooms = () => {
  return (
    <section className="bg-gray-100 py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Best Rooms
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Check out our top-rated rooms for your next stay.
          </p>
        </div>
        <div className="mt-12">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <RoomCard
              image="https://hostedimages-cdn.aweber-static.com/OTE=/optimized/3030c5d6a43e4f62a86e670a03a2c682.jpeg"
              title="Luxury Suite"
              description="Experience the ultimate in luxury with our deluxe suite."
              price={250}
              rating={5}
            />
            <RoomCard
              image="https://hostedimages-cdn.aweber-static.com/OTE=/optimized/bf384501abcc477f8d6205a6494400ad.jpeg"
              title="Executive Room"
              description="Our executive rooms are perfect for the busy professional."
              price={150}
              rating={4}
            />
            <RoomCard
              image="https://hostedimages-cdn.aweber-static.com/OTE=/optimized/f8ff8bcb9b714fbaaa01f1972da656bb.jpeg"
              title="Premium Room"
              description="Enjoy our spacious premium rooms with stunning views."
              price={200}
              rating={4}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestRooms;
