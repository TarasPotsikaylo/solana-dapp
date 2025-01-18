import { Buffer } from "buffer";

export const MESSAGE_FOR_SIGN = "Secure message"

export class SolanaProvider {
    public PUBLIC_KEY: string | undefined = undefined;
    private provider = window.solana;

    public async connnectPhantomWallet() {
        const responce = await this.provider?.connect();
        this.PUBLIC_KEY = responce?.publicKey.toString();
    };

    public async connect() {
        await this.connnectPhantomWallet();
    };

    public async signMessage(): Promise<string> {
        const message = new TextEncoder().encode(MESSAGE_FOR_SIGN);
        const responce = await this.provider?.signMessage(message, 'utf8');

        return Buffer.from(responce?.signature || '').toString('base64');
    };
};
