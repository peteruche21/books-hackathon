# ThirdBook

Thirdbook is a decentralised book shop. with which payments are made with usdc token.

firstly

set your .env variables.

- ETHERSCAN_API_KEY= ... secret
- GOERLI_URL= ... more secret
- PRIVATE_KEY= ... very secret
- REPORT_GAS=true/false

```shell
yarn install
yarn hardaht compile
yarn hardhat deploy
yarn hardhat run scripts/grantRole.ts
```

optionaly you can set you desired network, you have to add your networks in `hardhat.config.ts`

```shell
yarn hardhat deploy --network [network name]
yarn hardhat run scripts/grantRole.ts --network [network name]
```

to run tests

- `yarn hardhat test`
