<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<c:set var="contextPath" value="${pageContext.request.contextPath}" />
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Login</title>
<head>
<link rel="stylesheet" type="text/css"
	href="${contextPath}/webjars/bootstrap/3.3.7/css/bootstrap.min.css" />
</head>
<body>
	<div
		class="container col-xs-12 col-sm-offset-2 col-sm-8 col-md-offset-3 col-md-6 col-lg-offset-4 col-lg-4">
		<br />
		<div class="panel panel-default">
			<div class="panel-heading">
				<h1 align="center">BackOffice</h1>
			</div>
			<div class="panel-body">
				<form method="POST" action="${contextPath}/login">
					<c:if test="${not empty message}">
						<div class="alert alert-success">${message}</div>
					</c:if>
					<c:if test="${not empty error}">
						<div class="alert alert-danger">${error}</div>
					</c:if>
					<div class="form-group">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-user" style="width: auto"></i>
							</span> <input id="txtUsuario" runat="server" type="text"
								class="form-control" name="username" placeholder="Usuário"
								required />
						</div>
					</div>
					<div class="form-group">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-lock" style="width: auto"></i>
							</span> <input id="txtSenha" runat="server" type="password"
								class="form-control" name="password" placeholder="Senha"
								required />
						</div>
					</div>
					<button id="btnLogin" runat="server" class="btn btn-default"
						style="width: 100%">
						Login<i class="glyphicon glyphicon-log-in"></i>
					</button>
				</form>
			</div>
		</div>
	</div>

	<script type="text/javascript" src="${contextPath}/webjars/jquery/2.2.4/jquery.min.js"></script>
	<script type="text/javascript"
		src="${contextPath}/webjars/bootstrap/3.3.7/js/bootstrap.min.js"></script>
</body>
</html>