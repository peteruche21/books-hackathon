import React, { useState } from "react";
import type { NextPage } from "next";
import styles from "../../styles/Layout.module.scss";
import Layout from "../../layout/MainLayout";
import noimage from "../../asset/no-image.png";
import Image from "next/image";
import { getSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";
import type { IUser } from "../../components/utils/types";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";

const Shop: NextPage<IUser> = ({ user }) => {
  const { error, Loading, data, url, message } = useSelector(
    (state: RootState) => state.bookReducer
  );
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
          <div className={`col-md-4`}>
            <div className="card  resize">
              <a href="#">
                <Image src={noimage} className="nft-img" alt="no image" />
                <div className="card-body">
                  <h5 className="card-title ">Card title</h5>
                  <p className="card-text">
                    This is a longer card with supporting text below ..
                  </p>
                </div>
              </a>
            </div>
          </div>
          <div className={`col-md-4`}>
            <div className="card resize ">
              <a href="#">
                <Image src={noimage} className="nft-img" alt="no image" />
                <div className="card-body">
                  <h5 className="card-title ">Card title</h5>
                </div>
              </a>
            </div>
          </div>
          <div className={`col-md-4`}>
            <div className="card resize ">
              <a href="#">
                <Image src={noimage} className="nft-img" alt="no image" />
                <div className="card-body">
                  <h5 className="card-title ">Card title</h5>
                  <p className="card-text">
                    This is a wider card with supporting text below...
                  </p>

                  {/* <p className="card-text">
                    <small className="text-muted">
                      Last updated 3 mins ago
                    </small>
                  </p> */}
                </div>
              </a>
            </div>
          </div>
          <div className={`col-md-4`}>
            <div className="card resize ">
              <a href="#">
                <Image src={noimage} className="nft-img" alt="no image" />
                <div className="card-body">
                  <h5 className="card-title ">Card title</h5>
                  <p className="card-text">
                    This is a wider card with supporting text below...
                  </p>

                  {/* <p className="card-text">
                    <small className="text-muted">
                      Last updated 3 mins ago
                    </small>
                  </p> */}
                </div>
              </a>
            </div>
          </div>
          <div className={`col-md-4`}>
            <div className="card resize ">
              <a href="#">
                <Image src={noimage} className="nft-img" alt="no image" />
                <div className="card-body">
                  <h5 className="card-title ">Card title</h5>
                  <p className="card-text">
                    This is a wider card with supporting text below...
                  </p>

                  {/* <p className="card-text">
                    <small className="text-muted">
                      Last updated 3 mins ago
                    </small>
                  </p> */}
                </div>
              </a>
            </div>
          </div>
          <div className={`col-md-4`}>
            <div className="card resize">
              <a href="#">
                <Image src={noimage} className="nft-img" alt="no image" />
                <div className="card-body">
                  <h5 className="card-title ">Card title</h5>
                  <p className="card-text">
                    This is a wider card with supporting text below...
                  </p>

                  {/* <p className="card-text">
                    <small className="text-muted">
                      Last updated 3 mins ago
                    </small>
                  </p> */}
                </div>
              </a>
            </div>
          </div>
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

  return {
    props: { user: session.user },
  };
}

export default Shop;
