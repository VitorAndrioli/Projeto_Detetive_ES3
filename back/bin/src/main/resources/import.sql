insert into user(username,password)values('admin','$2a$10$03iExxmcRLXi7ePVt2QCE.FJkrekpo3CZX4KHLBkIV/ym9b6F3KKS');/*Usuario:admin Senha:1234*/
insert into role(name)values('admin');
insert into user_role(user_id,role_id)values(1,1);