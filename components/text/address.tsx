import { formatHexString, getAddressExplorerLink } from "@/utils/evm";
import { getChildrenText } from "@/utils/content";
import { ReactNode } from "react";
import { useWalletClient } from "wagmi";

export const AddressText = ({ children }: { children: ReactNode }) => {
  const address = getChildrenText(children);
  const { data: client } = useWalletClient();

  const formattedAddress = formatHexString(address.trim());
  const link = getAddressExplorerLink(address, client?.chain?.name || "");

  if (!link) {
    return (
      <span className="text-primary-400 font-semibold underline">{formattedAddress}</span>
    );
  }
  return (
    <a href={link} target="_blank" className="text-primary-400 font-semibold underline">
      {formattedAddress}
    </a>
  );
};
