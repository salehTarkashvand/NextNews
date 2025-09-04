import { DUMMY_NEWS } from "@/ dummy-news";
import { notFound } from "next/navigation";
export default function NewsDetailsPage({ params }) {
  const newSlug = params.slug;
  const newsItem = DUMMY_NEWS.find((newsItem) => newsItem.slug === newSlug);
  
  if (!newsItem) {
    notFound();
  }

  return (
    <>
      <div>
        <article className="news-article">
          <header>
            <img src={`/images/news/${newsItem.image}`} />
            <h1>{newsItem.title}</h1>
            <time dateTime={newsItem.date}>{newsItem.date}</time>
          </header>
          <p>{newsItem.content}</p>
        </article>
      </div>
    </>
  );
}
