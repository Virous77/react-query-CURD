import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { updateUser } from "../api/userApi";

const AddUser = ({ setShowForm }) => {
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(updateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });

  const addUser = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const updateUser = {
      name: formData.get("name"),
      details: formData.get("details"),
    };
    mutate({ updateUser });
    setShowForm(false);
  };

  if (isLoading) return <p>saving...</p>;
  return (
    <section className="addUser">
      <form onSubmit={addUser}>
        <fieldset>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" />
        </fieldset>

        <fieldset>
          <label htmlFor="details">Details</label>
          <input type="text" id="details" name="details" />
        </fieldset>

        <button>Add</button>
      </form>
    </section>
  );
};

export default AddUser;
