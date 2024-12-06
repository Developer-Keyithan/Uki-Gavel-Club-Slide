// Define the API URL
const apiUrl = 'http://localhost:3001/api/admin';

// Fetch the latest player data when the page loads
window.onload = () => {
    fetchLatestPlayerData();
};

// Function to fetch the latest player data from MongoDB
async function fetchLatestPlayerData() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const latestPlayer = data[data.length - 1]; // Get the last entry

        // Populate the table with the latest data
        document.getElementById('sessionCellOne').textContent = latestPlayer.session;
        document.getElementById('themeCellOne').textContent = latestPlayer.theme;
        document.getElementById('themeCellTwo').textContent = latestPlayer.theme;

        document.getElementById('generalEvaluatorCellOne').textContent = latestPlayer.general_evoluator;
        document.getElementById('grammarianCellOne').textContent = latestPlayer.gramarian;

        document.getElementById('wordOfTheDayCell').textContent = latestPlayer.word_of_the_day;
        document.getElementById('pronounciationCell').textContent = latestPlayer.pronounciation;
        document.getElementById('meaningCell').textContent = latestPlayer.meaning;
        document.getElementById('exampleCell').textContent = latestPlayer.example;


        document.getElementById('generalEvaluatorCellTwo').textContent = latestPlayer.general_evoluator;
        document.getElementById('grammarianCellTwo').textContent = latestPlayer.gramarian;
        document.getElementById('timerCellOne').textContent = latestPlayer.timer;

        document.getElementById('generalEvaluatorCellThree').textContent = latestPlayer.general_evoluator;
        document.getElementById('grammarianCellThree').textContent = latestPlayer.gramarian;
        document.getElementById('timerCellTwo').textContent = latestPlayer.timer;
        document.getElementById('ahCounterCell').textContent = latestPlayer.ah_counter;

        document.getElementById('speaker1Cell').textContent = latestPlayer.prepare_speaker_one;
        document.getElementById('speaker2Cell').textContent = latestPlayer.prepare_speaker_two;
        document.getElementById('roundRobinMasterCell').textContent = latestPlayer.round_robin_master;
        document.getElementById('tableTopicMasterCell').textContent = latestPlayer.table_topic_master;

        document.getElementById('sessionCellTwo').textContent = latestPlayer.session;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};