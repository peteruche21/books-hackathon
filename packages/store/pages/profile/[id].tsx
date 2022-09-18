import React, { useState } from "react";
import type { NextPage } from "next";
import styles from "../../styles/Layout.module.scss";
import Layout from "../../layout/MainLayout";
import { getSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";
import { getWalletBooks } from "../api/books/request-walletBooks";
import formatAddress from "../../components/utils/format-address";

const Profile: NextPage<any> = ({ user, walletBooks }) => {
  const walletBookList = JSON.parse(walletBooks);
  return (
    <Layout user={user.address}>
      <div
        style={{
          backgroundColor: "#ffff",
          padding: "30px",
          borderRadius: "10px",
          marginBottom: "200px",
        }}
        className={`container-fluid `}
      >
        <h4 className="text-center m-6 p-6 textColor">My books</h4>
        <p className="text-center text-secondary">
          Your personal book collections
        </p>

        <div className="row p-6">
          {walletBookList.map((book: any, index: number) => {
            return (
              <div className="col-md-4 p-6 " key={index}>
                <div className="card ">
                  <a href={`/shop/${book.tokenId}`}>
                    <img
                      src={book.metadata.image.replace(
                        "ipfs://",
                        "https://ipfs.io/ipfs/"
                      )}
                      className="nft-img"
                      alt={book.tokenId}
                    />
                    <div className="card-body">
                      <h5 className="card-title ">{book.metadata.name}</h5>
                      <p className="card-text">
                        by: {formatAddress(book.metadata.properties.user)}
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);

  // redirect if not authenticated
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const walletBooks = await getWalletBooks(session.user?.address);

  return {
    props: { user: session.user, walletBooks: JSON.stringify(walletBooks) },
  };
}

export default Profile;
