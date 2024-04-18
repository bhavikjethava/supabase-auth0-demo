import { NextResponse } from "next/server";

export async function POST(req: any, res: any) {
  const requestData = await req.json();

  const resToken = await fetch(
    "https://dev-sxqdd4o7mxgy8be4.us.auth0.com/oauth/token",
    {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: process.env.AUTH0_CLIENT_ID_MTOM!,
        client_secret: process.env.AUTH0_CLIENT_SECRET_MTOM!,
        audience: "https://dev-sxqdd4o7mxgy8be4.us.auth0.com/api/v2/",
      }),
    }
  );

  const tokenData = await resToken.json();

  const raw = JSON.stringify(requestData);
  const response = await fetch(
    "https://dev-sxqdd4o7mxgy8be4.us.auth0.com/api/v2/users",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `${tokenData.token_type} ${tokenData.access_token}`,
      },
      body: raw,
      redirect: "follow",
    }
  );

  const data = await response.json();
  return NextResponse.json(data);
}
