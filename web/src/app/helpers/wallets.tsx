import { JSX } from "react";

import { PhatomWalletIcon } from "@/app/static/icons/phantomWallet";

const isPhantomWalletInstalled = Boolean(window.solana && window.solana.isPhantom);

type WalletConfig = {
    name: string;
    icon: JSX.Element;
    label: string;
    type: 'phantom';
};

export const WALLET_CONFIG: WalletConfig =
{
    name: 'Phantom wallet',
    icon: <PhatomWalletIcon />,
    label: isPhantomWalletInstalled ? 'installed' : 'not installed',
    type: 'phantom',
};
