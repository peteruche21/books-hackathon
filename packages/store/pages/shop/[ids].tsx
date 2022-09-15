import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import styles from "../../styles/Upload.module.scss";
import Layout from "../../layout/MainLayout";
import Image from "next/image";
import noimage from "../../asset/no-image.png";
import { getSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";
import { getMetadata } from "../api/books/request-metadata";
import useEthers from "../../hooks/useEthers";
import formatAddress from "../../components/utils/format-address";

const customStyle = {
  display: "flex",
  gap: "5%",
};

const Buy: NextPage<any> = ({ user, tokenData, tokenId }) => {
  const [tokenMetadata, setTokenMetadata] = useState();
  const { purchase } = useEthers(user.address);
  async function handlePurchase(e: React.MouseEvent) {
    e.preventDefault();
    await purchase(tokenId);
    window.location.reload();
  }

  useEffect(() => {
    if (JSON.parse(tokenData)) {
      setTokenMetadata(JSON.parse(tokenData).metadata);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(tokenMetadata);

  return (
    <Layout user={user.address}>
      {tokenMetadata ? (
        <div
          style={{
            backgroundColor: "#ffff",
            padding: "30px",
            borderRadius: "10px",
            marginBottom: "200px",
          }}
          className="container-fluid"
        >
          <h4 className="textColor text-center m-4">{tokenMetadata.name}</h4>
          <div style={customStyle}>
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  paddingLeft: "20px",
                  paddingRight: "20px",
                }}
              >
                <img
                  src={tokenMetadata.image.replace(
                    "ipfs://",
                    "https://ipfs.io/ipfs/"
                  )}
                  className="nft-img"
                  alt={tokenId}
                />
              </div>
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "2%" }}
            >
              <h2 className="card-title" style={{ textAlign: "center" }}>
                Description
              </h2>
              <p className="card-text">{tokenMetadata.description}</p>
              <h6>TokenId: {tokenId}</h6>
              <h6>Genre: {tokenMetadata.properties.genre}</h6>
              <h6>Author: {formatAddress(tokenMetadata.properties.user)}</h6>
              {/* <h6>Published: oct-2021</h6> */}
              <div style={{ marginInline: "auto" }}>
                <button
                  className="btn btnBg"
                  onClick={(e) => handlePurchase(e)}
                >
                  Buy / ${tokenMetadata.properties.price}{" "}
                  {/** price will be in token metadata */}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Book with ID {tokenId} not Found</div>
      )}
    </Layout>
  );
};

export default Buy;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  const tokenId = context.params?.ids;
  // redirect if not authenticated
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  if (isNaN(tokenId as any)) {
    return {
      redirect: {
        destination: "/shop",
        permanent: false,
      },
    };
  }

  const chainId = process.env.CHAIN || "5";
  const tokenData = await getMetadata(tokenId as string, parseInt(chainId));

  console.log("tokendata is", tokenData);
  return {
    props: {
      user: session.user,
      tokenData: JSON.stringify(tokenData),
      tokenId: tokenId,
    },
  };
}
