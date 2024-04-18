import AddUser from "@/components/AddUser";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import React from "react";

const User = async () => {
  return <AddUser />;
};

export default withPageAuthRequired(User);
