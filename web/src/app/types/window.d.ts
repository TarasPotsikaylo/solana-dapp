export {};

declare global {
  interface Window {
    solana?: {
      isPhantom?: boolean;
      connect: () => Promise<{
        publicKey: Buffer;
      }>;
      signMessage: (messsage: Uint8Array, format: string) => Promise<{
        signature: Uint8Array;
      }>;
    };
  }
}
