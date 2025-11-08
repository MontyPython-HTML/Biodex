import * as database from '../src/firebase/database'
import * as auth from '../src/firebase/auth'

auth.print()

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      Hello Geauxhack 2025
    </div>
  );
}
