CREATE TABLE pieces (
	"id" serial primary key, --serial: auto-increments with each addition. removing rows does not decrement following serials. primary key: combination of 'not null' and 'unique' constraints
	"composer" varchar(255) not null,
	"url" varchar(255), --varchar(80): string with variable length, up to a max of 80
	"title" varchar(255) not null,
	"date" integer,
	"text_author" varchar(1000),
	"duration" integer,
	"difficulty" integer,
	"voicing" varchar(255),
	"soloists" varchar(255),
	"instruments" varchar(255),
	"language" varchar(255),
	"link_to_piece" varchar(1000),
	"sample_performance" varchar(255)
);

