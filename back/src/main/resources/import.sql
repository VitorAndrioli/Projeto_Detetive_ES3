insert into user_profile(id,username,password,token)values(1,'admin','$2a$10$03iExxmcRLXi7ePVt2QCE.FJkrekpo3CZX4KHLBkIV/ym9b6F3KKS','$2a$10$RUn.Z.n4PSn2qd9WBVRzBuciuTPOVzjjwwU8DHZHuB6hFJJkXqbNW');
insert into role(id,name) values(1,'ADMIN');
insert into users_roles (user_id,role_id) values(1,1);