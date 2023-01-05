import React from "react";
import { getUser } from "../api/userApi";
import { useQuery } from "react-query";

const UserDetails = ({ id }) => {
  const { data, isLoading } = useQuery(["user", id], () => getUser(id), {
    enabled: Boolean(id),
  });

  if (!id) return <p className="info">Click on User for more Info.</p>;
  if (isLoading) return <p>Loading..</p>;

  return (
    <section className="details">
      <h3>{data.name}</h3>
      <p>{data?.details}</p>
    </section>
  );
};

export default UserDetails;
