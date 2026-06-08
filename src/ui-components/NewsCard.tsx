type NewsCardProps = {
  title: string;
  description: string;
  image_url: string | null;
  link: string;
};

function NewsCard({
  title,
  description,
  image_url,
  link,
}: NewsCardProps) {
  return (
    <article
      onClick={() => window.open(link, "_blank")}
      className="
        group
        overflow-hidden
        rounded-2xl
        bg-[#f0f0f4]/95
        hover:bg-[#ffffff]
        transition-all
        duration-200
        cursor-pointer
        border
        border-white/5
        w-full
      "
    >

        <div className="overflow-hidden">
          <img
            src={image_url ||  "https://images.unsplash.com/photo-1504711434969-e33886168f5c"}
            alt={title}
            loading="lazy"
            className="
              w-full
              h-36
              object-cover
              group-hover:scale-[1.03]
              transition-transform
              duration-300
            "
          />
        </div>
      

      <div className="p-4">

        <h3
          className="
            text-black
            text-[15px]
            font-semibold
            leading-5
            line-clamp-2
            mb-2
          "
        >
          {title}
        </h3>

        <p
          className="
            text-gray-700
            text-sm
            leading-5
            line-clamp-2
          "
        >
          {description}
        </p>

      </div>
    </article>
  );
}

export default NewsCard;