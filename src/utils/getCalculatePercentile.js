


function getCalculatePercentile(myScore, allScores) {
    if(allScores[0] === undefined) return false
    const belowMe = allScores[0].filter(score => score < myScore).length;
    console.log("belowMe :", belowMe)
    console.log(allScores)

    return Math.round((belowMe / allScores[0]?.length) * 100);
}

export default getCalculatePercentile
