docker stop blumen
docker container rm blumen

volume=$GHOST_CONTENT_LOCAL_PATH/prod:/var/lib/ghost/content

config="su-exec node ghost config storage.cloudinary-store.cloud_name '$CLOUDINARY_CLOUD_NAME';\
    su-exec node ghost config storage.cloudinary-store.api_key '$CLOUDINARY_API_KEY';\
    su-exec node ghost config storage.cloudinary-store.api_secret '$CLOUDINARY_API_SECRET';\
    node current/index.js";

lt --port 3001 --subdomain gridsome-starter-blumen &
docker run --name blumen -p 3001:2368 -e url=https://gridsome-starter-blumen.localtunnel.me -v "$volume" emilol/docker-ghost-cloudinary bash -c "$config"
