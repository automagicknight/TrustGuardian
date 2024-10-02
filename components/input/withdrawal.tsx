import { Action } from "@/utils/types";
import { FC, useEffect, useState } from "react";
import { InputText, InputNumber } from "@aragon/ods";
import { Address, parseEther } from "viem";
import { isAddress } from "@/utils/evm";
import { ElseIf, If, Then } from "../if";

interface WithdrawalInputProps {
  setActions: (actions: Action[]) => any;
}

const WithdrawalInput: FC<WithdrawalInputProps> = ({ setActions }) => {
  const [to, setTo] = useState<Address>();
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    if (!isAddress(to)) return;
    else if (!isNumeric(value)) return;

    setActions([{ to, value: BigInt(value), data: "" } as unknown as Action]);
  }, [to, value]);

  const handleTo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTo(event?.target?.value as Address);
  };

  return (
    <div className="my-6">
      <div className="mb-3 pb-3">
        <InputText
          label="Address"
          placeholder="0x1234..."
          variant={!to || isAddress(to) ? "default" : "critical"}
          value={to}
          onChange={handleTo}
        />
        <If condition={!to}>
          <Then>
            <p className="mt-3">Enter the address to transfer to</p>
          </Then>
          <ElseIf condition={!isAddress(to)}>
            <p className="mt-3">The address you entered is not valid</p>
          </ElseIf>
        </If>
      </div>
      <div className="mb-6">
        <InputNumber
          label="Amount"
          placeholder="1.234 ETH"
          min={0}
          variant={
            typeof value === "undefined" || isNumeric(value)
              ? "default"
              : "critical"
          }
          onChange={(val: string) => setValue(parseEther(val).toString())}
        />
      </div>
    </div>
  );
};

function isNumeric(value: string): boolean {
  if (!value) return true;
  return !!value.match(/^[0-9]+$/);
}

export default WithdrawalInput;
