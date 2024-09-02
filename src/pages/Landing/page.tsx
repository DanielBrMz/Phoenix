import Image from "next/image";
import Link from "next/link";
import { perks, features, reviews } from "./index"; // Adjust the path based on your project structure

const HomePage = () => {
  const firstRow = reviews.slice(0, reviews.length / 2);
  const secondRow = reviews.slice(reviews.length / 2);
  return (
    <section className="relative flex w-full flex-col items-center justify-center px-4 py-8 md:px-0">
      {/* hero */}
      <div>
        <div className="absolute inset-0 -z-10 h-[150vh] bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] dark:bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)]" />

        <div className="flex h-full flex-col items-center justify-center py-20">
          <button className="group relative grid overflow-hidden rounded-full px-4 py-1 shadow-[0_1000px_0_0_hsl(0_0%_20%)_inset] transition-colors duration-200">
            <span>
              <span className="spark mask-gradient animate-flip before:animate-rotate absolute inset-0 h-[100%] w-[100%] overflow-hidden rounded-full [mask:linear-gradient(white,_transparent_50%)] before:absolute before:aspect-square before:w-[200%] before:rotate-[-90deg] before:bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] before:content-[''] before:[inset:0_auto_auto_50%] before:[translate:-50%_-15%]" />
            </span>
            <span className="backdrop absolute inset-[1px] rounded-full bg-neutral-950 transition-colors duration-200 group-hover:bg-neutral-900" />
            <span className="from-primary/40 absolute inset-x-0 bottom-0 h-full w-full bg-gradient-to-tr blur-md"></span>
            <span className="z-10 flex items-center justify-center gap-1.5 py-0.5 text-sm text-neutral-100">
              <Image
                src="/sparkles-dark.svg" // Ruta desde la raíz de la carpeta public
                alt="✨"
                width={24}
                height={24}
                className="h-4 w-4"
              />
              Introducing Astra AI
            </span>
          </button>

          <div className="mt-8 flex w-11/12 max-w-3xl flex-col items-center md:w-full">
            <h1 className="lg:textxl bg-gradient-to-b from-gray-50 to-gray-50 bg-clip-text text-center text-4xl font-semibold text-transparent md:text-6xl md:!leading-snug">
              Build your next idea and ship your dream site
            </h1>
            <p className="text-foreground/80 mt-6 text-center text-base md:text-lg">
              Zero code, maximum speed. Make professional sites easy, fast and
              fun while delivering best-in-class SEO, performance.
            </p>
            <div className="relative mt-8 hidden w-full items-center justify-center md:mt-12 md:flex">
              <Link
                href="#"
                className="border-foreground/30 shadow-3xl shadow-background/40 flex w-max cursor-pointer select-none items-center justify-center gap-2 rounded-full border-t bg-white/20 px-2 py-1 backdrop-blur-lg md:gap-8 md:py-2"
              >
                <p className="text-foreground pl-4 pr-4 text-center text-sm font-medium md:text-base lg:pr-0">
                  ✨ {"  "} Start building your dream website now!
                </p>
              </Link>
            </div>
          </div>

          <div className="relative flex w-full items-center py-10 md:py-20">
            <div className="gradient absolute inset-0 left-1/2 top-1/2 -z-10 h-3/4 w-3/4 -translate-x-1/2 -translate-y-1/2 blur-[10rem]"></div>
            <div className="ring-foreground/20 -m-2 rounded-xl bg-opacity-50 p-2 ring-1 ring-inset backdrop-blur-3xl lg:-m-4 lg:rounded-2xl">
              <Image
                src="/dashboard.svg"
                alt="banner image"
                width={1200}
                height={1200}
                quality={100}
                className="bg-foreground/10 ring-border rounded-md shadow-2xl ring-1 lg:rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>
      {/* how it works */}
      <div className="relative flex flex-col items-center justify-center py-12">
        <div className="mx-auto max-w-md text-start md:text-center">
          <h2 className="mt-6 text-3xl font-semibold lg:text-4xl">
            Three steps to build your dream website
          </h2>
          <p className="text-muted-foreground mt-6">
            Turn your vision into reality in just 3 simple steps
          </p>
        </div>
        <div className="flex w-full flex-col items-center justify-center py-10 md:py-20">
          <div className="grid w-full grid-cols-1 divide-x-0 divide-y divide-gray-900 first:border-l-2 first:border-gray-900 md:grid-cols-2 md:divide-x md:divide-y-0 lg:grid-cols-3 lg:first:border-none">
            {perks.map((perk) => (
              <div
                key={perk.title}
                className="flex flex-col items-start px-4 py-4 md:px-6 lg:px-8 lg:py-6"
              >
                <div className="flex items-center justify-center"></div>
                <h3 className="mt-4 text-lg font-medium">{perk.title}</h3>
                <p className="text-muted-foreground mt-2 text-start lg:text-start">
                  {perk.info}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* features */}
      <div className="relative mx-auto flex h-full w-full max-w-screen-xl flex-col items-center justify-center px-4 py-12 md:px-20">
        <div className="bg-primary absolute -right-1/3 top-0 -z-10 hidden h-72 w-72 rounded-full blur-[10rem] md:block"></div>
        <div className="absolute -left-1/3 bottom-0 -z-10 hidden h-72 w-72 rounded-full bg-indigo-600 blur-[10rem] md:block"></div>
        <div>
          <div className="mx-auto max-w-md text-start md:text-center">
            <h2 className="mt-6 text-3xl font-semibold lg:text-4xl">
              Discover our powerful features
            </h2>
            <p className="text-muted-foreground mt-6">
              Astra offers a range of features to help you build a stunning
              website in no time
            </p>
          </div>
        </div>

        <div className="mx-auto mt-8 flex items-center justify-center"></div>

        <div className="flex w-full flex-col items-center justify-center py-10 md:py-20">
          <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="flex flex-col items-start px-0 md:px-0 lg:items-start"
              >
                <div className="flex items-center justify-center"></div>
                <h3 className="mt-4 text-lg font-medium">{feature.title}</h3>
                <p className="text-muted-foreground mt-2 text-start lg:text-start">
                  {feature.info}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* pricing */}
      <div className="relative mx-auto flex h-full w-full max-w-screen-xl flex-col items-center justify-center px-4 py-12 md:px-20">
        <div className="absolute -right-1/3 top-0 -z-10 hidden h-72 w-72 rounded-full bg-blue-500 blur-[10rem] md:block"></div>
        <div className="mx-auto max-w-md text-start md:text-center">
          <h2 className="mt-6 text-3xl font-semibold lg:text-4xl">
            Unlock the right plan for your business
          </h2>
          <p className="text-muted-foreground mt-6">
            Choose the best plan for your business and start building your dream
            website today
          </p>
        </div>
        <div className="flex items-center justify-center">
          <div className="grid w-full max-w-4xl grid-cols-1 flex-wrap gap-5 py-10 md:gap-8 md:py-20 lg:grid-cols-3"></div>
        </div>
      </div>

      {/* testimonials */}
      <div className="relative mx-auto flex h-full w-full max-w-screen-xl flex-col items-center justify-center px-4 py-12 md:px-20">
        <div className="absolute -left-1/3 -top-1/4 -z-10 hidden h-72 w-72 rounded-full bg-indigo-500 blur-[10rem] md:block"></div>
        <div className="mx-auto max-w-md text-start md:text-center">
          <h2 className="mt-6 text-3xl font-semibold lg:text-4xl">
            What people are saying
          </h2>
          <p className="text-muted-foreground mt-6">
            See how Astra empowers businesses of all sizes. Here&apos;s what
            real people are saying on Twitter
          </p>
        </div>
        <div className="w-full py-10 md:py-20">
          <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden py-10">
            {firstRow.map((review) => (
              <figure
                key={review.name}
                className="bg-background over:bg-zinc-50/[.15] relative w-64 cursor-pointer overflow-hidden rounded-xl border border-zinc-50/[.1] p-4"
              >
                <div className="flex flex-row items-center gap-2">
                  <div className="flex flex-col">
                    <figcaption className="text-sm font-medium">
                      {review.name}
                    </figcaption>
                    <p className="text-muted-foreground text-xs font-medium">
                      {review.username}
                    </p>
                  </div>
                </div>
                <blockquote className="mt-2 text-sm">{review.body}</blockquote>
              </figure>
            ))}

            {secondRow.map((review) => (
              <figure
                key={review.name}
                className="bg-background over:bg-zinc-50/[.15] relative w-64 cursor-pointer overflow-hidden rounded-xl border border-zinc-50/[.1] p-4"
              >
                <div className="flex flex-row items-center gap-2">
                  <div className="flex flex-col">
                    <figcaption className="text-sm font-medium">
                      {review.name}
                    </figcaption>
                    <p className="text-muted-foreground text-xs font-medium">
                      {review.username}
                    </p>
                  </div>
                </div>
                <blockquote className="mt-2 text-sm">{review.body}</blockquote>
              </figure>
            ))}
            <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r"></div>
            <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l"></div>
          </div>
        </div>
      </div>
      {/* newsletter */}
      <div className="relative mx-auto flex h-full w-full max-w-screen-xl flex-col items-center justify-center px-4 py-12 md:px-20">
        <div className="relative flex w-full flex-col items-center justify-center text-center">
          <h2 className="mt-8 text-4xl font-semibold lg:text-5xl lg:!leading-snug xl:text-6xl">
            From Idea to Launch <br /> Faster Than Ever
          </h2>
          <p className="text-muted-foreground mx-auto mt-6 max-w-md">
            Build stunning websites with Astra&apos;s intuitive drag-and-drop
            builder and powerful AI assistant
          </p>
          <button className="mt-6">
            <Link href="/sign-in">Get started for free</Link>
          </button>
        </div>

        <div className="-mt-40 flex w-full items-center justify-center">
          <div className="border-border/80 flex w-full flex-col items-start justify-start rounded-lg border px-4 py-4 md:flex-row md:items-center md:justify-between md:px-8 md:py-8 lg:rounded-2xl">
            <div className="flex w-full flex-col items-start gap-4">
              <h4 className="text-xl font-semibold md:text-2xl">
                Join our newsletter
              </h4>
              <p className="text-muted-foreground text-base">
                Be up to date with everything about AI builder
              </p>
            </div>
            <div className="md:min-w-80 mt-5 flex w-full flex-col items-start gap-2 md:mt-0 md:w-max">
              <form
                action="#"
                className="flex w-full flex-col items-center gap-2 md:max-w-xs md:flex-row"
              >
                <input
                  required
                  type="email"
                  placeholder="Enter your email"
                  className="focus-visible:border-primary w-full duration-300 focus-visible:ring-0 focus-visible:ring-transparent"
                />
                <button type="submit" className="w-full md:w-max">
                  Subscribe
                </button>
              </form>
              <p className="text-muted-foreground text-xs">
                By subscribing you agree with our{" "}
                <Link href="#">Privacy Policy</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
