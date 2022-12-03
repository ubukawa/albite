##############
# This is for raspberry pi implementation (not for CentOS/RHEL)
# This is a subset of the tools installed by https://github.com/unvt/equinox/blob/master/install.sh with my server repository 
##############
cd $HOME
sudo apt update
sudo apt -y upgrade
curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | gpg --dearmor | sudo tee /usr/share/keyrings/yarnkey.gpg > /dev/null
echo "deb [signed-by=/usr/share/keyrings/yarnkey.gpg] https://dl.yarnpkg.com/debian stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt update
sudo apt install -y autoconf automake cmake code git gpsd gpsd-clients gpsd-tools libsqlite3-dev libtool raspberrypi-kernel-headers nodejs parallel sqlite3 tmux unar vim xrdp yarn zip #gdal-bin nginx pdal ruby 
sudo service xrdp restart
sudo yarn global add browserify hjson pm2 rollup @mapbox/mapbox-gl-style-spec @pushcorn/hocon-parser @unvt/charites
git clone https://github.com/ubukawa/albite
cd albite; npm install; cd ..