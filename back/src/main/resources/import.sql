insert into user(username,password)values('admin','$2a$10$03iExxmcRLXi7ePVt2QCE.FJkrekpo3CZX4KHLBkIV/ym9b6F3KKS');
insert into role(name) values('ADMIN');
insert into users_roles (user_id,role_id) values(1,1);