#!/bin/sh
set -x
set -e
set -o errexit

MVN_VERSION=$(mvn -f back/pom.xml -q \
    -Dexec.executable="echo" \
    -Dexec.args='${project.version}' \
    --non-recursive \
    org.codehaus.mojo:exec-maven-plugin:1.3.1:exec)
sudo mv back/target/detetive-${MVN_VERSION}.jar /opt/detetive