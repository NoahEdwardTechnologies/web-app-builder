template {
  source = "/consul-template/templates/nginx/app.tpl"
  destination = "/etc/nginx/conf.d/app.conf"
  create_dest_dirs = true
  backup = true
  command = "curl -X POST http://169.254.1.1:2375/containers/netech_nginx/kill -d signal=HUP"
}
