import LandingPage from "@/components/landing/landingPage";
import LoggedInLanding from "@/components/landing/loggedInLandingPage";
import { auth } from "@/lib/auth/auth";


export default async function HomePage() {
  const session = await auth();

  return (
    <>
      {session?.user ? (
        <LoggedInLanding/>
      ) : (
        <LandingPage />
      )}
    </>
  )
}
