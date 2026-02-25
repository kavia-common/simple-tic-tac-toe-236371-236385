const express = require('express');
const healthController = require('../controllers/health');
const ticTacToeController = require('../controllers/tictactoe');

const router = express.Router();
// Health endpoint

/**
 * @swagger
 * /:
 *   get:
 *     summary: Health endpoint
 *     responses:
 *       200:
 *         description: Service health check passed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 message:
 *                   type: string
 *                   example: Service is healthy
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                 environment:
 *                   type: string
 *                   example: development
 */
router.get('/', healthController.check.bind(healthController));
// Alias for frontend health checks and common conventions.
router.get('/health', healthController.check.bind(healthController));

/**
 * @swagger
 * tags:
 *   - name: TicTacToe
 *     description: Tic Tac Toe board analysis endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     TicTacToeAnalyzeRequest:
 *       type: object
 *       required:
 *         - board
 *       properties:
 *         board:
 *           type: array
 *           description: A 9-element array representing the board. Each cell is "X", "O", or null.
 *           minItems: 9
 *           maxItems: 9
 *           items:
 *             oneOf:
 *               - type: string
 *                 enum: [X, O]
 *               - type: "null"
 *           example: ["X", "O", null, null, "X", null, "O", null, null]
 *     TicTacToeAnalyzeResponse:
 *       type: object
 *       properties:
 *         valid:
 *           type: boolean
 *           example: true
 *         board:
 *           type: array
 *           description: The normalized validated board.
 *           minItems: 9
 *           maxItems: 9
 *           items:
 *             oneOf:
 *               - type: string
 *                 enum: [X, O]
 *               - type: "null"
 *         winner:
 *           oneOf:
 *             - type: string
 *               enum: [X, O]
 *             - type: "null"
 *           description: "X" or "O" if there is a winner, otherwise null.
 *           example: null
 *         isDraw:
 *           type: boolean
 *           example: false
 *         isTerminal:
 *           type: boolean
 *           description: True if game is over due to win or draw.
 *           example: false
 *         nextPlayer:
 *           oneOf:
 *             - type: string
 *               enum: [X, O]
 *             - type: "null"
 *           description: The next player to move if game is not terminal; otherwise null.
 *           example: X
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: error
 *         message:
 *           type: string
 *           example: Board must be an array of length 9.
 */

/**
 * @swagger
 * /tictactoe/analyze:
 *   post:
 *     tags: [TicTacToe]
 *     summary: Validate a Tic Tac Toe board and compute winner/draw/next player
 *     description: >
 *       Validates move counts and cell values, then computes winner/draw/terminal state and next player.
 *       Board must be a 9-element array of "X", "O", or null.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TicTacToeAnalyzeRequest'
 *     responses:
 *       200:
 *         description: Analysis result
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TicTacToeAnalyzeResponse'
 *       400:
 *         description: Invalid board/request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/tictactoe/analyze', ticTacToeController.analyze.bind(ticTacToeController));

module.exports = router;
