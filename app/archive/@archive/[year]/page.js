import NewsList from "@/components/news-list";
import { getAvailableNewsMonths, getNewsForYear } from "@/lib/news";

export default function FilteredNewsPage({ params }) {
  const newsYear = params.year;
  const year = getNewsForYear(newsYear);
  return <NewsList news={year} />;
}
