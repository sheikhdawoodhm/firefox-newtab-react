import { useEffect, useState } from "react";
import NewsCard from "./NewsCard";
import { fetchNews } from "@/services/NewsAPI";

export type NewsItem = {
  article_id: string;
  title: string;
  description: string;
  image_url: string | null;
  link: string;
};

type NewsGridProps = {
  search: string;
};

function NewsGrid({ search }: NewsGridProps) {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadNews() {
      try {
        const response = await fetchNews();
        console.log(response);

        const formattedNews: NewsItem[] = response.map((item: any) => ({
          article_id: item.article_id,
          title: item.title,
          description: item.description,
          image_url: item.image_url || "",
          link: item.link,
        }));

        setNews(formattedNews);
      } catch (err) {
        console.error(err);
        setError("Failed to load news");
      } finally {
        setLoading(false);
      }
    }

    loadNews();
  }, []);

  if (loading) {
    return <p className="text-center text-white text-2xl">Loading news...</p>;
  }

  if (error) {
    return <p className="text-center text-red-400 text-2xl">{error}</p>;
  }

  const filteredNews = news.filter((item) => {
    return item.title.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <section
      className="
    mt-2
    w-full
    flex
    justify-center
  " >
      <div className="w-full max-w-6xl">
        <h2
          className="
        text-lg
        font-bold
        text-white
        mb-8
        ml-1
      "
        >
          Thought-provoking stories
        </h2>

        <div
          className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        gap-5
        pb-16
      "
        >
          {filteredNews.map((item) => (
            <NewsCard
              key={item.article_id}
              title={item.title}
              description={item.description}
              image_url={item.image_url}
              link={item.link}
            />
          ))}

         {filteredNews.length === 0 && (
          <p className="text-center text-white text-2xl col-span-full">No search results found... </p>)}
        </div>
      </div>
    </section>
  );
}

export default NewsGrid;
