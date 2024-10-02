"use client";

import Image from "next/image";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { Icon, IconType } from "@aragon/ods";

const Sidebar = () => {
  const segment = useSelectedLayoutSegment();

  return (
    <header className="h-screen">
      <div className="w-72 bg-neutral-100 shadow h-full flex-col justify-between hidden sm:flex">
        <div className="flex-1 grow">
          <div className="w-full flex items-center py-3 px-3">
            <Image
              src="/logo-bw-lg.png"
              width="60"
              height="60"
              className="w-8 my-1 mx-4"
              alt="Aragonette"
            />
            <Link
              href="/"
              className={`block py-1 leading-tight font-semibold text-xl text-neutral-700`}
              aria-current="page"
            >
              Aragonette
            </Link>
          </div>
          <ul className="mt-12 px-6">
            <li
              className={`flex w-full justify-between text-neutral-700 cursor-pointer items-center py-3 px-3 mb-2 ${
                !segment ? "bg-neutral-200 font-semibold" : ""
              } rounded-lg shadow-lg hover:bg-neutral-200`}
            >
              <Link href="/" className="flex items-center w-full">
                <Icon
                  className="mr-2"
                  icon={IconType.HOME}
                  size="lg"
                  responsiveSize={{
                    md: "lg",
                  }}
                />

                <span
                  className={`block py-2 pr-4 pl-3 rounded ${
                    !segment ? "font-semibold" : ""
                  } lg:p-0`}
                  aria-current="page"
                >
                  Home
                </span>
              </Link>
            </li>
            <li
              className={`flex w-full justify-between text-neutral-700 cursor-pointer items-center py-3 px-3 mb-2 ${
                segment ? "bg-neutral-200 rounded-lg shadow-lg" : ""
              } rounded-lg shadow-lg hover:bg-neutral-200`}
            >
              <Link href="/proposals" className="flex items-center w-full">
                <Icon
                  className="mr-2"
                  icon={IconType.APP_GOVERNANCE}
                  size="md"
                  responsiveSize={{
                    md: "lg",
                  }}
                />
                <span
                  className={`block py-2 pr-4 pl-3 rounded lg:p-0 ${
                    segment === "proposals" ? "font-semibold" : ""
                  }`}
                  aria-current="page"
                >
                  Proposals
                </span>
              </Link>
            </li>
            <li
              className={`flex w-full justify-between text-neutral-700 cursor-pointer items-center py-3 px-3 mb-2 rounded-lg shadow-lg hover:bg-neutral-200`}
            >
              <Link
                href="#"
                className="flex items-center focus:outline-none focus:ring-2 focus:ring-white w-full"
              >
                <Icon
                  className="mr-2"
                  icon={IconType.APP_COMMUNITY}
                  size="md"
                  responsiveSize={{
                    md: "lg",
                  }}
                />
                <span className="block py-2 pr-4 pl-3 lg:p-0">Forum</span>
              </Link>
            </li>
            <li
              className={`flex w-full justify-between text-neutral-700 cursor-pointer items-center py-3 px-3 mb-2 rounded-lg shadow-lg hover:bg-neutral-200`}
            >
              <Link href="#" className="flex items-center w-full">
                <Icon
                  className="mr-2"
                  icon={IconType.QUESTION}
                  size="md"
                  responsiveSize={{
                    md: "lg",
                  }}
                />
                <span className="block py-2 pr-4 pl-3 lg:p-0">Discord</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="px-8">
          <ul className="w-full flex items-center justify-between mb-2">
            <li className="cursor-pointer pt-5 pb-3 text-neutral-400">
              <Link
                href="https://aragon.org"
                className="flex items-center focus:outline-none focus:ring-2 focus:ring-white"
              >
                <Image
                  src="/logo-bw-sm.png"
                  width="20"
                  height="20"
                  className=""
                  alt="Aragonette"
                />
                <span className="block py-2 pr-4 pl-3 lg:border-0">
                  Powered by <span className="font-semibold">Aragon</span>
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Sidebar;
