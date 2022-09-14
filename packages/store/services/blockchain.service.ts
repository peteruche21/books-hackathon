import { providers, utils, getDefaultProvider, Wallet, Contract } from "ethers";
import contracts from "../constants/contracts";

class BookService {
  provider: providers.BaseProvider;
  userWallet: Wallet;
  shopContract: Contract;
  shopContractAddress: string;

  constructor() {
    this.shopContractAddress = contracts.ShopContract.address;
    this.provider = getDefaultProvider("ropsten");
    this.userWallet = Wallet.createRandom().connect(this.provider);
    this.shopContract = new Contract(
      contracts.ShopContract.address,
      contracts.ShopContract.abi
    ).connect(this.userWallet);
  }

  async address() {
    const address = this.userWallet.address;
    return address;
  }

  async setURI(uri: string) {
    return this.shopContract.setURI(uri);
  }

  async mint(addr: string, id: number, amount: number, data: string) {
    this.shopContract.mint(addr, id, amount, data);
  }
}

export default new BookService();
