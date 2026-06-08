function Header() {
  return (
    <header className="flex items-center gap-3 ">

      <img
        src="https://upload.wikimedia.org/wikipedia/commons/a/a0/Firefox_logo%2C_2019.svg"
        alt="Firefox"
        className="w-10 h-10"
      />

      <h1
        className="
          text-2xl
          font-normal
          tracking-wide
          text-white
        "
      >
        Firefox
      </h1>

    </header>
  );
}

export default Header;