# Wildfly
FROM jboss/wildfly:14.0.1.Final
ADD Tadeot.war /opt/jboss/wildfly/standalone/deployments/
COPY postgresql-42.2.12.jar /opt/jboss/wildfly/modules/system/layers/base/org/postgresql/main
COPY module.xml /opt/jboss/wildfly/modules/system/layers/base/org/postgresql/main
COPY standalone.xml /opt/jboss/wildfly/standalone/configuration/
CMD ["/opt/jboss/wildfly/bin/standalone.sh", "-b", "0.0.0.0"]

# NGINX
FROM nginx:1.17.8
RUN rm /usr/share/nginx/html/index.html
ADD Application/ /usr/share/nginx/html

# Use latest jboss/base-jdk:11 image as the base
# FROM jboss/base-jdk:11

# # Set the WILDFLY_VERSION env variable
# ENV WILDFLY_VERSION 14.0.1.Final
# ENV WILDFLY_SHA1 0d47c0e8054353f3e2749c11214eab5bc7d78a14
# ENV JBOSS_HOME /opt/jboss/wildfly

# USER root

# # Add the WildFly distribution to /opt, and make wildfly the owner of the extracted tar content
# # Make sure the distribution is available from a well-known place
# RUN cd $HOME \
#     && curl -O https://download.jboss.org/wildfly/$WILDFLY_VERSION/wildfly-$WILDFLY_VERSION.tar.gz \
#     && sha1sum wildfly-$WILDFLY_VERSION.tar.gz | grep $WILDFLY_SHA1 \
#     && tar xf wildfly-$WILDFLY_VERSION.tar.gz \
#     && mv $HOME/wildfly-$WILDFLY_VERSION $JBOSS_HOME \
#     && rm wildfly-$WILDFLY_VERSION.tar.gz \
#     && chown -R jboss:0 ${JBOSS_HOME} \
#     && chmod -R g+rw ${JBOSS_HOME}

# # Ensure signals are forwarded to the JVM process correctly for graceful shutdown
# ENV LAUNCH_JBOSS_IN_BACKGROUND true

# USER jboss


# #Tripic Nenad
# ADD Elternsprechtag.war $JBOSS_HOME/standalone/deployments/
# RUN mkdir -p $JBOSS_HOME/modules/org/postgres/main
# COPY postgresql-42.2.12.jar $JBOSS_HOME/modules/org/postgres/main/
# COPY module.xml $JBOSS_HOME/modules/org/postgres/main/
# COPY standalone.xml $JBOSS_HOME/standalone/configuration
# # COPY postgresql-42.2.12.jar /opt/jboss/wildfly/modules/system/layers/base/org/postgresql/main
# # COPY module.xml /opt/jboss/wildfly/modules/system/layers/base/org/postgresql/main
# # COPY standalone.xml /opt/jboss/wildfly/standalone/configuration/

# # Expose the ports we're interested in
# EXPOSE 8080

# # Set the default command to run on boot
# # This will boot WildFly in the standalone mode and bind to all interface
# CMD ["/opt/jboss/wildfly/bin/standalone.sh", "-b", "0.0.0.0"]