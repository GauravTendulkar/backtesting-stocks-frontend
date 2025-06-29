

const backend = process.env.NEXT_PUBLIC_BACKTESTING_URL
const serversideBackend = process.env.API_BACKTESTING_URL

const backendUrl = `${backend}/backend/`
const serverSideBackendUrl = `${serversideBackend}/backend/`

export { backendUrl, serverSideBackendUrl }