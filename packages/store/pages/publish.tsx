import React, { useState } from "react";
import type { NextPage } from "next";
import styles from "../styles/Upload.module.scss";
import Layout from "../layout/MainLayout";
import { FileUploader } from "react-drag-drop-files";
import { getServerSideProps } from "./shop";
import type { IUser } from "../components/utils/types";
import { AppDispatch, RootState } from "../store/store";
import LoadingSpinner from "../components/loading/loading";
import { createBook } from "../features/bookThunk";
import { _createBook } from "../services/nftstorage";
import { useDispatch, useSelector } from "react-redux";
import usePublish from "../hooks/usePublish";

const fileTypes = ["JPG", "PNG", "GIF"];
const bookTypes = ["PDF"];

const Upload: NextPage<IUser> = ({ user }) => {
  const dispatch = useDispatch<AppDispatch>();
  const publish = usePublish();

  const { error, Loading, data, url, message } = useSelector(
    (state: RootState) => state.bookReducer
  );

  const [imgFile, setImgFile] = useState(null);
  const [bookFile, setBookFile] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    bookpdf: "",
    bookcover: "",
    user: "",
    amount: "",
    genre: "",
    price: "",
  });

  const handleImage = (file: any) => {
    setImgFile(file);
    console.log(file);
  };

  const handleBook = (file: any) => {
    setBookFile(file);
  };

  const handleChange = (e: any) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (bookFile == null || imgFile == null) {
      return;
    }

    let bookdata = { ...formData };
    bookdata.user = user.address;
    bookdata.bookpdf = bookFile as any;
    bookdata.bookcover = imgFile as any;
    console.log(bookdata);

    console.log("======");
    dispatch(createBook(bookdata));
  };

  return (
    <Layout user={user.address}>
      <div className="container m-2 mb-6 ">
        <div className={`${styles.center_container} row mb-6`}>
          <div
            style={{
              backgroundColor: "#ffff",
              padding: "30px",
              borderRadius: "10px",
              marginBottom: "200px",
            }}
            className={`col-md-6 ml-2`}
          >
            <div>
              <h4 className="text-center mb-4">Publish book</h4>
              <form onSubmit={handleSubmit}>
                <div className="form-group mt-3">
                  <FileUploader
                    maxSize={1000000000}
                    label="upload or drop a book cover image"
                    handleChange={handleImage}
                    name="bookcover"
                    types={fileTypes}
                  />
                </div>
                <div className="form-group ">
                  <label htmlFor="title">Title of book</label>
                  <input
                    type="text"
                    required
                    onChange={handleChange}
                    name="title"
                    className="form-control"
                  />
                </div>
                <label>Book pdf</label>
                <div className="form-group mt-1">
                  <FileUploader
                    maxSize={1000000000}
                    label="upload or drop a pdf file"
                    handleChange={handleBook}
                    name="bookpdf"
                    types={bookTypes}
                  />
                </div>
                <div className="form-group">
                  <label>Genre</label>
                  <select
                    name="genre"
                    onChange={handleChange}
                    className="form-control"
                  >
                    <option></option>
                    <option value="fantasy">Fantasy</option>
                    <option value="romance">Romance</option>
                    <option value="contemporary">Contemporary</option>
                    <option value="westerns">Westerns</option>
                    <option value="others">Others</option>
                  </select>
                </div>
                <div className="form-group ">
                  <label htmlFor="title">Price</label>
                  <input
                    type="number"
                    onChange={handleChange}
                    name="price"
                    required
                    placeholder="$"
                    className="form-control"
                  />
                </div>
                <div className="form-group ">
                  <label htmlFor="title">Amount</label>
                  <input
                    type="number"
                    onChange={handleChange}
                    name="amount"
                    required
                    placeholder="0"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    className="form-control"
                    onChange={handleChange}
                    name="description"
                    required
                    rows={3}
                  ></textarea>
                </div>

                <button type="submit" className="btnBg btn p-2  mt-4">
                  <i className="bi bi-plus-circle"></i>
                  {Loading ? <LoadingSpinner /> : "Submit book"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <br />
    </Layout>
  );
};

export { getServerSideProps };

export default Upload;
