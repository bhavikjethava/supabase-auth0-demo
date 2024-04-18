"use client";
import AppInputField from "@/components/AppInputField";
import { getSupabase } from "@/utils/supabase";
import { Form } from "@/utils/types";
import { VALIDATIONTYPE, validateForm } from "@/utils/validation";
import React, { useState } from "react";

const User = () => {
  const [formData, setFormData] = useState<Form>({});
  const [errorsData, setErrorsData] = useState<Form>({});
  const [isLoading, setiIsLoading] = useState(false);
  const [isUserAdded, setUserAdded] = useState(false);

  const onChangehandler = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setErrorsData((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  const onCreateUser = async () => {
    const { name, email, password } = formData;
    const valifationRules: Form[] = [
      { field: "name", value: name, message: "Name" },
      {
        field: "email",
        value: email,
        message: "Email",
        type: VALIDATIONTYPE.ISEMAIL,
      },
      {
        field: "password",
        value: password,
        message: "Password",
        type: VALIDATIONTYPE.ISPASSWORD,
      },
    ];
    let { isError, errors } = validateForm(valifationRules);
    if (isError) {
      setErrorsData(errors);
      return;
    } else {
      setErrorsData({});
    }

    try {
      setiIsLoading(true);
      const res = await fetch("/api/user", {
        method: "POST",
        body: JSON.stringify({
          ...formData,
          verify_email: false,
          connection: "Username-Password-Authentication",
        }),
        headers: {
          "content-type": "application/json",
        },
      });

      const data = await res.json();
      console.log("Yeai!124", data);
      if (data.user_id) {
        console.log("Yeai!", data);
        const supabase = getSupabase();
        const { data: superBaseData } = await supabase.from("users").insert({
          name: data.name,
          user_id: data.user_id,
          email: data.email,
        });
        console.log("===>superBaseData", superBaseData);
        setFormData({});
        setUserAdded(true);
        setTimeout(() => {
          setUserAdded(false);
        }, 4000);
      } else {
        setErrorsData({ message: data?.message });
      }
    } catch (error) {
      console.log("error", error);
      setErrorsData({ message: JSON.stringify(error) });
    } finally {
      setiIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24 ">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-[280px]">
        <AppInputField
          name="name"
          label="Name"
          placeholder="Name"
          type="text"
          value={formData?.name || ""}
          onChange={(value) => onChangehandler("name", value)}
          error={errorsData.name}
        />
        <AppInputField
          name="email"
          label="Email"
          placeholder="Email"
          type="email"
          value={formData?.email || ""}
          onChange={(value) => onChangehandler("email", value)}
          error={errorsData.email}
        />
        <AppInputField
          name="password"
          label="Password"
          placeholder="******************"
          type="password"
          value={formData?.password || ""}
          onChange={(value) => onChangehandler("password", value)}
          error={errorsData.password}
        />
        {errorsData.message ? (
          <p className="text-red-500 text-xs italic py-2">
            {errorsData.message}
          </p>
        ) : null}

        {isUserAdded && (
          <label className="block text-gray-500 text-sm font-bold mb-2">
            Your account details have been saved
          </label>
        )}

        <div className="flex items-center justify-between">
          <button
            type="button"
            disabled={isLoading}
            onClick={onCreateUser}
            className={`flex text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ${
              isLoading ? "cursor-not-allowed hover:none opacity-50" : ""
            }`}
          >
            {isLoading && (
              <div role="status">
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 me-3 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            )}
            Create User
          </button>
        </div>
      </form>
    </div>
  );
};

export default User;
