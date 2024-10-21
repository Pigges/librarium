// Formats seconds to duration as hh:mm:ss
export function formatDuration(duration) {
    const hours = Math.floor(duration / 60**2);
    const minutes = Math.floor(duration / 60) - (hours * 60);
    const seconds = duration - (hours * 60**2) - (minutes * 60);

    return [hours, minutes, seconds].filter(Number).map(d=>d<10?'0'+d:d).join(':');
}