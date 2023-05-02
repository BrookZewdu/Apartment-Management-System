import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="flex items-center justify-center py-10">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-2">
          <div className="flex flex-col items-start justify-center">
            <h1 className="mb-4 text-4xl font-bold leading-tight text-white">
              Welcome to our luxurious apartment living
            </h1>
            <p className="mb-8 text-lg text-white">
              Welcome to our beautiful apartment complex! Our spacious and
              modern units are perfect for anyone looking for a comfortable and
              convenient living space.Each unit features a well-designed layout
              with high ceilings and large windows that offer plenty of natural
              light. Our kitchens are fully equipped with stainless steel
              appliances and granite countertops, making meal preparation a
              breeze. The bedrooms are cozy and comfortable, with plush carpets
              and ample closet space.
            </p>
            <Link
              to="/sign-up"
              className="inline-block px-8 py-3 font-bold text-white bg-blue-900 rounded-full hover:bg-blue-800"
            >
              Join Now
            </Link>
          </div>
          {/* <div className="flex items-center justify-center">
            <img
              src="/images/hero-image.png"
              alt="Collaboration"
              className="object-contain w-full h-full"
            />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Hero;
