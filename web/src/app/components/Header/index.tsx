"use client"
import { authApi } from "@/api/auth";
import { StorageKeys, removeSessionStorageItem } from "@/app/helpers/storage";
import { NotificationsPlugin } from "@/app/helpers/notifications";
import messages from "@/app/configs/messages.json";
import { Button } from "@/app/components/Button";
import { Modal } from "@/app/components/Modal";
import { WalletAddress } from "@/app/components/WalletAddress";
import { useAppStore } from "@/app/store";
import { useState } from "react";

export function Header() {
  const { isLoggedIn, setIsLoggedIn } = useAppStore();
  const [isModalShown, setIsModalShown] = useState<boolean>(false);

  const toggleModalVisibility = () => setIsModalShown(!isModalShown);

  const onLogout = async () => {
    try {
      await authApi.logout();
      removeSessionStorageItem(StorageKeys.TOKEN);
      setIsLoggedIn(false);
      NotificationsPlugin.success(messages.auth.logout.success);
    } catch {
      NotificationsPlugin.error(messages.auth.logout.error);
    }
  };

  return (
    <>
      <header className="w-full bg-black text-white flex justify-between items-center p-4">
      <div className="text-lg font-semibold">
        Solana DApp
      </div>
        {isLoggedIn ? (
          <>
            <WalletAddress />
            <Button label="Logout" onClick={onLogout} />
          </>
        ) : (
          <Button label="Connect" onClick={toggleModalVisibility} />
        )}
        </header>
      {isModalShown && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center transition-opacity duration-300 ease-in-out">
          <Modal onClose={toggleModalVisibility} />
        </div>
      )}
    </>
  );
}
