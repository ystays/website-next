"use client";

import Popover from "@/components/shared/popover";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FilterPopover() {
    const [openPopover, setOpenPopover] = useState(false);

    return (
        <Popover
        content={
        <div className="w-full rounded-md bg-white p-2 sm:w-40">
            <a href="/blog">
                <button className="flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100 active:bg-gray-200">
                All
                </button>
            </a>
            <a href="/blog/football">
                <button className="flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100 active:bg-gray-200">
                Football/Soccer
                </button>
            </a>
            <a href="/blog/programming">
                <button className="flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100 active:bg-gray-200">
                Programming
                </button>
            </a>
            <a href="/blog/creativity">
                <button className="flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100 active:bg-gray-200">
                Creativity
                </button>
            </a>
            <a href="/blog/other">
                <button className="flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100 active:bg-gray-200">
                Other
                </button>
            </a>
        </div>
        }
        openPopover={openPopover}
        setOpenPopover={setOpenPopover}
        >
        <button
        onClick={() => setOpenPopover(!openPopover)}
        className="flex w-36 items-center justify-between rounded-md border border-gray-300 px-4 py-2 transition-all duration-75 hover:border-gray-800 focus:outline-none active:bg-gray-100"
        >
        <p className="text-gray-600">Tags</p>
        <ChevronDown
            className={`h-4 w-4 text-gray-600 transition-all ${openPopover ? "rotate-180" : ""
            }`}
        />
        </button>
        </Popover>
    )
}