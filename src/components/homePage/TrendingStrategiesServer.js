import React from 'react'
import TrendingStrategies from './TrendingStrategies';
import { backendUrl, serverSideBackendUrl } from '@/json-data/backendServer';
import axios from 'axios';

const TrendingStrategiesServer = async () => {
    const currentPage = 1
    const res = await axios.get(
        `${serverSideBackendUrl}api/strategy_categories/trending-last-24-hours?page=${currentPage}&limit=20`
    );
    const { data, pages } = res.data;

    return (
        <>
            <TrendingStrategies data={data} pages={pages}></TrendingStrategies>

        </>
    )
}

export default TrendingStrategiesServer