import NextAuth from "next-auth";

const handler = NextAuth({
    providers: [],
    secret: process.env.SECRET,
});

export { handler as GET, handler as POST };
