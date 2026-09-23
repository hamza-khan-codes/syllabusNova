function getCalculateRank(myScore, allScores) {
  if (allScores[0] === undefined) return;
  const sortedScores = [...allScores].sort((a, b) => b - a);
  const minScore = Math.min(...allScores[0]);
  const maxScore = Math.max(...allScores[0]);

  if ([...sortedScores].indexOf(myScore) === -1) {
    if (myScore > maxScore) {
      return sortedScores.length;
    } else if (myScore < minScore) {
      return 0;
    }
  }
  return sortedScores[0].indexOf(myScore) + 1;
}

export default getCalculateRank;
