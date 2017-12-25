include /etc/nginx/config/pagespeed.inc;

include /etc/nginx/config/brotli.inc;

upstream app {
 least_conn;
 {{range service "node.netech-app"}}server {{.Address}}:{{.Port}};
 {{else}}server 127.0.0.1:65535; # force a 502{{end}}
}

server {
  listen 80 default_server;
  listen [::]:80 default_server;

  #listen 443 ssl;
  #server_name noahedward.com;
  #server_name localhost;
  #ssl_certificate /etc/nginx/certs/nginx.crt;
  #ssl_certificate_key /etc/nginx/certs/nginx.key;

  include /etc/nginx/config/acme.inc;

  location / {
    include /etc/nginx/config/proxypass.inc;

    proxy_pass http://app;


  }
}
