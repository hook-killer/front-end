import React from "react";
import { isNull } from "../../utils/NullUtils";
import styled from "styled-components";

const Profile = ({ thumnail }) => {
  console.log(thumnail);
  if (isNull(thumnail) || thumnail == "") {
    return (
      <AvaterCircleBgJuhwanDiv className="text-center mx-auto mb-4">
        <NullThumnail />
      </AvaterCircleBgJuhwanDiv>
    );
  }
  if (thumnail.startsWith("http")) {
    return (
      <AvaterCircleDiv className="text-center mx-auto mb-4">
        <HttpThumnail link={thumnail} />
      </AvaterCircleDiv>
    );
  }
  return (
    <AvaterCircleDiv className="text-center mx-auto mb-4">
      <StorageThumnail path={thumnail} />
    </AvaterCircleDiv>
  );
};

const NullThumnail = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      width={60}
      height={60}
    >
      <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
    </svg>
  );
};

const HttpThumnail = ({ link }) => {
  return (
    <ProfileBox>
      <ProfileImg src={`${link}`} alt="User Profile" />
    </ProfileBox>
  );
};

const StorageThumnail = ({ path }) => {
  return (
    <ProfileBox>
      <ProfileImg
        src={`http://ffmiqzmwilfb20007378.cdn.ntruss.com/${path}?type=f&w=100&h=100`}
        alt="User Profile"
      />
    </ProfileBox>
  );
};

export default Profile;

const AvaterCircleBgJuhwanDiv = styled.div`
  display: grid;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  place-items: center;
  background-color: #ffbd30;
`;

const AvaterCircleDiv = styled.div`
  display: grid;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  place-items: center;
`;

const ProfileBox = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 70%;
  overflow: hidden;
`;

const ProfileImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
