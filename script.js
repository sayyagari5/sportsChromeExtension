const apiKey = '6b82245cffmsh05da42658d0a17fp1b6375jsna2839fcb9b93';
const apiHost = 'cricket-live-line1.p.rapidapi.com';
const apiUrl = 'https://cricket-live-line1.p.rapidapi.com';

// player info stuff
const apikey2 = '6b82245cffmsh05da42658d0a17fp1b6375jsna2839fcb9b93';
const apiUrl2 = 'https://cricbuzz-cricket.p.rapidapi.com';
const host2 = 'cricbuzz-cricket.p.rapidapi.com';

// for live matches 
const url_live = 'https://cricket-live-line1.p.rapidapi.com/liveMatches';
const options4= {
    method: 'GET',
    headers:{
        'x-rapidapi-key': '6b82245cffmsh05da42658d0a17fp1b6375jsna2839fcb9b93',
		'x-rapidapi-host': 'cricket-live-line1.p.rapidapi.com'
    }
}
// scorecard info 
const url = 'https://cricket-live-line1.p.rapidapi.com/match/4838/scorecard';
const options3 = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '6b82245cffmsh05da42658d0a17fp1b6375jsna2839fcb9b93',
		'x-rapidapi-host': 'cricket-live-line1.p.rapidapi.com'
	}
};
const options2 = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': apikey2,
        'x-rapidapi-host': host2
    }
};
const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': apiHost
    }
};
const matchesList = document.getElementById("matches");
const upcomingBtn = document.getElementById("upcoming-btn");
const playerBtn = document.getElementById("players-btn");
const scoreCardBtn = document.getElementById("scorecard-btn");

function clearMatches() {
    document.querySelector("#matches tbody").innerHTML = '';
    document.querySelector("#players tboy").innerHTML= '';
    document.querySelector("#teamOneBatting tbody").innerHTML = '';
    document.querySelector("#teamTwoBowling tbody").innerHTML = '';
}
function populateBatting(battingData){
    const tableBody=document.querySelector("#teamOneBatting tbody");

    battingData.forEach(batsman =>{
        const row= `
            <tr>
                    <td>${batsman.name || 'N/A'}</td>
                    <td>${batsman.run ||  '0'}</td>
                    <td>${batsman.ball || '0'}</td>
                    <td>${batsman.fours || '0'}</td>
                    <td>${batsman.sixes || '0'}</td>
                    <td>${batsman.strike_rate || '0.0'}</td>
                    <td>${batsman.out_by || 'N/A'}</td>
            </tr>
            `;
            tableBody.insertAdjacentHTML('beforeend',row);
    });
}
function populateBowlingTable(bowlingData){
    const tableBody= document.querySelector("#teamTwoBowling tbody");
    bowlingData.forEach(bolwer =>{
        const row = `
            <tr>
                <td>${bolwer.name || 'N/A'}</td>
                <td>${bolwer.over || '0'}</td>
                <td>${bolwer.maiden || '0'}</td>
                <td>${bolwer.run || '0'}</td>
                <td>${bolwer.wicket || '0'}</td>
                <td>${bolwer.economy || '0.0'}</td>
            </tr>
            `;
            tableBody.insertAdjacentHTML('beforeend',row);
    });
}

