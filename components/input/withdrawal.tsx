import { Action } from "@/utils/types";
import { FC, useEffect, useState } from "react";
import { InputText, InputNumber } from '@aragon/ods'
import { Address, parseEther } from "viem";
import { isAddress } from "@/utils/evm";

interface WithdrawalInputProps {
    setAction: Function;
}

const WithdrawalInput: FC<WithdrawalInputProps> = ({ setAction }) => {
    const [to, setTo] = useState<Address>();
    const [value, setValue] = useState<string>('')

    useEffect(() => {
        if (!isAddress(to)) return;
        else if (!isNumeric(value)) return;

        setAction([{ to, value: BigInt(value), data: '0x' } as unknown as Action])
    }, [to, value])

    const handleTo = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTo(event?.target?.value as Address);
    }

    return (
        <div className="my-6">
            <div className="mb-3 pb-3">
                <InputText
                    className=""
                    label="Address"
                    placeholder="0x..." 
                    variant={(!to || isAddress(to)) ? "default" : "critical"}
                    value={to}
                    onChange={handleTo}
                    />
            </div>
            <div className="mb-6">
                <InputNumber
                    className=""
                    label="Amount"
                    placeholder="1" 
                    helpText="in ether"
                    variant={(typeof value === "undefined" || isNumeric(value)) ? "default" : "critical"}
                    onChange={(val: string) => setValue(parseEther(val).toString())}
                    />
            </div>
        </div>
    )
};

function isNumeric(value: string): boolean {
    if (!value) return true;
    return !!value.match(/^[0-9]+$/);
}

export default WithdrawalInput
