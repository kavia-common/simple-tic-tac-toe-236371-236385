class TicTacToeService {
  /**
   * Internal helper to validate and normalize a Tic Tac Toe board.
   * Board is expected to be an array of 9 elements: 'X', 'O', or null.
   *
   * @param {unknown} board
   * @returns {{ board: (('X'|'O'|null)[]), xCount: number, oCount: number }}
   * @throws {Error} when the board is invalid
   */
  _validateAndNormalizeBoard(board) {
    if (!Array.isArray(board) || board.length !== 9) {
      throw new Error('Board must be an array of length 9.');
    }

    let xCount = 0;
    let oCount = 0;

    const normalized = board.map((cell) => {
      if (cell === null) return null;
      if (cell === 'X') {
        xCount += 1;
        return 'X';
      }
      if (cell === 'O') {
        oCount += 1;
        return 'O';
      }
      // Treat undefined/missing as invalid rather than null to keep API strict.
      throw new Error('Board cells must be "X", "O", or null.');
    });

    // Game turn validity: X always goes first, and players alternate.
    // Therefore xCount is either equal to oCount (O to play) or exactly one more (X just played).
    if (!(xCount === oCount || xCount === oCount + 1)) {
      throw new Error('Invalid move counts: X must have either equal moves as O or exactly one more.');
    }

    return { board: normalized, xCount, oCount };
  }

  /**
   * Determine the winner for a valid board.
   *
   * @param {(('X'|'O'|null)[])} board
   * @returns {'X'|'O'|null}
   */
  _computeWinner(board) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const [a, b, c] of lines) {
      const v = board[a];
      if (v && v === board[b] && v === board[c]) return v;
    }
    return null;
  }

  /**
   * Compute current game status from a board.
   *
   * PUBLIC_INTERFACE
   * @param {unknown} board - Array of 9 values ('X' | 'O' | null)
   * @returns {{
   *   valid: true,
   *   board: (('X'|'O'|null)[]),
   *   winner: ('X'|'O'|null),
   *   isDraw: boolean,
   *   isTerminal: boolean,
   *   nextPlayer: ('X'|'O'|null)
   * }}
   */
  // PUBLIC_INTERFACE
  analyzeBoard(board) {
    const { board: normalized, xCount, oCount } = this._validateAndNormalizeBoard(board);

    const winner = this._computeWinner(normalized);
    const isBoardFull = normalized.every((c) => c !== null);

    // If a winner exists, the game is terminal.
    const isTerminal = Boolean(winner) || isBoardFull;
    const isDraw = !winner && isBoardFull;

    // Next player is only meaningful if game is not terminal.
    let nextPlayer = null;
    if (!isTerminal) {
      nextPlayer = xCount === oCount ? 'X' : 'O';
    }

    return {
      valid: true,
      board: normalized,
      winner,
      isDraw,
      isTerminal,
      nextPlayer,
    };
  }
}

module.exports = new TicTacToeService();
