'use client';
import {useTranslations} from "next-intl";

export default function AboutPage() {
  const t = useTranslations("AboutPage");
  return (
    <article className="prose max-w-none">
      <h1>{t("title")}</h1>
      <p>{t("body")}</p>
    </article>
  );
}

