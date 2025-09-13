import NewsList from "@/components/news-list";
import {
  getAvailableNewsMonths,
  getNewsForYear,
  getNewsForYearAndMonth,
} from "@/lib/news";
import { getAvailableNewsYears } from "@/lib/news";
import Link from "next/link";

export default async function FilteredNewsPage({ params }) {
  const filter = params.filter;

  let selectedYear = filter?.[0];
  let selectedMonth = filter?.[1];

  let news;
  let links = await getAvailableNewsYears();

  if (selectedYear && !selectedMonth) {
    news = await getNewsForYear(selectedYear);
    links = getAvailableNewsMonths(selectedYear);
  }
  if (selectedYear && selectedMonth) {
    news =await getNewsForYearAndMonth(selectedYear, selectedMonth);
    links = [];
  }
  let newsContent = <p>we can`t find this month</p>;

  if (news && news.length > 0) {
    newsContent = <NewsList news={news} />;
  }
 const AvailableYears = await getAvailableNewsYears()
  if (
    (selectedYear && !AvailableYears.includes(selectedYear)) ||
    (selectedMonth && !getAvailableNewsMonths(selectedYear).includes(selectedMonth))
  ){throw new Error("invalid filter")}
  
    return (
      <>
        <header id="archive-header">
          <nav>
            <ul>
              {links.map((link) => {
                let href = selectedYear
                  ? `/archive/${selectedYear}/${link}`
                  : `/archive/${link}`;
                return (
                  <li key={link}>
                    <Link href={href}>{link}</Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </header>
        {newsContent}
      </>
    );
}
