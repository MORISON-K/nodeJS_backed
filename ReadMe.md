
# Add this to enable nodemon

# Prisma init
npx prisma init

# add prisma client
npm i @prisma/client

# migrations
 npx prisma migrate dev --name add_users_table

 # Generate types for each table you make
 npx prisma generate