import React from "react";
import Seed from "../utils/seed";
import formatAddress from "../utils/format-address";

const UserInfo = ({ user }: any) => {
  const formattedUser = formatAddress(user);
  return (
    <div className="user-info">
      <div className="user-info__seed">{Seed(user)}</div>
      <div className="user-info__name">
        <span>{formattedUser}</span>
      </div>
    </div>
  );
};

export default UserInfo;
