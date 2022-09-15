import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import styles from "../../styles/Layout.module.scss";
import Layout from "../../layout/MainLayout";
import noimage from "../../asset/no-image.png";
import Image from "next/image";
import { getSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";
import { getAllBooks } from "../api/books/request-books";
import formatAddress from "../../components/utils/format-address";

const Shop: NextPage<any> = ({ user, books }) => {
  const bookList = JSON.parse(books);
  console.log(bookList);
  return (
    <Layout user={user.address}>
      <div
        style={{
          backgroundColor: "#ffff",
          padding: "30px",
          borderRadius: "10px",
          marginBottom: "200px",
        }}
        className="container-fluid"
      >
        <h4 className="textColor text-center m-4">Book shop</h4>
        <p className="text-center text-muted">
          Get your favorite books from bookstore blockchain
        </p>
        <div className={`${styles.create_container} row mb-6`}>
          {bookList.map((book: any, index: number) => {
            return (
              <div className={`col-md-4`} key={index}>
                <div className="card resize">
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
                      <p
                        className="card-text"
                        style={{
                          textAlign: "right",
                        }}
                      >
                        ${book.metadata.properties.price}
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

  const allBooks = await getAllBooks();
  // console.log("all books in the contract", allBooks);

  return {
    props: { user: session.user, books: JSON.stringify(allBooks) },
  };
}

export default Shop;
