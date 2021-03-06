import { useMemo } from "react";
import { num } from "@arthuryeti/terra";

import { getTokenDenom } from "../../asset";
import { PoolResponse } from "../../types";

type Response = {
  [key: string]: string;
} | null;

type Params = {
  pool: PoolResponse | null;
  amount: string | null | undefined;
};

export const useLpToTokens = ({ pool, amount }: Params): Response => {
  return useMemo(() => {
    if (pool == null || amount == null || num(amount).isEqualTo(0)) {
      return null;
    }

    const { assets, total_share } = pool;

    return assets.reduce(
      (acc, asset) => ({
        ...acc,
        [getTokenDenom(asset.info)]: num(amount)
          .times(asset.amount)
          .div(total_share)
          .toFixed(),
      }),
      {},
    );
  }, [pool, amount]);
};

export default useLpToTokens;
