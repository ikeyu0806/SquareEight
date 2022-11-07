#!/bin/bash
echo ECSコンテナに接続します。クラスタ、サービス、コンテナ名を選択してください。
echo
echo ? クラスタを選択してください
echo
CLUSTER_NAMES=`aws ecs list-clusters --output text \
              | awk -F'/' '{print $2}'`
select CLUSTER_NAME in $CLUSTER_NAMES exit
do
  if [ "$CLUSTER_NAME" = "exit" ]; then
    echo 処理を中断します
	  exit 0
  fi
	break
done
echo
echo $CLUSTER_NAMEが選択されました
echo
echo ? サービスを選択してください
echo
SERVICE_NAMES=`aws ecs list-services --cluster $CLUSTER_NAME --output text \
              | awk -F'/' '{print $3}'`
select SERVICE_NAME in $SERVICE_NAMES exit
do
  if [ "$SERVICE_NAME" = "exit" ]; then
	  echo 処理を中断します
	  exit 0
  fi
	break
done
echo
echo $SERVICE_NAMEが選択されました
echo
TASKID=`aws ecs list-tasks \
    --cluster $CLUSTER_NAME \
    --service-name $SERVICE_NAME --output text \
    | awk -F'/' '{print $3}' | head -1`

CONTAINER_NAMES=`aws ecs describe-tasks --cluster $CLUSTER_NAME \
                  --tasks $TASKID \
                  | jq '.tasks[0].containers[].name' \
                  | sed 's/"//g'`

echo ? コンテナを選択してください
echo
select CONTAINER_NAME in $CONTAINER_NAMES exit
do
  if [ "$CONTAINER_NAME" = "exit" ]; then
	  echo 処理を中断します
	  exit 0
  fi
	break
done

echo
echo $CONTAINER_NAMEが選択されました
echo $CONTAINER_NAMEに接続します
echo

if [ `echo $CONTAINER_NAME | grep 'nginx'` ] ; then
  SHELL_PATH="/bin/sh"
elif [ `echo $CONTAINER_NAME | grep 'square'` ] ; then
  SHELL_PATH="/bin/bash"
else
  echo "error unexpected container"
  exit 1
fi

aws ecs execute-command \
    --cluster $CLUSTER_NAME \
    --task $TASKID \
    --container $CONTAINER_NAME \
    --interactive \
    --command $SHELL_PATH
