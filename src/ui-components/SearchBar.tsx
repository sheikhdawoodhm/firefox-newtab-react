import type { ChangeEvent } from "react";

import { Input } from "@/components/ui/input";

type SearchBarProps = {
  search: string;

  setSearch: React.Dispatch<
    React.SetStateAction<string>
  >;
};

function SearchBar({
  search,
  setSearch,
}: SearchBarProps) {

  function handleChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    setSearch(event.target.value);
  }

  return (
    <div className="flex justify-center w-full">

      <Input
        type="text"
        placeholder="Search news..."
        value={search}
        onChange={handleChange}
        className="
          w-full
          max-w-4xl
          h-14
          rounded-full
          bg-[#f0f0f4]/95
          border-zinc-700
          text-black
          text-lg
          px-6
        "
      />

    </div>
  );
}

export default SearchBar;