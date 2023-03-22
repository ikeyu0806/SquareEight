# EventBridgeで実行するbatch一覧

|スケジュール名|batch_tu@e|実行時間|
|---|---|---|
|マーチャントサブスクリプションの請求|exec-merchant-subscription-payment-main|毎日 00:30|
|システムサブスクリプション（ビジネスアカウント向け）の請求|exec-system-subscription-payment-main|毎日 01:30|
|予約メール送信実行|send-mail-schedules-send-same-hour-schedule-main|毎日 毎時0分|
|予約LINE送信実行|send-line-schedules-send-same-hour-schedule-main|毎日 毎時0分|
|予約の前日メール通知|reservation-remind-tommorow-notifications-main|毎日 15:00|
|抽選予約の当選処理|reservations-confirm-lottery-reservations-main|毎日 16:00|

