import React, { FC } from "react";
import {
  ConnectionProvider,
  WalletProvider,
  AccountsProvider,
  StoreProvider,
  MetaProvider,
} from "../common/contexts";
import { CoingeckoProvider } from "./contexts/coingecko";

export const Providers: FC = ({ children }) => {
  return (
    <ConnectionProvider>
      <WalletProvider>
        <AccountsProvider>
          <CoingeckoProvider>
            <StoreProvider
              ownerAddress="EhrvJcpBDX3tqGJtgkRjgxwVeJjM4Zw22m8KbffJhpVQ"
              // storeAddress="EhrvJcpBDX3tqGJtgkRjgxwVeJjM4Zw22m8KbffJhpVQ"
            >
              <MetaProvider>{children}</MetaProvider>
            </StoreProvider>
          </CoingeckoProvider>
        </AccountsProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
