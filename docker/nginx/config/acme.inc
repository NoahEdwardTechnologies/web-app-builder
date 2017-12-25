# Allow access to the ACME Challenge for Let's Encrypt
#location ^~ /.well-known/acme-challenge {
#    allow all;
#    alias /var/www/acme;
#}
location /.well-known/acme-challenge {
    proxy_pass http://169.254.1.1:1086;
}
