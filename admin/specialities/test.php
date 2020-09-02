<!DOCTYPE html>
<html>
<head>
	<title></title>
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-173470882-1"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-173470882-1');
</script>
	<link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
	<link href="https://cdn.datatables.net/1.10.15/css/dataTables.bootstrap.min.css">
	<script src="../js/jquery.js"></script>
	<style type="text/css">
		body{
  padding:20px 20px;
}

.results tr[visible='false'],
.no-result{
  display:none;
}

.results tr[visible='true']{
  display:table-row;
}

.counter{
  padding:8px; 
  color:#ccc;
}
	</style>
</head>
<body>
<script type="text/javascript">
	$(document).ready(function() {
  $(".search").keyup(function () {
    var searchTerm = $(".search").val();
    var listItem = $('.results tbody').children('tr');
    var searchSplit = searchTerm.replace(/ /g, "'):containsi('")
    
  $.extend($.expr[':'], {'containsi': function(elem, i, match, array){
        return (elem.textContent || elem.innerText || '').toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
    }
  });
    
  $(".results tbody tr").not(":containsi('" + searchSplit + "')").each(function(e){
    $(this).attr('visible','false');
  });

  $(".results tbody tr:containsi('" + searchSplit + "')").each(function(e){
    $(this).attr('visible','true');
  });

  var jobCount = $('.results tbody tr[visible="true"]').length;
    $('.counter').text(jobCount + ' item');

  if(jobCount == '0') {$('.no-result').show();}
    else {$('.no-result').hide();}
		  });
});
</script>
<div class="form-group pull-right">
    <input type="text" class="search form-control" placeholder="What you looking for?">
</div>
<span class="counter pull-right"></span>
<table class="table table-hover table-bordered results">
  <thead>
    <tr>
      <th>#</th>
      <th class="col-md-5 col-xs-5">Name / Surname</th>
      <th class="col-md-4 col-xs-4">Job</th>
      <th class="col-md-3 col-xs-3">City</th>
    </tr>
    <tr class="warning no-result">
      <td colspan="4"><i class="fa fa-warning"></i> No result</td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Vatanay Özbeyli</td>
      <td>UI & UX</td>
      <td>Istanbul</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Burak Özkan</td>
      <td>Software Developer</td>
      <td>Istanbul</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Egemen Özbeyli</td>
      <td>Purchasing</td>
      <td>Kocaeli</td>
    </tr>
    <tr>
      <th scope="row">4</th>
      <td>Engin Kızıl</td>
      <td>Sales</td>
      <td>Bozuyük</td>
    </tr>
  </tbody>
</table>
</body>
</html>