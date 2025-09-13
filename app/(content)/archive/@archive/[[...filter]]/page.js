import NewsList from "@/components/news-list";
import {
  getAvailableNewsMonths,
  getNewsForYear,
  getNewsForYearAndMonth,
} from "@/lib/news";
import { getAvailableNewsYears } from "@/lib/news";
import Link from "next/link";
import { Suspense } from "react";

async function FilteredNews({ year, month }) {
  
  let news;

  if (year && !month) {
    news = await getNewsForYear(year);
  } else if (year && month) {
    news = await getNewsForYearAndMonth(year, month);
  }
  let newsContent = <p>we can`t find this month</p>;

  if (news && news.length > 0) {
    newsContent = <NewsList news={news} />;
  }
  return newsContent;
}
async function FilterHeader({ year, month }) {
  const AvailableYears = await getAvailableNewsYears();
  let links = AvailableYears;

  if (year && !month) {
    links = getAvailableNewsMonths(year);
  }
  if (year && month) {
    links = [];
  }

  if (
    (year && !AvailableYears.includes(year)) ||
    (month && !getAvailableNewsMonths(year).includes(month))
  ) {
    throw new Error("invalid filter");
  }
  return (
    <header id="archive-header">
      <nav>
        <ul>
          {links.map((link) => {
            let href = year
              ? `/archive/${year}/${link}`
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
  );
}

export default async function FilteredNewsPage({ params }) {
  const filter = params.filter;

  let selectedYear = filter?.[0];
  let selectedMonth = filter?.[1];

  return (
    <>
      <Suspense fallback={<p>loading news ... </p>}>
        <FilterHeader year={selectedYear} month={selectedMonth} />
        <FilteredNews year={selectedYear} month={selectedMonth} />
      </Suspense>
    </>
  );
}
