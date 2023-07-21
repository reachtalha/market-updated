import React from "react";

import { ChevronRightIcon } from "@radix-ui/react-icons";
import BoxedContent from "@/components/common/BoxedContent";

const DISCOUNT: number = 10;
const Footer = () => {
  return (
    <footer className="">
      <BoxedContent className="flex w-full mx-auto my-12">
        <div className="w-fill md:w-1/2 space-y-6">
          <p className="uppercase text-sm">Sign Up and save {DISCOUNT}%</p>
          <form className="flex items-center p-2 w-full md:w-2/3 gap-x-1 border placeholder:text-sm border-neutral-500 placeholder:text-neutral-500 focus-within:border-neutral-900 rounded-md">
            <input
              type="email"
              placeholder="Enter email address"
              className="bg-none focus:outline-none flex-1"
            />
            <button type="submit">
              <ChevronRightIcon width={22} height={22} />
            </button>
          </form>
          <ul className="flex gap-x-5 text-sm">
            <li className="cursor-pointer hover:underline underline-offset-2">
              Privacy Policy
            </li>
            <li className="cursor-pointer hover:underline underline-offset-2">
              Terms of Use
            </li>
            <li className="cursor-pointer hover:underline underline-offset-2">
              Accessibility
            </li>
          </ul>
        </div>
        <div className="w-full md:w-1/2 flex items-start justify-around">
          <div className="flex-shrink-0 space-y-3">
            <h6 className="font-medium uppercase">About All Organics</h6>
            <ul className="space-y-1 text-sm">
              <li className="hover:underline cursor-pointer">About</li>
              <li className="hover:underline cursor-pointer">
                Experts Program
              </li>
              <li className="hover:underline cursor-pointer">Brands & Shops</li>
              <li className="hover:underline cursor-pointer">Contact</li>
            </ul>
          </div>
          <div className="flex-shrink-0 space-y-3">
            <h6 className="font-medium uppercase">Orders and Support</h6>
            <ul className="space-y-1 text-sm">
              <li className="hover:underline cursor-pointer">Shipping</li>
              <li className="hover:underline cursor-pointer">
                Returns and Exchanges
              </li>
              <li className="hover:underline cursor-pointer">Payment</li>
            </ul>
          </div>
          <div className="flex-shrink-0 space-y-3">
            <h6 className="font-medium uppercase">Location Preferences</h6>
            <ul className="space-y-1 text-sm">
              <li className="hover:underline cursor-pointer">
                Shipping: United States
              </li>
              <li className="hover:underline cursor-pointer">
                Language: English
              </li>
            </ul>
          </div>
        </div>
      </BoxedContent>
    </footer>
  );
};

export default Footer;
