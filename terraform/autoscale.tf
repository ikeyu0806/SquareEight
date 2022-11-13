resource "aws_appautoscaling_target" "square-eight" {
  service_namespace  = "ecs"
  resource_id        = "service/${aws_ecs_cluster.square-eight.name}/${aws_ecs_service.square-eight.name}"
  scalable_dimension = "ecs:service:DesiredCount"
  min_capacity       = 2
  max_capacity       = 1000
}

resource "aws_appautoscaling_policy" "square-eight-scale-out-cpu" {
  name               = "cpu-scale-out-square-eight-${terraform.workspace}"
  policy_type        = "StepScaling"
  service_namespace  = aws_appautoscaling_target.square-eight.service_namespace
  resource_id        = aws_appautoscaling_target.square-eight.resource_id
  scalable_dimension = aws_appautoscaling_target.square-eight.scalable_dimension

  step_scaling_policy_configuration {
    adjustment_type         = "ChangeInCapacity"
    cooldown                = 60
    metric_aggregation_type = "Average"

    step_adjustment {
      metric_interval_lower_bound = 0
      scaling_adjustment          = 1
    }
  }
}

resource "aws_appautoscaling_policy" "square-eight-scale-in-cpu" {
  name               = "cpu-scale-in-square-eight-${terraform.workspace}"
  policy_type        = "StepScaling"
  service_namespace  = aws_appautoscaling_target.square-eight.service_namespace
  resource_id        = aws_appautoscaling_target.square-eight.resource_id
  scalable_dimension = aws_appautoscaling_target.square-eight.scalable_dimension

  step_scaling_policy_configuration {
    adjustment_type         = "ChangeInCapacity"
    cooldown                = 60
    metric_aggregation_type = "Average"

    step_adjustment {
      metric_interval_upper_bound = 0
      scaling_adjustment          = -1
    }
  }
}

resource "aws_appautoscaling_policy" "square-eight-scale-out-memory" {
  name               = "memory-scale-out-square-eight-${terraform.workspace}"
  policy_type        = "StepScaling"
  service_namespace  = aws_appautoscaling_target.square-eight.service_namespace
  resource_id        = aws_appautoscaling_target.square-eight.resource_id
  scalable_dimension = aws_appautoscaling_target.square-eight.scalable_dimension

  step_scaling_policy_configuration {
    adjustment_type         = "ChangeInCapacity"
    cooldown                = 60
    metric_aggregation_type = "Average"

    step_adjustment {
      metric_interval_lower_bound = 0
      scaling_adjustment          = 1
    }
  }
}

resource "aws_appautoscaling_policy" "square-eight-scale-in-memory" {
  name               = "memory-scale-in-square-eight-${terraform.workspace}"
  policy_type        = "StepScaling"
  service_namespace  = aws_appautoscaling_target.square-eight.service_namespace
  resource_id        = aws_appautoscaling_target.square-eight.resource_id
  scalable_dimension = aws_appautoscaling_target.square-eight.scalable_dimension

  step_scaling_policy_configuration {
    adjustment_type         = "ChangeInCapacity"
    cooldown                = 60
    metric_aggregation_type = "Average"

    step_adjustment {
      metric_interval_upper_bound = 0
      scaling_adjustment          = -1
    }
  }
}
