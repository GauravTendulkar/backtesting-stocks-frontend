"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "@/json-data/backendServer";
import { Card } from "@/components/ui/card";
import slugify from "slugify";
import { useRouter } from "next/navigation";

const tagOptions = [
  { value: "long", label: "Bullish Scan" },
  { value: "short", label: "Bearish Scan" },
  { value: "intraday_long", label: "Intraday Bullish Scan" },
  { value: "intraday_short", label: "Intraday Bearish Scan" },
  { value: "Other", label: "Other" },
];

const TopStrategiesByAllTags = () => {
  const [tagData, setTagData] = useState({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchAllTagsData = async () => {
      try {
        const results = await Promise.all(
          tagOptions.map((tag) =>
            axios
              .get(`${backendUrl}api/strategy_categories/top-liked-strategies`, {
                params: { tag: tag.value },
              })
              .then((res) => ({ tag: tag.value, strategies: res.data || [] }))
          )
        );

        const tagMap = {};
        results.forEach(({ tag, strategies }) => {
          tagMap[tag] = strategies;
        });
        setTagData(tagMap);
      } catch (error) {
        console.error("Error fetching top strategies by tags", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllTagsData();
  }, []);

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-6 space-y-16">
      {tagOptions.map(({ value, label }) => {
        const strategies = tagData[value] || [];
        if (strategies.length === 0) return null; // ✅ Skip if no strategies

        return (
          <div key={value}>
            <h2 className="text-2xl font-bold text-center mb-6">
              Top 20 Strategies for {label}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {strategies.map((s, i) => {
                const slug = slugify(s.link || s.title || "", { lower: true });
                const strategyUrl = `/create-2/${slug}`;
                const fullUrl = `${window.location.origin}${strategyUrl}`;

                return (
                  <Card
                    key={i}
                    className="p-4 border rounded-xl cursor-pointer"
                    draggable
                    onClick={() => router.push(strategyUrl)}
                    onDragStart={(e) =>
                      e.dataTransfer.setData("text/uri-list", fullUrl)
                    }
                  >
                    <h3 className="text-lg font-semibold text-blue-600 text-center">
                      {s.title || s.link}
                    </h3>
                  </Card>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TopStrategiesByAllTags;