function parseMatchDate(matchDateStr) {
    const currentYear = new Date().getFullYear();
    const fullDateStr = `${matchDateStr}-${currentYear}`;
    const parsedDate = new Date(fullDateStr);
    console.log(`Parsed Date: ${matchDateStr} ->${parsedDate}`);
    return new Date(fullDateStr);
}
async function fetchUpcomingMatches() {
    // '/upcomingMatches'
    //clearMatches();
    const url = `${apiUrl}/upcomingMatches`;
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);

        if (result && result.data && result.data.length > 0) {
            const tableBody = document.querySelector("#matches tbody");
            const today = new Date();
            const oneMonth = new Date(today);
            oneMonth.setDate(today.getDate() + 30);
            console.log('Today', today);
            console.log('One month from now:', oneMonth);

            const filteredMatches = result.data.filter(match => {
                const matchDate = parseMatchDate(match.match_date);
                //console.log("Parsed Date for Filter:", matchDate);
                return matchDate >= today && matchDate <= oneMonth;
            });
            console.log("Match Dates from API:", result.data.map(match => match.match_date));

            result.data.forEach(match => {

            });

            if (filteredMatches.length > 0) {
                filteredMatches.forEach(match => {
                    const row = `
                <tr>
                <td>${match.match_type}</td>
                <td>${match.series}</td>
                <td>${match.date_wise}</td>
                <td>${match.match_status}</td>
                <td>${match.team_a} vs ${match.team_b}</td>
            </tr>
            `;
                    tableBody.insertAdjacentHTML('beforeend', row);
                });
                document.getElementById("matches").style.display = "table";
            } else {
                tableBody.innerHTML = `<tr><td colspan="2">No matches in the next month. </td></tr>`;
            }
        } else {
            document.querySelector("#matches tbody").innerHTML = `<tr><td colspan="2">No upcoming matches found.</td></tr>`;
        }

    } catch (error) {
        console.error("Error fetching upcoming matches:", error);
        document.querySelector("#matches tbody").innerHTML = `
        <tr><td colspan="4">Failed to load upcoming matches.</td></tr>
    `;
    }
}
async function fetchPlayersInfo() {
    //clearMatches();
    const url_team_player = `${apiUrl2}/teams/v1/2/players`;
    const url_player_bowl = `${apiUrl2}/stats/v1/player/8733/bowling`;
    const url_player_bat = `${apiUrl2}/stats/v1/player/8733/batting`;
    const url_player_info = `${apiUrl2}/stats/v1/player/6635`;

    try{
        const response_player_bowl = await fetch(url_player_bowl, options2);
        const response_team_player= await fetch(url_team_player,options2);
        const response_player_bat= await fetch(url_player_bat, options2);
        const response_player_info= await fetch(url_player_info, options2);

        const result_player_bowl = await response_player_bowl.json();
        const result_team_player = await response_team_player.json();
        const result_player_bat = await response_player_bat.json();
        const result_player_info = await response_player_info.json();

        if (result_team_player){
            console.log("Avail keys", Object.keys(result_team_player)); // Correct
        }
        console.log("response states:", response_team_player);
        console.log("Team player data", result_team_player.player);
        console.log('result_player bowl:',result_player_bowl);
        console.log('result_team player:',result_team_player);
        console.log('result_player bat:',result_player_bat);
        console.log('result_player info:',result_player_info);
        
        if (result_team_player && result_team_player.player && result_team_player.player.length > 0) {
            const tableBody = document.querySelector("#players tbody");
            tableBody.innerHTML='';
            result_team_player.player.forEach(player=>{
                console.log("Adding player", player.name)
                const playerName = player.name ? player.name : '';
                const battingStyle = player.battingStyle ? player.battingStyle : 'none';
                const bowlingStyle = player.bowlingStyle ? player.bowlingStyle : 'none';
                if (playerName || battingStyle||bowlingStyle){
                    const row = `
                    <tr>
                            ${playerName ? `<td>${playerName}</td>` : ''}
                            ${battingStyle ? `<td>${battingStyle}</td>` : ''}
                            ${bowlingStyle ? `<td>${bowlingStyle}</td>` : ''}
                    </tr>
                    `;
                    tableBody.insertAdjacentHTML('beforeend', row);
                }
               
                });
                document.getElementById("players").style.display = "table";
        }else{
            console.log("no data found");
        }

    }catch (error){
        console.error("Error fetching player info", error);
    }

}
async function fetchScoreCard(){
    //clearMatches();
    try{
        const response = await fetch(url, options3);
        const data = await response.json();
        console.log("API Scorecard Data",data);
        console.log("response",response); // Check what the API returns
        console.log("response.data",response.data); // Verify if `data` exists
        console.log("data", data)
        console.log("response scorecard",data.scorecard); // Check if `scorecard` exists

        // const scorecardData= response.data.scorecard;
        // console.log("batsman",scorecardData[1].bastman);
        if (data && data.batting && data.bowling){
            const teamOneBatting = data.innings[0]?.batting || [];
            const teamTwoBowling = data.innings[1]?.bowling || [];

            populateBatting(teamOneBatting);
            populateBowlingTable(teamTwoBowling);
        }else{
            console.error("Incomplete data received form API");
        }
    }catch(error){
        console.error("Error fetching scoredata", error)
    }



}
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("upcoming-btn").addEventListener("click", fetchUpcomingMatches);
    document.getElementById("players-btn").addEventListener("click", fetchPlayersInfo);
    document.getElementById("current-match-btn").addEventListener("click",fetchScoreCard);
});
