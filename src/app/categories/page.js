import React from "react";
import TopStrategiesByTag from "@/components/categories/TopStrategiesByAllTags";
import StrategySearch from "@/components/categories/StrategySearch";
import TopStrategiesByAllTags from "@/components/categories/TopStrategiesByAllTags";

export const generateMetadata = () => {
    return {
        title: "Categories | MySiteName",
        description: "Explore categorized trading strategies and more.",
    };
};

const Categories = () => {
    return (
        <div>
            <StrategySearch></StrategySearch>
            {/* <TopStrategiesByTag tag="intraday_long" />  */}
            <TopStrategiesByAllTags></TopStrategiesByAllTags>
        </div>
    );
};

export default Categories;
