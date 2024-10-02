import Image from "next/image";
import Link from "next/link";
import { Icon, IconType, Button } from "@aragon/ods";
import { useRouter } from "next/router";
import { useState } from "react";

const Sidebar = () => {
  const { pathname } = useRouter();
  const isHome = pathname === "/";
  const isProposals = pathname.startsWith("/proposals");
  const [isOpen, setIsOpen] = useState(false);

  const SidebarSwitchButton = () => (
    <Button
      size="sm"
      responsiveSize={{}}
      variant="tertiary"
      className="sm:hidden block absolute mt-2 ml-2 z-50"
      onClick={() => setIsOpen(!isOpen)}
    >
      <svg
        className="h-6 w-6 fill-current"
        viewBox="0 0 24 24"
      >
        {isOpen ? (
          <path
            fillRule="evenodd"
            d="M18.278 16.864a1 1 0 01-1.414 1.414l-8-8a1 1 0 011.414-1.414l8 8zm0-6a1 1 0 01-1.414 1.414l-8-8a1 1 0 011.414-1.414l8 8z"
            clipRule="evenodd"
          />
        ) : (
          <path
            fillRule="evenodd"
            d="M4 5h16a1 1 0 010 2H4a1 1 0 110-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2z"
            clipRule="evenodd"
          />
        )}
      </svg>
    </Button>
  )


  return (
    <header className="h-screen">
      <SidebarSwitchButton />
      <div className={`w-full bg-neutral-100 shadow h-full flex-col justify-between ${isOpen ? 'absolute' : 'hidden'} sm:flex md:w-72`}>
        <div className="flex-1 grow">
          <div className="w-full flex items-center pt-14 py-3 px-3 md:pt-3">
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
                isHome ? "bg-neutral-200 font-semibold" : ""
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
                    isHome ? "font-semibold" : ""
                  } lg:p-0`}
                  aria-current="page"
                >
                  Home
                </span>
              </Link>
            </li>
            <li
              className={`flex w-full justify-between text-neutral-700 cursor-pointer items-center py-3 px-3 mb-2 ${
                isProposals ? "bg-neutral-200 rounded-lg shadow-lg" : ""
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
                    isProposals ? "font-semibold" : ""
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
