# Polymarket AMM Maths

This package contains a number of functions to calculate the effects of interactions with the [Conditional Tokens Market Makers](https://github.com/TokenUnion/conditional-tokens-market-makers) used by Polymarket.


**Note:** A number of utility functions from https://github.com/protofire/omen-exchange have been included in this package which were then adapted where necessary.

## Running tests

To run the tests, follow these steps. You must have at least node v10 and [yarn](https://yarnpkg.com/) installed.

First clone the repository:

```sh
git clone https://github.com/TokenUnion/amm-maths.git
```

Move into the uniswap-sdk working directory

```sh
cd amm-maths/
```

Install dependencies

```sh
yarn install
```

Run tests

```sh
yarn test
```

You should see output like the following:

```sh
yarn run v1.22.4
$ jest
 PASS  test/trading.test.ts
 PASS  test/liquidity.test.ts
 PASS  test/price.test.ts

Test Suites: 3 passed, 3 total
Tests:       64 passed, 64 total
Snapshots:   0 total
Time:        1.05 s
Ran all test suites.
Done in 1.64s.
```
