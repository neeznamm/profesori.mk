update post p
set professor_id = (select professor_id from post where id in (select parent_post_id from post where id=p.id))
where id>=3001
