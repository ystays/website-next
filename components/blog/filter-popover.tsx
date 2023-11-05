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
            <button className="flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100 active:bg-gray-200">
            Football/Soccer
            </button>
            <button className="flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100 active:bg-gray-200">
            Programming
            </button>
            <button className="flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100 active:bg-gray-200">
            Creativity
            </button>
        </div>
        }
        openPopover={openPopover}
        setOpenPopover={setOpenPopover}
        >
        <button
        onClick={() => setOpenPopover(!openPopover)}
        className="flex w-36 items-center justify-between rounded-md border border-gray-300 px-4 py-2 transition-all duration-75 hover:border-gray-800 focus:outline-none active:bg-gray-100"
        >
        <p className="text-gray-600">Category</p>
        <ChevronDown
            className={`h-4 w-4 text-gray-600 transition-all ${openPopover ? "rotate-180" : ""
            }`}
        />
        </button>
        </Popover>
    )
}