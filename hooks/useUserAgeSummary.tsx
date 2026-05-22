import { persionToEnglish } from "@/utils/persianToEnglish";

interface Props {
  birthday?: string | null;
}

const MONTHS = [
  { num: 1, title: 'فروردین' }, { num: 2, title: 'اردیبهشت' },
  { num: 3, title: 'خرداد' }, { num: 4, title: 'تیر' },
  { num: 5, title: 'مرداد' }, { num: 6, title: 'شهریور' },
  { num: 7, title: 'مهر' }, { num: 8, title: 'آبان' },
  { num: 9, title: 'آذر' }, { num: 10, title: 'دی' },
  { num: 11, title: 'بهمن' }, { num: 12, title: 'اسفند' },
];

export function formatBirthday(birthday: string): string {
  const birthdayEn = persionToEnglish(birthday);
  const now = new Date();
  const currentYear = Number(now.toLocaleDateString('fa-IR-u-nu-latn', { year: 'numeric' }));
  const currentMonth = Number(now.toLocaleDateString('fa-IR-u-nu-latn', { month: 'numeric' }));
  const currentDay = Number(now.toLocaleDateString('fa-IR-u-nu-latn', { day: 'numeric' }));

  const [uYear, uMonth, uDay] = birthdayEn.split('/').map(Number);
  const monthName = MONTHS.find(m => m.num === uMonth)?.title || '';

  let age = currentYear - uYear;
  if (currentMonth < uMonth || (currentMonth === uMonth && currentDay < uDay)) {
    age--;
  }

  return `${uDay} ${monthName} ${uYear} (${age} ساله)`;
}

export default function AgeSummary({ birthday }: Props) {
  if (!birthday) return null;
  return <span className="user-age-text">{formatBirthday(birthday)}</span>;
}
