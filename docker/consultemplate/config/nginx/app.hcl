template {
  source = "/consul-template/templates/nginx/app.tpl"
  destination = "/consul-template/data/nginx/app.conf"
  create_dest_dirs = true
  backup = true
  command = "echo done writing file; ls /consul-template/data/nginx"
}
