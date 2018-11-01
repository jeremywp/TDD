module.exports = class ScoringService {
    calculateScoreRelativeToPar(par, playerScores) {
        return playerScores.map(score => (score ? score : 0)).reduce((a,b) => a + b, 0) - par;
    };
    calculateScoreRelativeToOutPar(outPar, playerOutScores) {
        return playerOutScores.map(score => (score ? score : 0)).reduce((a,b) => a + b, 0) - outPar;
    };
    calculateScoreRelativeToInPar(inPar, playerInScores) {
        return playerInScores.map(score => (score ? score : 0)).reduce((a,b) => a + b, 0) - inPar;
    }
};

