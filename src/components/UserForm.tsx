export default function UserForm() {
  const error = true;
  return (
    <main className="relative m-auto h-[90vh] w-[300px] overflow-visible py-10 text-blue-800 sm:w-[400px] sm:text-xl md:text-2xl lg:w-[455px] lg:text-[28px]">
      <section
        aria-label="header"
        className="header text-center font-extrabold"
      >
        <h1 className="grid">
          Sign up to
          <span className="text-6xl tracking-widest sm:text-7xl">
            {" "}
            petflex
          </span>
        </h1>
        <img
          className="m-auto mt-2 w-[135px] sm:w-[153px]"
          src="/logo.svg"
          alt="petflex logo"
        />
      </section>
      <section className="registeration mt-12 lg:mt-14">
        <form
          action=""
          onSubmit={e => e.preventDefault()}
          className="mt-auto grid gap-5 sm:gap-6 lg:gap-7"
        >
          <label className="grid gap-3 font-bold sm:gap-4 lg:gap-5">
            Username:
            <input
              type="text"
              className="rounded-lg bg-stone-300 p-2 font-normal text-stone-800"
            />
          </label>
          <label className="grid gap-3 font-bold sm:gap-4 lg:gap-5">
            Password:
            <input
              type="password"
              className="rounded-lg bg-stone-300 p-2 font-normal text-stone-800"
            />
          </label>
          <div className="h-[80px] text-center font-bold text-red-800 xl:text-2xl">
            {error && (
              <p className="">
                Username must contain between 5 and 20 characters{" "}
              </p>
            )}
          </div>

          <div className="m-auto mt-8 grid w-full gap-4 text-center lg:mt-9 xl:mt-11">
            <button
              type="submit"
              className="m-auto rounded-[20px] bg-blue-800 p-2 px-5 text-xl font-bold text-stone-100 sm:text-2xl md:text-[26px] lg:p-3 lg:px-6 lg:text-3xl lg:text-[28px]"
            >
              Sign up
            </button>
            <p>
              Don't have an account?{" "}
              <span className="font-extrabold">Sign up</span>
            </p>
          </div>
        </form>
      </section>
    </main>
  );
}
