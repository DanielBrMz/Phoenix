import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  // const user = await currentUser();
  const user = false;

  return (
    <header className="bg-background/40 border-border sticky inset-x-0 top-0 z-50 h-14 w-full border-b px-4 backdrop-blur-lg">
      <div className="mx-auto flex h-full items-center justify-between md:max-w-screen-xl">
        <div className="flex items-start">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/PHOENIXnuevo.png" width={24} height={24} alt="Astra" />
            <span className="text-lg font-medium">Phoenix Eye</span>
          </Link>
        </div>
        <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 transform md:block">
          <ul className="flex items-center justify-center gap-8">
            <Link href="#pricing" className="hover:text-foreground/80 text-sm">
              Pricing
            </Link>
            <Link href="#" className="hover:text-foreground/80 text-sm">
              About
            </Link>
            <Link href="#" className="hover:text-foreground/80 text-sm">
              Features
            </Link>
            <Link href="#" className="hover:text-foreground/80 text-sm">
              Blog
            </Link>
          </ul>
        </nav>
        <div className="flex items-center gap-4">
          {user ? (
            "user button"
          ) : (
            <>
              <Link href="/sign-in">Login</Link>
              <Link href="/sign-up">Start free trial</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
