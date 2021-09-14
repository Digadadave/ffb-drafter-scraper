const request = require("axios");
const cheerio = require("cheerio");
const $ = cheerio.load;
const BASE_URL = "https://www.fantasypros.com/nfl/adp/overall.php";
const TABLE_SELECTOR = "table.player-table";

async function requestPageData(url) {
    const { data } = await request.get(url);
    return data;
}

// function parseHeaders(dom) {
//     const playerTableHeaders = $(dom)(`${TABLE_SELECTOR} thead tr th `);
//     const headers = [...playerTableHeaders].map((header) => $(header).text());
//     return headers;
// }

function parsePlayerRows(dom) {
    const playerTableRows = $(dom)(`${TABLE_SELECTOR} tbody tr`);
    const playerTuples = [...playerTableRows].map((row) => {
        return [...$(row)("td")].map((td) => $(td).text());
    });
    return playerTuples;
}

function convertToPlayerData(data) {
    const playerObjects = data.map((playerData) => {
        const firstName = playerData[1].split(" ")[0];
        const lastName = playerData[1].split(" ")[1];
        const team = playerData[1].split(" ")[2];

        return [
            {
                source: "MFL", // MyFantasyLeague
                rank: playerData[3],
            },
            {
                source: "FanTrax", // MyFantasyLeague
                rank: playerData[4],
            },
            {
                source: "FFC", // MyFantasyLeague
                rank: playerData[5],
            },
            {
                source: "Sleeper", // MyFantasyLeague
                rank: playerData[6],
            },
        ].map((sourceData) => ({
            ...sourceData,
            firstName,
            lastName,
            team,
        }));
    });
    return playerObjects.flat();
}

async function buildPlayersData() {
    const page = await requestPageData(BASE_URL);
    const playerTableRows = parsePlayerRows(page);
    const playerData = convertToPlayerData(playerTableRows);
    console.log(playerData);
}

exports.builder = buildPlayersData;
