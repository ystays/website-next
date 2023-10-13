import { ReactNode } from "react";
import Image from "next/image"


export default function ImageCard({
  alt,
  src,
  demo,
  large,
  fullWidth,
}: {
  alt: string;
  src: string;
  demo?: ReactNode;
  large?: boolean;
  fullWidth?: boolean;
}) {
  return (
    // <div
    //   className={`relative col-span-1 h-65 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md ${
    //     large ? "md:col-span-2" : ""}
    //     ${fullWidth ? "md:col-span-3" : ""
    //   }`}
    // >
      <div className="h-auto max-w-full flex items-center justify-center">
        <Image className="rounded-full" alt={alt} src={src} width={150} height={150}></Image>
      </div>
    // </div>
  );
}
