import { useState } from "react";

import { Button } from "@/components/ui/button";

import { Card, CardContent } from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type ShortcutProps = {
  id: number;
  title: string;
  url: string;
  image: string;
  onDelete: () => void;
  onEdit: (
    id: number,
    updatedData: {
      title: string;
      url: string;
      image: string;
    },
  ) => void;
};

function ShortcutCard({
  id,
  title,
  url,
  image,
  onDelete,
  onEdit,
}: ShortcutProps) {
  const [open, setOpen] = useState(false);

  const [editTitle, setEditTitle] = useState(title);

  const [editUrl, setEditUrl] = useState(url);

  const [editImage, setEditImage] = useState(image);

  const handleSave = () => {
    onEdit(id, {
      title: editTitle,
      url: editUrl,
      image: editImage,
    });

    setOpen(false);
  };

  return (
    <>
      <div
        className="
          flex
          flex-col
          items-center
          gap-2
        "
      >
        <Card
          onClick={() => window.open(url, "_blank")}
          className="
            group
            relative
            flex
            w-24
            h-24
            cursor-pointer
            rounded-2xl
            bg-[#f0f0f4]/95
            hover:bg-[#ffffff]
            hover:scale-[1.03]
            hover:shadow-xl
            transition-all
            duration-150
            border-none
            overflow-hidden
          "
        >
          <Button
            variant="ghost"
            className="
              absolute
              right-1
              top-1
              text-[#5b5b66]
              opacity-0
              group-hover:opacity-100
              transition-all
              duration-150
              rounded-full
              hover:bg-black/10
              h-7
              w-7
              p-0
              z-10
            "
            onClick={(e) => {
              e.stopPropagation();
              setOpen(true);
            }}
          >
            ⋮
          </Button>

          <CardContent
            className="
              flex
              flex-col
              items-center
              justify-center
              gap-1
              w-full
              h-full
              p-0
            "
          >
            <img
              src={image}
              alt={title}
              className="
                w-8
                h-8
                object-contain
                transition-transform
                duration-150
                group-hover:scale-110
              "
            />
          </CardContent>
        </Card>

        <h3
          className="
            text-[14px]
            text-white
            text-center
            font-normal
            leading-tight
            max-w-[96px]
            line-clamp-2
            drop-shadow-md
          "
        >
          {title}
        </h3>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
           onOpenAutoFocus={(e) =>
              e.preventDefault()
           }
          className="
            bg-[#1c1b22]
            border-[#3a3944]
            text-white
            rounded-3xl
          "
        >
          <DialogHeader>
            <DialogTitle
              className="
                text-lg
                font-medium
              "
            >
              Edit Shortcut
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
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="Title"
              className="
              focus:outline-none
              focus:ring-0
              focus:border-zinc-700
              p-3
              rounded-xl
              bg-[#2b2a33]
              border
              border-[#3a3944]
              outline-none
              text-white
              "
            />

            <input
              value={editUrl}
              onChange={(e) => setEditUrl(e.target.value)}
              placeholder="URL"
              className="
                p-3
                rounded-xl
                bg-[#2b2a33]
                border
                border-[#3a3944]
                outline-none
                text-white
              "
            />

            <input
              value={editImage}
              onChange={(e) => setEditImage(e.target.value)}
              placeholder="Image URL"
              className="
                p-3
                rounded-xl
                bg-[#2b2a33]
                border
                border-[#3a3944]
                outline-none
                text-white
              "
            />

            <div
              className="
                flex
                gap-3
                pt-2
              "
            >
              <button
                className="
                  flex-1
                  bg-[#d9534f]
                  hover:bg-[#c94440]
                  px-4
                  py-3
                  rounded-xl
                  transition
                "
                onClick={onDelete}
              >
                Delete
              </button>

              <button
                className="
                  flex-1
                  bg-[#0060df]
                  hover:bg-[#0250bb]
                  px-4
                  py-3
                  rounded-xl
                  transition
                "
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ShortcutCard;
