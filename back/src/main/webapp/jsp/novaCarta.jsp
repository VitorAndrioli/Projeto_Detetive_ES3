<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<c:set var="contextPath" value="${pageContext.request.contextPath}" />
<!DOCTYPE html>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<script type="text/javascript"
        src="${contextPath}/webjars/jquery/2.2.4/jquery.min.js"></script>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Nova carta</title>
<head>
<link rel="stylesheet" type="text/css"
	href="${contextPath}/webjars/bootstrap/3.3.7/css/bootstrap.min.css" />

    <link rel="stylesheet" type="text/css"
           href="<c:url value="/css/cardBorder.css"/>"/>

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
			<div class="panel-heading">Nova carta</div>
			<div class="panel-body">
				<form method="POST" action="${contextPath}/deck/card" enctype="multipart/form-data" runat="server">
					<div class="form-group">
						<label for="email">Nome:</label> <input type="text"
							class="form-control" name="name" id="name">
					</div>
					<div class="form-group">
						<label for="pwd">Tipo:</label>
						<select class="form-control" name="type" id="type">
							<option value="ARM">Arma</option>
							<option value="PLACE">Lugar</option>
							<option value="SUSPECT">Suspeito</option>
						</select>
					</div>
                    Imagem da carta:<input id="imgInp"  type="file" name="photo" />


                    <div class="card flex-col flex-stretch" style="background-image: url(<c:url value="/cards/fundo.jpg"/>);">
                        <div class="name-container flex-row flex-center-b">
                            <p class="flex" id="cardName"></p>
                            <p id="cardType"></p>
                        </div>
                        <div class="photo-container flex">
                            <img id="card" width="100%" height="100%" alt="Foto da imagem" />
                        </div>
                    </div>

                    <input  type="submit" class="btn btn-primary" value="Criar" accept="image/*"/>
					<a class="btn btn-default" href="${contextPath}/themes/photo">Voltar</a>
				</form>
            </div>
		</div>
	</div>
    <script type="text/javascript" src="<c:url value="/javascript/novaCarta.js"/>">
    </script>
	<script type="text/javascript"
		src="${contextPath}/webjars/bootstrap/3.3.7/js/bootstrap.min.js"></script>
</body>
</html>