import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import baseApi from "../services/baseApi";
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { signIn } from "next-auth/react";
import { useAccount, useConnect, useSignMessage, useDisconnect } from "wagmi";
import type { NextPage } from 'next';
import styles from '../styles/Landing.module.scss'

interface P {
  message: string
}

const Landing: NextPage<P> = (props) => {
  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();

  const handleAuth = async (e: any) => {
    e.preventDefault();
    if (isConnected) {
      await disconnectAsync()
    }

    const { account, chain } = await connectAsync({
      connector: new CoinbaseWalletConnector({
        options: {
          appName: 'books.store',
        },
      }),
    })

    const userData = { address: account, chain: chain.id, network: 'evm' }

    const { data } = await baseApi.post('/auth/request-message', userData) 

    const message = data.message

    const signature = await signMessageAsync({ message })
    
    try {
      await signIn('credentials', { message, signature, redirect: false});
      // redirect user to home;
      window.location.href = "/home";
    } catch (error) {
      return;
    }

  };

  return (
    <div className={styles.landing}>
      <div className={styles.container}>
        <form onSubmit={handleAuth}>
        <button className='btn btn-primary'>
            {props.message}
        </button>
        </form>
      </div>
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  
  if (session) {
    return {
      redirect: {
        destination: "/home",
        permanent: false,
      },
    };
  }

  return {
    props: {
      message: "Login with coinbase wallet",
    },
  };
}


export default Landing

