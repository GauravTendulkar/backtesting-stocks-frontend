"use client";

import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import debounce from "lodash.debounce";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import slugify from "slugify";
import { backendUrl } from "@/json-data/backendServer";
import { useRouter } from "next/navigation";

const StrategySearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 20;
  const router = useRouter();

  const totalPages = Math.ceil(results.length / resultsPerPage);

  const paginatedResults = results.slice(
    (currentPage - 1) * resultsPerPage,
    currentPage * resultsPerPage
  );

  const debouncedSearch = useMemo(
    () =>
      debounce(async (q) => {
        if (!q) return setResults([]);
        try {
          const res = await axios.get(`${backendUrl}api/strategy_categories/search`, {
            params: { query: q },
          });
          setResults(res.data.results || []);
          setCurrentPage(1);
        } catch (err) {
          console.error("Search failed", err);
        }
      }, 500),
    []
  );

  useEffect(() => {
    debouncedSearch(query);
  }, [query, debouncedSearch]);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search strategies by title or link..."
      />

      {query && (
        <>
          <h2 className="text-2xl font-bold text-center">
            Found {results.length} results
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {paginatedResults.map((s, i) => {
              const slug = slugify(s.link || s.title || "", { lower: true });
              const strategyUrl = `/create-2/${slug}`;
              const fullUrl = `${window.location.origin}${strategyUrl}`;

              return (
                <Card
                  key={i}
                  className="p-4 cursor-pointer border rounded-xl"
                  draggable
                  onClick={() => router.push(strategyUrl)}
                  onDragStart={(e) => e.dataTransfer.setData("text/uri-list", fullUrl)}
                >
                  <h3 className="text-lg font-semibold text-blue-600 text-center">
                    {s.title || s.link}
                  </h3>
                </Card>
              );
            })}
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: totalPages }, (_, idx) => (
              <Button
                key={idx}
                variant={currentPage === idx + 1 ? "default" : "outline"}
                onClick={() => setCurrentPage(idx + 1)}
              >
                {idx + 1}
              </Button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default StrategySearch;
