FROM alpine:3.4

# https://github.com/We-Amp/ngx-pagespeed-alpine
# (mainline) https://github.com/nginxinc/docker-nginx
# https://github.com/Angristan/nginx-autoinstall

ENV HEADERMOD_VER 0.33
#ENV LIBRESSL_VER 2.6.3
ENV NGINX_VERSION 1.13.7
ENV NPS_VER 1.12.34.3
ENV NGX_BROTLI_COMMIT bfd2885b2da4d763fed18f49216bb935223cd34b

RUN set -x && \
  apk --no-cache --update add \
    apr \
    apr-util \
    ca-certificates \
    icu \
    icu-libs \
    libjpeg-turbo \
    libuuid \
    openssl \
    pcre \
    zlib \
  && apk --no-cache --update add --virtual .build-deps \
		automake \
		cmake \
		g++ \
		git \
		libtool \
    apache2-dev \
    apr-dev \
    apr-util-dev \
    autoconf \
    build-base \
    ca-certificates \
    curl \
    gcc \
    gd-dev \
    geoip-dev \
    gnupg \
    gperf \
    icu-dev \
    libc-dev \
    libjpeg-turbo-dev \
    libxslt-dev \
    linux-headers \
    make \
    openssl-dev \
    pcre-dev \
    perl-dev \
    python \
    wget \
    zlib-dev \
  && CONFIG="\
		--conf-path=/etc/nginx/nginx.conf \
		--error-log-path=/var/log/nginx/error.log \
		--group=nginx \
		--http-client-body-temp-path=/var/cache/nginx/client_temp \
		--http-fastcgi-temp-path=/var/cache/nginx/fastcgi_temp \
		--http-log-path=/var/log/nginx/access.log \
		--http-proxy-temp-path=/var/cache/nginx/proxy_temp \
		--http-scgi-temp-path=/var/cache/nginx/scgi_temp \
		--http-uwsgi-temp-path=/var/cache/nginx/uwsgi_temp \
		--lock-path=/var/run/nginx.lock \
		--modules-path=/usr/lib/nginx/modules \
		--pid-path=/var/run/nginx.pid \
		--prefix=/etc/nginx \
		--sbin-path=/usr/sbin/nginx \
		--user=nginx \
		--with-compat \
		--with-file-aio \
		--with-http_addition_module \
		--with-http_auth_request_module \
		--with-http_dav_module \
		--with-http_flv_module \
		--with-http_geoip_module=dynamic \
		--with-http_gunzip_module \
		--with-http_gzip_static_module \
		--with-http_image_filter_module=dynamic \
		--with-http_mp4_module \
		--with-http_random_index_module \
		--with-http_realip_module \
		--with-http_secure_link_module \
		--with-http_slice_module \
		--with-http_ssl_module \
		--with-http_stub_status_module \
		--with-http_sub_module \
		--with-http_v2_module \
		--with-http_xslt_module=dynamic \
		--with-mail \
		--with-mail_ssl_module \
		--with-stream \
		--with-stream_geoip_module=dynamic \
		--with-stream_realip_module \
		--with-stream_ssl_module \
		--with-stream_ssl_preread_module \
    --with-ipv6 \
    --with-threads \
    --without-http_autoindex_module \
    --without-http_browser_module \
    --without-http_geo_module \
    --without-http_memcached_module \
    --without-http_referer_module \
    --without-http_scgi_module \
    --without-http_split_clients_module \
    --without-http_upstream_ip_hash_module \
    --without-http_userid_module \
    --without-http_uwsgi_module \
    --without-mail_imap_module \
    --without-mail_pop3_module \
    --without-mail_smtp_module \
    --add-module=/usr/src/ngx_brotli \
                --with-cc-opt=-Wno-error \
	" \
	&& addgroup -S nginx \
	&& adduser -D -S -h /var/cache/nginx -s /sbin/nologin -G nginx nginx \
	&& curl -fSL http://nginx.org/download/nginx-$NGINX_VERSION.tar.gz -o nginx.tar.gz \
	&& curl -fSL http://nginx.org/download/nginx-$NGINX_VERSION.tar.gz.asc  -o nginx.tar.gz.asc \
	&& export GNUPGHOME="$(mktemp -d)" \
	&& rm -r "$GNUPGHOME" nginx.tar.gz.asc \
	&& mkdir -p /usr/src \
	&& tar -zxC /usr/src -f nginx.tar.gz \
	&& rm nginx.tar.gz \
  && cd /usr/src \
  && curl -L https://github.com/openresty/headers-more-nginx-module/archive/v${HEADERMOD_VER}.tar.gz | tar -xz \
  && LIBPNG_VERSION=1.2.59 && \
  cd /tmp && \
  curl -L http://prdownloads.sourceforge.net/libpng/libpng-${LIBPNG_VERSION}.tar.gz | tar -zx && \
  cd /tmp/libpng-${LIBPNG_VERSION} && \
  ./configure --build=$CBUILD --host=$CHOST --prefix=/usr --enable-shared --with-libpng-compat && \
  make install V=0 && \
  PAGESPEED_VERSION=1.12.34.3 && \
    NGX_PAGESPEED_VERSION=1.12.34.3 && \
    cd /tmp && \
    curl -L https://github.com/We-Amp/ngx-pagespeed-alpine/blob/master/mod-pagespeed-beta-1.12.34.3.tar.bz2?raw=true | tar -jx && \
    curl -L https://github.com/pagespeed/ngx_pagespeed/archive/v${NGX_PAGESPEED_VERSION}-stable.tar.gz | tar -zx && \
    cd /tmp/modpagespeed-${PAGESPEED_VERSION} && \
    curl -L https://raw.githubusercontent.com/We-Amp/ngx-pagespeed-alpine/master/patches/automatic_makefile.patch | patch -p1 && \
    curl -L https://raw.githubusercontent.com/We-Amp/ngx-pagespeed-alpine/master/patches/libpng_cflags.patch | patch -p1 && \
    curl -L https://raw.githubusercontent.com/We-Amp/ngx-pagespeed-alpine/master/patches/pthread_nonrecursive_np.patch | patch -p1 && \
    curl -L https://raw.githubusercontent.com/We-Amp/ngx-pagespeed-alpine/master/patches/rename_c_symbols.patch | patch -p1 && \
    curl -L https://raw.githubusercontent.com/We-Amp/ngx-pagespeed-alpine/master/patches/stack_trace_posix.patch | patch -p1 && \
    ./generate.sh -D use_system_libs=1 -D _GLIBCXX_USE_CXX11_ABI=0 -D use_system_icu=1 && \
    cd /tmp/modpagespeed-${PAGESPEED_VERSION}/src && \
    make BUILDTYPE=Release CXXFLAGS=" -I/usr/include/apr-1 -I/tmp/libpng-${LIBPNG_VERSION} -fPIC -D_GLIBCXX_USE_CXX11_ABI=0" CFLAGS=" -I/usr/include/apr-1 -I/tmp/libpng-${LIBPNG_VERSION} -fPIC -D_GLIBCXX_USE_CXX11_ABI=0" -j4 && \
    cd /tmp/modpagespeed-${PAGESPEED_VERSION}/src/pagespeed/automatic/ && \
    make psol BUILDTYPE=Release CXXFLAGS=" -I/usr/include/apr-1 -I/tmp/libpng-${LIBPNG_VERSION} -fPIC -D_GLIBCXX_USE_CXX11_ABI=0" CFLAGS=" -I/usr/include/apr-1 -I/tmp/libpng-${LIBPNG_VERSION} -fPIC -D_GLIBCXX_USE_CXX11_ABI=0" && \
    mkdir -p /tmp/ngx_pagespeed-${NGX_PAGESPEED_VERSION}-stable/psol && \
    mkdir -p /tmp/ngx_pagespeed-${NGX_PAGESPEED_VERSION}-stable/psol/lib/Release/linux/x64 && \
    mkdir -p /tmp/ngx_pagespeed-${NGX_PAGESPEED_VERSION}-stable/psol/include/out/Release && \
    cp -r /tmp/modpagespeed-${PAGESPEED_VERSION}/src/out/Release/obj /tmp/ngx_pagespeed-${NGX_PAGESPEED_VERSION}-stable/psol/include/out/Release/ && \
    cp -r /tmp/modpagespeed-${PAGESPEED_VERSION}/src/net /tmp/ngx_pagespeed-${NGX_PAGESPEED_VERSION}-stable/psol/include/ && \
    cp -r /tmp/modpagespeed-${PAGESPEED_VERSION}/src/testing /tmp/ngx_pagespeed-${NGX_PAGESPEED_VERSION}-stable/psol/include/ && \
    cp -r /tmp/modpagespeed-${PAGESPEED_VERSION}/src/pagespeed /tmp/ngx_pagespeed-${NGX_PAGESPEED_VERSION}-stable/psol/include/ && \
    cp -r /tmp/modpagespeed-${PAGESPEED_VERSION}/src/third_party /tmp/ngx_pagespeed-${NGX_PAGESPEED_VERSION}-stable/psol/include/ && \
    cp -r /tmp/modpagespeed-${PAGESPEED_VERSION}/src/tools /tmp/ngx_pagespeed-${NGX_PAGESPEED_VERSION}-stable/psol/include/ && \
    cp -r /tmp/modpagespeed-${PAGESPEED_VERSION}/src/pagespeed/automatic/pagespeed_automatic.a /tmp/ngx_pagespeed-${NGX_PAGESPEED_VERSION}-stable/psol/lib/Release/linux/x64 && \
    cp -r /tmp/modpagespeed-${PAGESPEED_VERSION}/src/url /tmp/ngx_pagespeed-${NGX_PAGESPEED_VERSION}-stable/psol/include/ \
    && cd /usr/src \
  	&& git clone --recursive https://github.com/google/ngx_brotli.git \
  	&& cd ngx_brotli \
  	&& git checkout -b $NGX_BROTLI_COMMIT $NGX_BROTLI_COMMIT \
  	&& cd /usr/src/nginx-$NGINX_VERSION \
  	&& LD_LIBRARY_PATH=/tmp/modpagespeed-${PAGESPEED_VERSION}/usr/lib ./configure $CONFIG \
    --add-module=/tmp/ngx_pagespeed-${NGX_PAGESPEED_VERSION}-stable \
    --with-cc-opt="-fPIC -I /usr/include/apr-1" \
    --with-ld-opt="-luuid -lapr-1 -laprutil-1 -licudata -licuuc -L/tmp/modpagespeed-${PAGESPEED_VERSION}/usr/lib -lpng12 -lturbojpeg -ljpeg" \
    --add-module=/usr/src/headers-more-nginx-module-${HEADERMOD_VER} \
    --with-debug \
  	&& make -j$(getconf _NPROCESSORS_ONLN) \
  	&& mv objs/nginx objs/nginx-debug \
  	&& mv objs/ngx_http_xslt_filter_module.so objs/ngx_http_xslt_filter_module-debug.so \
  	&& mv objs/ngx_http_image_filter_module.so objs/ngx_http_image_filter_module-debug.so \
  	&& mv objs/ngx_http_geoip_module.so objs/ngx_http_geoip_module-debug.so \
  	&& mv objs/ngx_stream_geoip_module.so objs/ngx_stream_geoip_module-debug.so \
  	&& LD_LIBRARY_PATH=/tmp/modpagespeed-${PAGESPEED_VERSION}/usr/lib ./configure $CONFIG \
    --add-module=/tmp/ngx_pagespeed-${NGX_PAGESPEED_VERSION}-stable \
    --with-cc-opt="-fPIC -I /usr/include/apr-1" \
    --with-ld-opt="-luuid -lapr-1 -laprutil-1 -licudata -licuuc -L/tmp/modpagespeed-${PAGESPEED_VERSION}/usr/lib -lpng12 -lturbojpeg -ljpeg" \
    --add-module=/usr/src/headers-more-nginx-module-${HEADERMOD_VER} \
  	&& make -j$(getconf _NPROCESSORS_ONLN) \
  	&& make install \
  	&& rm -rf /etc/nginx/html/ \
  	&& mkdir -p /etc/nginx/conf.d/ \
  	&& mkdir -p /usr/share/nginx/html/ \
  	&& install -m644 html/index.html /usr/share/nginx/html/ \
  	&& install -m644 html/50x.html /usr/share/nginx/html/ \
  	&& install -m755 objs/nginx-debug /usr/sbin/nginx-debug \
  	&& install -m755 objs/ngx_http_xslt_filter_module-debug.so /usr/lib/nginx/modules/ngx_http_xslt_filter_module-debug.so \
  	&& install -m755 objs/ngx_http_image_filter_module-debug.so /usr/lib/nginx/modules/ngx_http_image_filter_module-debug.so \
  	&& install -m755 objs/ngx_http_geoip_module-debug.so /usr/lib/nginx/modules/ngx_http_geoip_module-debug.so \
  	&& install -m755 objs/ngx_stream_geoip_module-debug.so /usr/lib/nginx/modules/ngx_stream_geoip_module-debug.so \
  	&& ln -s ../../usr/lib/nginx/modules /etc/nginx/modules \
  	&& strip /usr/sbin/nginx* \
  	&& strip /usr/lib/nginx/modules/*.so \
  	&& rm -rf /usr/src/nginx-$NGINX_VERSION \
    && rm -rf /usr/src/ngx_brotli \
  	&& apk del .build-deps \
  	# forward request and error logs to docker log collector
  	&& ln -sf /dev/stdout /var/log/nginx/access.log \
  	&& ln -sf /dev/stderr /var/log/nginx/error.log && \
    rm -rf /tmp/* && \
    rm -rf /var/cache/apk/* && \
    mkdir -p /var/cache/nginx/pagespeed_temp && \
    chown nginx:nginx /var/cache/nginx/pagespeed_temp

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80 443

STOPSIGNAL SIGTERM

CMD ["nginx", "-g", "daemon off;"]
