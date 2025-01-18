import { useMemo, useRef } from "react";
import { MESSAGE_FOR_SIGN, SolanaProvider } from "@/solana";
import { authApi } from "@/api/auth";
import { StorageKeys, setSessionStorageItem } from "@/app/helpers/storage";
import { NotificationsPlugin } from "@/app/helpers/notifications";
import messages from "@/app/configs/messages.json";
import { CloseIcon } from "@/app/static/icons/close";
import { useAppStore } from "@/app/store";
import { WALLET_CONFIG } from "@/app/helpers/wallets";

type ModalProps = {
  onClose: () => void;
};

export function Modal({ onClose }: ModalProps) {
  const { setIsLoggedIn } = useAppStore();
    const provider = useMemo(() => new SolanaProvider(), []);
    const { type, icon, name, label } = WALLET_CONFIG;

  const selectWalletModalRef = useRef<HTMLDivElement | null>(null);

  const onLogin = async () => {
    try {
      await provider.connect();
      onClose();
      const signature = await provider.signMessage();
      const token = await authApi.login({
        address: provider.PUBLIC_KEY ?? "",
        signature,
        message: MESSAGE_FOR_SIGN,
      });

      if (!token) {
        throw new Error();
      }

      setSessionStorageItem(StorageKeys.TOKEN, token);
      setIsLoggedIn(true);
      NotificationsPlugin.success(messages.auth.login.success);
    } catch (error) {
      NotificationsPlugin.error(messages.auth.login.error);
      onClose();
      console.error("Error: ", error);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/10"></div>
      <div
        className="fixed z-50 top-1/4 left-1/2 w-[26rem] p-5 bg-black-300 rounded-lg transform -translate-x-1/2 bg-black/40"
        ref={selectWalletModalRef}
      >
        <div
          className="absolute top-4 right-4 cursor-pointer text-white hover:text-gray-300"
          onClick={onClose}
        >
          <CloseIcon />
        </div>
        <h4 className="text-center text-white text-lg font-semibold">
          Choose your preferred wallet
        </h4>
        <div className="flex flex-col gap-6 mt-4">
          <div
              key={type}
              onClick={() => onLogin()}
              className="flex items-center gap-4 cursor-pointer hover:bg-gray-800 p-2 rounded-md"
            >
              <div className="w-8 h-8">{icon}</div>
              <span className="text-white text-base font-semibold">
                {name}
              </span>
              {label && (
                <span className="bg-gray-700 text-xs text-white px-2 py-1 rounded">
                  {label}
                </span>
              )}
            </div>
        </div>
      </div>
    </>
  );
}
