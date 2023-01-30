--------------------------------------------------------
--  Fichier créé - dimanche-janvier-15-2023   
--------------------------------------------------------


REM INSERTING into "avenants"
SET DEFINE OFF;
REM INSERTING into "avis"
SET DEFINE OFF;





REM INSERTING into "devises"
SET DEFINE OFF;
REM INSERTING into "dospieces"
SET DEFINE OFF;



REM INSERTING into "knex_migrations"
SET DEFINE OFF;
Insert into "knex_migrations" ("id","name","batch","migration_time") values ('1','20211213161356_init.js','1',to_timestamp('09/11/22 08:56:09,367000000','DD/MM/RR HH24:MI:SSXFF'));
commit;
REM INSERTING into "knex_migrations_lock"
SET DEFINE OFF;
Insert into "knex_migrations_lock" ("index","is_locked") values ('1','0');
commit;

REM INSERTING into "logs"
SET DEFINE OFF;
Insert into "logs" ("id","user_id","action","created_by","modified_by","created_at","updated_at") values ('1','1','Connection au système',null,null,null,null);
Insert into "logs" ("id","user_id","action","created_by","modified_by","created_at","updated_at") values ('2','1','Connection au système',null,null,null,null);
Insert into "logs" ("id","user_id","action","created_by","modified_by","created_at","updated_at") values ('3','1','Connection au système',null,null,null,null);
Insert into "logs" ("id","user_id","action","created_by","modified_by","created_at","updated_at") values ('4','1','Connection au système',null,null,null,null);
Insert into "logs" ("id","user_id","action","created_by","modified_by","created_at","updated_at") values ('5','1','Connection au système',null,null,null,null);
Insert into "logs" ("id","user_id","action","created_by","modified_by","created_at","updated_at") values ('6','1','Connection au système',null,null,null,null);
Insert into "logs" ("id","user_id","action","created_by","modified_by","created_at","updated_at") values ('7','1','Connection au système',null,null,null,null);
Insert into "logs" ("id","user_id","action","created_by","modified_by","created_at","updated_at") values ('22','1','Connection au système',null,null,null,null);
Insert into "logs" ("id","user_id","action","created_by","modified_by","created_at","updated_at") values ('23','1','Connection au système',null,null,null,null);
Insert into "logs" ("id","user_id","action","created_by","modified_by","created_at","updated_at") values ('21','1','Connection au système',null,null,null,null);
Insert into "logs" ("id","user_id","action","created_by","modified_by","created_at","updated_at") values ('24','1','Connection au système',null,null,null,null);
Insert into "logs" ("id","user_id","action","created_by","modified_by","created_at","updated_at") values ('25','1','Connection au système',null,null,null,null);
Insert into "logs" ("id","user_id","action","created_by","modified_by","created_at","updated_at") values ('42','1','Connection au système',null,null,null,null);
Insert into "logs" ("id","user_id","action","created_by","modified_by","created_at","updated_at") values ('43','1','Connection au système',null,null,null,null);
Insert into "logs" ("id","user_id","action","created_by","modified_by","created_at","updated_at") values ('41','1','Connection au système',null,null,null,null);
Insert into "logs" ("id","user_id","action","created_by","modified_by","created_at","updated_at") values ('44','1','Connection au système',null,null,null,null);
Insert into "logs" ("id","user_id","action","created_by","modified_by","created_at","updated_at") values ('45','1','Connection au système',null,null,null,null);
Insert into "logs" ("id","user_id","action","created_by","modified_by","created_at","updated_at") values ('46','1','Connection au système',null,null,null,null);
Insert into "logs" ("id","user_id","action","created_by","modified_by","created_at","updated_at") values ('47','1','Connection au système',null,null,null,null);
Insert into "logs" ("id","user_id","action","created_by","modified_by","created_at","updated_at") values ('61','1','Connection au système',null,null,null,null);
commit;




REM INSERTING into "ordrereprises"
SET DEFINE OFF;
REM INSERTING into "ordreservs"
SET DEFINE OFF;
Insert into "ordreservs" ("id","marche_id","ref","date_notif","date_debut","ordre","created_at","updated_at") values ('1','9',null,'2022-07-20',null,'C:\fakepath\ordre de service.pdf',to_timestamp('09/08/22 14:32:57,774000000','DD/MM/RR HH24:MI:SSXFF'),to_timestamp('09/08/22 14:32:57,774000000','DD/MM/RR HH24:MI:SSXFF'));
commit;
REM INSERTING into "ordresuspensions"
SET DEFINE OFF;
REM INSERTING into "paiements"
SET DEFINE OFF;
REM INSERTING into "pieces"
SET DEFINE OFF;



REM INSERTING into "pubavis"
SET DEFINE OFF;
REM INSERTING into "pubresultats"
SET DEFINE OFF;
REM INSERTING into "receptions"
SET DEFINE OFF;


REM INSERTING into "sites"
SET DEFINE OFF;



REM INSERTING into "ventefrs"
SET DEFINE OFF;

