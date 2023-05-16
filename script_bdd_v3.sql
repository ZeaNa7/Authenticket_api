CREATE TABLE "User" (
    "id_user" int  NOT NULL,
    "first_name" varchar(50),
    "last_name" varchar(50),
    "pseudo" varchar(50),
    "mail" varchar(100),
    "password" varchar(255) NOT NULL,
    "is_registered" boolean NOT NULL,
    "is_connected" boolean NOT NULL,
    CONSTRAINT "pk_User" PRIMARY KEY ("id_user")
);

CREATE TABLE "Event" (
    "id_event" int  NOT NULL,
    "name" varchar(50) NOT NULL,
    "location" varchar(50) NOT NULL,
    "date" timestamp NOT NULL,
    "deletion_date" timestamp NOT NULL,
    "is_deleted" boolean NOT NULL,
    CONSTRAINT "pk_Event" PRIMARY KEY ("id_event")
);

CREATE TABLE "Pool_ticket" (
    "num_ticket" varchar(255) NOT NULL,
    "id_pool_ticket" int NOT NULL,
    "id_event" int NOT NULL,
    CONSTRAINT "pk_Pool_ticket" PRIMARY KEY ("id_pool_ticket"),
    CONSTRAINT "fk_Pool_ticket_id_event" FOREIGN KEY ("id_event") REFERENCES "Event" ("id_event")
);

CREATE TABLE "Favorite" (
    "id_user" int NOT NULL,
    "id_event" int NOT NULL,
    "date_saved" timestamp NOT NULL,
    CONSTRAINT "pk_Favorite" PRIMARY KEY ("id_user","id_event"),
    CONSTRAINT "fk_Favorite_id_user" FOREIGN KEY ("id_user") REFERENCES "User" ("id_user"),
    CONSTRAINT "fk_Favorite_id_event" FOREIGN KEY ("id_event") REFERENCES "Event" ("id_event")
);

CREATE TABLE "Check" (
    "id_user" int NOT NULL,
    "id_pool_ticket" int NOT NULL,
    "date_checked" timestamp NOT NULL,
    "is_valid" boolean NOT NULL,
    CONSTRAINT "pk_Check" PRIMARY KEY ("id_user","id_pool_ticket"),
    CONSTRAINT "fk_Check_id_user" FOREIGN KEY ("id_user") REFERENCES "User" ("id_user"),
    CONSTRAINT "fk_Check_id_pool_ticket" FOREIGN KEY ("id_pool_ticket") REFERENCES "Pool_ticket" ("id_pool_ticket")
);

CREATE TABLE "Api_promoter" (
    "id_promoter" int NOT NULL,
    "url_api" varchar(255) NOT NULL,
    "identifiant" varchar(255) NOT NULL,
    "password" varchar(255) NOT NULL,
    "token" varchar(255) NOT NULL,
    CONSTRAINT "pk_Api_promoter" PRIMARY KEY ("id_promoter")
);
