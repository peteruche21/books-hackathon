import type { NextPage } from 'next'
import styles from '../styles/Landing.module.scss'

const Landing: NextPage = () => {
  return (
    <div className={styles.landing}>
      <div className={styles.container}>
        <button className='btn btn-primary'>
            Connect wallet to login
        </button>
      </div>
    </div>
  )
}

export default Landing
