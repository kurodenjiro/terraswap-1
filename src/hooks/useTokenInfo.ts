import { useCallback } from "react";
import { useWallet } from "@terra-money/wallet-provider";

import { useTerraswap } from "../context";

export const useTokenInfo = () => {
  const { network } = useWallet();
  const { data } = useTerraswap();

  const getSymbol = useCallback(
    (token: string | null) => {
      if (data == null || token == null) {
        return null;
      }

      return data[network.name].tokens[token].symbol || token;
    },
    [network.name, data],
  );

  const getIcon = useCallback(
    (token: string | null) => {
      if (data == null || token == null) {
        return null;
      }

      const info = data[network.name].tokens[token];

      return info.icon || null;
    },
    [network.name, data],
  );

  return {
    getSymbol,
    getIcon,
  };
};

export default useTokenInfo;
