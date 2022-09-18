declare let process: {
  env: {
    APP_DOMAIN: string;
    NEXTAUTH_URL: string;
    MORALIS_API_KEY: string;
    NEXT_PUBLIC_BASE_API: string;
    NEXTAUTH_SECRET: string;
    TOKEN: string;
    NFT_APIKEY: string;
  };
};

export interface IUser {
  user: {
    address: string;
    profileId: string;
    signature: string;
  };
}

export default process;
