import { Settings2 } from "lucide-react";

type CustomizeButtonProps = {
  onClick: () => void;
};

function CustomizeButton({
  onClick,
}: CustomizeButtonProps) {
  return (
    <button
      onClick={onClick}
      className="
    fixed
    bottom-6
    right-6
    z-50  

    flex
    items-center
    gap-2

    px-4
    py-3

    rounded-full

    bg-[#f0f0f4]/95
    hover:bg-[#2b2a33]

    text-black
    hover:text-white

    hover:scale-[1.03]
    hover:shadow-xl
    transition-all
    duration-150
    backdrop-blur-md
    border
    border-white/10
  "
    >
      <Settings2 className="w-5 h-5" />

      <span className="text-sm ">
        Customize
      </span>
    </button>
  );
}

export default CustomizeButton;