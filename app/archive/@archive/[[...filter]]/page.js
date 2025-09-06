import NewsList from "@/components/news-list";
import { getAvailableNewsMonths, getNewsForYear, getNewsForYearAndMonth } from "@/lib/news";
import { getAvailableNewsYears } from "@/lib/news";
import Link from "next/link";

export default function FilteredNewsPage({ params }) {
  const filter = params.filter;

  let selectedYear = filter?.[0]
  let selectedMonth = filter?.[1]

  let news ;
  let links = getAvailableNewsYears()

  if(selectedYear && !selectedMonth){
    news = getNewsForYear(selectedYear)
    links = getAvailableNewsMonths(selectedYear)
  }
  if(selectedYear && selectedMonth){
    news = getNewsForYearAndMonth(selectedYear,selectedMonth)
    links = []
  }
  let newsContent = <p>we can`t find this month</p>

  if(news && news.length > 0 ){
   newsContent = <NewsList news={news}/>
  }

  return (
    <>
      <header id="archive-header">
        <nav>
          <ul>
            {links.map((link) => {
              let href = selectedYear ? 
              `/archive/${selectedYear}/${link}` :
              `/archive/${link}`
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
