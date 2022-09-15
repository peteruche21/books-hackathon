import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers, deployments } from "hardhat";
import { expect } from "chai";
// import { BigNumber, Contract } from "ethers";
import { ThirdBook, ThirdBookShop, ThirdBook__factory, USD, USD__factory } from "../../typechain";

const SHOPFEE = 0.01;
const PERCENTCLAIM = 2;

describe("thirdbook shop", () => {
  let bookcontract: ThirdBook;
  let usdcContract: USD;
  let shopContract: ThirdBookShop;
  let accounts: SignerWithAddress[];

  beforeEach(async () => {
    accounts = await ethers.getSigners();
    await deployments.fixture(["all"]);
    usdcContract = await ethers.getContract("USD");
    bookcontract = await ethers.getContract("ThirdBook");
    shopContract = await ethers.getContract("ThirdBookShop");
    const nftMinterRole = await bookcontract.MINTER_ROLE();
    const nftMinterRoleTx = await bookcontract.grantRole(nftMinterRole, shopContract.address);
    await nftMinterRoleTx.wait();
  });

  describe("when the shop contract is deployed", () => {
    it("it defines the shop fee provided as parameter", async () => {
      const shopFee = await shopContract.shopFee();
      expect(Number(ethers.utils.formatEther(shopFee))).to.eq(Number(SHOPFEE));
    });
    it("it defines the percentage claim provided as parameter", async () => {
      const claim = await shopContract.percentageClaim();
      expect(claim).to.eq(PERCENTCLAIM);
    });
    it("it uses a valid usdc token contract as payment", async () => {
      const token = await shopContract.usdTokenContract();
      const usdFactory: USD__factory = await ethers.getContractFactory("USD");
      const usdContract = usdFactory.attach(token);
      const [name, symbol, supply] = await Promise.all([
        usdContract.name(),
        usdContract.symbol(),
        usdContract.totalSupply(),
      ]);
      expect(name.length).to.greaterThan(0);
      expect(symbol.length).to.greaterThan(0);
      expect(supply.toNumber()).to.eq(await usdcContract.totalSupply());
    });
  });

  describe("when publishing a book", () => {
    it("does something", async () => {
      // Todo
    });
  });
  describe("when purchasing a book", () => {
    it("does something", async () => {
      // Todo
    });
  });
});
