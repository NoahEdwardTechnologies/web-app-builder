#!/bin/sh

set -e

service="$1"
n="$2"
s="$3"
shift 3
cmd="$@"

echo "service is ${service}"
echo "cmd is ${cmd}"
echo "n is ${n}"

echo "sleeping for 60";
# sleep 60s;
echo "done sleeping";

while [ $n -gt 0 ];
do
  ping -c1 $service > /dev/null && exec $cmd && exit 0 || echo "restarting ping for ${service}, n is ${n}";
  let n=n-1;
  sleep $s;
done

exit 1
