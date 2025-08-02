import { Mail } from "lucide-react";
import MagneticButton from "../animated/magnetic-button";
import Link from "next/link";

export default function CTA() {
  return (
    <div className="relative w-full max-w-7xl my-20 mx-auto overflow-hidden rounded-[40px] bg-orange-500 p-6 sm:p-10 md:p-20">
      <div className="absolute inset-0 hidden h-full w-full overflow-hidden md:block">
        <div className="absolute top-1/2 right-[-45%] aspect-square h-[800px] w-[800px] -translate-y-1/2">
          <div className="absolute inset-0 rounded-full bg-orange-400 opacity-30"></div>
          <div className="absolute inset-0 scale-[0.8] rounded-full bg-orange-300 opacity-30"></div>
          <div className="absolute inset-0 scale-[0.6] rounded-full bg-orange-200 opacity-30"></div>
          <div className="absolute inset-0 scale-[0.4] rounded-full bg-orange-100 opacity-30"></div>
          <div className="absolute inset-0 scale-[0.2] rounded-full bg-orange-50 opacity-30"></div>
          <div className="absolute inset-0 scale-[0.1] rounded-full bg-white/50 opacity-30"></div>
        </div>
      </div>

      <div className="relative z-10">
        <h1 className="mb-3 text-3xl font-bold text-white sm:text-4xl md:mb-4 md:text-5xl">
          Let&apos;s Get In Touch.
        </h1>
        <p className="mb-6 max-w-md text-base text-white sm:text-lg md:mb-8">
          Your laboratory instruments should serve you, not the other way
          around. We&apos;re happy to help you.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
          <MagneticButton
            icon={<Mail />}
            variant={"primary"}
            className="bg-black"
          >
            <Link href={"/contact"} className="w-full relative z-50">
              Send A Message
            </Link>
          </MagneticButton>
        </div>
      </div>
    </div>
  );
}
