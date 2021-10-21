import React, { useState, useEffect, useCallback } from "react";
import { MetadataCategory } from "./common/actions";
import {
  useConnection,
  useConnectionConfig,
  useWalletModal,
} from "./common/contexts";
import { mintNFT } from "./web/actions/nft";
import { useWallet } from "@solana/wallet-adapter-react";

export default function TestMint() {
  const connection = useConnection();
  const { env } = useConnectionConfig();
  const wallet = useWallet();
  const [files, setFiles] = useState<File[]>([]);

  const [nftCreateProgress, setNFTcreateProgress] = useState<number>(0);

  const { connect, connected } = wallet;
  const { setVisible } = useWalletModal();
  //const open = useCallback(() => setVisible(true), [setVisible]);

  // Connect Wallet
  const handleConnect = useCallback(
    () => connect().catch(() => {}),
    [connect]
    // () => (wallet ? connect().catch(() => {}) : open()),
    // [wallet, connect, open]
  );

  // store files
  const mint = async () => {
    const metadata = {
      name: "Test Mint",
      symbol: "",
      creators: [
        {
          address: "EhrvJcpBDX3tqGJtgkRjgxwVeJjM4Zw22m8KbffJhpVQ",
          share: 100,
          verified: true,
        },
      ],
      description: "First Test Mint",
      sellerFeeBasisPoints: 500,
      image: "DK_FbCover.png",
      animation_url: undefined,
      attributes: [
        { trait_type: "color", value: "purple", display_type: undefined },
      ],
      external_url: "",
      properties: {
        files: [
          {
            uri: "file:///Users/pwarrior/Downloads/GDrive/Projects/DK/images/Posters/DK_FbCover.png",
            type: "image/png",
          },
        ],
        creators: [
          {
            address: "EhrvJcpBDX3tqGJtgkRjgxwVeJjM4Zw22m8KbffJhpVQ",
            share: 100,
            verified: true,
          },
        ],
        category: MetadataCategory.Image,
      },
    };

    try {
      const _nft = await mintNFT(
        connection,
        wallet,
        env,
        files,
        metadata,
        setNFTcreateProgress,
        1
      );
      console.log("NFT:");
      console.log(_nft);
      //if (_nft) setNft(_nft);
    } catch (e: any) {
      console.log("nft error:");
      console.log(e);
    } finally {
    }
  };
  return (
    <>
      <button onClick={handleConnect}>Connect</button>
      <button onClick={mint}>Mint</button>
    </>
  );
}
