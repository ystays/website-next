"use client";

import Image from "next/image";
import Link from "next/link";
import useScroll from "@/lib/hooks/use-scroll";
import { useSignInModal } from "./sign-in-modal";
import UserDropdown from "./user-dropdown";
import { Session } from "next-auth";
import Popover from "../shared/popover";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

import { NavigationMenu } from "../navigation-menu";

export default function NavBar({ session }: { session: Session | null }) {
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const scrolled = useScroll(50);
  const [openPopover, setOpenPopover] = useState(false);
  
  return (
    <>
      <SignInModal />
      <div
        className={`fixed top-0 w-full flex justify-center ${
          scrolled
            ? "border-b border-gray-200 bg-white/50 backdrop-blur-xl"
            : "bg-white/0"
        } z-30 transition-all`}
      >
        <div className="mx-5 flex h-16 max-w-screen-xl items-center justify-between w-full">
          <div>
            <Link href="/" className="flex items-center font-display text-2xl">
              <Image
                src="/logo.png"
                alt="logo"
                width="30"
                height="30"
                className="mr-2 rounded-sm"
              ></Image>
              <h1>ystays</h1>
            </Link>
          </div>
          <div className="flex items-center gap-x-3 text-sm">
            <Link href="/about" className="flex items-center font-display">
              <p>About</p>
            </Link>
            <Link href="/blog" className="flex items-center font-display">
              <p>Blog</p>
            </Link>

            {/* <NavigationMenu></NavigationMenu> */}

            <Popover
              content={
                <div
                  onMouseLeave={() => setOpenPopover(!openPopover)} 
                  className="w-full rounded-md bg-white">
                  <Link href="/projects">
                  <button className="flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100 active:bg-gray-200">
                    <p>Projects</p>
                  </button>
                  </Link>
                  <Link href="/gallery">
                  <button className="flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100 active:bg-gray-200">
                    <p>Gallery of Words</p>
                  </button>
                  </Link>
                </div>
              }
              openPopover={openPopover}
              setOpenPopover={setOpenPopover}
            >
              <button
                onMouseEnter={() => setOpenPopover(!openPopover) }
                // className="flex w-36 items-center justify-between rounded-md border border-gray-300 px-4 py-2 transition-all duration-75 hover:border-gray-800 focus:outline-none active:bg-gray-100"
                className="flex items-center font-display"
              >
                <p>More</p>
                {/* <ChevronDown
                  className={`h-4 w-4 text-gray-600 transition-all ${openPopover ? "rotate-180" : ""
                    }`}
                /> */}
              </button>
            </Popover>
            {session ? (
              <UserDropdown session={session} />
            ) : (
              <button
                className="rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black"
                onClick={() => setShowSignInModal(true)}
              >
                Sign In
              </button>
            )}

          </div>
        </div>
      </div>
    </>
  );
}
