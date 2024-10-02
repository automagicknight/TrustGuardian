import Image from "next/image";
import Link from "next/link";
import { Icon, IconType, Button } from "@aragon/ods";
import { useRouter } from "next/router";
import { useState } from "react";
import { plugins } from "@/plugins";
import { ParsedUrlQuery } from "querystring";
import { resolveQueryParam } from "@/utils/query";
import { PUB_DISCORD_URL } from "@/constants";
import { Else, If, Then } from "./if";
import { CloseIcon, MenuIcon } from "./icons";

const Sidebar = () => {
  const { pathname, query } = useRouter();
  const isHome = pathname === "/";
  const pluginId = resolvePluginId(pathname, query);
  const [isOpen, setIsOpen] = useState(false);

  const SidebarSwitchButton = () => (
    <Button
      size="sm"
      responsiveSize={{}}
      variant="tertiary"
      className="md:hidden block absolute mt-2 ml-2 z-50"
      onClick={() => setIsOpen(!isOpen)}
    >
      <If condition={isOpen}>
        <Then>
          <CloseIcon className="h-6 w-6 fill-current" />
        </Then>
        <Else>
          <MenuIcon className="h-6 w-6 fill-current" />
        </Else>
      </If>
    </Button>
  );

  return (
    <header className="h-screen">
      <SidebarSwitchButton />
      <div
        className={`md:w-72 bg-neutral-50 md:bg-neutral-100 h-full flex flex-col justify-between z-40 ${
          isOpen ? "absolute md:relative w-full" : "hidden md:block"
        }`}
      >
        <div className="flex-1 grow">
          <div className="w-full flex items-center pt-14 py-3 px-3 md:pt-6">
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
          <ul className="mt-6 px-6">
            {/* Home page */}
            <li
              onClick={() => setIsOpen(false)}
              className={`flex w-full justify-between text-neutral-700 cursor-pointer items-center mb-2 ${
                isHome ? "bg-neutral-100 md:bg-neutral-200 font-semibold" : ""
              } rounded-lg shadow-lg hover:bg-neutral-100 md:hover:bg-neutral-200`}
            >
              <Link href="/" className="flex items-center w-full p-3">
                <Icon
                  className="mr-2"
                  icon={IconType.HOME}
                  size="lg"
                  responsiveSize={{ md: "lg" }}
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

            {/* Plugin list */}
            {plugins.map((plugin, idx) => (
              <li
                key={idx}
                onClick={() => setIsOpen(false)}
                className={`flex w-full justify-between text-neutral-700 cursor-pointer items-center mb-2 ${
                  plugin.id === pluginId
                    ? "bg-neutral-100 md:bg-neutral-200 font-semibold rounded-lg shadow-lg"
                    : ""
                } rounded-lg shadow-lg hover:bg-neutral-100 md:hover:bg-neutral-200`}
              >
                <Link
                  href={"/plugins/" + plugin.id + "/#/"}
                  className="flex items-center focus:outline-none focus:ring-2 focus:ring-white w-full p-3"
                >
                  <Icon
                    className="mr-2"
                    icon={plugin.icon}
                    size="md"
                    responsiveSize={{ md: "lg" }}
                  />
                  <span className="block py-2 pr-4 pl-3 lg:p-0">
                    {plugin.title}
                  </span>
                </Link>
              </li>
            ))}

            {/* External links */}
            <li
              className={`flex w-full justify-between text-neutral-700 cursor-pointer items-center mb-2 rounded-lg shadow-lg hover:bg-neutral-100 md:hover:bg-neutral-200`}
            >
              <Link
                href={PUB_DISCORD_URL}
                target="_blank"
                className="flex items-center w-full p-3"
              >
                <Icon
                  className="mr-2"
                  icon={IconType.HELP}
                  size="md"
                  responsiveSize={{ md: "lg" }}
                />
                <span className="block py-2 pr-4 pl-3 lg:p-0">Discord</span>
              </Link>
            </li>
          </ul>
        </div>
        <ul className="px-8 flex grow flex-col justify-end justify-items-end">
          <li className="cursor-pointer pt-5 pb-3 text-neutral-400">
            <Link
              href="https://aragon.org"
              className="flex items-center focus:outline-none focus:ring-2 focus:ring-white"
            >
              <span className="block py-2 pr-4 pl-3 lg:border-0 flex flex-row">
                Powered by{" "}
                <span className="font-semibold text-primary-400 mr-1">
                  &nbsp;Aragon
                </span>
                <Image
                  src="/logo.png"
                  width="24"
                  height="20"
                  className=""
                  alt="Aragonette"
                />
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

function resolvePluginId(
  pathname: string,
  queryParams: ParsedUrlQuery
): string | null {
  if (pathname !== "/plugins/[id]") return null;

  return resolveQueryParam(queryParams.id) || null;
}

export default Sidebar;
