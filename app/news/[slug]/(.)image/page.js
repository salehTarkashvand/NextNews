import { DUMMY_NEWS } from "@/ dummy-news";
import { notFound } from "next/navigation";

export default function InterceptedImagePage({params}){
    const newItemSlug = params.slug
    const newsItem = DUMMY_NEWS.find((newsItem) => newsItem.slug === newItemSlug);
      
      if (!newsItem) {
        notFound();
      }
    
    return (
      <>
        <p>intercepted</p>
        <div className="fullscreen-image">
          <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
        </div>
      </>
    );
} 