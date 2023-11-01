export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
      <p className="pt-4 pb-8 bg-gradient-to-br from-black via-[#171717] to-[#575757] bg-clip-text text-center text-5xl font-medium tracking-tight text-transparent">
        Welcome to the UNZA Application System Administration Page
      </p>
      <ul className="list-disc">
        <li>
          You can sign in by clicking the Sign In link.
        </li>
        <li>
          You can view student applications by clicking the Applications link.
        </li>
        <li>
          You can sign up by asking the database adminstrator to create an account for you.
        </li>
      </ul>
    </main>
  )
}
