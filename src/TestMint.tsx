import React, { useState, useEffect } from "react";
import { MetadataCategory } from "./common/actions";
import { useConnection, useConnectionConfig } from "./common/contexts";
import { mintNFT } from "./web/actions/nft";
import { useWallet } from "@solana/wallet-adapter-react";

export default function TestMint() {
  const connection = useConnection();
  const { env } = useConnectionConfig();
  const wallet = useWallet();
  const [files, setFiles] = useState<File[]>([]);

  const [nftCreateProgress, setNFTcreateProgress] = useState<number>(0);

  // store files
  const mint = async () => {
    const metadata = {
      name: "Test Mint",
      symbol: "",
      creators: [],
      description: "First Test Mint",
      sellerFeeBasisPoints: 0,
      image: "",
      animation_url: undefined,
      attributes: undefined,
      external_url: "",
      properties: {
        files: [],
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

      //if (_nft) setNft(_nft);
    } catch (e: any) {
      console.log(e);
    } finally {
    }
  };
  return <button onClick={mint}>Mint</button>;
}
