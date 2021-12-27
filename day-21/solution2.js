"use strict";
{
    const winningScore = 21;
    const playerPositions = [8, 7];
    const uniformDistribution = [[3, 1], [4, 3], [5, 6], [6, 7], [7, 6], [8, 3], [9, 1]];
    // mem[player1Pos][player2Pose][player1ScoreToWin][player2ScoreToWin][whoIsPlaying]
    // contains the pair [p1Winnings, p2Winnings]
    const mem = [];
    for (let i = 1; i <= 10; i++) {
        const tempIArr = [];
        for (let j = 1; j <= 10; j++) {
            const tempJArr = [];
            for (let k = 0; k <= winningScore; k++) {
                const tempKArr = [];
                for (let l = 0; l <= winningScore; l++) {
                    tempKArr[l] = [];
                }
                tempJArr[k] = tempKArr;
            }
            tempIArr[j] = tempJArr;
        }
        mem[i] = tempIArr;
    }
    function movePlayer(n, p) {
        p += n - 1;
        p %= 10;
        p += 1;
        return p;
    }
    function solve(p1, p2, p1ToWin, p2ToWin, starting) {
        if (p1ToWin <= 0)
            return [1, 0];
        if (p2ToWin <= 0)
            return [0, 1];
        if (mem[p1][p2][p1ToWin][p2ToWin][starting] === undefined) {
            let result = [0, 0];
            if (starting === 0) {
                for (const [moves, freq] of uniformDistribution) {
                    const newPos = movePlayer(moves, p1);
                    solve(newPos, p2, p1ToWin - newPos, p2ToWin, 1).forEach((x, i) => result[i] += x * freq);
                }
            }
            else {
                for (const [moves, freq] of uniformDistribution) {
                    const newPos = movePlayer(moves, p2);
                    solve(p1, newPos, p1ToWin, p2ToWin - newPos, 0).forEach((x, i) => result[i] += x * freq);
                }
            }
            mem[p1][p2][p1ToWin][p2ToWin][starting] = result;
        }
        return mem[p1][p2][p1ToWin][p2ToWin][starting];
    }
    console.log(solve(playerPositions[0], playerPositions[1], winningScore, winningScore, 0));
    // for (let i = 0; i < 102; i++) {
    //     console.log(getDieNumber());
    // }
    // while (true) {
    //     // player 1 plays
    //     const numberOfMovesP1 = getDieNumber() + getDieNumber() + getDieNumber();
    //     movePlayer(numberOfMovesP1, 0);
    //     if (playerScores[0] >= winningScore) break;
    //     const numberOfMovesP2 = getDieNumber() + getDieNumber() + getDieNumber();
    //     movePlayer(numberOfMovesP2, 1);
    //     if (playerScores[1] >= winningScore) break;
    // }
    // console.log(Math.min(...playerScores) * dieCounter);
}
