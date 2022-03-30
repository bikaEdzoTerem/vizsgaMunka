<html lang="hu">
    <head>
        <meta charset="UTF-8" />
        <meta name="description" content="RecepciosOldal" />
        <meta name="author" content="Bogdán Gábor" />
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="../js/ajax.js"></script>
        <script src="../js/szekreny.js"></script>
        <script src="../js/szekrenyek.js"></script>
        <script src="../js/recepcio.js"></script>
        <script src="../js/szemely.js"></script>
        @yield('css')
        <link href="../css/RecepcioCss/header.css" rel="stylesheet" type="text/css" />
        <link href="../css/RecepcioCss/szemelyMegjelenites.css" rel="stylesheet" type="text/css" />
        <link href="../css/RecepcioCss/section.css" rel="stylesheet" type="text/css" />
        <link href="../css/RecepcioCss/article.css" rel="stylesheet" type="text/css" />
        <link href="../css/RecepcioCss/alert.css" rel="stylesheet" type="text/css" />
        <link href="../css/RecepcioCss/html.css" rel="stylesheet" type="text/css" />
        <title>Recepcios Felület</title>
    </head>
    <body>
        @yield('content')
    </body>
</html>