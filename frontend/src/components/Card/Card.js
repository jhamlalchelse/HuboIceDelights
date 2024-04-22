import React from "react";
import { cards } from "./constants";
import { Link } from "react-router-dom";

const Card = () => {
  return (
    <div className="grid grid-cols-5 gap-6">
      {cards.map((item, index) => {
        return (
          <div class="max-w-sm bg-pink-300 rounded-lg shadow flex flex-col justify-between">
            <div>
              <img class="rounded-t-lg h-52 w-full" src={item.url} alt="img" />
              <div class="p-2">
                <h5 class="text-xl font-semibold tracking-tight text-gray-900 capitalize">
                  {item.heading}
                </h5>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-700">
                  {item.label}
                  {index / 3 == 0
                    ? "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order."
                    : null}
                </p>
              </div>
            </div>
            <Link
              class="inline-flex items-center px-3 py-2 text-sm font-medium text-center m-2 min-w-fit w-20
              text-white bg-pink-700 rounded-lg hover:bg-pink-800 focus:ring-4 focus:outline-none
               focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
            >
              {item.buttonLabel}
              <svg
                class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Card;
