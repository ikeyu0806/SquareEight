resource "aws_appautoscaling_target" "square_eight" {
  service_namespace  = "ecs"
  resource_id        = "service/${aws_ecs_cluster.square_eight.name}/${aws_ecs_service.square_eight.name}"
  scalable_dimension = "ecs:service:DesiredCount"
  min_capacity       = 2
  max_capacity       = 100
}

resource "aws_appautoscaling_policy" "square_eight-scale-out-cpu" {
  name               = "cpu-scale-out-square_eight-${terraform.workspace}"
  policy_type        = "StepScaling"
  service_namespace  = aws_appautoscaling_target.square_eight.service_namespace
  resource_id        = aws_appautoscaling_target.square_eight.resource_id
  scalable_dimension = aws_appautoscaling_target.square_eight.scalable_dimension

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

resource "aws_appautoscaling_policy" "square_eight-scale-in-cpu" {
  name               = "cpu-scale-in-square_eight-${terraform.workspace}"
  policy_type        = "StepScaling"
  service_namespace  = aws_appautoscaling_target.square_eight.service_namespace
  resource_id        = aws_appautoscaling_target.square_eight.resource_id
  scalable_dimension = aws_appautoscaling_target.square_eight.scalable_dimension

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

resource "aws_appautoscaling_policy" "square_eight-scale-out-memory" {
  name               = "memory-scale-out-square_eight-${terraform.workspace}"
  policy_type        = "StepScaling"
  service_namespace  = aws_appautoscaling_target.square_eight.service_namespace
  resource_id        = aws_appautoscaling_target.square_eight.resource_id
  scalable_dimension = aws_appautoscaling_target.square_eight.scalable_dimension

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

resource "aws_appautoscaling_policy" "square_eight-scale-in-memory" {
  name               = "memory-scale-in-square_eight-${terraform.workspace}"
  policy_type        = "StepScaling"
  service_namespace  = aws_appautoscaling_target.square_eight.service_namespace
  resource_id        = aws_appautoscaling_target.square_eight.resource_id
  scalable_dimension = aws_appautoscaling_target.square_eight.scalable_dimension

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
