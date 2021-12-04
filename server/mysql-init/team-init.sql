CREATE DATABASE IF NOT EXISTS team;
USE team;
CREATE TABLE IF NOT EXISTS members (
    id          int unsigned NOT NULL,
    name        varchar(100),
    pic         varchar(200),
    github      varchar(200),
    linkedin    varchar(200)
);
INSERT IGNORE INTO members (id) VALUES (1), (2), (3), (4);
UPDATE members SET name='Dillon Vu',
                   pic='https://i.ibb.co/2hYPR7D/Dillon.jpg',
                   github='https://github.com/eroscupid88',
                   linkedin='https://www.linkedin.com/in/dillon-vu/'
WHERE id=1;
UPDATE members SET name='Lucius Ho',
                   pic='https://i.ibb.co/17rQLM5/Lucius.jpg',
                   github='https://github.com/lucius-95',
                   linkedin='https://www.linkedin.com/in/lucius-ho/'
WHERE id=2;
UPDATE members SET name='Kyle Holtby',
                   pic='https://i.ibb.co/kKZnVxs/Kyle.jpg',
                   github='https://github.com/KyleHoltby',
                   linkedin='https://www.linkedin.com/in/kyle-holtby-7aa152195/'
WHERE id=3;
UPDATE members SET name='Hasin Raihan',
                   pic='https://i.ibb.co/YPfJyMS/Hasin.jpg',
                   github='https://github.com/hasinraihan55',
                   linkedin='https://www.linkedin.com/in/hasin-raihan-09b37b1b8/'
WHERE id=4;

ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'project';
FLUSH PRIVILEGES;