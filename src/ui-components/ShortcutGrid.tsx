import { useState,useEffect } from "react";

import ShortcutCard from "./ShortcutCard";

import {
  shortcuts as initialShortcuts,
} from "@/data/shortcuts";

import {
  Card,
} from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Shortcut = {
  id: number;
  title: string;
  url: string;
  image: string;
};

function ShortcutGrid() {

  const [shortcuts, setShortcuts] = useState<Shortcut[]>(() => {
    const stored = localStorage.getItem("shortcuts");
    return stored ? (JSON.parse(stored) as Shortcut[]) : initialShortcuts;
  });

   useEffect(() => {
    localStorage.setItem(
      "shortcuts",
      JSON.stringify(shortcuts)
    );
  }, [shortcuts]);

  const [open, setOpen] =
    useState(false);

  const [title, setTitle] =
    useState("");

  const [url, setUrl] =
    useState("");

  const [image, setImage] =
    useState("");

  const deleteShortcut = (id: number) => {
    setShortcuts(
      shortcuts.filter(
        (item) => item.id !== id
      )
    );
  };

  const editShortcut = (
    id: number,
    updatedData: {
      title: string;
      url: string;
      image: string;
    }
  ) => {
    setShortcuts(
      shortcuts.map((item) =>
        item.id === id
          ? { ...item, ...updatedData }
          : item
      )
    );

  };

  const addShortcut = () => {
    const newShortcut = {
      id: Date.now(),
      title,
      url,
      image,
    };

    setShortcuts([
      ...shortcuts,
      newShortcut,
    ]);

    setOpen(false);

    setTitle("");
    setUrl("");
    setImage("");
  };

  return (
    <>
      <div className="grid mt-2     grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">

        {shortcuts.map((item) => (
          <ShortcutCard
            key={item.id}
            id={item.id}
            title={item.title}
            url={item.url}
            image={item.image}
            onDelete={() =>
              deleteShortcut(item.id)
            }
            onEdit={editShortcut}
          />
        ))}

        <Card
          onClick={() =>
            setOpen(true)
          }
          className="
            flex
            items-center
            justify-center
            w-24
            h-24
            rounded-3xl
            border-2
            border-none
            border-zinc-700
            bg-[#f0f0f4]/95
            cursor-pointer
            hover:bg-[#ffffff]
            transition-all
            hover:scale-[1.03]
            hover:shadow-xl
            duration-150
          "
        >
          <span
            className="
              text-4xl
              text-zinc-400
            "
          >
            +
          </span>
        </Card>
      </div>

      <Dialog
        open={open}
        onOpenChange={setOpen}
      >
        <DialogContent
          className="
            bg-zinc-950
            border-zinc-800
            text-white
            rounded-3xl
          "
        >

          <DialogHeader>
            <DialogTitle>
              Add Shortcut
            </DialogTitle>
          </DialogHeader>

          <div
            className="
              flex
              flex-col
              gap-4
            "
          >

            <input
              placeholder="Title"
              value={title}
              onChange={(e) =>
                setTitle(
                  e.target.value
                )
              }
              className="
                p-3
                rounded-xl
                bg-zinc-900
                border
                border-zinc-700
              "
            />

            <input
              placeholder="URL"
              value={url}
              onChange={(e) =>
                setUrl(
                  e.target.value
                )
              }
              className="
                p-3
                rounded-xl
                bg-zinc-900
                border
                border-zinc-700
              "
            />

            <input
              placeholder="Image URL"
              value={image}
              onChange={(e) =>
                setImage(
                  e.target.value
                )
              }
              className="
                p-3
                rounded-xl
                bg-zinc-900
                border
                border-zinc-700
              "
            />

            <button
              onClick={addShortcut}
              className="
                bg-blue-500
                hover:bg-blue-600
                p-3
                rounded-xl
              "
            >
              Add Shortcut
            </button>

          </div>

        </DialogContent>
      </Dialog>
    </>
  );
}

export default ShortcutGrid;