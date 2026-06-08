import { useState, useEffect } from "react";

import Header from "./ui-components/Header";
import SearchBar from "./ui-components/SearchBar";
import ShortcutGrid from "./ui-components/ShortcutGrid";
import NewsGrid from "./ui-components/NewsGrid";
import CustomizeButton from "./ui-components/CustomizeButton";
import SettingsPanel from "./ui-components/SettingsPanel";

function App() {

  const [search, setSearch] =
    useState("");

  const [showNews, setShowNews] =
    useState(() => {
      return JSON.parse(
        localStorage.getItem(
          "showNews"
        ) || "true"
      );
    });

  useEffect(() => {

    localStorage.setItem(
      "showNews",
      JSON.stringify(showNews)
    );

  }, [showNews]);

  const [showShortcuts,setShowShortcuts,] = useState(() => {

    return JSON.parse(
      localStorage.getItem(
        "showShortcuts"
      ) || "true"
    );
  });

  useEffect(() => {

    localStorage.setItem(
      "showShortcuts",
      JSON.stringify(
        showShortcuts
      )
    );

  }, [showShortcuts]);

  const [settingsOpen,setSettingsOpen,] = useState(false);

  const [showWallpaper,setShowWallpaper] = useState(true);

  const [wallpaper, setWallpaper] =useState(() => { return ( localStorage.getItem(  "wallpaper" ) || ""  );});

  useEffect(() => {

    localStorage.setItem(
      "wallpa per",
      wallpaper
    );

  }, [wallpaper]);

  const [wallpapers, setWallpapers] =
    useState<string[]>(() => {

      return JSON.parse(
        localStorage.getItem(
          "wallpapers"
        ) || "[]"
      );
    });

  useEffect(() => {

    localStorage.setItem(
      "wallpapers",
      JSON.stringify(wallpapers)
    );

  }, [wallpapers]);

  const addWallpaper = (
    wallpaper: string
  ) => {

    setWallpapers((prev) => [

      wallpaper,
      ...prev,

    ]);

    setWallpaper(wallpaper);


  };

  function deleteWallpaper(
    wallpaperToDelete: string
  ) {

  const updatedWallpapers =
    wallpapers.filter(
      (wallpaper) =>
        wallpaper !== wallpaperToDelete
    );

  setWallpapers(updatedWallpapers);

  if (
    wallpaper === wallpaperToDelete
  ) {
    setWallpaper(
      updatedWallpapers[0] || ""
    );
  }
}

  return (
    <main
      className={`
        min-h-screen
        text-white

        ${ showWallpaper ? "bg-cover bg-center bg-no-repeat bg-fixed": "bg-[#1b1b1f]" }`}
        
      style={{
        backgroundImage: showWallpaper
          ? `url(${wallpaper})`
          : "none",
      }}
    >

      <div
        className="
          min-h-screen
          bg-black/40
          
        "
      >

        <div
          className="
            px-10
            pt-6
          "
        >
          <Header />
        </div>

        <div
          className="
            flex
            flex-col
            items-center
            justify-center
            mt-16
          "
        >

          <SearchBar
            search={search}
            setSearch={setSearch}
          />

          {showShortcuts && (

            <div className="mt-10">

              <ShortcutGrid />

            </div>
          )}

        </div>

        {showNews && (

          <div
            className="
              pt-2
              mt-10
              pb-20
            "
          >

            <NewsGrid
              search={search}
            />

          </div>
        )}

      </div>

      <CustomizeButton
        onClick={() =>
          setSettingsOpen(true)
        }
      />

      <SettingsPanel
        open={settingsOpen}
        setOpen={setSettingsOpen}

        showNews={showNews}
        setShowNews={setShowNews}

        showShortcuts={
          showShortcuts
        }

        setShowShortcuts={
          setShowShortcuts
        }

        wallpapers={wallpapers}

        activeWallpaper={
          wallpaper
        }

        setActiveWallpaper={
          setWallpaper
        }

        addWallpaper={
          addWallpaper
        }

        showWallpaper={
          showWallpaper
        }

        setShowWallpaper={
          setShowWallpaper
        }

        deleteWallpaper={deleteWallpaper}
      />

    </main>
  );
}

export default App;