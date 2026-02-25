#!/bin/bash
cd /tmp/kavia/workspace/code-generation/simple-tic-tac-toe-236371-236385/backend
npm run lint
LINT_EXIT_CODE=$?
if [ $LINT_EXIT_CODE -ne 0 ]; then
  exit 1
fi

