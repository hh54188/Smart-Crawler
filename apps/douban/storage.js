// http://stackoverflow.com/questions/1733507/how-to-get-size-of-mysql-database

/*
	SELECT table_schema                                        "DB Name", 
   	Round(Sum(data_length + index_length) / 1024 / 1024, 1) "DB Size in MB" 
	FROM   information_schema.tables 
	GROUP  BY table_schema; 
*/

// http://stackoverflow.com/questions/14714750/how-to-get-true-size-of-mysql-database
/*
	SELECT table_schema "Data Base Name",
	    sum( data_length + index_length ) / 1024 / 1024 "Data Base Size in MB",
	    sum( data_free )/ 1024 / 1024 "Free Space in MB"
	FROM information_schema.TABLES
	GROUP BY table_schema ;
*/