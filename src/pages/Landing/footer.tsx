// import Icons from "../Landing/icons";
import { Heart } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-border relative mx-auto flex w-full max-w-6xl flex-col items-center justify-center border-t px-6 pb-8 pt-16 lg:px-8 lg:pt-32">
      <div className="bg-primary absolute -right-1/4 -top-1/3 -z-10 hidden h-72 w-72 rounded-full blur-[14rem] lg:block"></div>
      <div className="bg-primary absolute -left-1/4 bottom-0 -z-10 hidden h-72 w-72 rounded-full blur-[14rem] lg:block"></div>

      <div className="grid w-full gap-8 xl:grid-cols-3 xl:gap-8">
        <div className="flex flex-col items-start justify-start md:max-w-[200px]">
          <div className="flex items-start">
            {/* <Icons.logo className="h-7 w-7" /> */}
          </div>
          <p className="text-muted-foreground mt-4 text-start text-sm">
            Build beautiful, functional websites, without writing code
          </p>
          <span className="mt-4 flex items-center text-sm text-neutral-200">
            Made in India with
            <Heart className="fill-primary text-primary ml-1 h-3.5 w-3.5" />
          </span>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
          <div className="md:grid md:grid-cols-2 md:gap-8">
            <div className="">
              <h3 className="text-base font-medium text-white">Product</h3>
              <ul className="text-muted-foreground mt-4 text-sm">
                <li className="mt-2">
                  <Link
                    href=""
                    className="hover:text-foreground transition-all duration-300"
                  >
                    Features
                  </Link>
                </li>
                <li className="mt-2">
                  <Link
                    href=""
                    className="hover:text-foreground transition-all duration-300"
                  >
                    Pricing
                  </Link>
                </li>
                <li className="mt-2">
                  <Link
                    href=""
                    className="hover:text-foreground transition-all duration-300"
                  >
                    Testimonials
                  </Link>
                </li>
                <li className="mt-2">
                  <Link
                    href=""
                    className="hover:text-foreground transition-all duration-300"
                  >
                    Integration
                  </Link>
                </li>
              </ul>
            </div>
            <div className="mt-10 flex flex-col md:mt-0">
              <h3 className="text-base font-medium text-white">Integrations</h3>
              <ul className="text-muted-foreground mt-4 text-sm">
                <li className="">
                  <Link
                    href=""
                    className="hover:text-foreground transition-all duration-300"
                  >
                    Facebook
                  </Link>
                </li>
                <li className="mt-2">
                  <Link
                    href=""
                    className="hover:text-foreground transition-all duration-300"
                  >
                    Instagram
                  </Link>
                </li>
                <li className="mt-2">
                  <Link
                    href=""
                    className="hover:text-foreground transition-all duration-300"
                  >
                    Twitter
                  </Link>
                </li>
                <li className="mt-2">
                  <Link
                    href=""
                    className="hover:text-foreground transition-all duration-300"
                  >
                    LinkedIn
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="md:grid md:grid-cols-2 md:gap-8">
            <div className="">
              <h3 className="text-base font-medium text-white">Resources</h3>
              <ul className="text-muted-foreground mt-4 text-sm">
                <li className="mt-2">
                  <Link
                    href=""
                    className="hover:text-foreground transition-all duration-300"
                  >
                    Blog
                  </Link>
                </li>
                <li className="mt-2">
                  <Link
                    href=""
                    className="hover:text-foreground transition-all duration-300"
                  >
                    Case Studies
                  </Link>
                </li>
                <li className="mt-2">
                  <Link
                    href=""
                    className="hover:text-foreground transition-all duration-300"
                  >
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div className="mt-10 flex flex-col md:mt-0">
              <h3 className="text-base font-medium text-white">Company</h3>
              <ul className="text-muted-foreground mt-4 text-sm">
                <li className="">
                  <Link
                    href=""
                    className="hover:text-foreground transition-all duration-300"
                  >
                    About Us
                  </Link>
                </li>
                <li className="mt-2">
                  <Link
                    href=""
                    className="hover:text-foreground transition-all duration-300"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li className="mt-2">
                  <Link
                    href=""
                    className="hover:text-foreground transition-all duration-300"
                  >
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="border-border/40 mt-8 w-full border-t pt-4 md:flex md:items-center md:justify-between md:pt-8">
        <p className="text-muted-foreground mt-8 text-sm md:mt-0">
          &copy; {new Date().getFullYear()} Astra AI INC. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
