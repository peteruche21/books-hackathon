import React, { useState } from "react";
import type { NextPage } from "next";
import styles from "../../styles/Upload.module.scss";
import Layout from "../../layout/MainLayout";
import Image from "next/image";
import { getServerSideProps } from "../shop";
import type { IUser } from "../../components/utils/types";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";

const Buy: NextPage<IUser> = ({ user }) => {
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
        <h4 className="text-primary text-center m-4">Buy book</h4>
        <div className={`${styles.center_container} row mb-6`}>
          <div className={`col-md-5`}>
            <div className="card border border-secondary rounded-0">
              {/* <Image src="..." className="card-img-top" alt="..." /> */}
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </p>
                <a href="#" className="btn btn-outline-secondary">
                  $20 Buy book
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export { getServerSideProps };

export default Buy;
