/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

//module.exports = nextConfig
module.exports = {
  env: {
    MORALIS_API_KEY:
      "vC41rNakXmNtSiUGRMfah7LvhHyTXKacC3Ka1DDIHibRqPVmL68Ng75ZX5N852S3",
    NEXTAUTH_URL: "http://localhost:3000",
    NEXTAUTH_SECRET: "useanysecret",
    BASE_API: "http://localhost:3000",
    NEXT_APIKEY:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDcyRjFhNDA3MzczNTc4ZTRmOThiRTNmQTEwZTY3MWUzMmY2NzI0NUUiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2MjkxNDkyMzM3OCwibmFtZSI6ImJvb2tzIn0.ep4TTBS4MH5eQKak9ea4wzarrZyq1xTNHsHBs2MtGaw",
  },
};
