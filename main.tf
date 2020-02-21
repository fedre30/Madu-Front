variable "key_path" {
  default = "~/.ssh/keyAWS.pub"
}

provider "aws" {
  profile    = "default"
  region     = "eu-west-3"
}

resource "aws_key_pair" "madu" {
  key_name      = "madu"
  public_key    = file(var.key_path)
}

resource "aws_instance" "madu" {
  key_name      = aws_key_pair.madu.key_name
  ami           = "ami-096b8af6e7e8fb927"
  instance_type = "t2.micro"
  security_groups = ["${aws_security_group.web_group_security.name}"]

  provisioner "local-exec" {
    command     = "echo \"[myserver]\n${aws_instance.madu.public_ip} ansible_user=ubuntu\" > ./ansible/inventory/hosts"
  }
}

resource "aws_security_group" "web_group_security" {
  name        = "madu_security_group"
  description = "security group for the project Madu"

  ingress {
    from_port = 22
    to_port = 22
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    from_port = 8080
    to_port = 8080
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  egress {
    from_port = 0
    to_port = 65535
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}