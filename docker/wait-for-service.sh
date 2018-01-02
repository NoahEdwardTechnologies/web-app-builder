#!/bin/sh

set -e

service="$1"
n="$2"
s="$3"
shift 3
cmd="$@"

# echo "service is ${service}"
# echo "cmd is ${cmd}"
# echo "n is ${n}"

# curl --help
# wget --help

echo "sleeping for 60";
echo "done sleeping";


# different ways to get leader ip
# curl http://169.254.1.1:8500/v1/status/leader
# wget -s consul.service.consul:8500/v1/status/leader
# wget -s consul.service.consul:8500/v1/operator/raft/configuration?stale=true

while [ $n -gt 0 ];
do
  $service > /dev/null && exec $cmd && exit 0 || echo "failed: restarting health check, n is ${n}";
  let n=n-1;
  sleep $s;
done

exit 1
