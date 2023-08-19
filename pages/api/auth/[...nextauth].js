import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials"

export const Authoptions = [
        CredentialsProvider({
          name: 'Credentials',
          credentials: {
            username: { label: "Username", type: "text", placeholder: "jsmith" },
            email:{ label: "Email", type: "text", placeholder: "use srb@gmail.com" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials, req) {
            if(credentials.email==="srb@gmail.com" && credentials.password.length>6){
            return credentials.username;
            
            }
            return null;
          }
        })
      ]

const handler = NextAuth(Authoptions)

  export {handler as POST, handler as GET};
