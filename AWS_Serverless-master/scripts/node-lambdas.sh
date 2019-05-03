#!/bin/sh
echo "Started - lambda $1"

if [ "$1" = "build" ]; then
  cd $HOME_DIR/lambdas/fetch-s3-data && npm install
  cd $HOME_DIR/lambdas/clean-s3-data && npm install
  cd $HOME_DIR/lambdas/start-step-func && npm install
  cd $HOME_DIR/lambdas/eval-upload && npm install
  cd $HOME_DIR/lambdas/process-jpg && npm install
  cd $HOME_DIR/lambdas/process-png && npm install
  cd $HOME_DIR/lambdas/process-gif && npm install
  cd $HOME_DIR/lambdas/post-process-cleanup && npm install


elif [ "$1" = "package" ]; then
  cd $HOME_DIR/lambdas/fetch-s3-data && zip -9rq fetch-s3-data.zip .
  cd $HOME_DIR/lambdas/clean-s3-data && zip -9rq clean-s3-data.zip .
  cd $HOME_DIR/lambdas/start-step-func && zip -9rq start-step-func .
  cd $HOME_DIR/lambdas/eval-upload && zip -9rq eval-upload .
  cd $HOME_DIR/lambdas/process-jpg && zip -9rq process-jpg .
  cd $HOME_DIR/lambdas/process-png && zip -9rq process-png .
  cd $HOME_DIR/lambdas/process-gif && zip -9rq process-gif .
  cd $HOME_DIR/lambdas/post-process-cleanup && zip -9rq post-process-cleanup .


fi
echo "Ended - lambda $1"