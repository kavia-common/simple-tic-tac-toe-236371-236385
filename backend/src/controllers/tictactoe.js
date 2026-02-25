const ticTacToeService = require('../services/tictactoe');

class TicTacToeController {
  /**
   * Analyze a board state and return winner/draw/next player.
   *
   * PUBLIC_INTERFACE
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @returns {import('express').Response}
   */
  // PUBLIC_INTERFACE
  analyze(req, res) {
    try {
      const { board } = req.body || {};
      const result = ticTacToeService.analyzeBoard(board);
      return res.status(200).json(result);
    } catch (err) {
      return res.status(400).json({
        status: 'error',
        message: err instanceof Error ? err.message : 'Invalid request.',
      });
    }
  }
}

module.exports = new TicTacToeController();
