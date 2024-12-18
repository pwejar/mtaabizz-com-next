/* eslint-disable @next/next/no-img-element */
import localFont from "next/font/local";
import Image from "next/image";
import Stores from "./components/Stores";

const chicleFont = localFont({
  src: "./fonts/Chicle-Regular.ttf",
  variable: "--font-geist-mono",
});

const gabaritoFont = localFont({
  src: "./fonts/Gabarito-VariableFont_wght.ttf",
  variable: "--font-geist-mono",
});

export default function Home() {
  return (
    <div className={`background p-2 md:p-4 ${gabaritoFont.className}`}>
      <div className="relative">
        <div className="w-full">
          <div className="bg-slate-50 shadow-sm">
            <div className="justify-items-end w-full p-4">
              <div className="breadcrumbs text-lg p-2 hidden md:block ">
                <ul>
                  <li>Home</li>
                  <li><a target="blank" href="https://mtaabizz.com/business">Businesses</a></li>
                  <li><a>Events & Tickets</a></li>
                  <li>Products</li>
                </ul>
              </div>
            </div>
            <div className="sm:flex justify-center p-8">
              <div className=" images md:p-8 flex-wrap flex justify-center">
                <img
                  className="m-1 w-3/4 dark:invert"
                  src="/mtaabizz bronchure.png"
                  alt="Next.js logo"
                />
              </div>
              <div className="md:p-6 self-end">
                <div className="md:p-8">
                  <div className="w-full flex items-center justify-center md:grid">
                    <Image
                      className="md:mx-auto dark:invert"
                      src="/mtaabizz icon.svg"
                      alt="mtaabizz logo"
                      width={80}
                      height={28}
                      priority
                    />
                    <Image
                    className=" dark:invert"
                    src="/mtaabizz name os logo.png"
                    alt="pwejar hub logo"
                    width={280}
                    height={28}
                    priority
                  />
                  </div>
                </div>
                <div className="flex gap-4 justify-center items-center flex-col sm:flex-row">
                  <a
                    className="rounded-full border border-solid border-black/[1] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
                    href="https://www.youtube.com/@pwejar"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Watch tutorials
                  </a>
                  <a
                    className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
                    href="https://play.google.com/store/apps/details?id=com.pwejar.mtaabizz&pcampaignid=pwejar.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      className="dark:invert"
                      src="/vercel.svg"
                      alt="Vercel logomark"
                      width={20}
                      height={20}
                    />
                    Download Now
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-slate-900 py-14">
              <div className="items-center justify-items-center">
                <h1 className={`p-8 text-4xl ${chicleFont.className} text-slate-100`}>🚀 Businesses enjoying our services ☺️  </h1>
              </div>
              <Stores></Stores>
              <div className="items-center justify-items-center">
                powered by pwejar 
              </div>
            </div>
        </div>
      </div>
      <footer >
        
      </footer>
    </div>
  );
}
