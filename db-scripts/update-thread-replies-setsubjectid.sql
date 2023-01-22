update post p
set subject_id = (select subject_id from post where id in (select parent_post_id from post where id=p.id))
where id>=2001
