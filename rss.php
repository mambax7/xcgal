<?php
//
// 	XOOPS Gallery RSS 2.0 
//	displays latest photos via RSS 2.0 feed.
//  Copyright (c) 2007 Mowaffak Ali - www.arabxoops.com
//  Thanks to www.mypapit.net                 
//	This program is free software; you can redistribute it and/or modify
//	it under the terms of the GNU General Public License as published by
//	the Free Software Foundation; either version 2 of the License, or
//	(at your option) any later version.
//
//	This program is distributed in the hope that it will be useful,
//	but WITHOUT ANY WARRANTY; without even the implied warranty of
//	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//	GNU General Public License for more details.
//
//	You should have received a copy of the GNU General Public License
//	along with this program; if not, write to the Free Software
//	Foundation, Inc., 675 Mass Ave, Cambridge, MA 02139, USA.
//
//	
//

include_once '../../mainfile.php';

define('IN_XCGALLERY', true);
require('include/init.inc.php');

//$charset='UTF-8';
$charset='ISO-8859-2';
$sitename = htmlspecialchars($xoopsConfig['sitename'], ENT_QUOTES);
$email = checkEmail($xoopsConfig['adminmail'],false);
$slogan = htmlspecialchars($xoopsConfig['slogan'], ENT_QUOTES);
$module = $xoopsModule->getVar('name');
$channel_link = XOOPS_URL.'/';
$channel_desc = xoops_utf8_encode($slogan);
$channel_lastbuild = formatTimestamp(time(), 'rss');
$channel_editor = xoops_utf8_encode($email);
$channel_category = xoops_utf8_encode($category);
$channel_generator = xoops_utf8_encode($module);
$channel_language = _LANGCODE;

$galpath =  XOOPS_URL.'/modules/xcgal';
$albumpath = $galpath.'/albums/';

// How many items you want to show in RSS feed
$upperlimit = 10; 

header('Content-Type:text/xml; charset='.$charset);
$title = $sitename.' - '.$module;
//$channel_title = xoops_utf8_encode($title);
$channel_title = $title;
print "<rss version=\"2.0\">";
print "<channel>\n";
print "<title>$channel_title</title>\n";
print "<link>$channel_link</link>\n";
print "<description>$channel_desc</description>";
print "<language>$channel_language</language>\n";
print "<lastBuildDate>$channel_lastbuild</lastBuildDate>\n";
print "<generator>$channel_generator</generator>\n";
    
$result=$xoopsDB->query("SELECT pid,ctime,title,keywords,filepath,filename FROM ".$xoopsDB->prefix("xcgal_pictures")." ORDER BY pid DESC LIMIT 0,$upperlimit");
while (list($pid, $ctime, $title, $keywords,$filepath,$filename) = mysql_fetch_row($result)) 
{
	print "\t<item>\n";
	print "\t\t<title> $title </title>\n";
	print "\t\t<link>$galpath/displayimage.php?pid=$pid</link>\n";
	print "\t\t<author>$channel_editor</author>\n";
  print "\t\t<pubDate>$channel_lastbuild</pubDate>\n";
  print "\t\t<description>";
  echo  htmlspecialchars("<p><a href=\"$galpath"."/displayimage.php?pid=$pid\"><img src=\"$albumpath$filepath" . "thumb_$filename\" alt=\"\" /> </p><p>$keywords</p>");
  print "</description>\n";
	print "\t</item>\n";
	print "\n";
}
print "</channel>";
print "</rss>";
