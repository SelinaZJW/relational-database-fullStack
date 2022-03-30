CREATE TABLE blogs ( id SERIAL PRIMARY KEY, author text, url text  NOT NULL, title text NOT NULL, likes integer  DEFAULT 0 );

INSERT INTO blogs (author, url, title, likes) VALUES ('admin', 'www.whybother.com', 'Dont Bother', 2);
insert into blogs (url, title, likes) values ('www.dontexist.com', 'it doesnt exist', 10);
insert into blogs (url, title, likes) values ('www.wonderland.com', 'happy thoughts', 9);

select * from blogs;

