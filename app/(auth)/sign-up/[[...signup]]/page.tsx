import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex justify-center items-center pt-20">
  <SignUp path="/sign-up" />
  </div>
  )
}