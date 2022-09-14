import React, { useState } from "react";
import type { NextPage } from "next";
import styles from "../../styles/Layout.module.scss";
import Layout from "../../layout/MainLayout";
import Image from "next/image";
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
        <h4 className="text-center m-6 p-6 text-info">My books</h4>
        <p className="text-center text-secondary">
          Your personal book collections
        </p>

        <div className="row p-6">
          <div className="card-deck p-6 ">
            <div className="card  rounded-lg">
              {/* <Image src="..." className="card-img-top" alt="..." /> */}
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </p>
                <a href="#" className="btn btn-outline-secondary">
                  Download
                </a>
              </div>
            </div>
            <div className="card  rounded-lg">
              {/* <Image src="..." className="card-img-top" alt="..." /> */}
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  This card has supporting text below as a natural lead-in to
                  additional content.
                </p>
                <a href="#" className="btn btn-outline-secondary">
                  Download
                </a>
              </div>
            </div>
            <div className="card rounded">
              {/* <Image src="..." className="card-img-top" alt="..." /> */}
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This card has even longer
                  content than the first to show that equal height action.
                </p>
                <a href="#" className="btn btn-outline-secondary">
                  Download
                </a>
                {/* <p className="card-text">
                    <small className="text-muted">
                      Last updated 3 mins ago
                    </small>
                  </p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export { getServerSideProps };

export default Profile;
