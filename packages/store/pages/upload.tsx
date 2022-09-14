import type { NextPage } from 'next';
import styles from '../styles/Upload.module.scss'
import Layout from "../layout/MainLayout"
import { getSession } from 'next-auth/react';
import { GetServerSidePropsContext } from "next";
import type { IUser } from '../components/utils/types';

const Upload: NextPage<IUser> = ({user}) => {
  return (
    <Layout user={user.address}>
    <div className='container m-2'>
    <div className='row'>
      <div style={{ backgroundColor: "#ffff", padding: "30px", borderRadius: "10px"}} 
      className={`col-md-5 ml-2 create_container`}>
        <div>
        <form>
          <div className="form-group">
            <label htmlFor='title'>Title of book</label>
            <input type="text"  name="title" className="form-control" />
          </div>
          <div className="form-group">
            <input type="file" className="form-control-file" />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea className="form-control" name="description" rows={3}></textarea>
          </div>
          <div className="form-group">
            <label>Genre</label>
            <select className="form-control">
            <option>Fantasy</option>
            <option>Sci-Fi</option>
            <option>Romance</option>
            <option>Contemporary</option>
            <option>Westerns</option>
            </select>
        </div>
       
        
        <div className="form-check">
       <input className="form-check-input" type="radio" readOnly  value="download" checked />
       <label className="form-check-label">
          Free download
       </label>
       </div>
       
       <div className="form-check">
       <input className="form-check-input" type="radio"  value="download" disabled />
       <label className="form-check-label">
          Buy book (coming soon)
       </label>
       </div>
          <button
            type="submit"
            className=" btn p-2 btn-primary mt-4">
            <i className="bi bi-plus-circle"></i> Submit
          </button>
        </form>
        </div>
      </div>
    </div>
   </div>
  </Layout>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getSession(context);
    
    // redirect if not authenticated
    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    return {
        props: { user: session.user },
    };
}

export default Upload