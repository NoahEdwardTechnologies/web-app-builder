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

  include /etc/nginx/config/acme.inc;

  location / {
    include /etc/nginx/config/proxypass.inc;

    proxy_pass http://app;


  }
}

server {
  listen       443 ssl;
	listen       [::]:443 ssl;

  #ssl on;
  # /etc/nginx/certs/$VIRTUAL_HOST/cert.pem
  #ssl_certificate /etc/nginx/certs/localhost.crt;

  # # /etc/nginx/certs/$VIRTUAL_HOST/key.pem
  #ssl_certificate_key /etc/nginx/certs/localhost.key;
  ssl_session_timeout  1d;
	ssl_session_cache    shared:SSL:50m;
	ssl_session_tickets  off;
	ssl_protocols              TLSv1 TLSv1.1 TLSv1.2;
	ssl_prefer_server_ciphers  on;
	ssl_dhparam                /etc/nginx/certs/dhparam.pem;  #CHANGE THIS
	ssl_ciphers 'ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA256';  #generate here: https://mozilla.github.io/server-side-tls/ssl-config-generator/
	#ssl_stapling         on;
	#ssl_stapling_verify  on;

  include /etc/nginx/config/acme.inc;

  location / {
    include /etc/nginx/config/proxypass.inc;

    proxy_pass http://app;


  }
}
