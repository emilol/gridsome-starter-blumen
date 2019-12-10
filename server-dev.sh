docker stop blumen-dev
docker container rm blumen-dev

volume=$GHOST_CONTENT_LOCAL_PATH/dev:/var/lib/ghost/content

config="su-exec node ghost config storage.cloudinary-store.cloud_name '$CLOUDINARY_CLOUD_NAME';\
    su-exec node ghost config storage.cloudinary-store.api_key '$CLOUDINARY_API_KEY';\
    su-exec node ghost config storage.cloudinary-store.api_secret '$CLOUDINARY_API_SECRET';\
    node current/index.js";

docker run --name blumen-dev -p 2368:2368 -v "$volume" emilol/docker-ghost-cloudinary bash -c "$config"
