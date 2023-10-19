"use client";

import { useState } from "react";
import { Dialog } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  ArrowLongRightIcon,
  LinkIcon,
} from "@heroicons/react/24/outline";

export default function Page() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [contractInfo, setContractInfo] = useState(null);
  const [contractAddress, setContractAddress] = useState("");
  const [dexInfo, setDexInfo] = useState(null);

  const fetchContractInfo = async () => {
    try {
      const response = await fetch(
        `https://api.dexscreener.com/latest/dex/search?q=${contractAddress}`
      );
      const data = await response.json();
      console.log(dexInfo); // Log dexInfo to the console

      const dexInfoData = data?.pairs?.[0];

      if (dexInfoData) {
        setContractInfo(dexInfoData);
        setDexInfo(dexInfoData); // Set dexInfo state
        setShowDetails(true);
      } else {
        console.error("Dexscreener response is missing expected data");
      }
    } catch (error) {
      console.error("Error fetching contract info:", error);
    }
  };

  const truncateWalletAddress = (address: string) => {
    if (!address) return "";
    const frontPart = address.substring(0, 8);
    const backPart = address.substring(address.length - 8);
    return `${frontPart}...........${backPart}`;
  };

  return (
    <div className="bg-black">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="https://circeai.net/images/logo-horizontal.png"
                alt=""
              />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-300"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a
              href="#"
              className="text-sm font-semibold leading-6 text-gray-300"
            >
              Connect <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  className="h-8 w-auto"
                  src="https://circeai.net/images/logo-horizontal.png"
                  alt=""
                />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-200">
                <div className="py-6">
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-200 hover:bg-gray-50"
                  >
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>

      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="h-screen relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="mx-auto max-w-5xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-400 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              Answers are based on live, accurate data obtained from the ETH
              blockchain.{" "}
              <a href="#" className="font-semibold text-red-600">
                <span className="absolute inset-0" aria-hidden="true" />
                Read more <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-200 sm:text-6xl">
              Circe AI Prediction Bot
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-400">
              Empowering the future of finance, Circe AI is a trailblazing
              decentralized application (DApp) that harnesses the remarkable
              potential of artificial intelligence.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <label htmlFor="contract-address" className="sr-only">
                Contract Address
              </label>
              <input
                id="contract-address"
                name="text"
                type="text"
                autoComplete="text"
                required
                value={contractAddress}
                onChange={(e) => setContractAddress(e.target.value)}
                className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                placeholder="Enter Contract Address"
              />
              <button
                type="submit"
                onClick={fetchContractInfo}
                className="flex rounded-md bg-red-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
              >
                Scan <ArrowLongRightIcon className="w-5 ml-2" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-white mt-10">
            {showDetails && (
              <>
                <div className="bg-gray-900 p-5 rounded-md">
                  <p className="font-medium mb-3">Overview</p>
                  {dexInfo && (
                    <p className="text-gray-400">
                      The address is a smart contract address on the{" "}
                      {dexInfo.chainId} blockchain. It is owned by the project{" "}
                      {dexInfo.baseToken.name}, which is a decentralized finance
                      (DeFi) platform that allows users to borrow and lend
                      assets. According to {dexInfo.dexId}, the Cai smart
                      contract has a liquidity of {dexInfo.liquidity.quote} ETH,
                      which is worth over ${dexInfo.liquidity.usd} as of
                      2023-10-18. The contract has also processed over 10
                      thousand transactions and has over 1,000 unique addresses
                      interacting with it.
                    </p>
                  )}
                </div>
                <div className="bg-gray-900 p-5 rounded-md">
                  <p className="font-medium mb-3">Token Info</p>
                  <p className="text-gray-400">
                    Answers are based on live, accurate data obtained from the
                    ETH blockchain.
                  </p>
                  <br />
                  {dexInfo && (
                    <ul>
                      <li className="text-gray-400">
                        <span className="text-white">Token Name: </span>
                        {dexInfo.baseToken.name} ({dexInfo.baseToken.symbol})
                      </li>
                      <li className="text-gray-400">
                        <span className="text-white">Network: </span>
                        {dexInfo.chainId}
                      </li>
                      <li className="text-gray-400">
                        <span className="text-white">Price: </span>$
                        {dexInfo.priceUsd}
                      </li>
                      <li className="text-gray-400">
                        <span className="text-white">Liquidity (USD): </span>$
                        {dexInfo.liquidity.usd}
                      </li>
                      <li className="text-gray-400">
                        <span className="text-white">MarketCap (FDV): </span>$
                        {dexInfo.fdv}
                      </li>
                    </ul>
                  )}
                </div>
                <div className="bg-gray-900 p-5 rounded-md">
                  <p className="font-medium mb-3">MarketCap Prediction</p>
                  {dexInfo && (
                    <p className="text-gray-400">
                      The market cap prediction for {dexInfo.baseToken.name} is
                      mixed. Some analysts believe that the{" "}
                      {dexInfo.baseToken.symbol} DeFi platform could gain
                      traction in the coming months and years, which could lead
                      to increased demand for {dexInfo.baseToken.symbol} tokens
                      and a higher market cap. Others believe that the
                      cryptocurrency market as a whole is facing a number of
                      challenges, which could dampen demand for{" "}
                      {dexInfo.baseToken.symbol} tokens and lead to a lower
                      market cap.
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white mt-5">
            {showDetails && (
              <>
                <div className="bg-gray-900 p-5 rounded-md">
                  <p className="font-medium mb-3">Top 10 Holders</p>
                  {dexInfo && (
                    <>
                      <p className="text-gray-400">
                        The top 10 holders of {dexInfo.baseToken.name}{" "}
                        collectively hold this percentage of the total supply.
                      </p>
                      <ul className="mt-5">
                        <li className="text-sm inline-flex">
                          <LinkIcon className="w-5 mr-1" />{" "}
                          {truncateWalletAddress(
                            "0xdCBc463C738177DDf5A89D438321BEb6CB957ddc"
                          )}
                          <span className="ml-5">
                            10000 {dexInfo.baseToken.symbol}
                          </span>
                        </li>
                        <li className="text-sm inline-flex">
                          <LinkIcon className="w-5 mr-1" />{" "}
                          {truncateWalletAddress(
                            "0xdCBc463C738177DDf5A89D438321BEb6CB957ddc"
                          )}
                          <span className="ml-5">
                            10000 {dexInfo.baseToken.symbol}
                          </span>
                        </li>
                        <li className="text-sm inline-flex">
                          <LinkIcon className="w-5 mr-1" />{" "}
                          {truncateWalletAddress(
                            "0xdCBc463C738177DDf5A89D438321BEb6CB957ddc"
                          )}
                          <span className="ml-5">
                            10000 {dexInfo.baseToken.symbol}
                          </span>
                        </li>
                        <li className="text-sm inline-flex">
                          <LinkIcon className="w-5 mr-1" />{" "}
                          {truncateWalletAddress(
                            "0xdCBc463C738177DDf5A89D438321BEb6CB957ddc"
                          )}
                          <span className="ml-5">
                            10000 {dexInfo.baseToken.symbol}
                          </span>
                        </li>
                        <li className="text-sm inline-flex">
                          <LinkIcon className="w-5 mr-1" />{" "}
                          {truncateWalletAddress(
                            "0xdCBc463C738177DDf5A89D438321BEb6CB957ddc"
                          )}
                          <span className="ml-5">
                            10000 {dexInfo.baseToken.symbol}
                          </span>
                        </li>
                        <li className="text-sm inline-flex">
                          <LinkIcon className="w-5 mr-1" />{" "}
                          {truncateWalletAddress(
                            "0xdCBc463C738177DDf5A89D438321BEb6CB957ddc"
                          )}
                          <span className="ml-5">
                            10000 {dexInfo.baseToken.symbol}
                          </span>
                        </li>
                        <li className="text-sm inline-flex">
                          <LinkIcon className="w-5 mr-1" />{" "}
                          {truncateWalletAddress(
                            "0xdCBc463C738177DDf5A89D438321BEb6CB957ddc"
                          )}
                          <span className="ml-5">
                            10000 {dexInfo.baseToken.symbol}
                          </span>
                        </li>
                        <li className="text-sm inline-flex">
                          <LinkIcon className="w-5 mr-1" />{" "}
                          {truncateWalletAddress(
                            "0xdCBc463C738177DDf5A89D438321BEb6CB957ddc"
                          )}
                          <span className="ml-5">
                            10000 {dexInfo.baseToken.symbol}
                          </span>
                        </li>
                      </ul>
                    </>
                  )}
                </div>
                <div className="bg-gray-900 p-5 rounded-md">
                  <p className="font-medium mb-3">Holder loyalty</p>
                  {dexInfo && (
                    <>
                      <p className="text-gray-400">
                        Checking top 10 holders & their last interaction with
                        the {dexInfo.baseToken.name} smart contract address.
                      </p>
                      <ul className="mt-5">
                        <li className="text-sm inline-flex">
                          <LinkIcon className="w-5 mr-1" />{" "}
                          {truncateWalletAddress(
                            "0xdCBc463C738177DDf5A89D438321BEb6CB957ddc"
                          )}
                          <span className="ml-5">2023-10-18</span>
                        </li>
                        <li className="text-sm inline-flex">
                          <LinkIcon className="w-5 mr-1" />{" "}
                          {truncateWalletAddress(
                            "0xdCBc463C738177DDf5A89D438321BEb6CB957ddc"
                          )}
                          <span className="ml-5">2023-10-18</span>
                        </li>
                        <li className="text-sm inline-flex">
                          <LinkIcon className="w-5 mr-1" />{" "}
                          {truncateWalletAddress(
                            "0xdCBc463C738177DDf5A89D438321BEb6CB957ddc"
                          )}
                          <span className="ml-5">2023-10-18</span>
                        </li>
                        <li className="text-sm inline-flex">
                          <LinkIcon className="w-5 mr-1" />{" "}
                          {truncateWalletAddress(
                            "0xdCBc463C738177DDf5A89D438321BEb6CB957ddc"
                          )}
                          <span className="ml-5">2023-10-18</span>
                        </li>
                        <li className="text-sm inline-flex">
                          <LinkIcon className="w-5 mr-1" />{" "}
                          {truncateWalletAddress(
                            "0xdCBc463C738177DDf5A89D438321BEb6CB957ddc"
                          )}
                          <span className="ml-5">2023-10-18</span>
                        </li>
                        <li className="text-sm inline-flex">
                          <LinkIcon className="w-5 mr-1" />{" "}
                          {truncateWalletAddress(
                            "0xdCBc463C738177DDf5A89D438321BEb6CB957ddc"
                          )}
                          <span className="ml-5">2023-10-18</span>
                        </li>
                        <li className="text-sm inline-flex">
                          <LinkIcon className="w-5 mr-1" />{" "}
                          {truncateWalletAddress(
                            "0xdCBc463C738177DDf5A89D438321BEb6CB957ddc"
                          )}
                          <span className="ml-5">2023-10-18</span>
                        </li>
                        <li className="text-sm inline-flex">
                          <LinkIcon className="w-5 mr-1" />{" "}
                          {truncateWalletAddress(
                            "0xdCBc463C738177DDf5A89D438321BEb6CB957ddc"
                          )}
                          <span className="ml-5">2023-10-18</span>
                        </li>
                      </ul>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {/* <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff3636] to-[#3d0000] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div> */}
      </div>
    </div>
  );
}
