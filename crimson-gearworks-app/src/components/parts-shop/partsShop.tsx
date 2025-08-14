"use client";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import styles from "@/styles/parts-shop/partsShop.module.css";
import PartCard from "@/components/parts-shop/partCard";
import { parts } from "@/data/parts";
import type { Category, ConcreteCategory } from "@/types/categories";
import { CATEGORIES } from "@/types/categories";

function normalize(str: string) {
  return str.toLowerCase().normalize("NFKD");
}

export default function PartsShop() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialCat = (searchParams.get("cat") || "ALL").toUpperCase() as Category;
  const initialQ = searchParams.get("q") || "";

  const [category, setCategory] = useState<Category>(initialCat);
  const [query, setQuery] = useState<string>(initialQ);

  useEffect(() => {
    const params = new URLSearchParams();
    if (category && category !== "ALL") params.set("cat", category);
    if (query) params.set("q", query);
    router.replace(`${pathname}${params.toString() ? `?${params.toString()}` : ""}`);
  }, [category, query]);

  const filtered = useMemo(() => {
    const q = normalize(query);
    return parts.filter((p) => {
      const catOk = category === "ALL" || p.category === category;
      const qOk = !q ||
        normalize(p.name).includes(q) ||
        normalize(p.sku).includes(q) ||
        normalize(p.category).includes(q);
      return catOk && qOk;
    });
  }, [category, query]);

  const handleSelect = (cat: Category) => {
    setCategory(cat);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <section className={styles.container}>

      <nav className={styles.toolbar} aria-label="Kategorien">
        <ul className={styles.categories}>
          {(["ALL", ...CATEGORIES] as Category[]).map((cat) => (
            <li key={cat}>
              <button
                type="button"
                className={`${styles.catBtn} ${category === cat ? styles.catBtnActive : ""}`}
                aria-pressed={category === cat}
                onClick={() => handleSelect(cat)}
              >{cat}</button>
            </li>
          ))}
        </ul>
        <form className={styles.search} role="search" onSubmit={onSubmit}>
          <label htmlFor="search" className={styles.srOnly}>Suche</label>
          <input
            id="search"
            className={styles.searchInput}
            placeholder="Find my gear…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape") setQuery("");
            }}
          />
          {query && (
            <button
              type="button"
              className={styles.clearBtn}
              onClick={() => setQuery("")}
              aria-label="Suche löschen"
              title="Leeren"
            >×</button>
          )}
          <button className={styles.searchBtn} type="submit">Search</button>
        </form>
      </nav>

      {filtered.length === 0 ? (
        <div className={styles.empty}>
          <p>Keine Ergebnisse. Passe Filter oder Suche an.</p>
          <button className={styles.resetBtn} type="button" onClick={() => { setCategory("ALL"); setQuery(""); }}>Zurücksetzen</button>
        </div>
      ) : (
        <div className={styles.grid}>
          {filtered.map((p) => (
            <PartCard key={p.id} part={p} />
          ))}
        </div>
      )}
    </section>
  );
}
