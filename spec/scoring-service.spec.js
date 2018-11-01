let ScoringService = require("../js/scoring-service");

describe('ScoringService', () => {
    let scoringService;

    beforeEach(() => {
        scoringService = new ScoringService();
    });

    describe('calculateScoreRelativeToPar', () => {
        it('calculates score relative to par correctly when score is under par', () => {
            let par = 72;
            let playerScores = Array(18).fill(3, 0, 18);
            let scoreRelativeToPar = scoringService.calculateScoreRelativeToPar(par, playerScores);
            expect(scoreRelativeToPar).toEqual(-18);
        });
        it('returns a number', () => {
            let par = 72;
            let playerScores = Array(18).fill(5, 0, 18);
            let scoreRelativeToPar = scoringService.calculateScoreRelativeToPar(par, playerScores);
            expect(typeof scoreRelativeToPar).toEqual('number');
        });
        it('calculates score relative to par correctly when score is over par', () => {
            let par = 72;
            let playerScores = Array(18).fill(5, 0, 18);
            let scoreRelativeToPar = scoringService.calculateScoreRelativeToPar(par, playerScores);
            expect(scoreRelativeToPar).toEqual(18);
        });
        it('calculates when no score is entered', () => {
            let par = 72;
            let playerScores = Array(18);
            let scoreRelativeToPar = scoringService.calculateScoreRelativeToPar(par, playerScores);
            expect(scoreRelativeToPar).toEqual(-72);
        });
   });
   describe('calculateOutScore', () => {
       it('returns a number', () => {
           let par = 72;
           let playerScores = Array(18).fill(5, 0, 18);
           let scoreRelativeToPar = scoringService.calculateScoreRelativeToPar(par, playerScores);
           expect(typeof scoreRelativeToPar).toEqual('number');
       });
       it('calculates out-score relative to par correctly when score is under par', () => {
           let outPar = 36;
           let playerScores = Array(18).fill(3, 0, 18);
           let playerOutScores = [];
           for (let i=0; i<9 ;i++){
               playerOutScores[i] = playerScores[i]
           }
           let scoreRelativeToOutPar = scoringService.calculateScoreRelativeToOutPar(outPar, playerOutScores);
           expect(scoreRelativeToOutPar).toEqual(-9);
       });
       it('calculates out-score relative to par correctly when score is over par', () => {
           let outPar = 36;
           let playerScores = Array(18).fill(5, 0, 18);
           let playerOutScores = [];
           for (let i=0; i<9 ;i++){
               playerOutScores[i] = playerScores[i]
           }
           let scoreRelativeToOutPar = scoringService.calculateScoreRelativeToOutPar(outPar, playerOutScores);
           expect(scoreRelativeToOutPar).toEqual(9);
       });
   });
   describe('calculateInScore', () => {
       it('returns a number', () => {
           let par = 72;
           let playerScores = Array(18).fill(5, 0, 18);
           let scoreRelativeToPar = scoringService.calculateScoreRelativeToPar(par, playerScores);
           expect(typeof scoreRelativeToPar).toEqual('number');
       });
       it('calculates in-score relative to par correctly when score is under par', () => {
           let inPar = 36;
           let playerScores = Array(18).fill(3, 0, 18);
           let playerInScores = [];
           for (let i=0; i>=9 ;i++){
              //is this working as intended?
               playerInScores[i] = playerScores[i+9]
           }
           let scoreRelativeToInPar = scoringService.calculateScoreRelativeToInPar(inPar, playerInScores);
           expect(scoreRelativeToInPar).toEqual(-36);
       });
       it('calculates in-score relative to par correctly when score is over par', () => {
           let inPar = 36;
           let playerScores = Array(18).fill(5, 0, 18);
           let playerInScores = [];
           for (let i=0; i>=9 ;i++){
               playerInScores[i] = playerScores[i-9]
           }
           let scoreRelativeToPar = scoringService.calculateScoreRelativeToPar(inPar, playerInScores);
           expect(scoreRelativeToPar).toEqual(-36);
       });
   });
   describe('calculateTotalScore', () => {
       it('returns a number', () => {
           let par = 72;
           let playerScores = Array(18).fill(5, 0, 18);
           let scoreRelativeToPar = scoringService.calculateScoreRelativeToPar(par, playerScores);
           expect(typeof scoreRelativeToPar).toEqual('number');
       });
   });
});