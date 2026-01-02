This terraform folder contains a minimal starter. Replace with your cloud provider modules.

Suggested modules to add for pilot:
- aws_vpc, aws_rds (Postgres), aws_s3, aws_elasticache (Redis), ecs or lambda for workers
- or use managed providers (Supabase, Neon, Vercel) with their providers

Run:
  terraform init
  terraform plan
  terraform apply
