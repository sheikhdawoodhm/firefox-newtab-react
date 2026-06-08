import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { Switch } from "@/components/ui/switch";

type SettingsPanelProps = {
  open: boolean;

  setOpen: React.Dispatch<React.SetStateAction<boolean>>;

  showNews: boolean;

  setShowNews: React.Dispatch<React.SetStateAction<boolean>>;

  showShortcuts: boolean;

  setShowShortcuts: React.Dispatch<React.SetStateAction<boolean>>;

  wallpapers: string[];

  activeWallpaper: string;

  setActiveWallpaper: (wallpaper: string) => void;

  addWallpaper: (wallpaper: string) => void;

  showWallpaper: boolean;

  setShowWallpaper: React.Dispatch<React.SetStateAction<boolean>>;

  deleteWallpaper: (wallpaper: string) => void;
};

function SettingsPanel({
  open,
  setOpen,
  showNews,
  setShowNews,
  showShortcuts,
  setShowShortcuts,
  wallpapers,
  activeWallpaper,
  setActiveWallpaper,
  addWallpaper,
  showWallpaper,
  setShowWallpaper,
  deleteWallpaper,
}: SettingsPanelProps) {
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("Image too large. Use under 2MB.");

      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      const result = reader.result as string;

      addWallpaper(result);

      setActiveWallpaper(result);
    };

    reader.readAsDataURL(file);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        className="
          w-[380px]
          sm:w-[420px]

          bg-[#1c1b22]/95
          backdrop-blur-2xl

          border-l
          border-white/10

          text-white

          p-0
        "
      >
        <SheetHeader
          className="
            px-6
            py-5
            border-b
            border-white/10
          "
        >
          <SheetTitle
            className="
              text-2xl
              font-semibold
              text-white
            "
          >
            Customize Firefox
          </SheetTitle>
        </SheetHeader>

        <div
          className="
            h-full
            overflow-y-auto

            px-6
            py-6

            space-y-10
          "
        >
          <div
            className="
                flex
                items-center
                justify-between
                p-3
                rounded-xl
                bg-zinc-800
            "
          >
            <span className="text-white">Wallpaper</span>

            <Switch
              checked={showWallpaper}
              onCheckedChange={setShowWallpaper}
            />
          </div>
          <div className="space-y-4">
            <div>
              <h3
                className="
                  text-lg
                  font-medium
                "
              >
                Wallpapers
              </h3>

              <p
                className="
                  text-sm
                  text-zinc-400
                "
              >
                Choose your background
              </p>
            </div>

            <div
              className="
                grid
                grid-cols-2
                gap-4
              "
            >
              {wallpapers.map((wallpaper, index) => (
                <div
                  key={index}
                  onClick={() => setActiveWallpaper(wallpaper)}
                  className={`
                      relative
                      overflow-hidden
                      rounded-2xl
                      cursor-pointer
                      group

                      ${
                        activeWallpaper === wallpaper ? "ring-4 ring-white" : ""
                      }
                    `}
                >      
                <button
                    onClick={(e) => {
                      e.stopPropagation();

                      deleteWallpaper(wallpaper);
                    }}
                    className="
                      absolute
                      top-2
                      right-2
                      w-7
                      h-7
                      rounded-full
                      bg-black/70
                      hover:bg-red-500
                      text-white
                      text-sm
                      flex
                      items-center
                      justify-center
                      opacity-0
                      hover:opacity-100
                      transition"
                  >
                    ✕
                  </button>
                  
                  <img
                    src={wallpaper}
                    className="
                        w-full
                        h-32
                        object-cover

                        transition-transform
                        duration-300
                      "
                  />
                </div>
              ))}
            </div>

            <label
              className="
                flex
                items-center
                justify-center

                h-12

                rounded-2xl

                bg-white
                text-black

                font-medium

                cursor-pointer

                hover:scale-[1.02]

                transition
              "
            >
              Upload Wallpaper
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleUpload}
              />
            </label>
          </div>

          <div className="space-y-6">
            <h3
              className="
                text-lg
                font-medium
              "
            >
              Content
            </h3>

            <div
              className="
                flex
                items-center
                justify-between

                rounded-2xl

                bg-white/5

                px-4
                py-4
              "
            >
              <div>
                <p
                  className="
                    font-medium
                  "
                >
                  Show News
                </p>

                <p
                  className="
                    text-sm
                    text-zinc-400
                  "
                >
                  Display latest stories
                </p>
              </div>

              <Switch checked={showNews} onCheckedChange={setShowNews} />
            </div>

            <div
              className="
                flex
                items-center
                justify-between

                rounded-2xl

                bg-white/5

                px-4
                py-4
              "
            >
              <div>
                <p
                  className="
                    font-medium
                  "
                >
                  Show Shortcuts
                </p>

                <p
                  className="
                    text-sm
                    text-zinc-400
                  "
                >
                  Display top sites
                </p>
              </div>

              <Switch
                checked={showShortcuts}
                onCheckedChange={setShowShortcuts}
              />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default SettingsPanel;
