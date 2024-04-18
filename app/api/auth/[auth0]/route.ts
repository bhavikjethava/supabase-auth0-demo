import {
  GetLoginState,
  getSession,
  handleAuth,
  handleCallback,
  handleLogin,
  updateSession,
} from "@auth0/nextjs-auth0";
import jwt from "jsonwebtoken";

const afterCallback = async (req: any, res: any, session: any) => {
  // const sessionNew = await getSession();
  // const payload = {
  //   userId: sessionNew?.user.sub,
  //   exp: Math.floor(Date.now() / 1000) + 60 * 60,
  // };

  // sessionNew!.user.accessToken = jwt.sign(
  //   payload,
  //   process.env.SUPABASE_SIGNING_SECRET!
  // );

  // await updateSession({
  //   ...sessionNew,
  //   user: {
  //     ...sessionNew?.user,
  //     accessToken: jwt.sign(payload, process.env.SUPABASE_SIGNING_SECRET!),
  //   },
  // });
  // console.log("session--->", sessionNew);

  return session;
};

export const GET = handleAuth({
  // async callback(req: any, res: any) {
  //   try {
  //     return await handleCallback(req, res, { afterCallback });
  //   } catch (error: any) {
  //     console.log("===>", error);
  //     // res.status(error.status || 500).end(error.message);
  //     return Response.json({ error });
  //   }
  // },
  // login: handleLogin((req) => {
  //   return {
  //     authorizationParams: { Database: "github" },
  //   };
  // }),
});
