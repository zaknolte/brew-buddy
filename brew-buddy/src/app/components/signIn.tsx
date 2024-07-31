import Link from "next/link";

export default function SignIn() {
  return (
    <>
      <h1>Login here</h1>
      <Link href={"/register"}>Sign up</Link>
      <Link href={"/login"}>Login</Link>
    </>
  );
}