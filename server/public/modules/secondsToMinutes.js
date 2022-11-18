function secondsToMinutes(seconds) {
    return [Math.floor(seconds / 60), String(seconds % 60).padEnd(2, '0')].join(':')
}