terraform {
  required_providers {
    null = {
      source  = "hashicorp/null"
      version = "~> 3.1"
    }
  }
}

provider "null" {}

# Starter: create a resource group / placeholders for pilot infra.
# This file is intentionally minimal; adapt for your cloud provider (AWS/Azure/GCP).

resource "null_resource" "pilot_placeholder" {
  provisioner "local-exec" {
    command = "echo 'Terraform starter - replace with cloud resources'"
  }
}
