import React, { useState } from "react";
import type { NextPage } from "next";
import styles from "../styles/Upload.module.scss";
import Layout from "../layout/MainLayout";
import { FileUploader } from "react-drag-drop-files";
import { getServerSideProps } from "./home";
import type { IUser } from "../components/utils/types";
import { AppDispatch, RootState } from "../store/store";
import { createBook } from "../features/bookThunk";
import { useDispatch, useSelector } from "react-redux";

const fileTypes = ["JPG", "PNG", "GIF"];
const bookTypes = ["PDF"];

const Upload: NextPage<IUser> = ({ user }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { error, Loading, data, message } = useSelector(
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
    if (
      !formData.bookcover ||
      !formData.bookpdf! ||
      !formData.title ||
      !formData.price
    ) {
      return;
    }

    let data = { ...formData };
    data.user = user.address;
    data.bookpdf = bookFile as any;
    data.bookcover = imgFile as any;
    console.log(data);

    dispatch(createBook(data));
    console.log("=======");
    console.log(data);
  };

  return (
    <Layout user={user.address}>
      <div className="container m-2 mb-6 ">
        <div className="row mb-6">
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
              <form onSubmit={handleSubmit}>
                <div className="form-group mt-3">
                  <FileUploader
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
                    onChange={handleChange}
                    name="title"
                    className="form-control"
                  />
                </div>
                <label>Book pdf</label>
                <div className="form-group mt-1">
                  <FileUploader
                    label="upload or drop a pdf file"
                    handleChange={handleBook}
                    name="bookpdf"
                    types={bookTypes}
                  />
                </div>
                <div className="form-group ">
                  <label htmlFor="title">Price</label>
                  <input
                    type="number"
                    onChange={handleChange}
                    name="price"
                    placeholder="$"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    className="form-control"
                    onChange={handleChange}
                    name="description"
                    rows={3}
                  ></textarea>
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

                <button type="submit" className=" btn p-2 btn-primary mt-4">
                  <i className="bi bi-plus-circle"></i> Submit book
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
