import { Magic } from '@magic-sdk/react-native-bare';
import { SolanaExtension } from '@magic-ext/solana';
import { EVMExtension } from '@magic-ext/evm';
import { BrowserProvider } from 'ethers';

// API Key - Replace with your actual publishable key
const API_KEY = 'pk_live_E20B366DAA844ADE';

const PolygonMainnetOptions = {
  rpcUrl: 'https://polygon-rpc.com/',
  chainId: 137,
};

const testnetOptions = {
  rpcUrl: 'https://subnets.avax.network/testnetzer/testnet/rpc',
  chainId: 56400,
};

class MagicService {
  private static _magic: any = null;
  private static _provider: BrowserProvider | null = null;

  public static get magic(): any {
    if (!this._magic) {
      this._magic = new Magic(API_KEY, {
        extensions: [
          new EVMExtension([PolygonMainnetOptions, testnetOptions]),
          new SolanaExtension({
            rpcUrl: 'https://api.mainnet-beta.solana.com' as string,
          }),
        ],
      });
    }
    return this._magic;
  }

  public static get provider(): BrowserProvider {
    if (!this._provider) {
      this._provider = new BrowserProvider(
        MagicService.magic.rpcProvider as any
      );
    }
    return this._provider;
  }
}

// Export the MagicSDK instance with typed extensions
export const MagicSDK = MagicService.magic as Magic & {
  evm: EVMExtension;
  solana: SolanaExtension;
};

// React hook to use Magic service
export function useMagic() {
  return {
    magic: MagicService.magic,
    provider: MagicService.provider,
  };
}
