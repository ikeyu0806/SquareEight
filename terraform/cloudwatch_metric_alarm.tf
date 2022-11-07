resource "aws_cloudwatch_metric_alarm" "ecsfargate_cpu_high" {
  alarm_name          = "square_eight-${terraform.workspace}-cpu-utilization-high"
  comparison_operator = "GreaterThanOrEqualToThreshold"
  evaluation_periods  = "1"
  metric_name         = "CPUUtilization"
  namespace           = "AWS/ECS"
  period              = "60"
  statistic           = "Average"
  threshold           = "75"

  dimensions = {
    ClusterName = aws_ecs_cluster.square_eight.name
    ServiceName = aws_ecs_service.square_eight.name
  }

  alarm_actions = [
    aws_appautoscaling_policy.square_eight-scale-out-cpu.arn
  ]
}

resource "aws_cloudwatch_metric_alarm" "ecsfargate_cpu_low" {
  alarm_name          = "square_eight-${terraform.workspace}-cpu-utilization-low"
  comparison_operator = "LessThanOrEqualToThreshold"
  evaluation_periods  = "1"
  metric_name         = "CPUUtilization"
  namespace           = "AWS/ECS"
  period              = "60"
  statistic           = "Average"
  threshold           = "25"

  dimensions = {
    ClusterName = aws_ecs_cluster.square_eight.name
    ServiceName = aws_ecs_service.square_eight.name
  }

  alarm_actions = [
    aws_appautoscaling_policy.square_eight-scale-in-cpu.arn
  ]
}

resource "aws_cloudwatch_metric_alarm" "ecsfargate_memory_high" {
  alarm_name          = "square_eight-${terraform.workspace}-memory-utilization-high"
  comparison_operator = "GreaterThanOrEqualToThreshold"
  evaluation_periods  = "1"
  metric_name         = "MemoryUtilization"
  namespace           = "AWS/ECS"
  period              = "60"
  statistic           = "Average"
  threshold           = "50"

  dimensions = {
    ClusterName = aws_ecs_cluster.square_eight.name
    ServiceName = aws_ecs_service.square_eight.name
  }

  alarm_actions = [
    aws_appautoscaling_policy.square_eight-scale-out-memory.arn
  ]
}

resource "aws_cloudwatch_metric_alarm" "ecsfargate_memory_low" {
  alarm_name          = "square_eight-${terraform.workspace}-memory-utilization-low"
  comparison_operator = "LessThanOrEqualToThreshold"
  evaluation_periods  = "1"
  metric_name         = "MemoryUtilization"
  namespace           = "AWS/ECS"
  period              = "60"
  statistic           = "Average"
  threshold           = "25"

  dimensions = {
    ClusterName = aws_ecs_cluster.square_eight.name
    ServiceName = aws_ecs_service.square_eight.name
  }

  alarm_actions = [
    aws_appautoscaling_policy.square_eight-scale-in-memory.arn
  ]
}