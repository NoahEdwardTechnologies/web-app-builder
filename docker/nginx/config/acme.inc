# Allow access to the ACME Challenge for Let's Encrypt

location /.well-known/acme-challenge {
    alias /etc/nginx/acme/.well-known/acme-challenge;
}
