

import { useEffect, useState } from "react";

import { getAllBanners } from "../../helpers/adminHelpers";
import { Link } from "react-router-dom";

export default function Example() {
  const [banners, setBanners] = useState([]);
  const [rnum, setRnum] = useState(0);

  const randomNuber = (length) => {
    const number = Math.floor(Math.random() * length);
    setRnum(number);
  };

  useEffect(() => {
    getAllBanners().then((res) => {
      if (res) {
        setBanners(res?.allBanners);
        randomNuber(res?.allBanners?.length);
      }
    });
  }, []);

  
  const backgroundImageStyle = {
    width: "100%",
    height: "100%",
    backgroundImage: `url('${
      banners.length > 0 ? banners[rnum].imageURL : ""
    }')`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundBlendMode: "multiply",
  };

 
  return (
    <section
      className="bg-gray-600 text-white backdrop-opacity-75"
      style={backgroundImageStyle}
    >
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
          Discover, Reserve, and Savor 
            <span className="sm:block">Memorable Dining Experiences. </span>
          </h1>

          <p className="mx-auto  mt-4 max-w-xl sm:text-xl/relaxed">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt
            illo tenetur fuga ducimus numquam ea!
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              className="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
              href="/home"
            >
              Get Started
            </Link>

            <a
              className="block w-full rounded border border-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
              href="/about"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
