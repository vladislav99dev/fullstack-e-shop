import { useState } from "react";

import { useNavTogglesContext } from "../../../context/NavTogglesContext";
import { useAuthContext } from "../../../context/AuthContext";

import FavouritesCard from "./FavouritesCard";
import FavouritesFooter from "./FavouritesFooter";
import FavouritesHeader from "./FavouritesHeader";
import Spinner from "../../Spinner/Spinner";


const FavouritesLayout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toggleFavouritesMenu } = useNavTogglesContext();
  const { user } = useAuthContext();


  const manageIsLoading = (value) => {
    setIsLoading(value);
  };

  return (
    <div>
      {/* // <!-- This example requires Tailwind CSS v2.0+ --> */}
<div
      className="relative z-10"
      aria-labelledby="slide-over-title"
      role="dialog"
      aria-modal="true"
    >
      {/* //   <!--
      //     Background backdrop, show/hide based on slide-over state.
      
      //     Entering: "ease-in-out duration-500"
      //       From: "opacity-0"
      //       To: "opacity-100"
      //     Leaving: "ease-in-out duration-500"
      //       From: "opacity-100"
      //       To: "opacity-0"
      //   --> */}
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            {/* // <!--
              //   Slide-over panel, show/hide based on slide-over state.
      
              //   Entering: "transform transition ease-in-out duration-500 sm:duration-700"
              //     From: "translate-x-full"
              //     To: "translate-x-0"
              //   Leaving: "transform transition ease-in-out duration-500 sm:duration-700"
              //     From: "translate-x-0"
              //     To: "translate-x-full"
              // --> */}
            <div className="pointer-events-auto w-screen max-w-md">
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                  <FavouritesHeader
                    toggleFavouritesMenu={toggleFavouritesMenu}
                  />
                  <div className="mt-8">
                    <div className="flow-root">
                      <ul
                        role="list"
                        className="-my-6 divide-y divide-gray-200"
                      >{isLoading 
                      ? <Spinner/>
                      : user.favourites.map((favourite) => (
                        <FavouritesCard
                          key={favourite._id}
                          product={favourite}
                          profileId = {user._id}
                          manageIsLoading={manageIsLoading}
                          toggleFavouritesMenu={toggleFavouritesMenu}
                        />
                      ))
                      }
                      </ul>
                    </div>
                  </div>
                </div>
                <FavouritesFooter />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default FavouritesLayout;
