import React from "react";
import TopStrategiesByTag from "@/components/categories/TopStrategiesByAllTags";
import StrategySearch from "@/components/categories/StrategySearch";
import TopStrategiesByAllTags from "@/components/categories/TopStrategiesByAllTags";
import { auth } from "@/auth";
import axios from "axios";
import { serverSideBackendUrl } from "@/json-data/backendServer";
import { ro } from "date-fns/locale";
import { notFound } from "next/navigation";
import { getTokenForSessionData } from "@/utils/security";

export const generateMetadata = () => {
    return {
        title: "Categories | Backtesting App",
        description: "Explore categorized trading strategies and more.",
    };
};

const Categories = async () => {


    const session = await auth();

    if (!session) {
        notFound()
    }
    let roles = []
    try {
        roles = await axios.post(`${serverSideBackendUrl}api/admin-dashboard/get-roles`, {},
            {
                headers: {
                    Authorization: `Bearer ${await getTokenForSessionData(session)}`,
                }
            });
        roles = roles?.data
    }
    catch {

    }

    const tagOptions = [
        { value: "long", label: "Bullish Scan" },
        { value: "short", label: "Bearish Scan" },
        { value: "intraday_long", label: "Intraday Bullish Scan" },
        { value: "intraday_short", label: "Intraday Bearish Scan" },
        { value: "Other", label: "Other" },
    ];

    // let tagMap = {};
    const fetchAllTagsData = async () => {
        try {
            const results = await Promise.all(
                tagOptions.map((tag) =>
                    axios
                        .get(`${serverSideBackendUrl}api/strategy_categories/top-liked-strategies`, {
                            params: { tag: tag.value },
                        })
                        .then((res) => ({ tag: tag.value, strategies: res.data || [] }))
                )
            );

            const tagMap = {};
            results.forEach(({ tag, strategies }) => {
                tagMap[tag] = strategies;
            });
            // setTagData(tagMap);
            return tagMap
        } catch (error) {
            console.error("Error fetching top strategies by tags", error);
        }
    };

    // fetchAllTagsData();
    const tagMap = await fetchAllTagsData()
    // console.log("tagMap",await fetchAllTagsData())
    if (roles.includes("categories")) {

        return (
            <div>
                <StrategySearch></StrategySearch>
                {/* <TopStrategiesByTag tag="intraday_long" />  */}
                <TopStrategiesByAllTags tagMap={tagMap}></TopStrategiesByAllTags>
            </div>
        );
    }
    else {
        notFound()
    }
};

export default Categories;
