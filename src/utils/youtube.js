export function extractYoutubeLink (input) {
    // Split the input into lines
    const lines = input.trim().split('\n');

    // Check if there are at least two lines
    if (lines.length < 2) {
        return null; // Not enough lines
    }

    // Get the last and next-to-last lines
    const lastLine = lines[lines.length - 1].trim();
    const secondLastLine = lines[lines.length - 2].trim();

    // Regex to match a YouTube link
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/(watch\?v=|embed\/|v\/|.+\?v=)?([^&\n]{11})/;

    // Check if the second last line has three periods
    const hasThreePeriods = secondLastLine.includes('...');

    // Check if the last line matches the YouTube link pattern
    const youtubeMatch = lastLine.match(youtubeRegex);

    // If both conditions are met, return the YouTube link
    if (hasThreePeriods && youtubeMatch) {
        return youtubeMatch[0]; // Return the full matched link
    }

    return null; // Return null if conditions are not met
}