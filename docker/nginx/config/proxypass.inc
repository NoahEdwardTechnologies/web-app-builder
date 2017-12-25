proxy_redirect     off;
proxy_set_header   Host $host;
proxy_set_header   X-Forwarded-By       $server_addr:$server_port;
proxy_set_header   X-Forwarded-For      $remote_addr;
proxy_set_header   X-Forwarded-Host $server_name;
proxy_set_header   X-Forwarded-Proto    $scheme;
proxy_set_header   X-Real-IP $remote_addr;
