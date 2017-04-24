<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<c:set var="contextPath" value="${pageContext.request.contextPath}" />
<!DOCTYPE html>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Themes</title>
<head>
<link rel="stylesheet" type="text/css"
	href="${contextPath}/webjars/bootstrap/3.3.7/css/bootstrap.min.css" />
</head>
<body>
	<form id="logoutForm" method="POST" action="${contextPath}/logout">
	</form>

	<nav class="navbar navbar-inverse">
		<div class="container-fluid">
			<div class="navbar-header">
				<a class="navbar-brand" href="#">Backoffice</a>
			</div>
			<ul class="nav navbar-nav navbar-right">
				<li><a onclick="document.forms['logoutForm'].submit()">Logout</a></li>
			</ul>
		</div>
	</nav>

	<div class="col-xs-12 col-sm-8 col-sm-offset-2 col-xs-offset-2">
		<div class="panel panel-default">
			<div class="panel-heading">Cartas</div>
			<table class="table">
				<thead>
					<tr>
						<th>ID</th>
						<th>Nome</th>
						<th>Tipo</th>
						<th>#</th>
					</tr>
				</thead>
				<tbody>
					<c:if test="${not empty cards}">
						<c:forEach var="card" items="#{cards}">
							<tr>
								<td>${card.id}</td>
								<td>${card.name}</td>
								<td>${card.cardType.type}</td>
								<td><a class="glyphicon glyphicon-pencil" href="${contextPath}/deck/card/${card.id}"></a><a
									class="glyphicon glyphicon-remove"
									href="${contextPath}/deck/card/remove/${card.id}"></a></td>
							</tr>
						</c:forEach>
					</c:if>
				</tbody>
			</table>
		</div>
		<a class="btn btn-primary" href="${contextPath}/novaCarta">Novo</a> <a
			class="btn btn-default" href="${contextPath}/themes">Voltar</a>
	</div>

	<script type="text/javascript"
		src="${contextPath}/webjars/jquery/2.2.4/jquery.min.js"></script>
	<script type="text/javascript"
		src="${contextPath}/webjars/bootstrap/3.3.7/js/bootstrap.min.js"></script>
</body>
</html>