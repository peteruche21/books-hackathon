import React, { useState } from "react";
import type { NextPage } from "next";
import styles from "../../styles/Layout.module.scss";
import Layout from "../../layout/MainLayout";
import Image from "next/image";
import noimage from "../../asset/no-image.png";
import { getServerSideProps } from "../shop";
import type { IUser } from "../../components/utils/types";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";

const Profile: NextPage<IUser> = ({ user }) => {
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
          <div className="col-md-4 ">
            <div className="card ">
              <a href="#">
                <Image src={noimage} className="nft-img" alt="no image" />
                <div className="card-body">
                  <h5 className="card-title">Card title</h5>
                  <p className="card-text">
                    This is a longer card with supporting text below as a
                    natural lead-in to additional content...
                  </p>
                </div>
              </a>
            </div>
          </div>
          <div className="col-md-4  ">
            <div className="card  ">
              <a href="#">
                <Image src={noimage} className="nft-img" alt="no image" />
                <div className="card-body">
                  <h5 className="card-title">Card title</h5>
                  <p className="card-text">
                    This card has supporting text below as a natural lead-in to
                    additional content...
                  </p>
                </div>
              </a>
            </div>
          </div>
          <div className="col-md-4 p-6 ">
            <div className="card ">
              <Image src={noimage} className="nft-img" alt="no image" />
              <a href="#">
                <div className="card-body">
                  <h5 className="card-title">Card title</h5>
                  <p className="card-text">
                    This is a wider card with supporting text below as a natural
                    lead-in to additional content...
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export { getServerSideProps };

export default Profile;
