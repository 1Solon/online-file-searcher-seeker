# online-file-searcher-seeker
An Online File searcher, called Seeker, made by Nicolas, Abraham and Saul for our Web Development group project

# Building the image
docker build -t seeker:dev .

# Running the container
docker run -it --rm -v ${PWD}:/app -v /app/node_modules -p 3001:3000 -e CHOKIDAR_USEPOLLING=true seeker:dev