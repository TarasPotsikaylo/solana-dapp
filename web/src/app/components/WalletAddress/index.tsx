import { useEffect } from "react";
import { profileApi } from "@/api/profile";

import { NotificationsPlugin } from "@/app/helpers/notifications";
import messages from "@/app/configs/messages.json";
import { CopyIcon } from "@/app/static/icons/copy";
import { useAppStore } from "@/app/store";

export function WalletAddress() {
   const { address, setAddress } = useAppStore();

  const onCopy = () => {
    navigator.clipboard.writeText(address);
    NotificationsPlugin.success(messages.walletAddress.copied);
  };

  useEffect(() => {
    (async () => {
      const { address } = await profileApi.profile();
      setAddress(address);
    })();
  }, []);

  return (
    <div className="flex gap-2 items-center">
      <span className="font-sans font-medium" title={address}>
        {address.slice(0, 3)}...{address.slice(-3)}
      </span>
      <div
        className="cursor-pointer text-gray-500 hover:text-gray-700"
        onClick={onCopy}
        title={'Copy'}
      >
        <CopyIcon />
      </div>
    </div>
  );
}
